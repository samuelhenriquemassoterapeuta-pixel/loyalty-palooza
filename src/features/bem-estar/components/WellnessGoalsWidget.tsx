import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, ArrowRight } from "lucide-react";

interface GoalItem {
  label: string;
  emoji: string;
  current: number | null;
  target: number | null;
  unit: string;
  inverse?: boolean; // lower is better (e.g. stress)
}

const WellnessGoalsWidget = () => {
  const { user } = useAuth();

  const { data: metas } = useQuery({
    queryKey: ["wellness-metas-widget", user?.id],
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

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-today-hub", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, agua_litros, estresse")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  if (!metas) return null;

  const goals: GoalItem[] = [
    { label: "Água", emoji: "💧", current: todayCheckin?.agua_litros, target: metas.meta_agua_litros, unit: "L" },
    { label: "Sono", emoji: "🌙", current: todayCheckin?.sono_horas, target: metas.meta_sono_horas, unit: "h" },
    { label: "Humor", emoji: "😊", current: todayCheckin?.humor, target: metas.meta_humor_min, unit: "/5" },
    { label: "Energia", emoji: "⚡", current: todayCheckin?.energia, target: metas.meta_energia_min, unit: "/5" },
    { label: "Estresse", emoji: "🧘", current: todayCheckin?.estresse, target: metas.meta_estresse_max, unit: "/5", inverse: true },
  ].filter(g => g.target != null && g.target > 0);

  if (goals.length === 0) return null;

  const achieved = goals.filter(g => {
    if (g.current == null) return false;
    return g.inverse ? g.current <= g.target! : g.current >= g.target!;
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Target size={12} /> Metas de hoje
        </p>
        <Link to="/metas-wellness" className="text-[10px] text-primary font-medium flex items-center gap-0.5">
          Editar <ArrowRight size={10} />
        </Link>
      </div>

      <div className="flex gap-2">
        {goals.map((goal) => {
          const pct = goal.current != null && goal.target
            ? goal.inverse
              ? Math.min(100, Math.max(0, ((goal.target - Math.max(0, goal.current - goal.target)) / goal.target) * 100))
              : Math.min(100, (goal.current / goal.target) * 100)
            : 0;
          const hit = goal.current != null && goal.target != null &&
            (goal.inverse ? goal.current <= goal.target : goal.current >= goal.target);

          return (
            <div
              key={goal.label}
              className={`flex-1 rounded-xl p-2.5 text-center border transition-all ${
                hit
                  ? "border-primary/30 bg-primary/10"
                  : "border-border bg-card"
              }`}
            >
              <span className="text-sm">{goal.emoji}</span>
              <div className="h-1 rounded-full bg-muted/50 mt-1.5 mb-1 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${hit ? "bg-primary" : "bg-muted-foreground/30"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <p className="text-[9px] text-muted-foreground leading-tight">
                {goal.current != null ? goal.current : "—"}/{goal.target}{goal.unit}
              </p>
            </div>
          );
        })}
      </div>

      {achieved > 0 && (
        <p className="text-[10px] text-primary font-medium mt-1.5 px-1">
          🎯 {achieved}/{goals.length} metas atingidas hoje!
        </p>
      )}
    </motion.div>
  );
};

export default WellnessGoalsWidget;
