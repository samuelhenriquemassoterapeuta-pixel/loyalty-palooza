import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MetricComparison {
  label: string;
  emoji: string;
  you: number;
  community: number;
  unit: string;
  higherBetter: boolean;
}

export default function WellnessCommunityCompare() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-community-compare", user?.id],
    enabled: !!user,
    staleTime: 1000 * 60 * 30, // cache 30min
    queryFn: async () => {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

      // User's averages
      const { data: mine } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, agua_litros, exercicio_min")
        .eq("user_id", user!.id)
        .gte("data", weekAgo);

      if (!mine || mine.length < 2) return null;

      // Community averages (all users, anonymous)
      const { data: community } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, agua_litros, exercicio_min")
        .gte("data", weekAgo)
        .limit(500);

      if (!community || community.length < 5) return null;

      const avg = (arr: (number | null)[], fallback = 0) => {
        const valid = arr.filter((v): v is number => v != null && v > 0);
        return valid.length ? Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10 : fallback;
      };

      const metrics: MetricComparison[] = [
        {
          label: "Humor",
          emoji: "😊",
          you: avg(mine.map((c) => c.humor)),
          community: avg(community.map((c) => c.humor)),
          unit: "/5",
          higherBetter: true,
        },
        {
          label: "Energia",
          emoji: "⚡",
          you: avg(mine.map((c) => c.energia)),
          community: avg(community.map((c) => c.energia)),
          unit: "/5",
          higherBetter: true,
        },
        {
          label: "Sono",
          emoji: "🌙",
          you: avg(mine.map((c) => c.sono_horas)),
          community: avg(community.map((c) => c.sono_horas)),
          unit: "h",
          higherBetter: true,
        },
        {
          label: "Água",
          emoji: "💧",
          you: avg(mine.map((c) => c.agua_litros)),
          community: avg(community.map((c) => c.agua_litros)),
          unit: "L",
          higherBetter: true,
        },
      ];

      return { metrics, communitySize: new Set(community.map(() => "anon")).size };
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
            <Users size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Você vs Comunidade</p>
          </div>
          <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
            últimos 7 dias
          </span>
        </div>

        <div className="space-y-2.5">
          {data.metrics.map((m) => {
            const diff = m.you - m.community;
            const better = m.higherBetter ? diff > 0.1 : diff < -0.1;
            const worse = m.higherBetter ? diff < -0.1 : diff > 0.1;

            return (
              <div key={m.label} className="flex items-center gap-2">
                <span className="text-sm w-5 text-center">{m.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] text-muted-foreground">{m.label}</span>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className={`font-bold ${better ? "text-primary" : worse ? "text-destructive" : "text-foreground"}`}>
                        Você: {m.you}{m.unit}
                      </span>
                      <span className="text-muted-foreground">
                        Média: {m.community}{m.unit}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-muted/40 overflow-hidden">
                    {/* Community bar */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/20"
                      style={{ width: `${Math.min((m.community / 5) * 100, 100)}%` }}
                    />
                    {/* Your bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((m.you / 5) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-y-0 left-0 rounded-full ${better ? "bg-primary/70" : worse ? "bg-destructive/50" : "bg-foreground/30"}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[9px] text-muted-foreground text-center mt-3">
          Dados anônimos e agregados da comunidade
        </p>
      </div>
    </motion.div>
  );
}
