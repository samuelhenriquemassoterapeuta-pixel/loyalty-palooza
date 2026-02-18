import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { format } from "date-fns";

const HABITS = [
  { id: "agua", emoji: "💧", label: "Beber 2L de água" },
  { id: "alongar", emoji: "🧘", label: "Alongar 5min" },
  { id: "meditar", emoji: "🧠", label: "Meditar / respirar" },
  { id: "caminhar", emoji: "🚶", label: "Caminhar 15min" },
  { id: "frutas", emoji: "🍎", label: "Comer frutas" },
  { id: "telas", emoji: "📵", label: "Pausa de telas" },
];

const WellnessDailyHabits = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: todayHabits } = useQuery({
    queryKey: ["wellness-habits", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_habitos_diarios")
        .select("*")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const completedIds: string[] = (todayHabits?.habitos_completos as string[]) || [];

  const toggle = useMutation({
    mutationFn: async (habitId: string) => {
      const current = [...completedIds];
      const idx = current.indexOf(habitId);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(habitId);

      if (todayHabits) {
        await supabase
          .from("wellness_habitos_diarios")
          .update({ habitos_completos: current, updated_at: new Date().toISOString() })
          .eq("id", todayHabits.id);
      } else {
        await supabase
          .from("wellness_habitos_diarios")
          .insert({ user_id: user!.id, data: today, habitos_completos: current });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-habits"] });
    },
  });

  const done = completedIds.length;
  const total = HABITS.length;
  const pct = Math.round((done / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground">Hábitos do dia</p>
        <p className="text-[10px] text-muted-foreground">{done}/{total} ({pct}%)</p>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted/50 mb-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {HABITS.map((habit) => {
          const checked = completedIds.includes(habit.id);
          return (
            <button
              key={habit.id}
              onClick={() => toggle.mutate(habit.id)}
              disabled={toggle.isPending}
              className={`relative flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all text-center ${
                checked
                  ? "border-primary/30 bg-primary/10"
                  : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              {checked && (
                <div className="absolute top-1 right-1">
                  <Check size={10} className="text-primary" />
                </div>
              )}
              <span className={`text-base ${checked ? "" : "grayscale opacity-60"}`}>{habit.emoji}</span>
              <span className={`text-[9px] leading-tight ${checked ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {habit.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WellnessDailyHabits;
