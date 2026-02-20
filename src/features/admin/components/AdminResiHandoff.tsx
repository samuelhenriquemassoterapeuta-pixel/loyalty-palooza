// ============================================================
// 🌿 RESINKRA – Painel de Handoff: Resi → Atendimento Humano
// Estilo WhatsApp Web: lista de sessões à esquerda,
// histórico de mensagens à direita com input de resposta.
// ============================================================

import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Send, Bot, User, UserCog, Loader2, Headphones, CheckCheck, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ─── Tipos ─────────────────────────────────────────────────

interface ChatSession {
  id: string;
  user_id: string;
  platform: string | null;
  current_agent: string | null;
  needs_human: boolean;
  assigned_admin_id: string | null;
  last_activity: string | null;
  updated_at: string | null;
  // joined
  profile_nome?: string | null;
  profile_telefone?: string | null;
}

interface ChatInteraction {
  id: string;
  user_id: string;
  agent: string;
  user_message: string;
  assistant_message: string;
  platform: string | null;
  created_at: string | null;
}

// ─── Helpers visuais ────────────────────────────────────────

/** Converte agent string em metadados visuais */
const agentMeta = (agent: string) => {
  if (agent === "admin") return { label: "Admin", color: "text-emerald-400", bg: "bg-emerald-500/15", icon: <UserCog size={13} /> };
  if (agent === "paciente" || agent === "user") return { label: "Paciente", color: "text-sky-400", bg: "bg-sky-500/15", icon: <User size={13} /> };
  return { label: agent || "Resi", color: "text-violet-400", bg: "bg-violet-500/15", icon: <Bot size={13} /> };
};

const relativeTime = (iso: string | null) => {
  if (!iso) return "";
  return format(new Date(iso), "HH:mm", { locale: ptBR });
};

// ─── Componente principal ───────────────────────────────────

