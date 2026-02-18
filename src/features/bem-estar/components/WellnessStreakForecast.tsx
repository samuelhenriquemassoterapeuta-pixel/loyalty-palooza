import { motion } from "framer-motion";
import { Rocket, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MILESTONES = [3, 7, 14, 21, 30, 50, 75, 100];

export default function WellnessStreakForecast() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-streak-forecast", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data: streak } = await supabase
        .from("wellness_streaks")
        .select("streak_atual, melhor_streak")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (!streak || streak.streak_atual < 1) return null;

      const current = streak.streak_atual;
      const nextMilestone = MILESTONES.find((m) => m > current);
      if (!nextMilestone) return null;

      const daysToGo = nextMilestone - current;
      const targetDate = new Date(Date.now() + daysToGo * 86400000);

      // Estimate cashback bonus
      const bonusMap: Record<number, number> = { 3: 2, 7: 5, 14: 10, 21: 15, 30: 25, 50: 40, 75: 60, 100: 100 };
      const bonus = bonusMap[nextMilestone] || 0;

      return {
        current,
        nextMilestone,
        daysToGo,
        targetDate,
        bonus,
        bestStreak: streak.melhor_streak,
      };
    },
  });

  if (isLoading || !data) return null;

  const progress = Math.round((data.current / data.nextMilestone) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 to-accent/5 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Rocket size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Próximo Marco</p>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            <Flame size={10} /> {data.current} dias
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted-foreground">
                Faltam <span className="font-bold text-foreground">{data.daysToGo} dias</span> para {data.nextMilestone} dias
              </span>
              <span className="text-[10px] text-muted-foreground">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[9px] text-muted-foreground">
                Meta: {data.targetDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
              </span>
              {data.bonus > 0 && (
                <span className="text-[9px] text-primary font-medium">
                  🎁 +R$ {data.bonus.toFixed(2).replace(".", ",")} cashback
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
