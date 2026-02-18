import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Check, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

const GRATITUDE_PROMPTS = [
  "Pelo que você é grato hoje?",
  "Quem fez seu dia melhor?",
  "Qual momento bom você viveu?",
  "O que te fez sorrir hoje?",
  "Que pequena alegria você notou?",
  "O que você aprendeu de bom?",
  "Qual conquista te orgulha?",
];

export default function WellnessGratitude() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const prompt = GRATITUDE_PROMPTS[new Date().getDay()];

  const { data: todayCount = 0 } = useQuery({
    queryKey: ["wellness-gratitude-count", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("observacoes")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      if (!data?.observacoes) return 0;
      return (data.observacoes.match(/🙏/g) || []).length;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (entry: string) => {
      if (!user) throw new Error("Não autenticado");
      const { data: existing } = await supabase
        .from("wellness_checkins")
        .select("id, observacoes")
        .eq("user_id", user.id)
        .eq("data", today)
        .maybeSingle();

      const gratitudeEntry = `🙏 ${entry}`;

      if (existing) {
        const newObs = existing.observacoes
          ? `${existing.observacoes}\n${gratitudeEntry}`
          : gratitudeEntry;
        const { error } = await supabase
          .from("wellness_checkins")
          .update({ observacoes: newObs })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({
            user_id: user.id,
            data: today,
            humor: 3,
            energia: 3,
            dor: 0,
            exercicio_min: 0,
            observacoes: gratitudeEntry,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-gratitude-count"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
      toast.success("Gratidão registrada! 🙏💚");
      setSaved(true);
      setText("");
      setTimeout(() => setSaved(false), 2500);
    },
    onError: () => toast.error("Erro ao salvar"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-accent/5 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Heart size={15} className="text-primary" fill="currentColor" />
            <p className="text-xs font-semibold text-foreground">Gratidão</p>
          </div>
          {todayCount > 0 && (
            <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
              {todayCount} hoje
            </span>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground italic mb-2.5">
          <Sparkles size={10} className="inline text-primary mr-1" />
          {prompt}
        </p>

        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs text-primary font-medium"
            >
              <Check size={14} /> Gratidão registrada! 🙏
            </motion.div>
          ) : (
            <motion.div key="input" className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Sou grato(a) por..."
                className="flex-1 text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                maxLength={200}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && text.trim()) saveMutation.mutate(text.trim());
                }}
              />
              <button
                onClick={() => text.trim() && saveMutation.mutate(text.trim())}
                disabled={!text.trim() || saveMutation.isPending}
                className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
