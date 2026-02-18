import { motion } from "framer-motion";
import { Moon, Plus, Minus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GOAL_HOURS = 8;
const STEP = 0.5;
const qualityLabels = ["", "Péssimo", "Ruim", "Ok", "Bom", "Ótimo"];
const qualityEmojis = ["", "😫", "😕", "😐", "😊", "😴"];

const WellnessSleepWidget = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-sleep-widget", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("id, sono_horas, sono_qualidade")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const hours = todayCheckin?.sono_horas ?? 0;
  const quality = todayCheckin?.sono_qualidade ?? 0;
  const progress = Math.min((hours / GOAL_HOURS) * 100, 100);

  const mutation = useMutation({
    mutationFn: async (updates: { sono_horas?: number; sono_qualidade?: number }) => {
      if (!user) return;
      if (todayCheckin?.id) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update(updates)
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({ user_id: user.id, data: today, humor: 3, energia: 3, ...updates });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-sleep-widget"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
    },
    onError: () => toast.error("Erro ao salvar sono"),
  });

  const addHour = () => mutation.mutate({ sono_horas: Math.min(24, hours + STEP) });
  const removeHour = () => {
    if (hours > 0) mutation.mutate({ sono_horas: Math.max(0, hours - STEP) });
  };
  const setQuality = (q: number) => mutation.mutate({ sono_qualidade: q });

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Moon size={12} /> Sono de hoje
        </p>
        <span className="text-[10px] text-muted-foreground">Meta: {GOAL_HOURS}h</span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        {/* Hours row */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(var(--muted) / 0.3)" strokeWidth="3" />
              <motion.circle
                cx="24" cy="24" r="20"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 20}
                initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                animate={{ strokeDashoffset: (2 * Math.PI * 20) * (1 - progress / 100) }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Moon size={14} className="text-accent" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground">{hours.toFixed(1)}h</span>
              <span className="text-[10px] text-muted-foreground">/ {GOAL_HOURS}h</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {hours >= GOAL_HOURS ? "Dormiu bem! 🌙" : `Faltam ${(GOAL_HOURS - hours).toFixed(1)}h para a meta`}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={addHour}
              disabled={mutation.isPending}
              className="w-8 h-8 rounded-lg bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors active:scale-95 disabled:opacity-50"
            >
              <Plus size={14} className="text-accent" />
            </button>
            <button
              onClick={removeHour}
              disabled={mutation.isPending || hours <= 0}
              className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-colors active:scale-95 disabled:opacity-50"
            >
              <Minus size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Quality selector */}
        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5">Qualidade do sono</p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                disabled={mutation.isPending}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all active:scale-95 disabled:opacity-50 ${
                  quality === q
                    ? "bg-accent/20 ring-1 ring-accent/40"
                    : "bg-muted/20 hover:bg-muted/30"
                }`}
              >
                <span className="text-sm">{qualityEmojis[q]}</span>
                <p className="text-[8px] text-muted-foreground mt-0.5">{qualityLabels[q]}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessSleepWidget;
