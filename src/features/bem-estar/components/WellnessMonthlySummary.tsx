import { motion } from "framer-motion";
import { Calendar, TrendingUp, Droplets, Moon, Zap, Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function WellnessMonthlySummary() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-monthly-summary", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, agua_litros, estresse, exercicio_min")
        .eq("user_id", user!.id)
        .gte("data", firstDay);

      if (!checkins || checkins.length === 0) return null;

      const avg = (arr: (number | null)[]) => {
        const valid = arr.filter((v): v is number => v != null && v > 0);
        return valid.length ? Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10 : null;
      };

      return {
        dias: checkins.length,
        humor: avg(checkins.map((c) => c.humor)),
        energia: avg(checkins.map((c) => c.energia)),
        sono: avg(checkins.map((c) => c.sono_horas)),
        agua: avg(checkins.map((c) => c.agua_litros)),
        estresse: avg(checkins.map((c) => c.estresse)),
        exercicio: avg(checkins.map((c) => c.exercicio_min)),
      };
    },
  });

  if (isLoading || !data) return null;

  const monthName = new Date().toLocaleDateString("pt-BR", { month: "long" });

  const metrics = [
    { label: "Humor", value: data.humor, suffix: "/5", icon: "😊", color: "text-primary" },
    { label: "Energia", value: data.energia, suffix: "/5", icon: Zap, color: "text-amber-500" },
    { label: "Sono", value: data.sono, suffix: "h", icon: Moon, color: "text-indigo-500" },
    { label: "Água", value: data.agua, suffix: "L", icon: Droplets, color: "text-sky-500" },
    { label: "Estresse", value: data.estresse, suffix: "/5", icon: Brain, color: "text-rose-500" },
  ].filter((m) => m.value != null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground capitalize">
              Resumo de {monthName}
            </p>
          </div>
          <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
            {data.dias} check-in{data.dias !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-muted/30 p-2.5 text-center"
            >
              {typeof m.icon === "string" ? (
                <span className="text-base">{m.icon}</span>
              ) : (
                <m.icon size={16} className={`mx-auto ${m.color}`} />
              )}
              <p className="text-sm font-bold text-foreground mt-1">
                {m.value}{m.suffix}
              </p>
              <p className="text-[10px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        {data.dias >= 15 && (
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-primary">
            <TrendingUp size={12} />
            <span className="font-medium">Ótima consistência! Mais da metade do mês registrado.</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
