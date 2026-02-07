import { motion } from "framer-motion";
import { Gift, Lock, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { LEVEL_REWARDS, TAG_STYLES, type LevelReward } from "./levelRewardsConfig";
import { LEVELS } from "./xpLevelUtils";

interface LevelRewardsCardProps {
  currentLevel: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export const LevelRewardsCard = ({ currentLevel }: LevelRewardsCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const unlockedRewards = LEVEL_REWARDS.filter((r) => r.requiredLevel <= currentLevel);
  const lockedRewards = LEVEL_REWARDS.filter((r) => r.requiredLevel > currentLevel);

  // Show all unlocked + next 2 locked when collapsed
  const visibleLocked = expanded ? lockedRewards : lockedRewards.slice(0, 2);
  const hiddenCount = expanded ? 0 : Math.max(lockedRewards.length - 2, 0);

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <Gift size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">Recompensas por Nível</h3>
          <p className="text-[11px] text-muted-foreground">
            {unlockedRewards.length} de {LEVEL_REWARDS.length} desbloqueadas
          </p>
        </div>
      </div>

      {/* Reward items */}
      <div className="px-3 pb-3 space-y-1.5">
        {/* Unlocked rewards */}
        {unlockedRewards.map((reward, i) => (
          <RewardItem key={`u-${i}`} reward={reward} isUnlocked index={i} />
        ))}

        {/* Locked rewards */}
        {visibleLocked.map((reward, i) => (
          <RewardItem
            key={`l-${i}`}
            reward={reward}
            isUnlocked={false}
            index={unlockedRewards.length + i}
          />
        ))}

        {/* Show more / less */}
        {lockedRewards.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp size={14} />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown size={14} />
                Ver mais {hiddenCount} recompensas
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

interface RewardItemProps {
  reward: LevelReward;
  isUnlocked: boolean;
  index: number;
}

const RewardItem = ({ reward, isUnlocked, index }: RewardItemProps) => {
  const tagStyle = TAG_STYLES[reward.tag];
  const levelInfo = LEVELS.find((l) => l.level === reward.requiredLevel);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay: index * 0.04 }}
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
        isUnlocked
          ? "bg-primary/5 border border-primary/15"
          : "bg-muted/30 border border-border/30 opacity-60"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
          isUnlocked
            ? "bg-primary/15"
            : "bg-muted/60 grayscale"
        }`}
      >
        {isUnlocked ? reward.icon : <Lock size={16} className="text-muted-foreground" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p
            className={`text-sm font-semibold truncate ${
              isUnlocked ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {reward.title}
          </p>
          {isUnlocked && (
            <CheckCircle2 size={13} className="text-primary shrink-0" />
          )}
        </div>
        <p
          className={`text-[11px] leading-tight ${
            isUnlocked ? "text-muted-foreground" : "text-muted-foreground/60"
          }`}
        >
          {reward.description}
        </p>
      </div>

      {/* Tag + Level */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tagStyle.className}`}
        >
          {tagStyle.label}
        </span>
        <span className="text-[9px] text-muted-foreground font-medium">
          {levelInfo?.icon} Nv.{reward.requiredLevel}
        </span>
      </div>
    </motion.div>
  );
};
