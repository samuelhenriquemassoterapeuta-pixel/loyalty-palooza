import { motion } from "framer-motion";
import { TrendingUp, Target, Flame } from "lucide-react";

interface DiaAderencia {
  data: string;
  dia: string;
  pausas: number;
  meta: number;
  isWorkDay: boolean;
  percentual: number;
}

interface AderenciaTrackerProps {
  hoje: number;
  metaHoje: number;
  semana: DiaAderencia[];
}

export const AderenciaTracker = ({ hoje, metaHoje, semana }: AderenciaTrackerProps) => {
  const todayPercent = metaHoje > 0 ? Math.min(100, Math.round((hoje / metaHoje) * 100)) : 0;
  
  // Calculate streak
  const streak = (() => {
    let count = 0;
    for (let i = semana.length - 1; i >= 0; i--) {
      const d = semana[i];
      if (!d.isWorkDay) continue;
      if (d.pausas > 0) count++;
      else break;
    }
    return count;
  })();

  // Weekly average
  const workDays = semana.filter((d) => d.isWorkDay);
  const avgPercent =
    workDays.length > 0
      ? Math.round(workDays.reduce((acc, d) => acc + d.percentual, 0) / workDays.length)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Today's progress + Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Today */}
        <div className="col-span-1 p-3 rounded-xl bg-card border border-border text-center">
          <div className="relative w-12 h-12 mx-auto mb-1.5">
            <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
              <circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="3"
              />
              <motion.circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${todayPercent * 0.975} 97.5`}
                initial={{ strokeDasharray: "0 97.5" }}
                animate={{ strokeDasharray: `${todayPercent * 0.975} 97.5` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
              {hoje}/{metaHoje}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Hoje</p>
        </div>

        {/* Streak */}
        <div className="p-3 rounded-xl bg-card border border-border text-center flex flex-col items-center justify-center">
          <Flame size={18} className={streak > 0 ? "text-accent mb-1" : "text-muted-foreground mb-1"} />
          <p className="text-lg font-bold text-foreground">{streak}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Sequência</p>
        </div>

        {/* Weekly avg */}
        <div className="p-3 rounded-xl bg-card border border-border text-center flex flex-col items-center justify-center">
          <TrendingUp size={18} className="text-primary mb-1" />
          <p className="text-lg font-bold text-foreground">{avgPercent}%</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Média</p>
        </div>
      </div>

      {/* Weekly heatmap */}
      <div className="p-3 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-1.5 mb-3">
          <Target size={13} className="text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Aderência Semanal</span>
        </div>
        <div className="flex gap-1.5">
          {semana.map((d) => (
            <div key={d.data} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                  !d.isWorkDay
                    ? "bg-muted/30 text-muted-foreground/40"
                    : d.percentual >= 80
                    ? "bg-primary text-primary-foreground"
                    : d.percentual >= 50
                    ? "bg-primary/40 text-foreground"
                    : d.percentual > 0
                    ? "bg-primary/15 text-foreground"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {d.isWorkDay ? d.pausas : "–"}
              </div>
              <span className="text-[9px] text-muted-foreground capitalize">{d.dia}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
