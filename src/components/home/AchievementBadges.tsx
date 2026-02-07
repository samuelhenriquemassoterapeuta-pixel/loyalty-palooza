import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Achievement } from "@/hooks/useAchievements";

interface AchievementBadgesProps {
  achievements: Achievement[];
  totalUnlocked: number;
}

export const AchievementBadges = ({
  achievements,
  totalUnlocked,
}: AchievementBadgesProps) => {
  // Show unlocked first, then closest to completion
  const sorted = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return b.progress - a.progress;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-border/60 bg-card p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="text-primary" size={16} />
          <h3 className="font-semibold text-foreground text-sm">Conquistas</h3>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {totalUnlocked}/{achievements.length}
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-4 gap-2">
        {sorted.slice(0, 8).map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </motion.div>
  );
};

const BadgeItem = ({ badge }: { badge: Achievement }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center gap-1"
    >
      <div
        className={`
          relative w-12 h-12 rounded-xl flex items-center justify-center text-lg
          transition-all duration-200
          ${
            badge.unlocked
              ? "bg-primary/15 border border-primary/30 shadow-sm"
              : "bg-muted/50 border border-border/40 grayscale opacity-60"
          }
        `}
      >
        <span className={badge.unlocked ? "" : "opacity-50"}>
          {badge.icon}
        </span>
        {badge.unlocked && (
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center">
            <span className="text-[8px] text-primary-foreground">✓</span>
          </div>
        )}
      </div>

      <p
        className={`text-[10px] text-center leading-tight line-clamp-2 ${
          badge.unlocked ? "text-foreground font-medium" : "text-muted-foreground"
        }`}
      >
        {badge.name}
      </p>

      {!badge.unlocked && badge.progress > 0 && (
        <Progress
          value={badge.progress}
          className="h-1 w-10"
        />
      )}

      {/* Tooltip on hover (desktop) */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 hidden group-hover:block pointer-events-none">
        <div className="bg-popover border border-border rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap">
          <p className="text-xs font-medium text-foreground">{badge.name}</p>
          <p className="text-[10px] text-muted-foreground">{badge.description}</p>
          {!badge.unlocked && (
            <p className="text-[10px] text-primary mt-0.5">
              {badge.current}/{badge.target}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
