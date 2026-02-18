import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const GRADES = [
  { min: 90, grade: "A+", color: "text-primary", bg: "bg-primary/15" },
  { min: 80, grade: "A", color: "text-primary", bg: "bg-primary/10" },
  { min: 70, grade: "B+", color: "text-accent", bg: "bg-accent/15" },
  { min: 60, grade: "B", color: "text-accent", bg: "bg-accent/10" },
  { min: 50, grade: "C", color: "text-amber-500", bg: "bg-amber-500/10" },
  { min: 0, grade: "D", color: "text-muted-foreground", bg: "bg-muted/30" },
];

function getGrade(score: number) {
  return GRADES.find((g) => score >= g.min) || GRADES[GRADES.length - 1];
}

export default function WellnessReportCard() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-report-card", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
      const { data: checkins } = await supabase
        .from("wellness_checkins")
        .select("humor, energia, sono_horas, agua_litros, estresse, exercicio_min, dor")
        .eq("user_id", user!.id)
        .gte("data", weekAgo);

      if (!checkins || checkins.length < 3) return null;

      const avg = (vals: (number | null)[]) => {
        const valid = vals.filter((v): v is number => v != null && v > 0);
        return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
      };

      // Score each category (0-100)
      const humor = (avg(checkins.map((c) => c.humor)) / 5) * 100;
      const energia = (avg(checkins.map((c) => c.energia)) / 5) * 100;
      const sono = Math.min((avg(checkins.map((c) => c.sono_horas)) / 8) * 100, 100);
      const hidratacao = Math.min((avg(checkins.map((c) => c.agua_litros)) / 2.5) * 100, 100);
      const exercicio = Math.min((avg(checkins.map((c) => c.exercicio_min)) / 30) * 100, 100);
      const stressScore = 100 - (avg(checkins.map((c) => c.estresse)) / 5) * 100;
      const frequencia = (checkins.length / 7) * 100;

      const subjects = [
        { label: "Humor", score: Math.round(humor), emoji: "😊" },
        { label: "Energia", score: Math.round(energia), emoji: "⚡" },
        { label: "Sono", score: Math.round(sono), emoji: "🌙" },
        { label: "Hidratação", score: Math.round(hidratacao), emoji: "💧" },
        { label: "Exercício", score: Math.round(exercicio), emoji: "🏃" },
        { label: "Anti-Stress", score: Math.round(stressScore), emoji: "🧘" },
        { label: "Frequência", score: Math.round(frequencia), emoji: "📅" },
      ];

      const overall = Math.round(subjects.reduce((s, sub) => s + sub.score, 0) / subjects.length);

      return { subjects, overall, dias: checkins.length };
    },
  });

  if (isLoading || !data) return null;

  const overallGrade = getGrade(data.overall);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck size={15} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Boletim Semanal</p>
          </div>
          <div className={`px-2.5 py-1 rounded-lg ${overallGrade.bg}`}>
            <span className={`text-sm font-black ${overallGrade.color}`}>{overallGrade.grade}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          {data.subjects.map((sub) => {
            const grade = getGrade(sub.score);
            return (
              <div key={sub.label} className="flex items-center gap-2">
                <span className="text-xs w-4 text-center">{sub.emoji}</span>
                <span className="text-[10px] text-muted-foreground w-16">{sub.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.score}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${grade.bg.replace("/10", "/60").replace("/15", "/60").replace("/30", "/50")}`}
                    style={{ backgroundColor: sub.score >= 70 ? "hsl(var(--primary) / 0.5)" : sub.score >= 50 ? "hsl(var(--accent) / 0.5)" : "hsl(var(--muted-foreground) / 0.3)" }}
                  />
                </div>
                <span className={`text-[10px] font-bold w-6 text-right ${grade.color}`}>
                  {grade.grade}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            Nota geral: {data.overall}/100 • {data.dias} dias
          </span>
          <span className="text-[10px] font-medium text-primary">
            {data.overall >= 80 ? "Excelente! 🌟" : data.overall >= 60 ? "Bom trabalho! 👏" : "Continue tentando! 💪"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
