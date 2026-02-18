import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const DEFAULT_HABITS = [
  { id: "agua", emoji: "💧", label: "Beber 2L de água" },
  { id: "alongar", emoji: "🧘", label: "Alongar 5min" },
  { id: "meditar", emoji: "🧠", label: "Meditar / respirar" },
  { id: "caminhar", emoji: "🚶", label: "Caminhar 15min" },
  { id: "frutas", emoji: "🍎", label: "Comer frutas" },
  { id: "telas", emoji: "📵", label: "Pausa de telas" },
];

const EMOJI_OPTIONS = ["🏋️", "📖", "🎵", "🌿", "💤", "🥗", "🧹", "✍️", "🙏", "🎯", "💊", "🫧"];

const WellnessDailyHabits = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newEmoji, setNewEmoji] = useState("✨");

  // Fetch custom habits
  const { data: customHabits = [] } = useQuery({
    queryKey: ["wellness-custom-habits", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_habitos_personalizados")
        .select("*")
        .eq("user_id", user!.id)
        .eq("ativo", true)
        .order("ordem");
      return (data || []).map((h: any) => ({
        id: `custom_${h.id}`,
        emoji: h.emoji,
        label: h.label,
        dbId: h.id,
      }));
    },
  });

  const allHabits = [...DEFAULT_HABITS, ...customHabits];

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

  const addHabit = useMutation({
    mutationFn: async () => {
      if (!newLabel.trim()) return;
      const { error } = await supabase
        .from("wellness_habitos_personalizados")
        .insert({ user_id: user!.id, emoji: newEmoji, label: newLabel.trim(), ordem: customHabits.length });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-custom-habits"] });
      setNewLabel("");
      setNewEmoji("✨");
      setShowAdd(false);
      toast.success("Hábito adicionado!");
    },
    onError: () => toast.error("Erro ao adicionar hábito"),
  });

  const removeHabit = useMutation({
    mutationFn: async (dbId: string) => {
      await supabase
        .from("wellness_habitos_personalizados")
        .update({ ativo: false })
        .eq("id", dbId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-custom-habits"] });
      toast.success("Hábito removido");
    },
  });

  const done = completedIds.filter(id => allHabits.some(h => h.id === id)).length;
  const total = allHabits.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground">Hábitos do dia</p>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-muted-foreground">{done}/{total} ({pct}%)</p>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="p-1 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Adicionar hábito"
          >
            {showAdd ? <X size={14} className="text-muted-foreground" /> : <Plus size={14} className="text-muted-foreground" />}
          </button>
        </div>
      </div>

      {/* Add habit form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="rounded-xl border border-border bg-card p-3 space-y-2">
              <div className="flex gap-2">
                <input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Nome do hábito..."
                  maxLength={30}
                  className="flex-1 text-xs bg-muted/50 rounded-lg px-3 py-2 border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => addHabit.mutate()}
                  disabled={!newLabel.trim() || addHabit.isPending}
                  className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium disabled:opacity-40"
                >
                  Salvar
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {EMOJI_OPTIONS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setNewEmoji(e)}
                    className={`text-base p-1 rounded-md transition-all ${newEmoji === e ? "bg-primary/20 scale-110" : "hover:bg-muted/50"}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        {allHabits.map((habit) => {
          const checked = completedIds.includes(habit.id);
          const isCustom = "dbId" in habit;
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
              {isCustom && !checked && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHabit.mutate((habit as any).dbId);
                  }}
                  className="absolute top-1 right-1 p-0.5 rounded hover:bg-destructive/10"
                  aria-label="Remover"
                >
                  <Trash2 size={8} className="text-muted-foreground" />
                </button>
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
