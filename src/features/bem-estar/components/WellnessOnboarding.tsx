import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Droplets, Moon, Zap, Target, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  onComplete: () => void;
}

const STEPS = [
  {
    key: "welcome",
    emoji: "🌿",
    title: "Bem-vindo ao seu espaço de Bem-Estar",
    subtitle: "Vamos configurar seus objetivos em menos de 1 minuto.",
  },
  {
    key: "agua",
    emoji: "💧",
    title: "Qual sua meta diária de água?",
    subtitle: "Recomendação: 2L por dia",
    icon: Droplets,
    field: "meta_agua_litros",
    options: [
      { label: "1.5L", value: 1.5 },
      { label: "2.0L", value: 2.0 },
      { label: "2.5L", value: 2.5 },
      { label: "3.0L", value: 3.0 },
    ],
  },
  {
    key: "sono",
    emoji: "🌙",
    title: "Quantas horas de sono quer ter?",
    subtitle: "Adultos: 7-9h é o ideal",
    icon: Moon,
    field: "meta_sono_horas",
    options: [
      { label: "6h", value: 6 },
      { label: "7h", value: 7 },
      { label: "7.5h", value: 7.5 },
      { label: "8h", value: 8 },
    ],
  },
  {
    key: "energia",
    emoji: "⚡",
    title: "Nível mínimo de energia desejado?",
    subtitle: "De 1 a 5, qual o mínimo aceitável",
    icon: Zap,
    field: "meta_energia_min",
    options: [
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
    ],
  },
  {
    key: "done",
    emoji: "🎯",
    title: "Tudo pronto!",
    subtitle: "Suas metas foram salvas. Faça seu primeiro check-in agora!",
  },
];

const WellnessOnboarding = ({ onComplete }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, number>>({
    meta_agua_litros: 2.0,
    meta_sono_horas: 7.5,
    meta_energia_min: 4,
    meta_humor_min: 3,
    meta_estresse_max: 3,
  });
  const [saving, setSaving] = useState(false);

  const current = STEPS[step];

  const select = (field: string, value: number) => {
    setSelections((s) => ({ ...s, [field]: value }));
  };

  const next = async () => {
    if (step < STEPS.length - 2) {
      setStep((s) => s + 1);
    } else if (step === STEPS.length - 2) {
      // Save metas
      setSaving(true);
      try {
        const { error } = await supabase
          .from("wellness_metas")
          .upsert({ user_id: user!.id, ...selections }, { onConflict: "user_id" });
        if (error) throw error;
        queryClient.invalidateQueries({ queryKey: ["wellness-metas"] });
        setStep((s) => s + 1);
      } catch {
        toast.error("Erro ao salvar metas");
      } finally {
        setSaving(false);
      }
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6"
    >
      <div className="w-full max-w-sm">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-6 bg-primary" : i < step ? "w-3 bg-primary/40" : "w-3 bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            className="text-center"
          >
            <span className="text-5xl block mb-4">{current.emoji}</span>
            <h2 className="text-lg font-bold text-foreground mb-1">{current.title}</h2>
            <p className="text-sm text-muted-foreground mb-8">{current.subtitle}</p>

            {/* Options */}
            {"options" in current && current.options && (
              <div className="flex items-center justify-center gap-3 mb-8">
                {current.options.map((opt) => {
                  const field = (current as any).field as string;
                  const selected = selections[field] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => select(field, opt.value)}
                      className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                        selected
                          ? "bg-primary text-primary-foreground shadow-md scale-105"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Final step icon */}
            {current.key === "done" && (
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check size={32} className="text-primary" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={next}
          disabled={saving}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Salvando..." : step === STEPS.length - 1 ? "Fazer meu primeiro check-in" : "Continuar"}
          {!saving && <ArrowRight size={16} />}
        </button>

        {step === 0 && (
          <button
            onClick={onComplete}
            className="w-full mt-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Pular por agora
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessOnboarding;
