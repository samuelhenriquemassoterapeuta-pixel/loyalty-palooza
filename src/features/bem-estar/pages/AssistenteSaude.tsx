import { useState, useRef, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/assistente-saude`;

const SUGGESTIONS = [
  "Como posso melhorar meu sono?",
  "Quais terapias ajudam com dor nas costas?",
  "Dicas de alimentação saudável",
  "Benefícios da aromaterapia",
];

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const { data: { session } } = await supabase.auth.getSession();
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Erro desconhecido" }));
    if (resp.status === 429) onError("Muitas mensagens. Aguarde um momento.");
    else if (resp.status === 402) onError("Créditos de IA esgotados.");
    else onError(err.error || "Erro ao enviar mensagem");
    return;
  }

  if (!resp.body) { onError("Sem resposta"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
  onDone();
}

const AssistenteSaude = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: (msg) => { toast.error(msg); setIsLoading(false); },
    });
  }, [messages, isLoading]);

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100dvh-80px)] max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
              <Sparkles size={16} className="text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">Aria — Assistente de Saúde</h1>
              <p className="text-[10px] text-muted-foreground">Resinkra IA</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-8">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Bot size={28} className="text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Olá! Eu sou a Aria 💚</h2>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Sua assistente de saúde e bem-estar. Pergunte sobre terapias, nutrição, exercícios ou autocuidado.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-xs p-3 rounded-xl glass-card hover:bg-muted/50 text-muted-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={14} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "glass-card text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User size={14} className="text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                <Bot size={14} className="text-primary" />
              </div>
              <div className="glass-card rounded-2xl px-4 py-3">
                <Loader2 size={16} className="animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border/50 safe-bottom">
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre saúde e bem-estar..."
              className="flex-1 bg-muted/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-xl">
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default AssistenteSaude;
