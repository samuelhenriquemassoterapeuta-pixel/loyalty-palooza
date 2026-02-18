import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const energyLevels = [
  { value: 1, emoji: "🪫", label: "Esgotado", barColor: "bg-destructive" },
  { value: 2, emoji: "😴", label: "Baixa", barColor: "bg-orange-500" },
  { value: 3, emoji: "⚡", label: "Normal", barColor: "bg-yellow-500" },
  { value: 4, emoji: "💪", label: "Alta", barColor: "bg-primary" },
  { value: 5, emoji: "🚀", label: "Máxima", barColor: "bg-green-500" },
];

const WellnessEnergyWidget = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-energy-widget", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("id, energia")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const current = todayCheckin?.energia ?? 0;

  const mutation = useMutation({
    mutationFn: async (value: number) => {
      if (!user) return;
      if (todayCheckin?.id) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update({ energia: value })
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({ user_id: user.id, data: today, humor: 3, energia: value });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-energy-widget"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
    },
    onError: () => toast.error("Erro ao salvar energia"),
  });

  if (!user) return null;

  const currentLevel = energyLevels.find((l) => l.value === current);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Zap size={12} /> Energia de hoje
        </p>
        {currentLevel && (
          <span className="text-[10px] text-muted-foreground">
            {currentLevel.emoji} {currentLevel.label}
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        {/* Energy bars selector */}
        <div className="flex items-end gap-1.5 justify-center mb-2">
          {energyLevels.map((level) => (
            <motion.button
              key={level.value}
              onClick={() => mutation.mutate(level.value)}
              disabled={mutation.isPending}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 flex-1 disabled:opacity-50"
            >
              <motion.div
                className={`w-full rounded-lg transition-all ${
                  current >= level.value ? level.barColor : "bg-muted/30"
                }`}
                style={{ height: `${level.value * 8 + 8}px` }}
                animate={current >= level.value ? { opacity: 1 } : { opacity: 0.4 }}
              />
              <span className="text-xs">{level.emoji}</span>
              <p className="text-[7px] text-muted-foreground font-medium">{level.label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessEnergyWidget;
