import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Link2 } from "lucide-react";

interface Correlation {
  metricA: string;
  metricB: string;
  correlation: number;
  insight: string;
  emoji: string;
  direction: "positive" | "negative";
}

const WellnessCorrelations = () => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["wellness-correlations", user?.id],
    enabled: !!user,
    staleTime: 1000 * 60 * 60, // 1h cache
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wellness-correlations");
      if (error) throw error;
      return data as { correlations: Correlation[]; total_days?: number; message?: string };
    },
  });

  if (!data?.correlations?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-2 px-1">
        <Link2 size={12} className="text-muted-foreground" />
        <p className="text-xs font-medium text-muted-foreground">
          Correlações descobertas ({data.total_days} dias)
        </p>
      </div>
      <div className="space-y-1.5">
        {data.correlations.map((c, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-xl border ${
              c.direction === "positive"
                ? "border-green-500/15 bg-green-500/5"
                : "border-amber-500/15 bg-amber-500/5"
            }`}
          >
            <span className="text-lg">{c.emoji}</span>
            <p className="text-xs text-foreground flex-1">{c.insight}</p>
            {c.direction === "positive" ? (
              <ArrowUpRight size={14} className="text-green-500 flex-shrink-0" />
            ) : (
              <ArrowDownRight size={14} className="text-amber-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessCorrelations;
