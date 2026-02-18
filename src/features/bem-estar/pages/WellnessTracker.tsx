import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Smile, Zap, Moon, Droplets, Activity, Brain, Check, TrendingUp, BarChart3, Target } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWellnessTracker, type WellnessCheckinInput } from "@/features/bem-estar/hooks/useWellnessTracker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MOODS = [
  { value: 1, emoji: "😢", label: "Péssimo" },
  { value: 2, emoji: "😕", label: "Ruim" },
  { value: 3, emoji: "😐", label: "Ok" },
  { value: 4, emoji: "😊", label: "Bom" },
  { value: 5, emoji: "😄", label: "Ótimo" },
];

interface GoalResult {
  label: string;
  met: boolean;
  icon: string;
  detail: string;
}

const GoalsFeedback = ({ results }: { results: GoalResult[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10 }}
    className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4 space-y-2"
  >
    <div className="flex items-center gap-2 mb-1">
      <Target size={16} className="text-primary" />
      <span className="text-sm font-semibold text-foreground">Progresso das Metas</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {results.map((r) => (
        <div
          key={r.label}
          className={`flex items-center gap-2 p-2.5 rounded-xl text-xs ${
            r.met ? "bg-primary/10" : "bg-muted/50"
          }`}
        >
          <span className="text-base">{r.icon}</span>
          <div className="flex-1 min-w-0">
            <p className={`font-medium truncate ${r.met ? "text-primary" : "text-muted-foreground"}`}>
              {r.label}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">{r.detail}</p>
          </div>
          {r.met && <Check size={14} className="text-primary shrink-0" />}
        </div>
      ))}
    </div>
    {results.every(r => r.met) && (
      <p className="text-xs text-center text-primary font-medium pt-1">
        🎯 Todas as metas atingidas hoje! Incrível! 🎉
      </p>
    )}
  </motion.div>
);

