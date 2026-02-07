import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bell, Check, CheckCheck, BellOff, Filter, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AppLayout } from "@/components/AppLayout";
import { useNotificacoes } from "@/hooks/useNotificacoes";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { NotificacoesListSkeleton } from "@/components/skeletons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const TIPOS_NOTIFICACAO = [
  { value: "todos", label: "Todos", icon: "🔔" },
  { value: "agendamento", label: "Agendamentos", icon: "📅" },
  { value: "pedido", label: "Pedidos", icon: "🛒" },
  { value: "promocao", label: "Promoções", icon: "🎉" },
  { value: "lembrete", label: "Lembretes", icon: "⏰" },
  { value: "geral", label: "Geral", icon: "📢" },
];

const getIconByTipo = (tipo: string) => {
  switch (tipo) {
    case "agendamento":
      return "📅";
    case "pedido":
      return "🛒";
    case "promocao":
      return "🎉";
    case "lembrete":
      return "⏰";
    default:
      return "🔔";
  }
};

const Notificacoes = () => {
  const navigate = useNavigate();
  const { notificacoes, naoLidas, loading, loadingMore, hasMore, marcarComoLida, marcarTodasComoLidas, excluirNotificacao, excluirTodasNotificacoes, loadMore } = useNotificacoes();
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [excluindo, setExcluindo] = useState<string | null>(null);
  const [excluindoTodas, setExcluindoTodas] = useState(false);
  const [notificacaoParaExcluir, setNotificacaoParaExcluir] = useState<string | null>(null);
  const [confirmarExcluirTodas, setConfirmarExcluirTodas] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastNotificationRef = useCallback((node: HTMLDivElement | null) => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && filtroAtivo === "todos") {
        loadMore();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loadingMore, hasMore, loadMore, filtroAtivo]);

  const notificacoesFiltradas = useMemo(() => {
    if (filtroAtivo === "todos") return notificacoes;
    return notificacoes.filter((n) => n.tipo === filtroAtivo);
  }, [notificacoes, filtroAtivo]);

  const contadorPorTipo = useMemo(() => {
    const contador: Record<string, number> = { todos: notificacoes.length };
    notificacoes.forEach((n) => {
      contador[n.tipo] = (contador[n.tipo] || 0) + 1;
    });
    return contador;
  }, [notificacoes]);

  const handleMarcarLida = async (id: string) => {
    const { error } = await marcarComoLida(id);
    if (error) {
      toast.error("Erro ao marcar como lida");
    }
  };

  const handleMarcarTodasLidas = async () => {
    const { error } = await marcarTodasComoLidas();
    if (error) {
      toast.error("Erro ao marcar notificações");
    } else {
    toast.success("Todas marcadas como lidas");
    }
  };

  const handleAbrirConfirmacao = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotificacaoParaExcluir(id);
  };

  const handleConfirmarExclusao = async () => {
    if (!notificacaoParaExcluir) return;
    
    setExcluindo(notificacaoParaExcluir);
    const { error } = await excluirNotificacao(notificacaoParaExcluir);
    setExcluindo(null);
    setNotificacaoParaExcluir(null);
    
    if (error) {
      toast.error("Erro ao excluir notificação");
    } else {
      toast.success("Notificação excluída");
    }
  };

  const handleExcluirTodas = async () => {
    setExcluindoTodas(true);
    const { error } = await excluirTodasNotificacoes();
    setExcluindoTodas(false);
    setConfirmarExcluirTodas(false);
    
    if (error) {
      toast.error("Erro ao excluir notificações");
    } else {
      toast.success("Todas as notificações foram excluídas");
    }
  };

  return (
    <AppLayout>
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Notificações</h1>
          </div>
          
          <div className="flex items-center gap-1">
            {notificacoes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmarExcluirTodas(true)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 size={18} className="mr-1" />
                Limpar
              </Button>
            )}
            {naoLidas.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarcarTodasLidas}
                className="text-primary"
              >
                <CheckCheck size={18} className="mr-1" />
                Marcar todas
              </Button>
            )}
          </div>
        </div>

        {/* Filtros por tipo */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4">
          {TIPOS_NOTIFICACAO.map((tipo) => {
            const count = contadorPorTipo[tipo.value] || 0;
            const isActive = filtroAtivo === tipo.value;
            
            // Não mostrar tipos sem notificações (exceto "todos")
            if (tipo.value !== "todos" && count === 0) return null;
            
            return (
              <Button
                key={tipo.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroAtivo(tipo.value)}
                className={`shrink-0 gap-1.5 ${isActive ? "" : "bg-background"}`}
              >
                <span>{tipo.icon}</span>
                <span>{tipo.label}</span>
                {count > 0 && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className="ml-1 h-5 px-1.5 text-xs"
                  >
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {loading ? (
          <NotificacoesListSkeleton />
        ) : notificacoesFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filtroAtivo === "todos" 
                ? "Nenhuma notificação" 
                : `Nenhuma notificação de ${TIPOS_NOTIFICACAO.find(t => t.value === filtroAtivo)?.label.toLowerCase()}`
              }
            </p>
            {filtroAtivo !== "todos" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFiltroAtivo("todos")}
                className="mt-2 text-primary"
              >
                Ver todas
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {notificacoesFiltradas.map((notificacao, index) => {
              const isLast = index === notificacoesFiltradas.length - 1;
              return (
                <motion.div
                  key={notificacao.id}
                  ref={isLast ? lastNotificationRef : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  layout
                >
                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      !notificacao.lida 
                        ? "bg-primary/5 border-primary/20" 
                        : "opacity-70"
                    }`}
                    onClick={() => !notificacao.lida && handleMarcarLida(notificacao.id)}
                  >
                    <div className="flex gap-3">
                      <div className="text-2xl">
                        {getIconByTipo(notificacao.tipo)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-medium text-foreground ${!notificacao.lida ? "font-semibold" : ""}`}>
                            {notificacao.titulo}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0">
                            {!notificacao.lida && (
                              <span className="w-2 h-2 bg-primary rounded-full" />
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={(e) => handleAbrirConfirmacao(e, notificacao.id)}
                              disabled={excluindo === notificacao.id}
                            >
                              <Trash2 size={16} className={excluindo === notificacao.id ? "animate-pulse" : ""} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notificacao.mensagem}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDistanceToNow(new Date(notificacao.created_at), { 
                            addSuffix: true, 
                            locale: ptBR 
                          })}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {loadingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          
          {!hasMore && notificacoesFiltradas.length > 0 && filtroAtivo === "todos" && (
            <p className="text-center text-sm text-muted-foreground py-4">
              Todas as notificações carregadas
            </p>
          )}
          </div>
        )}
      </div>

      <AlertDialog open={!!notificacaoParaExcluir} onOpenChange={(open) => !open && setNotificacaoParaExcluir(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir notificação?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A notificação será removida permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmarExclusao}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmarExcluirTodas} onOpenChange={setConfirmarExcluirTodas}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir todas as notificações?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as {notificacoes.length} notificações serão removidas permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={excluindoTodas}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleExcluirTodas}
              disabled={excluindoTodas}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {excluindoTodas ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir todas"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
    </AppLayout>
  );
};

export default Notificacoes;
