import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Plus, Minus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GOAL_MIN = 30;
const STEP_MIN = 5;

const WellnessExerciseWidget = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-exercise-widget", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("id, exercicio_min")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const currentMin = todayCheckin?.exercicio_min ?? 0;
  const progress = Math.min((currentMin / GOAL_MIN) * 100, 100);

  const mutation = useMutation({
    mutationFn: async (newMin: number) => {
      if (!user) return;
      const clamped = Math.max(0, newMin);

      if (todayCheckin?.id) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update({ exercicio_min: clamped })
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({ user_id: user.id, data: today, humor: 3, energia: 3, exercicio_min: clamped });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-exercise-widget"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
    },
    onError: () => toast.error("Erro ao salvar exercício"),
  });

  const addMin = () => mutation.mutate(currentMin + STEP_MIN);
  const removeMin = () => {
    if (currentMin > 0) mutation.mutate(Math.max(0, currentMin - STEP_MIN));
  };

  if (!user) return null;

  // Arc progress for the ring
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Flame size={12} /> Exercício de hoje
        </p>
        <span className="text-[10px] text-muted-foreground">
          Meta: {GOAL_MIN}min
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          {/* Ring progress */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
              <circle
                cx="28" cy="28" r={radius}
                fill="none"
                stroke="hsl(var(--muted) / 0.3)"
                strokeWidth="4"
              />
              <motion.circle
                cx="28" cy="28" r={radius}
                fill="none"
                stroke="hsl(var(--highlight))"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - strokeDash }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Flame size={16} className="text-highlight" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground">{currentMin}</span>
              <span className="text-[10px] text-muted-foreground">/ {GOAL_MIN} min</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {currentMin >= GOAL_MIN
                ? "Meta atingida! 💪"
                : `Faltam ${GOAL_MIN - currentMin} min para a meta`}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-1">
            <button
              onClick={addMin}
              disabled={mutation.isPending}
              className="w-8 h-8 rounded-lg bg-highlight/10 hover:bg-highlight/20 flex items-center justify-center transition-colors active:scale-95 disabled:opacity-50"
            >
              <Plus size={14} className="text-highlight" />
            </button>
            <button
              onClick={removeMin}
              disabled={mutation.isPending || currentMin <= 0}
              className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-colors active:scale-95 disabled:opacity-50"
            >
              <Minus size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {progress >= 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-highlight font-medium mt-2 text-center"
          >
            🔥 Parabéns! Você se exercitou hoje!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessExerciseWidget;
