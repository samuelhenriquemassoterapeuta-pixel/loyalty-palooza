import { motion, type Variants } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { subDays, startOfDay, isSameDay, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { ProgressStats } from "@/features/protocolos/hooks/useProgressStats";

interface StreakCardProps {
  stats: ProgressStats;
  fichas: { data: string }[];
  variants: Variants;
}

export const StreakCard = ({ stats, fichas, variants }: StreakCardProps) => {
  if (stats.totalFichas === 0) return null;

  return (
    <motion.div variants={variants} className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              stats.streak > 0
                ? "bg-gradient-to-br from-warning/20 to-warning/10"
                : "bg-muted"
            }`}
          >
            <Flame
              size={22}
              className={stats.streak > 0 ? "text-warning" : "text-muted-foreground"}
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-foreground"><AnimatedCounter value={stats.streak} duration={0.8} /></span>
              <span className="text-xs text-muted-foreground">
                {stats.streak === 1 ? "dia" : "dias"} seguidos
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {stats.streak > 0
                ? "Continue registrando! 💪"
                : "Registre hoje para iniciar o streak!"}
            </p>
          </div>
        </div>
        {stats.melhorStreak > 1 && (
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <Trophy size={12} className="text-warning" />
              <span className="text-xs font-semibold text-foreground">
                {stats.melhorStreak}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">recorde</p>
          </div>
        )}
      </div>

      {/* Streak dots — last 7 days */}
      <div className="flex items-center gap-1.5 mt-3 justify-center">
        {Array.from({ length: 7 }).map((_, i) => {
          const day = subDays(startOfDay(new Date()), 6 - i);
          const hasMeasurement = fichas.some((f) => isSameDay(new Date(f.data), day));
          const isToday = i === 6;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium transition-colors ${
                  hasMeasurement
                    ? "bg-warning/20 text-warning border border-warning/30"
                    : isToday
                      ? "bg-muted border border-border text-muted-foreground"
                      : "bg-muted/50 text-muted-foreground/50"
                }`}
              >
                {hasMeasurement ? "✓" : format(day, "dd")}
              </div>
              <span className="text-[8px] text-muted-foreground">
                {format(day, "EEE", { locale: ptBR }).slice(0, 3)}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
