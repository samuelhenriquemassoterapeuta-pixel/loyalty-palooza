import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface GoalRing {
  label: string;
  emoji: string;
  current: number;
  target: number;
  unit: string;
}

function MiniRing({ pct, color }: { pct: number; color: string }) {
  const clamped = Math.min(pct, 100);
  const dashArray = `${clamped * 0.628} 100`;

  return (
    <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="10" fill="none" className="stroke-muted/40" strokeWidth="3" />
      <circle
        cx="18" cy="18" r="10" fill="none"
        className={color}
        strokeWidth="3"
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WellnessWeeklyGoals() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-weekly-goals", user?.id],
    enabled: !!user,
    queryFn: async () => {
      // Fetch user metas
      const { data: metas } = await supabase
        .from("wellness_metas")
        .select("meta_agua_litros, meta_sono_horas, meta_energia_min")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (!metas) return null;

      // Fetch this week's checkins
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("agua_litros, sono_horas, energia, exercicio_min")
        .eq("user_id", user!.id)
        .gte("data", weekAgo);

      if (!checkins || checkins.length === 0) return null;

      const avg = (vals: (number | null)[]) => {
        const valid = vals.filter((v): v is number => v != null && v > 0);
        return valid.length ? Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10 : 0;
      };

      const goals: GoalRing[] = [];

      if (metas.meta_agua_litros) {
        goals.push({
          label: "Água",
          emoji: "💧",
          current: avg(checkins.map((c) => c.agua_litros)),
          target: metas.meta_agua_litros,
          unit: "L",
        });
      }
      if (metas.meta_sono_horas) {
        goals.push({
          label: "Sono",
          emoji: "🌙",
          current: avg(checkins.map((c) => c.sono_horas)),
          target: metas.meta_sono_horas,
          unit: "h",
        });
      }
      if (metas.meta_energia_min) {
        goals.push({
          label: "Energia",
          emoji: "⚡",
          current: avg(checkins.map((c) => c.energia)),
          target: metas.meta_energia_min,
          unit: "/5",
        });
      }

      return { goals, dias: checkins.length };
    },
  });

  if (isLoading || !data || data.goals.length === 0) return null;

  const allMet = data.goals.every((g) => g.current >= g.target);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Metas da Semana</p>
          </div>
          <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
            {data.dias} dias
          </span>
        </div>

        <div className={`grid gap-3 ${data.goals.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {data.goals.map((goal) => {
            const pct = Math.round((goal.current / goal.target) * 100);
            const met = goal.current >= goal.target;
            const ringColor = met ? "stroke-primary" : pct >= 60 ? "stroke-amber-500" : "stroke-muted-foreground/50";

            return (
              <div key={goal.label} className="flex flex-col items-center gap-1">
                <div className="relative">
                  <MiniRing pct={pct} color={ringColor} />
                  <span className="absolute inset-0 flex items-center justify-center text-xs">
                    {goal.emoji}
                  </span>
                </div>
                <p className="text-[11px] font-bold text-foreground">
                  {goal.current}{goal.unit}
                </p>
                <p className="text-[9px] text-muted-foreground">
                  meta: {goal.target}{goal.unit}
                </p>
              </div>
            );
          })}
        </div>

        {allMet && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-primary">
            <CheckCircle2 size={12} />
            <span className="font-medium">Todas as metas atingidas! 🎉</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
