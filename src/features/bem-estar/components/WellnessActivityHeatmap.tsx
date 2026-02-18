import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function WellnessActivityHeatmap() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-activity-heatmap", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const thirtyDaysAgo = new Date(Date.now() - 29 * 86400000).toISOString().split("T")[0];
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("data, exercicio_min")
        .eq("user_id", user!.id)
        .gte("data", thirtyDaysAgo);

      if (!checkins) return null;

      const map: Record<string, number> = {};
      checkins.forEach((c) => {
        map[c.data] = c.exercicio_min || 0;
      });

      // Build 30-day grid
      const days: { date: string; label: string; minutes: number }[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        const key = d.toISOString().split("T")[0];
        days.push({
          date: key,
          label: d.getDate().toString(),
          minutes: map[key] ?? -1, // -1 = no checkin
        });
      }

      const activeDays = days.filter((d) => d.minutes > 0).length;
      const totalMin = days.filter((d) => d.minutes > 0).reduce((s, d) => s + d.minutes, 0);

      return { days, activeDays, totalMin };
    },
  });

  if (isLoading || !data) return null;

  const getColor = (min: number) => {
    if (min < 0) return "bg-muted/20"; // no checkin
    if (min === 0) return "bg-muted/40";
    if (min < 15) return "bg-primary/20";
    if (min < 30) return "bg-primary/40";
    if (min < 60) return "bg-primary/60";
    return "bg-primary/90";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Dumbbell size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Atividade Física</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
              {data.activeDays} dias ativos
            </span>
            {data.totalMin > 0 && (
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                {data.totalMin}min total
              </span>
            )}
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="grid grid-cols-10 gap-1">
          {data.days.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.minutes >= 0 ? day.minutes + "min" : "sem registro"}`}
              className={`aspect-square rounded-sm ${getColor(day.minutes)} flex items-center justify-center`}
            >
              <span className="text-[7px] text-foreground/50">{day.label}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          <span className="text-[8px] text-muted-foreground">0</span>
          {["bg-muted/40", "bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary/90"].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
          ))}
          <span className="text-[8px] text-muted-foreground">60+min</span>
        </div>
      </div>
    </motion.div>
  );
}
