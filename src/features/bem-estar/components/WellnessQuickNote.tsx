import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const WellnessQuickNote = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const { data: todayCheckin } = useQuery({
    queryKey: ["wellness-quicknote", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("id, observacoes")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const savedNote = todayCheckin?.observacoes || "";

  const mutation = useMutation({
    mutationFn: async (note: string) => {
      if (!user) return;
      if (todayCheckin?.id) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update({ observacoes: note })
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert({ user_id: user.id, data: today, humor: 3, energia: 3, observacoes: note });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-quicknote"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-today-hub"] });
      setEditing(false);
      toast.success("Nota salva!");
    },
    onError: () => toast.error("Erro ao salvar nota"),
  });

  const startEditing = () => {
    setText(savedNote);
    setEditing(true);
  };

  const save = () => {
    if (text.trim()) mutation.mutate(text.trim());
    else setEditing(false);
  };

  const cancel = () => {
    setEditing(false);
    setText("");
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <PenLine size={12} /> Nota rápida
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Como você está se sentindo? O que aconteceu hoje?"
                maxLength={500}
                autoFocus
                className="w-full text-xs text-foreground bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/50 min-h-[60px]"
              />
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground">{text.length}/500</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={cancel}
                    className="w-7 h-7 rounded-lg bg-muted/30 hover:bg-muted/50 flex items-center justify-center transition-colors"
                  >
                    <X size={12} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={save}
                    disabled={mutation.isPending || !text.trim()}
                    className="w-7 h-7 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors disabled:opacity-50"
                  >
                    <Check size={12} className="text-primary" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={startEditing}
              className="w-full text-left"
            >
              {savedNote ? (
                <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">{savedNote}</p>
              ) : (
                <p className="text-xs text-muted-foreground/50 italic">
                  Toque para anotar como está se sentindo...
                </p>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WellnessQuickNote;
