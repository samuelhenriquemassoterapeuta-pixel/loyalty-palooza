import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
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
  { id: '1', emoji: '💬', title: 'Dúvidas Gerais', description: 'Cashback, indicações, plataforma' },
  { id: '2', emoji: '📅', title: 'Agendamentos', description: 'Marcar, remarcar ou cancelar sessões' },
  { id: '3', emoji: '🎬', title: 'Criar Conteúdo', description: 'Roteiros e ideias para redes sociais' },
  { id: '4', emoji: '🛒', title: 'Produtos e Pacotes', description: 'Comprar óleos, pacotes de sessões' },
  { id: '5', emoji: '🧘', title: 'Bem-estar', description: 'Dicas de saúde e relaxamento' },
];

export function ResiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '🌿 Olá! Sou a **Resi**, sua assistente da Resinkra!\n\nComo posso te ajudar hoje?',
        timestamp: new Date()
      }]);
      setShowMenu(true);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowMenu(false);

    try {
      const { data, error } = await supabase.functions.invoke('resi-router', {
        body: {
          userId: user?.id || `anon_${Date.now()}`,
          message: messageText,
          platform: 'web'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        agentName: data.agentName,
        agentEmoji: data.agentEmoji,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentAgent(data.currentAgent);
      setShowMenu(data.showMenu);

    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '😔 Ops! Tive um probleminha técnico. Pode tentar novamente?',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectMenuOption = (optionId: string) => sendMessage(optionId);
  const backToMenu = () => sendMessage('0');

  const renderMessageContent = (content: string) => {
    // Basic markdown: bold **text**, newlines
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
      >
        <div className={`max-w-[82%] ${isUser ? 'order-2' : 'order-1'}`}>
          {!isUser && message.agentName && (
            <div className="flex items-center gap-1 mb-1 ml-1">
              <span className="text-xs font-semibold text-green-700">
                {message.agentEmoji} {message.agentName}
              </span>
            </div>
          )}
          <div
            className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
              isUser
                ? 'bg-green-500 text-white rounded-br-sm'
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
            }`}
          >
            {renderMessageContent(message.content)}
          </div>
          <div className={`text-[10px] text-gray-400 mt-0.5 ${isUser ? 'text-right mr-1' : 'ml-1'}`}>
            {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 mt-2 mb-1"
    >
      {MENU_OPTIONS.map((option) => (
        <button
          key={option.id}
          onClick={() => selectMenuOption(option.id)}
          className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all text-left group shadow-sm"
        >
          <span className="text-xl">{option.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
              {option.id}. {option.title}
            </div>
            <div className="text-xs text-gray-500 truncate">{option.description}</div>
          </div>
        </button>
      ))}
    </motion.div>
  );

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center text-white z-50 hover:shadow-xl hover:scale-105 transition-all"
            aria-label="Abrir chat Resi"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[370px] h-[600px] bg-gray-50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg">
                  🌿
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-tight">Resi</div>
                  <div className="text-green-100 text-xs">
                    {currentAgent
                      ? MENU_OPTIONS.find(o => o.id === currentAgent)?.title || 'Online'
                      : 'Online'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {currentAgent && (
                  <button
                    onClick={backToMenu}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-white/90 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={14} />
                    Menu
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white"
                  aria-label="Fechar chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-1"
            >
              {messages.map(renderMessage)}

              {showMenu && !isLoading && renderMenu()}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-3"
                >
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-3 bg-white border-t border-gray-100 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(inputValue);
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 rounded-full border-gray-200 focus:border-green-400 focus:ring-green-400 text-sm"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="rounded-full w-9 h-9 p-0 bg-green-500 hover:bg-green-600 flex-shrink-0"
                >
                  <Send size={16} />
                </Button>
              </form>
              <p className="text-[10px] text-gray-400 text-center mt-1.5">
                Resinkra AI • Digite 0 para voltar ao menu
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ResiChat;
