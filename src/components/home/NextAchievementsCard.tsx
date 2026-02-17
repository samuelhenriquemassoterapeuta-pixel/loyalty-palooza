import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Target } from "lucide-react";
import { Achievement } from "@/features/conquistas/hooks/useAchievements";

interface Props {
  achievements: Achievement[];
}

const categoryColors: Record<string, string> = {
  agendamento: "bg-info/15 text-info",
  cashback: "bg-highlight/15 text-highlight",
  protocolo: "bg-warning/15 text-warning",
  social: "bg-accent/15 text-accent",
  loja: "bg-primary/15 text-primary",
};

const categoryLabels: Record<string, string> = {
  agendamento: "Sessões",
  cashback: "Cashback",
  protocolo: "Protocolo",
  social: "Social",
  loja: "Loja",
};

const progressBarColors: Record<string, string> = {
  agendamento: "bg-info",
  cashback: "bg-highlight",
  protocolo: "bg-warning",
  social: "bg-accent",
  loja: "bg-primary",
};

export const NextAchievementsCard = ({ achievements }: Props) => {
  const navigate = useNavigate();

  // Filter locked non-secret achievements with some progress, sorted by proximity to unlock
  const upcoming = achievements
    .filter((a) => !a.unlocked && !a.secret && a.progress > 0)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  // If no partial progress, pick the first 2 locked non-secret ones
  const display =
    upcoming.length > 0
      ? upcoming
      : achievements
          .filter((a) => !a.unlocked && !a.secret)
          .slice(0, 2);

  if (display.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="glass-card-strong rounded-2xl p-4 space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/15">
            <Target size={16} className="text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            Próximas conquistas
          </h3>
        </div>
        <button
          onClick={() => navigate("/conquistas")}
          className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Ver todas
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Achievement items */}
      <div className="space-y-2.5">
        {display.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3"
          >
            {/* Emoji icon */}
            <div className="text-xl leading-none mt-0.5 shrink-0">
              {achievement.icon}
            </div>

            {/* Info + progress */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {achievement.name}
                </p>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
                    categoryColors[achievement.category] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {categoryLabels[achievement.category] ?? achievement.category}
                </span>
              </div>

              {/* Description with remaining count */}
              <p className="text-xs text-muted-foreground leading-tight">
                {achievement.current < achievement.target
                  ? `${achievement.current}/${achievement.target} — faltam ${
                      achievement.target - achievement.current
                    }`
                  : achievement.description}
              </p>

              {/* Progress bar */}
              <div className="relative h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    progressBarColors[achievement.category] ?? "bg-primary"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${achievement.progress}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.1,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
