import { motion } from "framer-motion";
import { BedDouble, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const QUALITY_LABELS = ["", "Péssimo", "Ruim", "Regular", "Bom", "Ótimo"];
const QUALITY_COLORS = ["", "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-primary/70", "bg-primary"];

export default function WellnessSleepQuality() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-sleep-quality", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("data, sono_horas, sono_qualidade")
        .eq("user_id", user!.id)
        .order("data", { ascending: false })
        .limit(10);

      if (!checkins || checkins.length === 0) return null;

      const withSleep = checkins.filter(
        (c) => c.sono_horas != null && c.sono_horas > 0
      );

      if (withSleep.length === 0) return null;

      const avgHours =
        Math.round(
          (withSleep.reduce((s, c) => s + (c.sono_horas || 0), 0) / withSleep.length) * 10
        ) / 10;

      const withQuality = withSleep.filter((c) => c.sono_qualidade != null && c.sono_qualidade > 0);
      const avgQuality = withQuality.length
        ? Math.round(
            (withQuality.reduce((s, c) => s + (c.sono_qualidade || 0), 0) / withQuality.length) * 10
          ) / 10
        : null;

      return {
        avgHours,
        avgQuality,
        recent: withSleep.slice(0, 7).reverse(),
      };
    },
  });

  if (isLoading || !data) return null;

  const maxHours = Math.max(...data.recent.map((r) => r.sono_horas || 0), 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BedDouble size={15} className="text-indigo-500" />
            <p className="text-xs font-semibold text-foreground">Qualidade do Sono</p>
          </div>
          <div className="flex items-center gap-2">
            {data.avgQuality && (
              <span className="flex items-center gap-0.5 text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-full">
                <Star size={8} fill="currentColor" /> {data.avgQuality}/5
              </span>
            )}
            <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
              média {data.avgHours}h
            </span>
          </div>
        </div>

        {/* Bar chart of recent nights */}
        <div className="flex items-end gap-1.5 h-16">
          {data.recent.map((night) => {
            const hours = night.sono_horas || 0;
            const pct = Math.round((hours / maxHours) * 100);
            const quality = night.sono_qualidade || 3;
            const dayLabel = new Date(night.data + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3);

            return (
              <div key={night.data} className="flex-1 flex flex-col items-center gap-0.5">
                <span className="text-[8px] text-muted-foreground font-medium">{hours}h</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className={`w-full rounded-t-md ${QUALITY_COLORS[quality] || "bg-muted"}`}
                  style={{ minHeight: 4 }}
                />
                <span className="text-[8px] text-muted-foreground">{dayLabel}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-3">
          {[3, 4, 5].map((q) => (
            <div key={q} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-sm ${QUALITY_COLORS[q]}`} />
              <span className="text-[9px] text-muted-foreground">{QUALITY_LABELS[q]}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