const WellnessTracker = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { todayCheckin, history, loadingToday, saveCheckin, averages } = useWellnessTracker();

  const [humor, setHumor] = useState(todayCheckin?.humor || 3);
  const [energia, setEnergia] = useState(todayCheckin?.energia || 3);
  const [sonoHoras, setSonoHoras] = useState(todayCheckin?.sono_horas || 7);
  const [sonoQual, setSonoQual] = useState(todayCheckin?.sono_qualidade || 3);
  const [dor, setDor] = useState(todayCheckin?.dor || 0);
  const [estresse, setEstresse] = useState(todayCheckin?.estresse || 3);
  const [agua, setAgua] = useState(todayCheckin?.agua_litros || 1.5);
  const [exercicio, setExercicio] = useState(todayCheckin?.exercicio_min || 0);
  const [showGoalsFeedback, setShowGoalsFeedback] = useState(false);

  const { data: metas } = useQuery({
    queryKey: ["wellness-metas-tracker", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_metas")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  // Sync state when todayCheckin loads
  useEffect(() => {
    if (todayCheckin) {
      setHumor(todayCheckin.humor);
      setEnergia(todayCheckin.energia);
      setSonoHoras(todayCheckin.sono_horas || 7);
      setSonoQual(todayCheckin.sono_qualidade || 3);
      setDor(todayCheckin.dor);
      setEstresse(todayCheckin.estresse || 3);
      setAgua(todayCheckin.agua_litros || 1.5);
      setExercicio(todayCheckin.exercicio_min);
    }
  }, [todayCheckin]);

  const getGoalResults = (): GoalResult[] => {
    if (!metas) return [];
    const results: GoalResult[] = [];

    if (metas.meta_agua_litros) {
      results.push({
        label: "Água",
        met: agua >= metas.meta_agua_litros,
        icon: "💧",
        detail: `${agua}L / ${metas.meta_agua_litros}L`,
      });
    }
    if (metas.meta_sono_horas) {
      results.push({
        label: "Sono",
        met: (sonoHoras || 0) >= metas.meta_sono_horas,
        icon: "🌙",
        detail: `${sonoHoras}h / ${metas.meta_sono_horas}h`,
      });
    }
    if (metas.meta_energia_min) {
      results.push({
        label: "Energia",
        met: energia >= metas.meta_energia_min,
        icon: "⚡",
        detail: `${energia}/5 (meta: ≥${metas.meta_energia_min})`,
      });
    }
    if (metas.meta_humor_min) {
      results.push({
        label: "Humor",
        met: humor >= metas.meta_humor_min,
        icon: "😊",
        detail: `${humor}/5 (meta: ≥${metas.meta_humor_min})`,
      });
    }
    if (metas.meta_estresse_max) {
      results.push({
        label: "Estresse",
        met: (estresse || 5) <= metas.meta_estresse_max,
        icon: "🧘",
        detail: `${estresse}/5 (meta: ≤${metas.meta_estresse_max})`,
      });
    }
    return results;
  };

  const handleSave = () => {
    const input: WellnessCheckinInput = {
      data: format(new Date(), "yyyy-MM-dd"),
      humor,
      energia,
      sono_horas: sonoHoras,
      sono_qualidade: sonoQual,
      dor,
      dor_local: null,
      estresse,
      agua_litros: agua,
      exercicio_min: exercicio,
      observacoes: null,
    };
    saveCheckin.mutate(input, {
      onSuccess: () => {
        if (metas) setShowGoalsFeedback(true);
      },
    });
  };

  if (loadingToday) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-24">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </AppLayout>
    );
  }

  const goalResults = getGoalResults();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Tracker de Bem-Estar</h1>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
            </p>
          </div>
        </div>

        {todayCheckin && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary text-sm">
            <Check size={16} />
            <span className="font-medium">Check-in de hoje já registrado! Atualize se desejar.</span>
          </div>
        )}

        {/* Goals Feedback */}
        <AnimatePresence>
          {showGoalsFeedback && goalResults.length > 0 && (
            <GoalsFeedback results={goalResults} />
          )}
        </AnimatePresence>

        {/* Mood */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Smile size={18} className="text-primary" />
              <span className="font-semibold text-sm text-foreground">Como você está?</span>
            </div>
            <div className="flex justify-between gap-1">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setHumor(m.value)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                    humor === m.value
                      ? "bg-primary/15 scale-105 shadow-sm"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-[10px] text-muted-foreground">{m.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Energy & Stress */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">Energia</span>
                </div>
                <span className="text-sm font-bold text-foreground">{energia}/5</span>
              </div>
              <Slider value={[energia]} onValueChange={([v]) => setEnergia(v)} min={1} max={5} step={1} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain size={16} className="text-destructive" />
                  <span className="text-sm font-medium text-foreground">Estresse</span>
                </div>
                <span className="text-sm font-bold text-foreground">{estresse}/5</span>
              </div>
              <Slider value={[estresse]} onValueChange={([v]) => setEstresse(v)} min={1} max={5} step={1} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Dor</span>
                </div>
                <span className="text-sm font-bold text-foreground">{dor}/10</span>
              </div>
              <Slider value={[dor]} onValueChange={([v]) => setDor(v)} min={0} max={10} step={1} />
            </div>
          </CardContent>
        </Card>

        {/* Sleep & Habits */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Sono</span>
                </div>
                <span className="text-sm font-bold text-foreground">{sonoHoras}h</span>
              </div>
              <Slider value={[sonoHoras as number]} onValueChange={([v]) => setSonoHoras(v)} min={3} max={12} step={0.5} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Água</span>
                </div>
                <span className="text-sm font-bold text-foreground">{agua}L</span>
              </div>
              <Slider value={[agua as number]} onValueChange={([v]) => setAgua(v)} min={0} max={5} step={0.25} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-highlight" />
                  <span className="text-sm font-medium text-foreground">Exercício</span>
                </div>
                <span className="text-sm font-bold text-foreground">{exercicio}min</span>
              </div>
              <Slider value={[exercicio]} onValueChange={([v]) => setExercicio(v)} min={0} max={120} step={5} />
            </div>
          </CardContent>
        </Card>

        {/* Weekly Averages */}
        {history.length > 1 && (
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-primary" />
                <span className="font-semibold text-sm text-foreground">Média dos últimos 7 dias</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {averages.humor && (
                  <div className="text-center p-2 rounded-xl bg-muted/50">
                    <span className="text-lg">{MOODS[Math.round(averages.humor) - 1]?.emoji}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Humor</p>
                  </div>
                )}
                {averages.energia && (
                  <div className="text-center p-2 rounded-xl bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{averages.energia}</p>
                    <p className="text-[10px] text-muted-foreground">Energia</p>
                  </div>
                )}
                {averages.sono_horas && (
                  <div className="text-center p-2 rounded-xl bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{averages.sono_horas}h</p>
                    <p className="text-[10px] text-muted-foreground">Sono</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button - Sticky */}
        <div className="sticky bottom-24 lg:bottom-4 z-20 space-y-2 bg-gradient-to-t from-background via-background to-transparent pt-4 -mx-4 px-4">
          <Button
            onClick={handleSave}
            disabled={saveCheckin.isPending}
            className="w-full shadow-elevated"
            size="lg"
          >
            {saveCheckin.isPending ? "Salvando..." : todayCheckin ? "Atualizar check-in" : "✨ Salvar check-in de hoje"}
          </Button>

          <Link to="/analise-progresso">
            <Button variant="outline" className="w-full gap-2" size="lg">
              <BarChart3 size={18} />
              Ver Análise de Progresso com IA
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default WellnessTracker;
