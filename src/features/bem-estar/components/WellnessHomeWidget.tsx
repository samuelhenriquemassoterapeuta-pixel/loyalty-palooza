import { motion } from "framer-motion";
import { Sparkles, Heart, MessageCircle, ArrowRight, Flame, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWellnessTracker } from "@/features/bem-estar/hooks/useWellnessTracker";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MOODS = ["", "😢", "😕", "😐", "😊", "😄"];

export const WellnessHomeWidget = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { todayCheckin, averages } = useWellnessTracker();

  const { data: streakData } = useQuery({
    queryKey: ["wellness-streak-widget", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_streaks")
        .select("streak_atual, melhor_streak")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const { data: metas } = useQuery({
    queryKey: ["wellness-metas-widget", user?.id],
    enabled: !!user && !!todayCheckin,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_metas")
        .select("meta_agua_litros, meta_sono_horas, meta_energia_min")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  // Calculate goal completion percentage
  const goalProgress = (() => {
    if (!todayCheckin || !metas) return null;
    let met = 0;
    let total = 0;
    if (metas.meta_agua_litros && todayCheckin.agua_litros) {
      total++;
      if (todayCheckin.agua_litros >= metas.meta_agua_litros) met++;
    }
    if (metas.meta_sono_horas && todayCheckin.sono_horas) {
      total++;
      if (todayCheckin.sono_horas >= metas.meta_sono_horas) met++;
    }
    if (metas.meta_energia_min) {
      total++;
      if (todayCheckin.energia >= metas.meta_energia_min) met++;
    }
    return total > 0 ? { met, total, pct: Math.round((met / total) * 100) } : null;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/15">
            <Heart size={14} className="text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">Bem-Estar IA</span>
          {streakData && streakData.streak_atual > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
              <Flame size={10} /> {streakData.streak_atual}🔥
            </span>
          )}
        </div>
        <button
          onClick={() => navigate("/bem-estar-hub")}
          className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
        >
          Hub <ArrowRight size={12} />
        </button>
      </div>

      {todayCheckin ? (
        <div className="flex items-center gap-3">
          <span className="text-3xl">{MOODS[todayCheckin.humor] || "😐"}</span>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Hoje você está</p>
            <p className="text-sm font-medium text-foreground">
              {todayCheckin.humor >= 4 ? "Se sentindo bem!" : todayCheckin.humor >= 3 ? "Dia normal" : "Dia difícil"}
            </p>
            <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
              <span>⚡ {todayCheckin.energia}/5</span>
              <span>😴 {todayCheckin.sono_horas}h</span>
              <span>💧 {todayCheckin.agua_litros}L</span>
            </div>
          </div>
          {goalProgress && (
            <div className="text-center">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" className="stroke-muted" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15" fill="none"
                    className="stroke-primary" strokeWidth="3"
                    strokeDasharray={`${goalProgress.pct * 0.942} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-foreground">
                  {goalProgress.met}/{goalProgress.total}
                </span>
              </div>
              <p className="text-[8px] text-muted-foreground mt-0.5">metas</p>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/wellness-tracker")}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
        >
          <Sparkles size={20} className="text-primary" />
          <div className="text-left flex-1">
            <p className="text-sm font-medium text-foreground">Faça seu check-in diário</p>
            <p className="text-[10px] text-muted-foreground">Registre humor, energia e sono</p>
          </div>
          <ArrowRight size={14} className="text-muted-foreground" />
        </button>
      )}

      {/* Quick access buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/assistente-saude")}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-xs font-medium text-muted-foreground"
        >
          <MessageCircle size={12} /> Falar com Aria
        </button>
        <button
          onClick={() => navigate("/metas-wellness")}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-xs font-medium text-muted-foreground"
        >
          <Target size={12} /> Minhas Metas
        </button>
      </div>
    </motion.div>
  );
};
