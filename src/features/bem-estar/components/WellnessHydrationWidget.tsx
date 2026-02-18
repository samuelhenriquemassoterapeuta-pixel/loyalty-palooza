import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Plus, Minus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GOAL_LITERS = 2.5;
const GLASS_ML = 250;

const WellnessHydrationWidget = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-hydration-widget", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("id, agua_litros")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const currentLiters = todayCheckin?.agua_litros ?? 0;
  const glasses = Math.round(currentLiters * 1000 / GLASS_ML);
  const goalGlasses = Math.round(GOAL_LITERS * 1000 / GLASS_ML);
  const progress = Math.min((currentLiters / GOAL_LITERS) * 100, 100);

  const mutation = useMutation({
    mutationFn: async (newLiters: number) => {
      if (!user) return;
      const clamped = Math.max(0, Math.round(newLiters * 100) / 100);

      if (todayCheckin?.id) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update({ agua_litros: clamped })
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({ user_id: user.id, data: today, humor: 3, energia: 3, agua_litros: clamped });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-hydration-widget"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
    },
    onError: () => toast.error("Erro ao salvar hidratação"),
  });

  const addGlass = () => mutation.mutate(currentLiters + GLASS_ML / 1000);
  const removeGlass = () => {
    if (currentLiters > 0) mutation.mutate(currentLiters - GLASS_ML / 1000);
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Droplets size={12} /> Hidratação de hoje
        </p>
        <span className="text-[10px] text-muted-foreground">
          Meta: {GOAL_LITERS}L
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          {/* Water level visual */}
          <div className="relative w-12 h-16 rounded-xl border-2 border-accent/30 bg-accent/5 overflow-hidden flex-shrink-0">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-accent/30"
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Droplets size={16} className="text-accent" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground">{currentLiters.toFixed(1)}L</span>
              <span className="text-[10px] text-muted-foreground">/ {GOAL_LITERS}L</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {glasses} de {goalGlasses} copos (250ml)
            </p>
            {/* Progress bar */}
            <div className="mt-1.5 h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-1">
            <button
              onClick={addGlass}
              disabled={mutation.isPending}
              className="w-8 h-8 rounded-lg bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors active:scale-95 disabled:opacity-50"
            >
              <Plus size={14} className="text-accent" />
            </button>
            <button
              onClick={removeGlass}
              disabled={mutation.isPending || currentLiters <= 0}
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
            className="text-[10px] text-accent font-medium mt-2 text-center"
          >
            🎉 Meta atingida! Ótimo trabalho!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessHydrationWidget;
