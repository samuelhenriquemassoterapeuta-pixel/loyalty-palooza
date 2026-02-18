import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Send, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PROMPTS = [
  "Como você está se sentindo agora?",
  "O que te trouxe alegria hoje?",
  "Algo te preocupa neste momento?",
  "Pelo que você é grato hoje?",
  "Como foi seu dia em uma frase?",
  "O que você aprendeu sobre si hoje?",
];

export default function WellnessMoodJournal() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const dailyPrompt = PROMPTS[new Date().getDate() % PROMPTS.length];

  const saveMutation = useMutation({
    mutationFn: async (entry: string) => {
      if (!user) throw new Error("Não autenticado");
      const today = new Date().toISOString().split("T")[0];

      // Save as observation in today's checkin
      const { data: existing } = await supabase
        .from("wellness_checkins")
        .select("id, observacoes")
        .eq("user_id", user.id)
        .eq("data", today)
        .maybeSingle();

      if (existing) {
        const newObs = existing.observacoes
          ? `${existing.observacoes}\n\n📝 ${entry}`
          : `📝 ${entry}`;
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
            observacoes: `📝 ${entry}`,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-checkin-today"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
      toast.success("Reflexão salva! 📝");
      setSaved(true);
      setText("");
      setTimeout(() => setSaved(false), 3000);
    },
    onError: () => toast.error("Erro ao salvar reflexão"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <PenLine size={15} className="text-primary" />
          <p className="text-xs font-semibold text-foreground">Micro-Diário</p>
        </div>

        <p className="text-[11px] text-muted-foreground italic mb-2">
          💭 {dailyPrompt}
        </p>

        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-3 text-xs text-primary font-medium"
            >
              <Check size={14} /> Reflexão registrada!
            </motion.div>
          ) : (
            <motion.div key="input" className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escreva uma reflexão rápida..."
                className="flex-1 text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                maxLength={280}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && text.trim()) {
                    saveMutation.mutate(text.trim());
                  }
                }}
              />
              <button
                onClick={() => {
                  if (text.trim()) saveMutation.mutate(text.trim());
                }}
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
