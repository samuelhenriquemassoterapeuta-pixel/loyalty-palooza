import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Target, Sparkles, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnaliseProgresso, type ProgressTrend, type ProgressRecommendation } from "@/features/bem-estar/hooks/useAnaliseProgresso";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const CATEGORY_LABELS: Record<string, string> = {
  humor: "Humor",
  energia: "Energia",
  sono: "Sono",
  dor: "Dor",
  estresse: "Estresse",
  exercicio: "Exercício",
  agua: "Água",
};

const TrendIcon = ({ direction }: { direction: string }) => {
  if (direction === "up") return <TrendingUp className="w-4 h-4 text-emerald-500" />;
  if (direction === "down") return <TrendingDown className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: Record<string, string> = {
    high: "bg-destructive/15 text-destructive",
    medium: "bg-warning/15 text-warning",
    low: "bg-primary/15 text-primary",
  };
  const labels: Record<string, string> = { high: "Alta", medium: "Média", low: "Baixa" };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${colors[priority] || colors.low}`}>
      {labels[priority] || priority}
    </span>
  );
};

const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const color = score >= 75 ? "text-emerald-500" : score >= 50 ? "text-warning" : "text-destructive";
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
          <circle
            cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8"
            strokeDasharray={`${(score / 100) * 264} 264`}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${color}`}>{score}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

const AnaliseProgresso = () => {
  const navigate = useNavigate();
  const { data: analysis, isLoading, refetch, isFetching } = useAnaliseProgresso();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-24">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Análise de Progresso</h1>
              <p className="text-xs text-muted-foreground">Powered by IA</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />
          </Button>
        </div>

        {!analysis || analysis.score === null ? (
          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <AlertTriangle className="mx-auto text-warning" size={32} />
              <p className="text-sm text-muted-foreground">
                {analysis?.summary || "Registre pelo menos 3 dias de check-in para gerar sua análise."}
              </p>
              <Button onClick={() => navigate("/wellness-tracker")} size="sm">
                Fazer Check-in
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Score */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Card>
                <CardContent className="p-5 flex flex-col items-center gap-3">
                  <ScoreRing score={analysis.score} label={analysis.score_label} />
                  <p className="text-sm text-center text-muted-foreground max-w-xs">{analysis.summary}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trends */}
            {analysis.trends.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-primary" />
                      <span className="font-semibold text-sm text-foreground">Tendências</span>
                    </div>
                    <div className="space-y-2">
                      {analysis.trends.map((t: ProgressTrend, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40">
                          <TrendIcon direction={t.direction} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground">
                              {CATEGORY_LABELS[t.category] || t.category}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">{t.description}</p>
                          </div>
                          {t.percentage !== undefined && (
                            <span className={`text-xs font-bold ${t.direction === "up" ? "text-emerald-500" : t.direction === "down" ? "text-destructive" : "text-muted-foreground"}`}>
                              {t.direction === "up" ? "+" : t.direction === "down" ? "-" : ""}{Math.abs(t.percentage)}%
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Weekly Comparison */}
            {analysis.weekly_comparison && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Target size={16} className="text-primary" />
                      <span className="font-semibold text-sm text-foreground">Comparação Semanal</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-muted/40 text-center">
                        <p className="text-xs text-muted-foreground">Humor</p>
                        <p className="text-lg font-bold text-foreground">
                          {analysis.weekly_comparison.this_week_avg_humor?.toFixed(1) || "—"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          vs {analysis.weekly_comparison.last_week_avg_humor?.toFixed(1) || "—"} semana passada
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/40 text-center">
                        <p className="text-xs text-muted-foreground">Energia</p>
                        <p className="text-lg font-bold text-foreground">
                          {analysis.weekly_comparison.this_week_avg_energia?.toFixed(1) || "—"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          vs {analysis.weekly_comparison.last_week_avg_energia?.toFixed(1) || "—"} semana passada
                        </p>
                      </div>
                    </div>
                    {analysis.weekly_comparison.strength_areas?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.weekly_comparison.strength_areas.map((area, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-medium flex items-center gap-1">
                            <CheckCircle2 size={10} /> {area}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Recommendations */}
            {analysis.recommendations.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-primary" />
                      <span className="font-semibold text-sm text-foreground">Recomendações da IA</span>
                    </div>
                    <div className="space-y-2">
                      {analysis.recommendations.map((r: ProgressRecommendation, i: number) => (
                        <div key={i} className="p-3 rounded-xl bg-muted/40 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">
                              {r.icon} {r.title}
                            </span>
                            <PriorityBadge priority={r.priority} />
                          </div>
                          <p className="text-xs text-muted-foreground">{r.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default AnaliseProgresso;
