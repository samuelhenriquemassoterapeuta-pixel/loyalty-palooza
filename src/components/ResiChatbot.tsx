import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2, Calendar, ShoppingBag, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { label: "Agendar sessão", icon: Calendar, action: "/agendamento" },
  { label: "Ver produtos", icon: ShoppingBag, action: "/loja" },
  { label: "Dúvidas", icon: HelpCircle, action: null },
];

export function ResiChatbot() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Olá! Sou a Resi, sua assistente virtual 🌿 Como posso te ajudar hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("resi-chat", {
        body: {
          message: userMsg.content,
          context: user ? `Usuário logado: ${user.email}` : "Visitante não logado",
        },
      });

      const reply = data?.reply || "Desculpe, tente novamente! 🌿";

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Ops, tive um probleminha. Tente novamente! 🙏",
          timestamp: new Date(),
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-24 lg:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
          >
            <Bot size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 lg:bottom-6 right-4 z-50 w-80 lg:w-96 h-[480px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-border/50 flex items-center gap-2 bg-primary/5">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Resi</p>
                <p className="text-[10px] text-muted-foreground">Assistente Resinkra • Online</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-none">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "bg-primary/20" : "bg-muted"
                  }`}>
                    {msg.role === "assistant" ? (
                      <Sparkles size={12} className="text-primary" />
                    ) : (
                      <User size={12} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                  <div className="bg-muted px-3 py-2 rounded-2xl rounded-tl-sm">
                    <Loader2 size={14} className="animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
                {QUICK_ACTIONS.map(({ label, icon: Icon, action }) => (
                  <button
                    key={label}
                    onClick={() => {
                      if (action) {
                        navigate(action);
                        setOpen(false);
                      } else {
                        setInput("Quais são os serviços disponíveis?");
                      }
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap shrink-0"
                  >
                    <Icon size={12} />
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte algo..."
                  className="rounded-xl text-sm"
                  maxLength={500}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || loading} className="rounded-xl shrink-0">
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
