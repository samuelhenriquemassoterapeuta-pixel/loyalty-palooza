import { motion } from "framer-motion";
import { ArrowLeft, Bell, Check, CheckCheck, BellOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useNotificacoes } from "@/hooks/useNotificacoes";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { NotificacoesListSkeleton } from "@/components/skeletons";

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
  const { notificacoes, naoLidas, loading, marcarComoLida, marcarTodasComoLidas } = useNotificacoes();

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

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top">
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

        {loading ? (
          <NotificacoesListSkeleton />
        ) : notificacoes.length === 0 ? (
          <div className="text-center py-12">
            <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma notificação</p>
            <p className="text-sm text-muted-foreground mt-1">
              Você receberá alertas sobre agendamentos e pedidos aqui
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notificacoes.map((notificacao, index) => (
              <motion.div
                key={notificacao.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                        {!notificacao.lida && (
                          <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
                        )}
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
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Notificacoes;
