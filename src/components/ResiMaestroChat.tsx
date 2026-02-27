// ============================================================
// 🌿 RESINKRA - Resi Maestro Chat (Global Floating Widget)
// ============================================================

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentName?: string;
  agentEmoji?: string;
  timestamp: Date;
}

interface MenuOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const MENU_OPTIONS: MenuOption[] = [
  { id: "1", emoji: "💬", title: "Dúvidas Gerais", description: "Cashback, indicações, plataforma" },
  { id: "2", emoji: "📅", title: "Agendamentos", description: "Marcar, remarcar ou cancelar sessões" },
  { id: "3", emoji: "🎬", title: "Criar Conteúdo", description: "Roteiros e ideias para redes sociais" },
  { id: "4", emoji: "🛒", title: "Produtos e Pacotes", description: "Comprar óleos, pacotes de sessões" },
  { id: "5", emoji: "🧘", title: "Bem-estar", description: "Dicas de saúde e relaxamento" },
];

export function ResiMaestroChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [agentDebug, setAgentDebug] = useState<{ name?: string; emoji?: string; confidence?: number } | null>(null);
  const [showMenu, setShowMenu] = useState(true);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: "🌿 Olá! Sou a Resi Maestro, sua assistente da Resinkra!\n\nComo posso te ajudar hoje?",
        timestamp: new Date(),
      }]);
      setShowMenu(true);
    }
  }, [isOpen]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    if (!user) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: "user",
        content: messageText.trim(),
        timestamp: new Date(),
      }, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "🔒 Para conversar comigo, você precisa estar logado(a). Crie sua conta ou faça login! 🌿",
        timestamp: new Date(),
      }]);
      setInput("");
      return;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setShowMenu(false);

    try {
      const { data, error } = await supabase.functions.invoke("resi-agent-router", {
        body: {
          message: messageText.trim(),
          session_id: sessionId,
          currentAgent,
        },
      });

      if (error) throw error;

      setCurrentAgent(data?.current_agent || null);
      setAgentDebug({
        name: data?.agent_name,
        emoji: data?.agent_emoji,
        confidence: data?.confidence ?? (data?.current_agent ? 95 : 0),
      });
      setShowMenu(data?.show_menu || false);

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data?.response || "Desculpe, tente novamente! 🌿",
        agentName: data?.agent_name,
        agentEmoji: data?.agent_emoji,
        timestamp: new Date(),
      }]);
    } catch (err) {
      console.error("ResiMaestro error:", err);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "😔 Ops! Tive um probleminha. Pode tentar novamente?",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const backToMenu = () => sendMessage("0");

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 lg:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
          >
            <Bot size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 lg:bottom-6 right-4 z-50 w-80 lg:w-96 h-[520px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-border/50 flex items-center gap-2 bg-primary/5">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Resi Maestro</p>
                <p className="text-[10px] text-muted-foreground">
                  {agentDebug?.name
                    ? `${agentDebug.emoji || "🤖"} ${agentDebug.name}`
                    : "Assistente Resinkra • Online"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {currentAgent && (
                  <button
                    onClick={backToMenu}
                    className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    Menu
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Agent debug indicator */}
            {agentDebug?.name && (
              <div className="px-3 py-1 bg-primary/5 border-b border-border/30 flex items-center gap-2 text-[10px] text-muted-foreground shrink-0">
                <span>{agentDebug.emoji || "🤖"} {agentDebug.name}</span>
                <span className="opacity-60">(confiança: {agentDebug.confidence}%)</span>
              </div>
            )}

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
                      msg.agentEmoji ? (
                        <span className="text-xs">{msg.agentEmoji}</span>
                      ) : (
                        <Sparkles size={12} className="text-primary" />
                      )
                    ) : (
                      <User size={12} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="max-w-[75%]">
                    <div className={`px-3 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}>
                      {msg.role === "assistant" && msg.agentName && (
                        <div className="text-[10px] font-medium text-primary mb-0.5">
                          {msg.agentEmoji} {msg.agentName}
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    <span className={`text-[9px] text-muted-foreground/50 mt-0.5 block ${msg.role === "user" ? "text-right mr-1" : "ml-1"}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Menu de opções */}
              {showMenu && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1.5"
                >
                  {MENU_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => sendMessage(option.id)}
                      className="w-full flex items-center gap-2.5 p-2.5 bg-muted/50 border border-border rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <span className="text-lg">{option.emoji}</span>
                      <div>
                        <div className="text-xs font-medium text-foreground group-hover:text-primary">{option.title}</div>
                        <div className="text-[10px] text-muted-foreground">{option.description}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {isLoading && (
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

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="rounded-xl text-sm"
                  maxLength={500}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-xl shrink-0">
                  <Send size={16} />
                </Button>
              </form>
              <p className="text-[9px] text-muted-foreground text-center mt-1.5">
                Resi Maestro • Digite 0 para voltar ao menu
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ResiMaestroChat;
