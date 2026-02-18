import { useState } from "react";
import { motion } from "framer-motion";
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
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
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
            <TabsList className="grid w-full grid-cols-3">
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
                <div className="text-center py-12 glass-card rounded-2xl">
                  <FlaskConical className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhuma receita disponível</p>
                </div>
              ) : (
                receitas.map((r) => (
                  <ReceitaAlquimiaCard
                    key={r.id}
                    receita={r}
                    podeExecutar={podeExecutarReceita(r)}
                    executando={executandoAlquimia}
                    onExecutar={() => handleAlquimia(r.id)}
                    getSaldo={getSaldo}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="recompensas" className="mt-4 space-y-3">
              {recompensas.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl">
                  <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhuma recompensa disponível</p>
                </div>
              ) : (
                recompensas.map((r) => (
                  <RecompensaCromoCard
                    key={r.id}
                    recompensa={r}
                    podeResgatar={podeResgatar(r)}
                    resgatando={resgatando}
                    onResgatar={() => handleResgate(r.id)}
                    getSaldo={getSaldo}
                  />
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
