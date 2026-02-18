import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";

const avg = (arr: number[]) =>
  arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0;

interface MetricRow {
  label: string;
  emoji: string;
  thisWeek: number;
  lastWeek: number;
  unit: string;
  inverse?: boolean;
}

const WellnessWeeklySummary = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["wellness-weekly-summary", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const now = new Date();
      const thisWeekStart = new Date(now.getTime() - 7 * 86400000).toISOString().split("T")[0];
      const lastWeekStart = new Date(now.getTime() - 14 * 86400000).toISOString().split("T")[0];

      const { data: all } = await supabase
        .from("wellness_checkins")
        .select("data, humor, energia, sono_horas, agua_litros, estresse")
        .eq("user_id", user!.id)
        .gte("data", lastWeekStart)
        .order("data");

      if (!all || all.length < 3) return null;

      const thisW = all.filter((d) => d.data >= thisWeekStart);
      const lastW = all.filter((d) => d.data < thisWeekStart);

      if (thisW.length < 2 || lastW.length < 2) return null;

      return {
        thisWeekDays: thisW.length,
        lastWeekDays: lastW.length,
        metrics: [
          { label: "Humor", emoji: "😊", thisWeek: avg(thisW.map(d => d.humor)), lastWeek: avg(lastW.map(d => d.humor)), unit: "/5" },
          { label: "Energia", emoji: "⚡", thisWeek: avg(thisW.map(d => d.energia)), lastWeek: avg(lastW.map(d => d.energia)), unit: "/5" },
          { label: "Sono", emoji: "🌙", thisWeek: avg(thisW.map(d => d.sono_horas).filter(Boolean) as number[]), lastWeek: avg(lastW.map(d => d.sono_horas).filter(Boolean) as number[]), unit: "h" },
          { label: "Água", emoji: "💧", thisWeek: avg(thisW.map(d => d.agua_litros).filter(Boolean) as number[]), lastWeek: avg(lastW.map(d => d.agua_litros).filter(Boolean) as number[]), unit: "L" },
          { label: "Estresse", emoji: "🧘", thisWeek: avg(thisW.map(d => d.estresse).filter(Boolean) as number[]), lastWeek: avg(lastW.map(d => d.estresse).filter(Boolean) as number[]), unit: "/5", inverse: true },
        ] as MetricRow[],
      };
    },
  });

  if (!data) return null;

  const improved = data.metrics.filter((m) => {
    const diff = m.thisWeek - m.lastWeek;
    return m.inverse ? diff < -0.2 : diff > 0.2;
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Calendar size={12} /> Resumo semanal
        </p>
        <p className="text-[10px] text-muted-foreground">
          {data.thisWeekDays} dias vs {data.lastWeekDays} dias
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-3">
        <div className="space-y-2">
          {data.metrics.map((m) => {
            const diff = m.thisWeek - m.lastWeek;
            const improving = m.inverse ? diff < -0.2 : diff > 0.2;
            const declining = m.inverse ? diff > 0.2 : diff < -0.2;

            return (
              <div key={m.label} className="flex items-center gap-2">
                <span className="text-sm w-5 text-center">{m.emoji}</span>
                <span className="text-[10px] text-muted-foreground w-14">{m.label}</span>
                <div className="flex-1 flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground">
                    {m.thisWeek}{m.unit}
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    ← {m.lastWeek}{m.unit}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  {improving ? (
                    <TrendingUp size={12} className="text-primary" />
                  ) : declining ? (
                    <TrendingDown size={12} className="text-destructive" />
                  ) : (
                    <Minus size={12} className="text-muted-foreground" />
                  )}
                  <span
                    className={`text-[9px] font-medium ${
                      improving ? "text-primary" : declining ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {improved > 0 && (
          <p className="text-[10px] text-primary font-medium mt-2 pt-2 border-t border-border">
            📈 {improved} métrica{improved > 1 ? "s" : ""} melhoraram esta semana!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessWeeklySummary;
