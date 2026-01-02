import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Package, Check, Clock, Sparkles, Loader2 } from "lucide-react";
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
          <h1 className="text-xl font-semibold text-foreground">Pacotes</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "meus" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setActiveTab("meus")}
          >
            Meus Pacotes
          </Button>
          <Button
            variant={activeTab === "loja" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setActiveTab("loja")}
          >
            Comprar Pacotes
          </Button>
        </div>

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
                    Você ainda não possui pacotes ativos.
                  </p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setActiveTab("loja")}
                  >
                    Explorar pacotes disponíveis
                  </Button>
                </CardContent>
              </Card>
            ) : (
              meusPacotes.map((meuPacote) => {
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
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
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
                        onClick={() => navigate("/agendamento")}
                      >
                        Agendar Sessão
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
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
