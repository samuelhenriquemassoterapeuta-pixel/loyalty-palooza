import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft, Phone, Clock, MessageCircle, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Json } from "@/integrations/supabase/types";

interface Mensagem {
  role: string;
  content: string;
  ts?: string;
}

interface Conversa {
  id: string;
  telefone: string;
  nome: string | null;
  status: string;
  necessidade: string | null;
  mensagens: Json;
  created_at: string;
  updated_at: string;
}

export default function ChatWhatsApp() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: conversas, isLoading } = useQuery({
    queryKey: ["whatsapp-conversas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("whatsapp_conversas")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as Conversa[];
    },
  });

  const selected = conversas?.find((c) => c.id === selectedId);
  const mensagens: Mensagem[] = selected
    ? (Array.isArray(selected.mensagens) ? selected.mensagens as unknown as Mensagem[] : [])
    : [];

  const statusColor = (s: string) => {
    if (s === "ativo") return "bg-green-500/10 text-green-600 border-green-500/20";
    if (s === "transferido") return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    return "bg-muted text-muted-foreground";
  };

  return (
    <AppLayout hideBottomNav>
      <div className="flex flex-col h-[100dvh] bg-background">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (selectedId ? setSelectedId(null) : navigate(-1))}
            className="shrink-0"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center">
              <Phone size={18} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">
                {selectedId && selected ? (selected.nome || selected.telefone) : "WhatsApp"}
              </h1>
              <p className="text-[10px] text-muted-foreground">
                {selectedId ? selected?.telefone : `${conversas?.length || 0} conversas`}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {!selectedId ? (
          /* List view */
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border/30">
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              )}
              {conversas?.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
                  <MessageCircle size={32} />
                  <p className="text-sm">Nenhuma conversa ainda</p>
                </div>
              )}
              {conversas?.map((c, i) => {
                const msgs = Array.isArray(c.mensagens) ? c.mensagens as unknown as Mensagem[] : [];
                const lastMsg = msgs[msgs.length - 1];
                return (
                  <motion.button
                    key={c.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedId(c.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-foreground truncate">
                          {c.nome || c.telefone}
                        </span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {format(new Date(c.updated_at), "dd/MM HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground truncate flex-1">
                          {lastMsg?.content?.substring(0, 60) || "Sem mensagens"}
                        </p>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${statusColor(c.status)}`}>
                          {c.status}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          /* Chat detail view */
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-3">
              {mensagens.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-green-500/10 text-foreground rounded-br-md"
                        : "bg-muted/60 text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                    {msg.ts && (
                      <p className="text-[9px] text-muted-foreground mt-1">
                        {format(new Date(msg.ts), "dd/MM HH:mm", { locale: ptBR })}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
              {mensagens.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">Sem mensagens</p>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </AppLayout>
  );
}
