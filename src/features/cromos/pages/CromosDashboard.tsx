import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, FlaskConical, Gift, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppLayout } from "@/components/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { useCromos } from "../hooks/useCromos";
import { CromosSaldoCards } from "../components/CromosSaldoCards";
import { ReceitaAlquimiaCard } from "../components/ReceitaAlquimiaCard";
import { RecompensaCromoCard } from "../components/RecompensaCromoCard";
import { CromosHistorico } from "../components/CromosHistorico";

export default function CromosDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("cromos");

  const {
    saldos,
    historico,
    receitas,
    recompensas,
    loading,
    loadingHistorico,
    getSaldo,
    totalCromos,
    nivel,
    podeExecutarReceita,
    podeResgatar,
    executarAlquimia,
    executandoAlquimia,
    resgatarRecompensa,
    resgatando,
  } = useCromos();

  const handleAlquimia = async (receitaId: string) => {
    try {
      const result = await executarAlquimia(receitaId);
      const parsed = typeof result === "string" ? JSON.parse(result) : result;
      toast({
        title: "Alquimia realizada! ⚗️✨",
        description: parsed?.recompensa || "Elementos combinados com sucesso!",
      });
    } catch (err: unknown) {
      toast({
        title: "Erro na alquimia",
        description: (err as Error).message || "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleResgate = async (recompensaId: string) => {
    try {
      const result = await resgatarRecompensa(recompensaId);
      const parsed = typeof result === "string" ? JSON.parse(result) : result;
      toast({
        title: "Resgate realizado! 🎁",
        description: parsed?.recompensa || "Recompensa resgatada com sucesso!",
      });
    } catch (err: unknown) {
      toast({
        title: "Erro no resgate",
        description: (err as Error).message || "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-32 lg:pb-8">
        {/* Header */}
        <div className="px-4 py-4 safe-top">
          <div className="max-w-lg lg:max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Cromos do Bem-Estar</h1>
              <p className="text-xs text-muted-foreground">Colete elementos, combine alquimias</p>
            </div>
            <Sparkles size={22} className="text-primary" />
          </div>
        </div>

        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 space-y-5">
          {/* Saldos */}
          <CromosSaldoCards saldos={saldos} totalCromos={totalCromos} nivel={nivel} />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 h-11">
              <TabsTrigger value="cromos" className="gap-1">
                <FlaskConical size={14} />
                Alquimia
              </TabsTrigger>
              <TabsTrigger value="recompensas" className="gap-1">
                <Gift size={14} />
                Resgatar
              </TabsTrigger>
              <TabsTrigger value="historico" className="gap-1">
                <History size={14} />
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cromos" className="mt-4 space-y-3">
              {receitas.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 glass-card rounded-2xl"
                >
                  <FlaskConical className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">Nenhuma receita disponível</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Colete mais elementos para desbloquear</p>
                </motion.div>
              ) : (
                receitas.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ReceitaAlquimiaCard
                      receita={r}
                      podeExecutar={podeExecutarReceita(r)}
                      executando={executandoAlquimia}
                      onExecutar={() => handleAlquimia(r.id)}
                      getSaldo={getSaldo}
                    />
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="recompensas" className="mt-4 space-y-3">
              {recompensas.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 glass-card rounded-2xl"
                >
                  <Gift className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">Nenhuma recompensa disponível</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Continue combinando alquimias!</p>
                </motion.div>
              ) : (
                recompensas.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <RecompensaCromoCard
                      recompensa={r}
                      podeResgatar={podeResgatar(r)}
                      resgatando={resgatando}
                      onResgatar={() => handleResgate(r.id)}
                      getSaldo={getSaldo}
                    />
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="historico" className="mt-4">
              <CromosHistorico historico={historico} loading={loadingHistorico} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
