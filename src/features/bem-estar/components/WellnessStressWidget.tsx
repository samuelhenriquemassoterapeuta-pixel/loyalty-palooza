import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const levels = [
  { value: 1, emoji: "😌", label: "Zen", color: "bg-green-500/20 ring-green-500/40 text-green-700" },
  { value: 2, emoji: "🙂", label: "Leve", color: "bg-accent/20 ring-accent/40 text-accent" },
  { value: 3, emoji: "😐", label: "Médio", color: "bg-yellow-500/20 ring-yellow-500/40 text-yellow-700" },
  { value: 4, emoji: "😤", label: "Alto", color: "bg-orange-500/20 ring-orange-500/40 text-orange-700" },
  { value: 5, emoji: "🤯", label: "Extremo", color: "bg-destructive/20 ring-destructive/40 text-destructive" },
];

const WellnessStressWidget = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-stress-widget", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("id, estresse")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const current = todayCheckin?.estresse ?? 0;

  const mutation = useMutation({
    mutationFn: async (value: number) => {
      if (!user) return;
      if (todayCheckin?.id) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update({ estresse: value })
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({ user_id: user.id, data: today, humor: 3, energia: 3, estresse: value });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-stress-widget"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
    },
    onError: () => toast.error("Erro ao salvar estresse"),
  });

  if (!user) return null;

  const currentLevel = levels.find((l) => l.value === current);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Brain size={12} /> Estresse de hoje
        </p>
        {currentLevel && (
          <span className="text-[10px] text-muted-foreground">
            {currentLevel.emoji} {currentLevel.label}
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex gap-2">
          {levels.map((level) => (
            <button
              key={level.value}
              onClick={() => mutation.mutate(level.value)}
              disabled={mutation.isPending}
              className={`flex-1 py-2.5 rounded-xl text-center transition-all active:scale-95 disabled:opacity-50 ${
                current === level.value
                  ? `${level.color} ring-1`
                  : "bg-muted/20 hover:bg-muted/30"
              }`}
            >
              <span className="text-lg block">{level.emoji}</span>
              <p className="text-[8px] text-muted-foreground mt-0.5 font-medium">{level.label}</p>
            </button>
          ))}
        </div>

        {/* Stress bar */}
        {current > 0 && (
          <div className="mt-3">
            <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  current <= 2 ? "bg-green-500" : current <= 3 ? "bg-yellow-500" : "bg-destructive"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${(current / 5) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-center">
              {current <= 2 ? "Nível saudável ✨" : current <= 3 ? "Atenção ao estresse" : "Considere uma pausa 🧘"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessStressWidget;
