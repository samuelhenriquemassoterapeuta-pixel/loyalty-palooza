import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const fields = [
  { key: "humor", label: "Humor", check: (v: any) => v && v > 0 },
  { key: "energia", label: "Energia", check: (v: any) => v && v > 0 },
  { key: "sono_horas", label: "Sono", check: (v: any) => v && v > 0 },
  { key: "agua_litros", label: "Água", check: (v: any) => v && v > 0 },
  { key: "estresse", label: "Estresse", check: (v: any) => v && v > 0 },
  { key: "exercicio_min", label: "Exercício", check: (v: any) => v && v > 0 },
  { key: "sono_qualidade", label: "Qual. Sono", check: (v: any) => v && v > 0 },
  { key: "observacoes", label: "Nota", check: (v: any) => v && v.length > 0 },
];

const WellnessDailyProgress = () => {
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  const { data: checkin } = useQuery({
    queryKey: ["wellness-daily-progress", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, sono_qualidade, agua_litros, estresse, exercicio_min, observacoes")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      return data;
    },
  });

  const completed = checkin
    ? fields.filter((f) => f.check((checkin as any)[f.key])).length
    : 0;
  const total = fields.length;
  const pct = Math.round((completed / total) * 100);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(var(--muted) / 0.3)" strokeWidth="3" />
                <motion.circle
                  cx="20" cy="20" r="16"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16}
                  initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
                  animate={{ strokeDashoffset: (2 * Math.PI * 16) * (1 - pct / 100) }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-foreground">{pct}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Check-in de hoje</p>
              <p className="text-[10px] text-muted-foreground">{completed}/{total} campos preenchidos</p>
            </div>
          </div>
          {completed < total && (
            <Link
              to="/wellness-tracker"
              className="text-[10px] text-primary font-medium hover:underline"
            >
              Completar
            </Link>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {fields.map((f) => {
            const done = checkin ? f.check((checkin as any)[f.key]) : false;
            return (
              <div
                key={f.key}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[9px] font-medium transition-colors ${
                  done ? "bg-primary/10 text-primary" : "bg-muted/20 text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 size={10} /> : <Circle size={10} />}
                {f.label}
              </div>
            );
          })}
        </div>

        {pct === 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-primary font-medium mt-2 text-center"
          >
            ✨ Check-in completo! Parabéns!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessDailyProgress;
