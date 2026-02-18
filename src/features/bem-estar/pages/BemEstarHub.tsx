import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Heart, Activity, Brain, BookHeart, MessageCircle,
  BarChart3, TrendingUp, ArrowRight, Sparkles, Moon, Droplets, Flame, Trophy, LineChart, FileText
} from "lucide-react";
import WellnessAchievements from "@/features/bem-estar/components/WellnessAchievements";
import WeeklyComparison from "@/features/bem-estar/components/WeeklyComparison";
import WellnessInsight from "@/features/bem-estar/components/WellnessInsight";
import WellnessShareCard from "@/features/bem-estar/components/WellnessShareCard";
import WellnessCorrelations from "@/features/bem-estar/components/WellnessCorrelations";
import WellnessOnboarding from "@/features/bem-estar/components/WellnessOnboarding";
import WellnessScore from "@/features/bem-estar/components/WellnessScore";
import WellnessCalendar from "@/features/bem-estar/components/WellnessCalendar";
import WellnessMoodTrends from "@/features/bem-estar/components/WellnessMoodTrends";
import WellnessDailyHabits from "@/features/bem-estar/components/WellnessDailyHabits";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 26 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const moodEmojis = ["", "😢", "😕", "😐", "😊", "😄"];

const BemEstarHub = () => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const { data: streakData } = useQuery({
    queryKey: ["wellness-streak", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_streaks")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-today-hub", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("wellness_checkins")
        .select("*")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const { data: weekStats } = useQuery({
    queryKey: ["wellness-week-hub", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
      const { data } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, sono_qualidade, estresse, agua_litros")
        .eq("user_id", user!.id)
        .gte("data", weekAgo);
      if (!data || data.length === 0) return null;
      const avg = (arr: number[]) => arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0;
      return {
        dias: data.length,
        humor: avg(data.map(d => d.humor)),
        energia: avg(data.map(d => d.energia)),
        sono: avg(data.map(d => d.sono_horas).filter(Boolean) as number[]),
        stress: avg(data.map(d => d.estresse).filter(Boolean) as number[]),
        agua: avg(data.map(d => d.agua_litros).filter(Boolean) as number[]),
      };
    },
  });

  const { data: userBadges = [] } = useQuery({
    queryKey: ["wellness-badges-hub", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_conquistas_usuario")
        .select("conquista_id, wellness_conquistas(icone, titulo)")
        .eq("user_id", user!.id);
      return (data || []).map((d: any) => ({
        icone: d.wellness_conquistas?.icone || "🏆",
        titulo: d.wellness_conquistas?.titulo || "",
      }));
    },
  });

  const { data: hasMetas } = useQuery({
    queryKey: ["wellness-has-metas", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_metas")
        .select("id")
        .eq("user_id", user!.id)
        .maybeSingle();
      return !!data;
    },
  });

  const isNewUser = hasMetas === false && !streakData && !onboardingDismissed;

  const features = [
    {
      icon: Activity,
      label: "Tracker Diário",
      desc: "Registre humor, sono, energia e mais",
      path: "/wellness-tracker",
      color: "bg-primary/15",
      iconColor: "text-primary",
    },
    {
      icon: BarChart3,
      label: "Análise de Progresso",
      desc: "Score de saúde e tendências com IA",
      path: "/analise-progresso",
      color: "bg-accent/15",
      iconColor: "text-accent",
    },
    {
      icon: BookHeart,
      label: "Diário de Humor",
      desc: "Journaling com reflexão de IA",
      path: "/diario-humor",
      color: "bg-highlight/15",
      iconColor: "text-highlight",
    },
    {
      icon: Brain,
      label: "Plano Inteligente",
      desc: "Plano semanal personalizado com IA",
      path: "/bem-estar",
      color: "bg-primary/15",
      iconColor: "text-primary",
    },
    {
      icon: MessageCircle,
      label: "Aria — Assistente IA",
      desc: "Converse sobre saúde e bem-estar",
      path: "/assistente-saude",
      color: "bg-accent/15",
      iconColor: "text-accent",
    },
    {
      icon: TrendingUp,
      label: "Minhas Metas",
      desc: "Defina objetivos diários de bem-estar",
      path: "/metas-wellness",
      color: "bg-highlight/15",
      iconColor: "text-highlight",
    },
    {
      icon: LineChart,
      label: "Evolução Visual",
      desc: "Gráficos de tendências ao longo do tempo",
      path: "/evolucao-wellness",
      color: "bg-primary/15",
      iconColor: "text-primary",
    },
    {
      icon: FileText,
      label: "Relatório PDF",
      desc: "Exporte seus dados para compartilhar",
      path: "/relatorio-wellness",
      color: "bg-accent/15",
      iconColor: "text-accent",
    },
  ];

  return (
    <AppLayout>
      {isNewUser && (
        <WellnessOnboarding onComplete={() => setOnboardingDismissed(true)} />
      )}
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-2xl mx-auto px-4 pt-6 safe-top">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Heart size={22} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-serif">Bem-Estar</h1>
                <p className="text-xs text-muted-foreground">Seu centro de saúde e autocuidado</p>
              </div>
            </div>
          </motion.div>

          {/* Streak Banner */}
          {streakData && streakData.streak_atual > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
              <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-highlight/10 border border-primary/20 p-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Flame size={28} className="text-primary" />
                  <span className="text-3xl font-black text-foreground">{streakData.streak_atual}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">
                    {streakData.streak_atual === 1 ? "dia de streak!" : "dias de streak!"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Recorde: {streakData.melhor_streak} dias • {streakData.total_checkins} check-ins total
                    {streakData.bonus_total_creditado > 0 && ` • ℜ ${Number(streakData.bonus_total_creditado).toFixed(2)} ganhos`}
                  </p>
                </div>
                {streakData.streak_atual >= 7 && <Trophy size={20} className="text-highlight" />}
                <WellnessShareCard
                  streakAtual={streakData.streak_atual}
                  melhorStreak={streakData.melhor_streak}
                  totalCheckins={streakData.total_checkins}
                  conquistas={userBadges}
                  weekStats={weekStats ? { humor: weekStats.humor, energia: weekStats.energia, sono: weekStats.sono, agua: weekStats.agua } : undefined}
                />
              </div>
            </motion.div>
          )}

          {/* AI Insight */}
          <WellnessInsight />

          {/* Daily Habits */}
          <WellnessDailyHabits />

          {/* Today's status */}
          {todayCheckin ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-muted-foreground">Seu check-in de hoje</p>
                  <Link to="/wellness-tracker" className="text-xs text-primary font-medium flex items-center gap-1">
                    Editar <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <WellnessScore
                    humor={todayCheckin.humor}
                    energia={todayCheckin.energia}
                    sonoHoras={todayCheckin.sono_horas}
                    aguaLitros={todayCheckin.agua_litros}
                    estresse={todayCheckin.estresse}
                    exercicioMin={todayCheckin.exercicio_min}
                    dor={todayCheckin.dor}
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">{moodEmojis[todayCheckin.humor] || "😐"} Humor {todayCheckin.humor}/5</span>
                      <span className="flex items-center gap-1"><TrendingUp size={12} className="text-primary" /> Energia {todayCheckin.energia}/5</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Moon size={12} className="text-accent" /> {todayCheckin.sono_horas || "—"}h sono</span>
                      <span className="flex items-center gap-1"><Droplets size={12} className="text-accent" /> {todayCheckin.agua_litros || 0}L</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Sparkles size={12} className="text-highlight" /> Stress {todayCheckin.estresse || 0}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Link
                to="/wellness-tracker"
                className="block rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 text-center hover:bg-primary/10 transition-colors"
              >
                <Sparkles size={24} className="text-primary mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">Faça seu check-in de hoje</p>
                <p className="text-xs text-muted-foreground mt-0.5">Registre como você está se sentindo agora</p>
              </Link>
            </motion.div>
          )}

          {/* Week Stats */}
          {weekStats && weekStats.dias >= 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
              <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Média da semana ({weekStats.dias} dias)</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Humor", value: weekStats.humor, max: 5, icon: "😊" },
                  { label: "Energia", value: weekStats.energia, max: 5, icon: "⚡" },
                  { label: "Sono", value: `${weekStats.sono}h`, max: null, icon: "🌙" },
                  { label: "Água", value: weekStats.agua, max: null, icon: "💧" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card rounded-xl p-3 text-center">
                    <span className="text-lg">{stat.icon}</span>
                    <p className="text-sm font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Mood Trends Sparkline */}
          <WellnessMoodTrends />

          {/* Check-in Calendar */}
          <WellnessCalendar />

          {/* Weekly Comparison */}
          <WeeklyComparison />

          {/* Correlations */}
          <WellnessCorrelations />

          {/* Achievements */}
          <WellnessAchievements />

          {/* Features Grid */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground px-1">Funcionalidades</p>
            {features.map((feature) => (
              <motion.div key={feature.path} variants={fadeUp}>
                <Link
                  to={feature.path}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card hover:shadow-elevated transition-all group"
                >
                  <div className={`p-3 rounded-xl ${feature.color}`}>
                    <feature.icon size={22} className={feature.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BemEstarHub;
