import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, Target, Calendar, TrendingUp, Lightbulb, Heart, Loader2, RefreshCw } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { usePlanoBemEstar, PlanoBemEstar, ObjetivoBemEstar, DiaSemanal } from "../hooks/usePlanoBemEstar";
import { useInsightsSaude } from "../hooks/useInsightsSaude";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const prioridadeCor = { alta: "text-red-500", media: "text-amber-500", baixa: "text-emerald-500" };
const prioridadeLabel = { alta: "Alta", media: "Média", baixa: "Baixa" };
const tendenciaCor = { positiva: "bg-emerald-500/10 text-emerald-600", neutra: "bg-muted text-muted-foreground", atencao: "bg-amber-500/10 text-amber-600" };
const tipoEmoji: Record<string, string> = { servico: "💆", exercicio: "🏃", alimentacao: "🥗", habito: "🧘", descanso: "😴" };
const categoriaEmoji: Record<string, string> = { corpo: "🏋️", tratamentos: "💆", alimentacao: "🥗", habitos: "🧘", mental: "🧠" };

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };

const PlanoBemEstarPage = () => {
  const { plano, loading: loadingPlano, gerarPlano } = usePlanoBemEstar();
  const { data: insights, loading: loadingInsights, gerarInsights } = useInsightsSaude();
  const [activeTab, setActiveTab] = useState("plano");

  const handleGerar = () => {
    gerarPlano();
    gerarInsights();
  };

  const hasData = plano || insights;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24 lg:pb-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Brain size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Bem-Estar Inteligente</h1>
              <p className="text-xs text-muted-foreground">Plano personalizado e insights com IA</p>
            </div>
          </div>
        </motion.div>

        {!hasData ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles size={36} className="text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Seu Plano de Bem-Estar com IA</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
              Nossa IA analisa seu perfil completo — ficha nutricional, histórico de sessões, protocolos e avaliações — para criar um plano personalizado.
            </p>
            <Button onClick={handleGerar} disabled={loadingPlano || loadingInsights} size="lg" className="rounded-2xl px-8">
              {loadingPlano || loadingInsights ? <Loader2 className="animate-spin mr-2" size={18} /> : <Sparkles className="mr-2" size={18} />}
              Gerar Meu Plano
            </Button>
          </motion.div>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="plano" className="text-xs">Plano</TabsTrigger>
                  <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
                  <TabsTrigger value="semana" className="text-xs">Semana</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" onClick={handleGerar} disabled={loadingPlano || loadingInsights}>
                  <RefreshCw size={14} className={loadingPlano || loadingInsights ? "animate-spin" : ""} />
                </Button>
              </div>

              {/* TAB: Plano */}
              <TabsContent value="plano">
                {loadingPlano ? <LoadingSkeleton /> : plano ? <PlanoTab plano={plano} /> : null}
              </TabsContent>

              {/* TAB: Insights */}
              <TabsContent value="insights">
                {loadingInsights ? <LoadingSkeleton /> : insights ? <InsightsTab data={insights} /> : null}
              </TabsContent>

              {/* TAB: Semana */}
              <TabsContent value="semana">
                {loadingPlano ? <LoadingSkeleton /> : plano ? <SemanaTab dias={plano.plano_semanal} /> : null}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

const PlanoTab = ({ plano }: { plano: PlanoBemEstar }) => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
    {/* Mensagem motivacional */}
    <motion.div variants={fadeUp} className="p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
      <p className="text-sm text-foreground italic">"{plano.mensagem_motivacional}"</p>
    </motion.div>

    {/* Diagnóstico */}
    <motion.div variants={fadeUp} className="glass-card rounded-2xl p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Heart size={16} className="text-primary" />
        <h3 className="font-semibold text-sm text-foreground">Diagnóstico</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{plano.diagnostico}</p>
    </motion.div>

    {/* Objetivos */}
    <motion.div variants={fadeUp} className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <Target size={14} className="text-primary" />
        <p className="section-label">Objetivos</p>
      </div>
      <div className="space-y-2">
        {plano.objetivos.map((obj, i) => (
          <ObjetivoCard key={i} objetivo={obj} />
        ))}
      </div>
    </motion.div>

    {/* Métricas */}
    {plano.metricas.length > 0 && (
      <motion.div variants={fadeUp} className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <TrendingUp size={14} className="text-primary" />
          <p className="section-label">Métricas para Acompanhar</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {plano.metricas.map((m, i) => (
            <div key={i} className="glass-card rounded-xl p-3">
              <p className="text-[11px] text-muted-foreground">{m.nome}</p>
              <p className="text-sm font-bold text-foreground">{m.valor_atual || "—"} → {m.meta}{m.unidade ? ` ${m.unidade}` : ""}</p>
            </div>
          ))}
        </div>
      </motion.div>
    )}

    {/* Dicas */}
    {plano.dicas.length > 0 && (
      <motion.div variants={fadeUp} className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Lightbulb size={14} className="text-primary" />
          <p className="section-label">Dicas Personalizadas</p>
        </div>
        <div className="space-y-1.5">
          {plano.dicas.map((d, i) => (
            <div key={i} className="flex items-start gap-2 p-3 glass-card rounded-xl">
              <span className="text-primary text-xs mt-0.5">✦</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </motion.div>
);

const ObjetivoCard = ({ objetivo }: { objetivo: ObjetivoBemEstar }) => (
  <div className="glass-card rounded-xl p-3 flex items-start gap-3">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-0.5">
        <h4 className="text-sm font-semibold text-foreground">{objetivo.titulo}</h4>
        <span className={`text-[10px] font-medium ${prioridadeCor[objetivo.prioridade]}`}>
          {prioridadeLabel[objetivo.prioridade]}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{objetivo.descricao}</p>
    </div>
    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{objetivo.prazo_semanas}sem</span>
  </div>
);

const InsightsTab = ({ data }: { data: any }) => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
    {/* Score */}
    <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 text-center">
      <p className="text-xs text-muted-foreground mb-2">Pontuação de Bem-Estar</p>
      <div className="text-4xl font-black text-primary mb-2">{data.pontuacao_bem_estar}</div>
      <Progress value={data.pontuacao_bem_estar} className="h-2 max-w-xs mx-auto" />
      <p className="text-xs text-muted-foreground mt-3">{data.resumo}</p>
    </motion.div>

    {/* Alertas */}
    {data.alertas && data.alertas.length > 0 && (
      <motion.div variants={fadeUp} className="space-y-1.5">
        {data.alertas.map((a: string, i: number) => (
          <div key={i} className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive">
            ⚠️ {a}
          </div>
        ))}
      </motion.div>
    )}

    {/* Insights */}
    <motion.div variants={fadeUp} className="space-y-2">
      {data.insights?.map((insight: any, i: number) => (
        <div key={i} className="glass-card rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{categoriaEmoji[insight.categoria] || "📊"}</span>
            <h4 className="text-sm font-semibold text-foreground flex-1">{insight.titulo}</h4>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tendenciaCor[insight.tendencia as keyof typeof tendenciaCor]}`}>
              {insight.tendencia === "positiva" ? "↗ Positiva" : insight.tendencia === "atencao" ? "⚡ Atenção" : "→ Neutra"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{insight.descricao}</p>
        </div>
      ))}
    </motion.div>

    {/* Próximos Passos */}
    {data.proximos_passos?.length > 0 && (
      <motion.div variants={fadeUp} className="space-y-2">
        <p className="section-label px-1">Próximos Passos</p>
        {data.proximos_passos.map((p: string, i: number) => (
          <div key={i} className="flex items-start gap-2 p-3 glass-card rounded-xl">
            <span className="text-primary font-bold text-xs">{i + 1}.</span>
            <p className="text-xs text-muted-foreground">{p}</p>
          </div>
        ))}
      </motion.div>
    )}
  </motion.div>
);

const SemanaTab = ({ dias }: { dias: DiaSemanal[] }) => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
    {dias.map((dia, i) => (
      <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={14} className="text-primary" />
          <h3 className="font-semibold text-sm text-foreground">{dia.dia}</h3>
        </div>
        <div className="space-y-1.5">
          {dia.atividades.map((at, j) => (
            <div key={j} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
              <span className="text-sm">{tipoEmoji[at.tipo] || "📋"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{at.titulo}</p>
                <p className="text-[11px] text-muted-foreground">{at.descricao}</p>
              </div>
              {at.duracao_min && <span className="text-[10px] text-muted-foreground whitespace-nowrap">{at.duracao_min}min</span>}
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map(i => (
      <div key={i} className="h-24 rounded-2xl bg-muted/50" />
    ))}
  </div>
);

export default PlanoBemEstarPage;
