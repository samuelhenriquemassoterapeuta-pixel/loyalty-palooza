import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Package, Check, Clock, Sparkles, Loader2, Calendar, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePacotes, useMeusPacotes, Pacote } from "@/hooks/usePacotes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MeusPacotesListSkeleton, PacotesListSkeleton } from "@/components/skeletons";
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

const Pacotes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"meus" | "loja">("meus");
  const { pacotes, loading: loadingPacotes } = usePacotes();
  const { meusPacotes, loading: loadingMeus, comprarPacote } = useMeusPacotes();
  const [comprando, setComprando] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    pacote: Pacote | null;
  }>({ open: false, pacote: null });

  const handleOpenConfirm = (pacote: Pacote) => {
    setConfirmDialog({ open: true, pacote });
  };

  const handleComprar = async () => {
    const pacote = confirmDialog.pacote;
    if (!pacote) return;

    setConfirmDialog({ open: false, pacote: null });
    setComprando(pacote.id);
    const { error } = await comprarPacote(pacote.id, pacote.validade_dias || 365);
    setComprando(null);

    if (error) {
      toast.error("Erro ao comprar pacote. Tente novamente.");
    } else {
      toast.success("Pacote adquirido!", {
        description: `${pacote.nome} foi adicionado aos seus pacotes.`,
      });
      setActiveTab("meus");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top">
        {/* Header */}
        <div className="flex items-center gap-3 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Plano de Horas</h1>
            <p className="text-xs text-muted-foreground">Gerencie seus pacotes e sessões</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "meus" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setActiveTab("meus")}
          >
            <Clock size={16} />
            Meu Plano
          </Button>
          <Button
            variant={activeTab === "loja" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setActiveTab("loja")}
          >
            <Sparkles size={16} />
            Comprar Planos
          </Button>
        </div>

        {/* Resumo do Plano Ativo */}
        {!loadingMeus && meusPacotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            {(() => {
              const planoAtivo = meusPacotes.find(p => p.status === 'ativo');
              if (!planoAtivo || !planoAtivo.pacote) return null;
              
              const pacote = planoAtivo.pacote;
              const sessoesRestantes = pacote.total_sessoes - planoAtivo.sessoes_usadas;
              const progresso = (planoAtivo.sessoes_usadas / pacote.total_sessoes) * 100;
              const dataValidade = new Date(planoAtivo.data_validade);
              const diasRestantes = Math.ceil((dataValidade.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const alertaBaixo = sessoesRestantes < 3;
              
              return (
                <Card className={`overflow-hidden ${alertaBaixo ? 'border-destructive/50 bg-gradient-to-br from-destructive/10 via-background to-destructive/5' : 'border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent/5'}`}>
                  <CardContent className="p-5">
                    {/* Alerta de Sessões Baixas */}
                    {alertaBaixo && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-destructive/10 border border-destructive/20"
                      >
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <AlertTriangle className="text-destructive" size={18} />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-destructive">Sessões acabando!</p>
                          <p className="text-xs text-muted-foreground">Renove seu plano para continuar</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => setActiveTab("loja")}
                        >
                          Renovar
                        </Button>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl ${alertaBaixo ? 'bg-destructive/20' : 'bg-primary/20'}`}>
                          <Clock className={alertaBaixo ? 'text-destructive' : 'text-primary'} size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Plano Ativo</p>
                          <h3 className="font-semibold text-foreground">{pacote.nome}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Válido por</p>
                        <p className="text-sm font-medium text-foreground">{diasRestantes} dias</p>
                      </div>
                    </div>
                    
                    {/* Sessões Restantes Destaque */}
                    <div className={`flex items-center justify-center gap-3 py-4 mb-4 rounded-2xl ${
                      alertaBaixo 
                        ? 'bg-gradient-to-r from-destructive/20 via-destructive/10 to-destructive/20' 
                        : 'bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20'
                    }`}>
                      <motion.div
                        animate={{ scale: alertaBaixo ? [1, 1.15, 1] : [1, 1.1, 1] }}
                        transition={{ duration: alertaBaixo ? 0.8 : 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`text-4xl font-bold ${alertaBaixo ? 'text-destructive' : 'text-primary'}`}
                      >
                        {sessoesRestantes}
                      </motion.div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">sessões</p>
                        <p className="text-xs text-muted-foreground">restantes</p>
                      </div>
                    </div>
                    
                    {/* Barra de Progresso */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Utilizadas</span>
                        <span className="text-foreground font-medium">
                          {planoAtivo.sessoes_usadas} de {pacote.total_sessoes}
                        </span>
                      </div>
                      <Progress value={progresso} className="h-2" />
                    </div>
                    
                    <Button
                      className="w-full mt-4"
                      onClick={() => navigate("/agendamento")}
                    >
                      <Calendar size={16} className="mr-2" />
                      Agendar Sessão
                    </Button>
                  </CardContent>
                </Card>
              );
            })()}
          </motion.div>
        )}

        {/* Meus Pacotes */}
        {activeTab === "meus" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {loadingMeus ? (
              <MeusPacotesListSkeleton />
            ) : meusPacotes.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <Package className="mx-auto text-muted-foreground mb-3" size={48} />
                  <p className="text-muted-foreground">
                    Você ainda não possui planos ativos.
                  </p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setActiveTab("loja")}
                  >
                    Explorar planos disponíveis
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <h3 className="text-sm font-medium text-muted-foreground">Todos os Planos</h3>
                {meusPacotes.map((meuPacote) => {
                  const pacote = meuPacote.pacote;
                  if (!pacote) return null;
                  
                  const sessoesRestantes = pacote.total_sessoes - meuPacote.sessoes_usadas;
                  const progresso = (meuPacote.sessoes_usadas / pacote.total_sessoes) * 100;
                  const dataValidade = new Date(meuPacote.data_validade);

                  return (
                    <Card key={meuPacote.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{pacote.nome}</CardTitle>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock size={12} /> Válido até {format(dataValidade, "dd/MM/yyyy", { locale: ptBR })}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            meuPacote.status === 'ativo' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {sessoesRestantes} restantes
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="text-foreground font-medium">
                              {meuPacote.sessoes_usadas}/{pacote.total_sessoes} sessões
                            </span>
                          </div>
                          <Progress value={progresso} className="h-2" />
                        </div>
                        <Button
                          className="w-full"
                          variant={meuPacote.status === 'ativo' ? 'default' : 'outline'}
                          onClick={() => navigate("/agendamento")}
                        >
                          Agendar Sessão
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            )}
          </motion.div>
        )}

        {/* Loja de Pacotes */}
        {activeTab === "loja" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {loadingPacotes ? (
              <PacotesListSkeleton />
            ) : pacotes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum pacote disponível no momento.</p>
              </div>
            ) : (
              pacotes.map((pacote) => {
                const desconto = pacote.preco_original
                  ? Math.round(((pacote.preco_original - pacote.preco) / pacote.preco_original) * 100)
                  : 0;

                return (
                  <Card
                    key={pacote.id}
                    className="overflow-hidden hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {pacote.nome}
                            </h3>
                            {desconto > 0 && (
                              <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                                -{desconto}%
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {pacote.descricao}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {pacote.total_sessoes} sessões • Válido por {pacote.validade_dias} dias
                          </p>
                        </div>
                        <Sparkles className="text-primary" size={20} />
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          {pacote.preco_original && (
                            <p className="text-xs text-muted-foreground line-through">
                              R$ {pacote.preco_original.toFixed(2).replace(".", ",")}
                            </p>
                          )}
                          <p className="text-xl font-bold text-primary">
                            R$ {pacote.preco.toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                        <Button 
                          onClick={() => handleOpenConfirm(pacote)}
                          disabled={comprando === pacote.id}
                        >
                          {comprando === pacote.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Comprar"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Check className="text-primary" size={20} />
                <p className="text-sm text-foreground">
                  Pacotes geram <strong>cashback extra</strong> de até 10%!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Confirm Purchase Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ open, pacote: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar compra</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja comprar o pacote <strong>{confirmDialog.pacote?.nome}</strong> por{" "}
              <strong>R$ {confirmDialog.pacote?.preco.toFixed(2).replace(".", ",")}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleComprar}>
              Confirmar compra
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNavigation />
    </div>
  );
};

export default Pacotes;
