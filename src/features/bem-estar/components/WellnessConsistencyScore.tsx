import { motion } from "framer-motion";
import { Award, TrendingUp, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function ScoreRing({ score }: { score: number }) {
  const pct = Math.min(score, 100);
  const dash = `${pct * 1.005} 100.5`;
  const color =
    score >= 80 ? "stroke-primary" : score >= 50 ? "stroke-amber-500" : "stroke-muted-foreground";

  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted/30" strokeWidth="2.5" />
        <circle
          cx="18" cy="18" r="16" fill="none"
          className={color}
          strokeWidth="2.5"
          strokeDasharray={dash}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-black text-foreground">{score}</span>
        <span className="text-[7px] text-muted-foreground -mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

export default function WellnessConsistencyScore() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-consistency-score", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const thirtyDaysAgo = new Date(Date.now() - 29 * 86400000).toISOString().split("T")[0];
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("data, humor, energia, sono_horas, agua_litros, exercicio_min")
        .eq("user_id", user!.id)
        .gte("data", thirtyDaysAgo);

      if (!checkins || checkins.length === 0) return null;

      const checkinDates = new Set(checkins.map((c) => c.data));
      const totalDays = 30;
      const frequency = Math.round((checkinDates.size / totalDays) * 100);

      // Completeness: how many fields are filled per checkin
      const completeness = Math.round(
        (checkins.reduce((sum, c) => {
          let filled = 0;
          if (c.humor > 0) filled++;
          if (c.energia > 0) filled++;
          if (c.sono_horas && c.sono_horas > 0) filled++;
          if (c.agua_litros && c.agua_litros > 0) filled++;
          if (c.exercicio_min > 0) filled++;
          return sum + (filled / 5) * 100;
        }, 0) / checkins.length)
      );

      // Consistency score: weighted average
      const score = Math.round(frequency * 0.6 + completeness * 0.4);

      const level =
        score >= 90 ? { label: "Excelente", emoji: "🏆" } :
        score >= 70 ? { label: "Muito Bom", emoji: "⭐" } :
        score >= 50 ? { label: "Bom", emoji: "👍" } :
        score >= 30 ? { label: "Progredindo", emoji: "🌱" } :
        { label: "Iniciando", emoji: "🚀" };

      return {
        score,
        frequency,
        completeness,
        checkinDays: checkinDates.size,
        level,
      };
    },
  });

  if (isLoading || !data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Consistência</p>
          </div>
          <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {data.level.emoji} {data.level.label}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ScoreRing score={data.score} />

          <div className="flex-1 space-y-2">
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar size={9} /> Frequência
                </span>
                <span className="text-[10px] font-bold text-foreground">{data.frequency}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.frequency}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full bg-primary/60"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <TrendingUp size={9} /> Completude
                </span>
                <span className="text-[10px] font-bold text-foreground">{data.completeness}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.completeness}%` }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="h-full rounded-full bg-accent/60"
                />
              </div>
            </div>

            <p className="text-[9px] text-muted-foreground">
              {data.checkinDays} check-ins nos últimos 30 dias
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
