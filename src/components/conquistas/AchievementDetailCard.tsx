import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import type { Achievement } from "@/hooks/useAchievements";

interface AchievementDetailCardProps {
  achievement: Achievement;
  index: number;
}

export const AchievementDetailCard = ({
  achievement,
  index,
}: AchievementDetailCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`
        flex items-center gap-3 p-3.5 rounded-xl border transition-all
        ${
          achievement.unlocked
            ? "glass-card-strong border-primary/20 shadow-sm"
            : "bg-muted/30 border-border/40"
        }
      `}
    >
      {/* Badge Icon */}
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0
          ${
            achievement.unlocked
              ? "bg-primary/15 border border-primary/30"
              : "bg-muted/60 border border-border/40 grayscale opacity-60"
          }
        `}
      >
        {achievement.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={`font-semibold text-sm truncate ${
              achievement.unlocked ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {achievement.name}
          </p>
          {achievement.unlocked && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
              ✓
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {achievement.description}
        </p>

        {/* Progress bar for locked */}
        {!achievement.unlocked && (
          <div className="flex items-center gap-2 mt-1.5">
            <Progress value={achievement.progress} className="h-1.5 flex-1" />
            <span className="text-[10px] text-muted-foreground font-medium flex-shrink-0">
              {achievement.current}/{achievement.target}
            </span>
          </div>
        )}
      </div>

      {/* Category badge */}
      <CategoryBadge category={achievement.category} />
    </motion.div>
  );
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  agendamento: {
    label: "Sessões",
    color: "text-info bg-info/10",
  },
  cashback: {
    label: "Cashback",
    color: "text-highlight bg-highlight/10",
  },
  protocolo: {
    label: "Protocolo",
    color: "text-warning bg-warning/10",
  },
  social: {
    label: "Social",
    color: "text-accent bg-accent/10",
  },
};

const CategoryBadge = ({ category }: { category: string }) => {
  const config = categoryConfig[category] || categoryConfig.social;
  return (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${config.color}`}
    >
      {config.label}
    </span>
  );
};