export function AdminResiHandoff() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── 1. Lista de sessões que pedem humano (polling inicial + Realtime) ──
  const { data: sessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ["handoff-sessions"],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from("chat_sessions") as any)
        .select("*")
        .eq("needs_human", true)
        .order("last_activity", { ascending: false })
        .limit(50);
      if (error) throw error;

      // Enriquecer com nome/telefone do perfil
      const sessions = (data || []) as any[];
      const userIds = [...new Set(sessions.map((s) => s.user_id))];
      if (userIds.length === 0) return sessions as ChatSession[];

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, nome, telefone")
        .in("id", userIds);

      const profileMap: Record<string, { nome: string | null; telefone: string | null }> = {};
      (profiles || []).forEach((p: any) => { profileMap[p.id] = { nome: p.nome, telefone: p.telefone }; });

      return sessions.map((s) => ({
        ...s,
        profile_nome: profileMap[s.user_id]?.nome ?? null,
        profile_telefone: profileMap[s.user_id]?.telefone ?? null,
      })) as ChatSession[];
    },
  });

  // ── 2. Realtime: escuta inserções/updates em chat_sessions ──
  useEffect(() => {
    const channel = supabase
      .channel("handoff-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_sessions" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["handoff-sessions"] });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  // ── 3. Histórico de mensagens da sessão selecionada ──
  const { data: interactions = [], isLoading: loadingChat } = useQuery({
    queryKey: ["handoff-chat", selectedSession?.id],
    enabled: !!selectedSession,
    refetchInterval: 5000, // refetch a cada 5s como fallback
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chat_interactions")
        .select("*")
        .eq("user_id", selectedSession!.user_id)
        .order("created_at", { ascending: true })
        .limit(100);
      if (error) throw error;
      return (data || []) as ChatInteraction[];
    },
  });

  // Scroll automático ao fim das mensagens
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [interactions]);

  // ── 4. Enviar mensagem e acionar WhatsApp ──
  const handleSend = async () => {
    if (!message.trim() || !selectedSession || !user) return;
    setSending(true);

    try {
      // a) Inserir interação como "admin"
      const { error: insertErr } = await supabase.from("chat_interactions").insert({
        user_id: selectedSession.user_id,
        agent: "admin",
        user_message: `[Admin ${user.email}]`,
        assistant_message: message.trim(),
        platform: selectedSession.platform ?? "web",
      } as any);
      if (insertErr) throw insertErr;

      // b) Enviar via WhatsApp se houver telefone
      const telefone = selectedSession.profile_telefone;
      if (telefone) {
        await supabase.functions.invoke("enviar-whatsapp", {
          body: { telefone, mensagem: message.trim() },
        });
      }

      // c) Marcar sessão como resolvida (needs_human = false)
      await supabase
        .from("chat_sessions")
        .update({ needs_human: false, assigned_admin_id: user.id } as any)
        .eq("id", selectedSession.id);

      toast.success("Mensagem enviada e controle assumido! ✅");
      setMessage("");
      setSelectedSession(null);
      queryClient.invalidateQueries({ queryKey: ["handoff-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["handoff-chat"] });
    } catch (err: any) {
      toast.error(err.message || "Erro ao enviar mensagem");
    } finally {
      setSending(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────

  return (
    <div className="flex h-[80vh] rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
      {/* ── Coluna esquerda: Lista de sessões ── */}
      <aside className="w-72 border-r border-border flex flex-col bg-muted/20">
        {/* Header da coluna */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones size={16} className="text-primary" />
            <span className="text-sm font-semibold">Aguardando Humano</span>
          </div>
          <Badge variant="outline" className="text-[10px] px-1.5">
            {sessions.length}
          </Badge>
        </div>

        {/* Lista */}
        <ScrollArea className="flex-1">
          {loadingSessions ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground text-xs gap-2">
              <Loader2 size={14} className="animate-spin" /> Carregando...
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <CheckCheck size={32} className="text-emerald-400 mb-3" />
              <p className="text-sm font-medium">Tudo resolvido!</p>
              <p className="text-xs text-muted-foreground mt-1">Nenhuma sessão aguardando atendimento humano.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/40 ${
                    selectedSession?.id === session.id ? "bg-primary/10 border-l-2 border-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {(session.profile_nome ?? "?").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {session.profile_nome ?? "Usuário"}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {session.current_agent ? `Agente: ${session.current_agent}` : "Sem agente"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[9px] text-muted-foreground">
                        {relativeTime(session.last_activity ?? session.updated_at)}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Aguardando humano" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Rodapé coluna */}
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs gap-1.5 text-muted-foreground"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["handoff-sessions"] })}
          >
            <RefreshCw size={12} /> Atualizar lista
          </Button>
        </div>
      </aside>

      {/* ── Coluna direita: Chat ── */}
      <main className="flex-1 flex flex-col">
        {!selectedSession ? (
          // Estado vazio
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
            <Headphones size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Selecione uma sessão</p>
            <p className="text-xs mt-1">Escolha uma conversa à esquerda para ver o histórico e assumir o controle.</p>
          </div>
        ) : (
          <>
            {/* Header do chat */}
            <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {(selectedSession.profile_nome ?? "?").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{selectedSession.profile_nome ?? "Usuário"}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {selectedSession.profile_telefone ?? "Sem telefone"} · {selectedSession.platform ?? "web"}
                  </p>
                </div>
              </div>
              <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px]">
                <AlertCircle size={10} className="mr-1" /> Aguardando humano
              </Badge>
            </div>

            {/* Mensagens */}
            <ScrollArea className="flex-1 px-4 py-4">
              {loadingChat ? (
                <div className="flex items-center justify-center py-10 gap-2 text-muted-foreground text-xs">
                  <Loader2 size={14} className="animate-spin" /> Carregando histórico...
                </div>
              ) : interactions.length === 0 ? (
                <p className="text-center text-xs text-muted-foreground py-10">Nenhuma mensagem encontrada.</p>
              ) : (
                <AnimatePresence initial={false}>
                  {interactions.map((item) => {
                    const isAdmin = item.agent === "admin";
                    const isUser = item.agent === "paciente" || item.agent === "user";
                    const meta = agentMeta(item.agent);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 space-y-1.5"
                      >
                        {/* Mensagem do usuário/paciente */}
                        {item.user_message && item.user_message !== `[Admin ${user?.email}]` && (
                          <div className="flex items-start gap-2 justify-end">
                            <div className="max-w-[72%]">
                              <div className="flex items-center gap-1 justify-end mb-0.5">
                                <span className="text-[9px] text-muted-foreground">{relativeTime(item.created_at)}</span>
                                <span className="text-[9px] text-sky-400 font-medium flex items-center gap-0.5">
                                  <User size={9} /> Paciente
                                </span>
                              </div>
                              <div className="bg-sky-500/10 border border-sky-500/20 text-sky-100 rounded-2xl rounded-tr-sm px-3 py-2 text-sm">
                                {item.user_message}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Resposta da IA ou Admin */}
                        {item.assistant_message && (
                          <div className={`flex items-start gap-2 ${isAdmin ? "justify-end" : "justify-start"}`}>
                            {!isAdmin && (
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${meta.bg}`}>
                                <span className={meta.color}>{meta.icon}</span>
                              </div>
                            )}
                            <div className="max-w-[72%]">
                              <div className={`flex items-center gap-1 mb-0.5 ${isAdmin ? "justify-end" : "justify-start"}`}>
                                <span className={`text-[9px] font-medium flex items-center gap-0.5 ${meta.color}`}>
                                  {meta.icon} {meta.label}
                                </span>
                                <span className="text-[9px] text-muted-foreground">{relativeTime(item.created_at)}</span>
                              </div>
                              <div
                                className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                  isAdmin
                                    ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-100 rounded-tr-sm"
                                    : "bg-violet-500/10 border border-violet-500/20 rounded-tl-sm"
                                }`}
                              >
                                {item.assistant_message}
                              </div>
                            </div>
                            {isAdmin && (
                              <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                                <UserCog size={13} className="text-emerald-400" />
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
              <div ref={bottomRef} />
            </ScrollArea>

            {/* Input de resposta */}
            <div className="px-4 py-3 border-t border-border bg-muted/10">
              <p className="text-[10px] text-amber-400 flex items-center gap-1 mb-2">
                <AlertCircle size={10} /> Ao enviar, você assume o controle e marca a sessão como resolvida.
              </p>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Digite sua resposta ao paciente..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  className="flex-1 text-sm rounded-xl bg-background"
                  disabled={sending}
                />
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || sending}
                  className="rounded-xl h-10 px-4 gap-2 shadow-button"
                  size="sm"
                >
                  {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  Enviar
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminResiHandoff;
