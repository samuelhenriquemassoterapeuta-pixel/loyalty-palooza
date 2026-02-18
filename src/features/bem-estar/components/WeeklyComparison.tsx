import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface WeekData {
  humor: number;
  energia: number;
  sono: number;
  agua: number;
  stress: number;
  dias: number;
}

const avg = (arr: number[]) =>
  arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0;

const WeeklyComparison = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["wellness-weekly-comparison", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 86400000).toISOString().split("T")[0];
      const twoWeeksAgo = new Date(today.getTime() - 14 * 86400000).toISOString().split("T")[0];

      const { data: recent } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, agua_litros, estresse")
        .eq("user_id", user!.id)
        .gte("data", weekAgo);

      const { data: previous } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, agua_litros, estresse")
        .eq("user_id", user!.id)
        .gte("data", twoWeeksAgo)
        .lt("data", weekAgo);

      if (!recent || recent.length < 3 || !previous || previous.length < 3) return null;

      const toWeek = (rows: typeof recent): WeekData => ({
        humor: avg(rows.map((r) => r.humor)),
        energia: avg(rows.map((r) => r.energia)),
        sono: avg(rows.map((r) => r.sono_horas).filter(Boolean) as number[]),
        agua: avg(rows.map((r) => r.agua_litros).filter(Boolean) as number[]),
        stress: avg(rows.map((r) => r.estresse).filter(Boolean) as number[]),
        dias: rows.length,
      });

      return { current: toWeek(recent), previous: toWeek(previous) };
    },
  });

  if (!data) return null;

  const { current, previous } = data;

  const metrics = [
    { label: "Humor", icon: "😊", cur: current.humor, prev: previous.humor, higher_better: true },
    { label: "Energia", icon: "⚡", cur: current.energia, prev: previous.energia, higher_better: true },
    { label: "Sono", icon: "🌙", cur: current.sono, prev: previous.sono, higher_better: true, suffix: "h" },
    { label: "Água", icon: "💧", cur: current.agua, prev: previous.agua, higher_better: true, suffix: "L" },
    { label: "Stress", icon: "😰", cur: current.stress, prev: previous.stress, higher_better: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-6"
    >
      <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
        Esta semana vs anterior
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {metrics.map((m) => {
          const diff = m.cur - m.prev;
          const improved = m.higher_better ? diff > 0.2 : diff < -0.2;
          const worsened = m.higher_better ? diff < -0.2 : diff > 0.2;

          return (
            <div
              key={m.label}
              className={`glass-card rounded-xl p-2.5 text-center border ${
                improved
                  ? "border-green-500/20 bg-green-500/5"
                  : worsened
                  ? "border-red-500/20 bg-red-500/5"
                  : "border-border"
              }`}
            >
              <span className="text-sm">{m.icon}</span>
              <p className="text-xs font-bold text-foreground mt-0.5">
                {m.cur}{m.suffix || ""}
              </p>
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                {improved ? (
                  <TrendingUp size={10} className="text-green-500" />
                ) : worsened ? (
                  <TrendingDown size={10} className="text-red-500" />
                ) : (
                  <Minus size={10} className="text-muted-foreground" />
                )}
                <span
                  className={`text-[9px] font-medium ${
                    improved ? "text-green-500" : worsened ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                </span>
              </div>
              <p className="text-[9px] text-muted-foreground mt-0.5">{m.label}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeeklyComparison;
