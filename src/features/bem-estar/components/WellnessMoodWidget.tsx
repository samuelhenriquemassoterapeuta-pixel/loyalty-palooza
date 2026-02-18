import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const moods = [
  { value: 1, emoji: "😢", label: "Triste", bg: "bg-blue-500/20 ring-blue-500/40" },
  { value: 2, emoji: "😕", label: "Baixo", bg: "bg-indigo-500/20 ring-indigo-500/40" },
  { value: 3, emoji: "😐", label: "Neutro", bg: "bg-yellow-500/20 ring-yellow-500/40" },
  { value: 4, emoji: "😊", label: "Bem", bg: "bg-primary/20 ring-primary/40" },
  { value: 5, emoji: "😄", label: "Ótimo", bg: "bg-green-500/20 ring-green-500/40" },
];

const WellnessMoodWidget = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-mood-widget", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("id, humor")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const current = todayCheckin?.humor ?? 0;

  const mutation = useMutation({
    mutationFn: async (value: number) => {
      if (!user) return;
      if (todayCheckin?.id) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update({ humor: value })
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({ user_id: user.id, data: today, humor: value, energia: 3 });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-mood-widget"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
    },
    onError: () => toast.error("Erro ao salvar humor"),
  });

  if (!user) return null;

  const currentMood = moods.find((m) => m.value === current);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Heart size={12} /> Como você está?
        </p>
        {currentMood && (
          <span className="text-[10px] text-muted-foreground">
            {currentMood.emoji} {currentMood.label}
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex gap-2">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              onClick={() => mutation.mutate(mood.value)}
              disabled={mutation.isPending}
              whileTap={{ scale: 0.9 }}
              className={`flex-1 py-3 rounded-xl text-center transition-all disabled:opacity-50 ${
                current === mood.value
                  ? `${mood.bg} ring-1 scale-105`
                  : "bg-muted/20 hover:bg-muted/30"
              }`}
            >
              <motion.span
                className="text-2xl block"
                animate={current === mood.value ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {mood.emoji}
              </motion.span>
              <p className="text-[8px] text-muted-foreground mt-1 font-medium">{mood.label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessMoodWidget;
