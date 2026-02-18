import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function WellnessPersonalRecords() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-personal-records", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("data, humor, energia, sono_horas, agua_litros, exercicio_min")
        .eq("user_id", user!.id)
        .order("data", { ascending: false })
        .limit(200);

      if (!checkins || checkins.length < 3) return null;

      const { data: streakData } = await supabase
        .from("wellness_streaks")
        .select("melhor_streak")
        .eq("user_id", user!.id)
        .maybeSingle();

      const maxSono = Math.max(...checkins.map((c) => c.sono_horas || 0));
      const maxAgua = Math.max(...checkins.map((c) => c.agua_litros || 0));
      const maxExercicio = Math.max(...checkins.map((c) => c.exercicio_min || 0));

      // Best day: highest combined humor + energia
      const bestDay = checkins.reduce((best, c) => {
        const score = c.humor + c.energia;
        return score > (best.humor + best.energia) ? c : best;
      }, checkins[0]);

      // Count perfect days (humor 5 + energia >= 4)
      const perfectDays = checkins.filter((c) => c.humor === 5 && c.energia >= 4).length;

      const records = [
        { label: "Melhor Streak", value: streakData?.melhor_streak || 0, unit: "dias", emoji: "🔥" },
        { label: "Máx. Sono", value: maxSono, unit: "h", emoji: "😴" },
        { label: "Máx. Água", value: maxAgua, unit: "L", emoji: "💧" },
        { label: "Máx. Exercício", value: maxExercicio, unit: "min", emoji: "🏃" },
        { label: "Dias Perfeitos", value: perfectDays, unit: "", emoji: "✨" },
      ].filter((r) => r.value > 0);

      const bestDayDate = bestDay
        ? new Date(bestDay.data + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
        : null;

      return { records, bestDayDate, totalCheckins: checkins.length };
    },
  });

  if (isLoading || !data || data.records.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown size={15} className="text-amber-500" />
            <p className="text-xs font-semibold text-foreground">Recordes Pessoais</p>
          </div>
          {data.bestDayDate && (
            <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
              Melhor dia: {data.bestDayDate}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {data.records.slice(0, 6).map((r) => (
            <div
              key={r.label}
              className="rounded-xl bg-gradient-to-br from-amber-500/5 to-primary/5 border border-amber-500/10 p-2.5 text-center"
            >
              <span className="text-base">{r.emoji}</span>
              <p className="text-sm font-black text-foreground mt-0.5">
                {r.value}{r.unit}
              </p>
              <p className="text-[9px] text-muted-foreground">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
