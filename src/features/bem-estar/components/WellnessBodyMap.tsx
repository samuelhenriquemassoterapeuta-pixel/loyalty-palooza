import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const BODY_REGIONS: Record<string, { label: string; emoji: string }> = {
  cabeca: { label: "Cabeça", emoji: "🧠" },
  pescoco: { label: "Pescoço", emoji: "🦒" },
  ombros: { label: "Ombros", emoji: "💪" },
  costas_superior: { label: "Costas (superior)", emoji: "🔝" },
  costas_inferior: { label: "Lombar", emoji: "🔻" },
  bracos: { label: "Braços", emoji: "🦾" },
  maos: { label: "Mãos/Punhos", emoji: "🤲" },
  quadril: { label: "Quadril", emoji: "🦴" },
  pernas: { label: "Pernas", emoji: "🦵" },
  pes: { label: "Pés", emoji: "🦶" },
  torax: { label: "Tórax", emoji: "🫁" },
  abdomen: { label: "Abdômen", emoji: "🫃" },
};

export default function WellnessBodyMap() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-body-map", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("dor, dor_local")
        .eq("user_id", user!.id)
        .gte("data", thirtyDaysAgo)
        .gt("dor", 0);

      if (!checkins || checkins.length === 0) return null;

      const regionCount: Record<string, { count: number; avgDor: number; totalDor: number }> = {};

      checkins.forEach((c) => {
        if (!c.dor_local) return;
        const locals = c.dor_local
          .toLowerCase()
          .split(/[,;/]+/)
          .map((s) => s.trim())
          .filter(Boolean);

        locals.forEach((local) => {
          // Try to match to known regions
          const key = Object.keys(BODY_REGIONS).find(
            (k) => local.includes(k) || k.includes(local) || BODY_REGIONS[k].label.toLowerCase().includes(local)
          );
          const regionKey = key || local;
          if (!regionCount[regionKey]) {
            regionCount[regionKey] = { count: 0, avgDor: 0, totalDor: 0 };
          }
          regionCount[regionKey].count++;
          regionCount[regionKey].totalDor += c.dor;
        });
      });

      // Calculate averages
      Object.values(regionCount).forEach((r) => {
        r.avgDor = Math.round((r.totalDor / r.count) * 10) / 10;
      });

      const sorted = Object.entries(regionCount)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 6);

      return {
        totalReports: checkins.length,
        regions: sorted,
      };
    },
  });

  if (isLoading || !data) return null;

  const maxCount = data.regions[0]?.[1].count || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Mapa de Dor</p>
          </div>
          <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
            últimos 30 dias
          </span>
        </div>

        <div className="space-y-2">
          {data.regions.map(([key, info]) => {
            const region = BODY_REGIONS[key];
            const pct = Math.round((info.count / maxCount) * 100);
            const intensity = info.avgDor >= 4 ? "bg-red-500/70" : info.avgDor >= 2.5 ? "bg-amber-500/70" : "bg-primary/50";

            return (
              <div key={key} className="flex items-center gap-2">
                <span className="text-sm w-5 text-center">{region?.emoji || "📍"}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-medium text-foreground">
                      {region?.label || key}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {info.count}x · dor média {info.avgDor}/5
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`h-full rounded-full ${intensity}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-muted-foreground mt-3 text-center">
          {data.totalReports} relato{data.totalReports !== 1 ? "s" : ""} de dor no período
        </p>
      </div>
    </motion.div>
  );
}
