import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";

const WellnessInsight = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["wellness-insight", user?.id, refreshKey],
    enabled: !!user,
    staleTime: 1000 * 60 * 30, // 30 min cache
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("wellness-insight");
      if (error) return null;
      return data as { insight: string | null; reason?: string } | null;
    },
  });

  if (!data?.insight) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-accent/15 flex-shrink-0">
            <Lightbulb size={18} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Insight da IA
              </p>
              <button
                onClick={() => { setRefreshKey((k) => k + 1); refetch(); }}
                disabled={isFetching}
                className="p-1 rounded-lg hover:bg-accent/10 transition-colors"
              >
                <RefreshCw
                  size={12}
                  className={`text-muted-foreground ${isFetching ? "animate-spin" : ""}`}
                />
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={data.insight}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-foreground leading-relaxed"
              >
                {data.insight}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessInsight;
