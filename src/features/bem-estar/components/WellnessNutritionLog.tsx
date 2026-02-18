import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Plus, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

const MEAL_TYPES = [
  { key: "cafe_manha", label: "Café", emoji: "☕" },
  { key: "almoco", label: "Almoço", emoji: "🍽️" },
  { key: "lanche", label: "Lanche", emoji: "🍎" },
  { key: "jantar", label: "Jantar", emoji: "🌙" },
];

export default function WellnessNutritionLog() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");
  const [openType, setOpenType] = useState<string | null>(null);
  const [desc, setDesc] = useState("");

  const { data: todayMeals = [] } = useQuery({
    queryKey: ["wellness-nutrition-today", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("diario_alimentar")
        .select("tipo_refeicao, descricao")
        .eq("user_id", user!.id)
        .eq("data", today);
      return data || [];
    },
  });

  const logMeal = useMutation({
    mutationFn: async ({ tipo, descricao }: { tipo: string; descricao: string }) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("diario_alimentar").insert({
        user_id: user.id,
        tipo_refeicao: tipo,
        descricao,
        data: today,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-nutrition-today"] });
      toast.success("Refeição registrada! 🍽️");
      setOpenType(null);
      setDesc("");
    },
    onError: () => toast.error("Erro ao registrar refeição"),
  });

  const loggedTypes = new Set(todayMeals.map((m) => m.tipo_refeicao));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UtensilsCrossed size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Nutrição Rápida</p>
          </div>
          <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
            {loggedTypes.size}/{MEAL_TYPES.length} hoje
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {MEAL_TYPES.map((meal) => {
            const logged = loggedTypes.has(meal.key);
            const isOpen = openType === meal.key;

            return (
              <button
                key={meal.key}
                onClick={() => {
                  if (logged) return;
                  setOpenType(isOpen ? null : meal.key);
                  setDesc("");
                }}
                className={`rounded-xl p-2.5 text-center transition-all ${
                  logged
                    ? "bg-primary/10 border border-primary/20"
                    : isOpen
                    ? "bg-accent/10 border border-accent/20 ring-1 ring-accent/30"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <span className="text-lg">{meal.emoji}</span>
                <p className="text-[10px] font-medium text-foreground mt-0.5">{meal.label}</p>
                {logged && <Check size={10} className="text-primary mx-auto mt-0.5" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {openType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="O que você comeu?"
                  className="flex-1 text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && desc.trim()) {
                      logMeal.mutate({ tipo: openType, descricao: desc.trim() });
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (desc.trim()) logMeal.mutate({ tipo: openType, descricao: desc.trim() });
                  }}
                  disabled={!desc.trim() || logMeal.isPending}
                  className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium disabled:opacity-50"
                >
                  <Plus size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
