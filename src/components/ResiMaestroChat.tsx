import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ResiMaestroChatProps {
  userId: string;
}

const EDGE_FUNCTION_URL = 'https://isskzxlwjznrrizwkoxm.supabase.co/functions/v1/resi-maestro';

export function ResiMaestroChat({ userId }: ResiMaestroChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [agentDebug, setAgentDebug] = useState<{ name?: string; emoji?: string; confidence?: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          message: text,
          currentAgent,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setCurrentAgent(data.currentAgent ?? null);
      setAgentDebug({
        name: data.agentName,
        emoji: data.agentEmoji,
        confidence: data.confidence ?? (data.currentAgent ? 95 : 0),
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response ?? data.content ?? 'Sem resposta.',
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error('ResiMaestro error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '😔 Erro ao conectar com o Maestro. Tente novamente.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-purple-200/40 bg-gradient-to-br from-purple-950/90 via-purple-900/80 to-pink-900/70">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-purple-700 to-pink-600 shrink-0">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Bot size={22} className="text-white" />
        </div>
        <div>
          <h2 className="text-white font-bold text-base leading-tight">Resi Maestro</h2>
          <span className="text-purple-200 text-xs">Assistente IA</span>
        </div>
      </div>

      {/* Agent indicator */}
      {agentDebug && agentDebug.name && (
        <div className="px-4 py-1.5 bg-purple-900/50 border-b border-purple-500/20 flex items-center gap-2 text-xs text-purple-200 shrink-0">
          <span>{agentDebug.emoji || '🤖'} {agentDebug.name}</span>
          <span className="text-purple-400/60">(confiança: {agentDebug.confidence}%)</span>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-purple-300/70 text-sm mt-10">
            Envie uma mensagem para começar 💬
          </p>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isUser
                        ? 'bg-pink-500/80'
                        : 'bg-purple-500/80'
                    }`}
                  >
                    {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                  </div>
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        isUser
                          ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-br-sm'
                          : 'bg-white/10 text-purple-100 border border-purple-400/20 rounded-bl-sm backdrop-blur-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className={`text-[10px] text-purple-400/60 mt-0.5 block ${isUser ? 'text-right mr-1' : 'ml-1'}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/10 border border-purple-400/20 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm">
              <div className="flex gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-purple-950/60 border-t border-purple-500/20 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1 rounded-full bg-white/10 border-purple-400/30 text-purple-100 placeholder:text-purple-400/50 focus:border-pink-400 focus:ring-pink-400/30 text-sm"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full w-10 h-10 p-0 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shrink-0"
          >
            <Send size={16} className="text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResiMaestroChat;
