import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { Target, Droplets, Moon, Zap, Brain, Heart, Save, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 26 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

interface WellnessMetas {
  id?: string;
  meta_agua_litros: number;
  meta_sono_horas: number;
  meta_energia_min: number;
  meta_estresse_max: number;
  meta_humor_min: number;
  lembrete_checkin: boolean;
  horario_lembrete: string;
}

const DEFAULT_METAS: WellnessMetas = {
  meta_agua_litros: 2.0,
  meta_sono_horas: 7.5,
  meta_energia_min: 3,
  meta_estresse_max: 3,
  meta_humor_min: 3,
  lembrete_checkin: true,
  horario_lembrete: "09:00",
};

const MetasWellness = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: savedMetas, isLoading } = useQuery({
    queryKey: ["wellness-metas", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_metas")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data as WellnessMetas | null;
    },
  });

  const [metas, setMetas] = useState<WellnessMetas | null>(null);

  const current = metas || savedMetas || DEFAULT_METAS;

  const update = (field: keyof WellnessMetas, value: any) => {
    setMetas({ ...current, [field]: value });
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Não autenticado");
      const payload = {
        user_id: user.id,
        meta_agua_litros: current.meta_agua_litros,
        meta_sono_horas: current.meta_sono_horas,
        meta_energia_min: current.meta_energia_min,
        meta_estresse_max: current.meta_estresse_max,
        meta_humor_min: current.meta_humor_min,
        lembrete_checkin: current.lembrete_checkin,
        horario_lembrete: current.horario_lembrete,
      };

      if (savedMetas?.id) {
        const { error } = await supabase
          .from("wellness_metas")
          .update(payload)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_metas")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-metas"] });
      toast.success("Metas salvas com sucesso! 🎯");
      setMetas(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao salvar metas");
    },
  });

  const goals = [
    {
      icon: Droplets,
      label: "Água (litros/dia)",
      field: "meta_agua_litros" as const,
      value: current.meta_agua_litros,
      min: 0.5,
      max: 5,
      step: 0.5,
      unit: "L",
      color: "text-accent",
      bg: "bg-accent/15",
    },
    {
      icon: Moon,
      label: "Sono (horas/noite)",
      field: "meta_sono_horas" as const,
      value: current.meta_sono_horas,
      min: 4,
      max: 12,
      step: 0.5,
      unit: "h",
      color: "text-primary",
      bg: "bg-primary/15",
    },
    {
      icon: Zap,
      label: "Energia mínima",
      field: "meta_energia_min" as const,
      value: current.meta_energia_min,
      min: 1,
      max: 5,
      step: 1,
      unit: "/5",
      color: "text-highlight",
      bg: "bg-highlight/15",
    },
    {
      icon: Brain,
      label: "Estresse máximo",
      field: "meta_estresse_max" as const,
      value: current.meta_estresse_max,
      min: 1,
      max: 5,
      step: 1,
      unit: "/5",
      color: "text-destructive",
      bg: "bg-destructive/15",
    },
    {
      icon: Heart,
      label: "Humor mínimo",
      field: "meta_humor_min" as const,
      value: current.meta_humor_min,
      min: 1,
      max: 5,
      step: 1,
      unit: "/5",
      color: "text-primary",
      bg: "bg-primary/15",
    },
  ];

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground text-sm">Carregando metas...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-2xl mx-auto px-4 pt-6 safe-top">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
            {/* Header */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Target size={22} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground font-serif">Minhas Metas</h1>
                  <p className="text-xs text-muted-foreground">Defina seus objetivos diários de bem-estar</p>
                </div>
              </div>
            </motion.div>

            {/* Goals */}
            {goals.map((goal) => (
              <motion.div key={goal.field} variants={fadeUp}>
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl ${goal.bg}`}>
                      <goal.icon size={18} className={goal.color} />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{goal.label}</span>
                    <span className="ml-auto text-lg font-bold text-foreground">
                      {goal.value}{goal.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={goal.min}
                    max={goal.max}
                    step={goal.step}
                    value={goal.value}
                    onChange={(e) => update(goal.field, parseFloat(e.target.value))}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>{goal.min}{goal.unit}</span>
                    <span>{goal.max}{goal.unit}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Reminder toggle */}
            <motion.div variants={fadeUp}>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/15">
                      <Check size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Lembrete de check-in</p>
                      <p className="text-[10px] text-muted-foreground">Receber notificação diária</p>
                    </div>
                  </div>
                  <button
                    onClick={() => update("lembrete_checkin", !current.lembrete_checkin)}
                    className={`w-12 h-7 rounded-full transition-colors relative ${
                      current.lembrete_checkin ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${
                        current.lembrete_checkin ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Save button */}
            <motion.div variants={fadeUp}>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Save size={16} />
                {saveMutation.isPending ? "Salvando..." : "Salvar Metas"}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MetasWellness;
