import { motion } from "framer-motion";
import {
  Gift,
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Tag,
  Percent,
  CalendarCheck,
  Sparkles,
  Crown,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { LEVEL_REWARDS, TAG_STYLES, type LevelReward } from "./levelRewardsConfig";
import { LEVELS } from "./xpLevelUtils";
import { useLevelBenefits } from "@/hooks/useLevelBenefits";

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
  const benefits = useLevelBenefits();

  const unlockedRewards = LEVEL_REWARDS.filter((r) => r.requiredLevel <= currentLevel);
  const lockedRewards = LEVEL_REWARDS.filter((r) => r.requiredLevel > currentLevel);

  // Next reward to unlock
  const nextReward = lockedRewards.length > 0 ? lockedRewards[0] : null;
  const nextLevel = nextReward
    ? LEVELS.find((l) => l.level === nextReward.requiredLevel)
    : null;

  // Show all unlocked + next 2 locked when collapsed
  const visibleLocked = expanded ? lockedRewards : lockedRewards.slice(0, 2);
  const hiddenCount = expanded ? 0 : Math.max(lockedRewards.length - 2, 0);

  const hasAnyBenefit = benefits.level >= 2;

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <Gift size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">Recompensas por Nível</h3>
          <p className="text-[11px] text-muted-foreground">
            {unlockedRewards.length} de {LEVEL_REWARDS.length} desbloqueadas
          </p>
        </div>
      </div>

      {/* Active Benefits Dashboard */}
      {hasAnyBenefit && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/15">
          <p className="text-[11px] font-semibold text-primary mb-2.5 flex items-center gap-1.5">
            <Sparkles size={12} />
            Benefícios ativos — Nível {benefits.levelName}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {benefits.storeDiscountPercent > 0 && (
              <BenefitStat
                icon={<Tag size={14} className="text-primary" />}
                value={`${benefits.storeDiscountPercent}%`}
                label="Desconto loja"
              />
            )}
            {benefits.cashbackBonusPercent > 0 && (
              <BenefitStat
                icon={<Percent size={14} className="text-highlight" />}
                value={`+${benefits.cashbackBonusPercent}%`}
                label="Bônus cashback"
              />
            )}
            {benefits.hasPriorityScheduling && (
              <BenefitStat
                icon={<CalendarCheck size={14} className="text-primary" />}
                value="Ativo"
                label="Agend. prioritário"
              />
            )}
            {benefits.hasEarlyAccess && (
              <BenefitStat
                icon={<Sparkles size={14} className="text-primary" />}
                value="Ativo"
                label="Acesso antecipado"
              />
            )}
            {benefits.isVip && (
              <BenefitStat
                icon={<Crown size={14} className="text-warning" />}
                value="VIP"
                label="Clube exclusivo"
              />
            )}
          </div>
        </div>
      )}

      {/* Next unlock teaser */}
      {nextReward && nextLevel && (
        <div className="mx-3 mb-3 p-2.5 rounded-xl bg-muted/40 border border-border/40 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center text-sm">
            <Lock size={14} className="text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground">
              Próximo desbloqueio
            </p>
            <p className="text-xs text-foreground font-medium truncate">
              {nextReward.title}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
            {nextLevel.icon} Nv.{nextLevel.level}
            <ArrowRight size={10} />
          </div>
        </div>
      )}

      {/* Reward items */}
      <div className="px-3 pb-3 space-y-1.5">
        {/* Unlocked rewards */}
        {unlockedRewards.map((reward, i) => (
          <RewardItem key={`u-${i}`} reward={reward} isUnlocked index={i} />
        ))}

        {/* Locked rewards */}
        {visibleLocked.map((reward, i) => {
          const isNext = i === 0 && !expanded;
          return (
            <RewardItem
              key={`l-${i}`}
              reward={reward}
              isUnlocked={false}
              isNext={isNext}
              index={unlockedRewards.length + i}
            />
          );
        })}

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

/* ── Stat mini-card ── */

interface BenefitStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const BenefitStat = ({ icon, value, label }: BenefitStatProps) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-background/60">
    {icon}
    <div className="min-w-0">
      <p className="text-sm font-bold text-foreground leading-none">{value}</p>
      <p className="text-[9px] text-muted-foreground truncate">{label}</p>
    </div>
  </div>
);

/* ── Reward item ── */

interface RewardItemProps {
  reward: LevelReward;
  isUnlocked: boolean;
  isNext?: boolean;
  index: number;
}

const RewardItem = ({ reward, isUnlocked, isNext, index }: RewardItemProps) => {
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
          : isNext
          ? "bg-muted/40 border border-dashed border-primary/30"
          : "bg-muted/30 border border-border/30 opacity-50"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
          isUnlocked
            ? "bg-primary/15"
            : isNext
            ? "bg-primary/10"
            : "bg-muted/60 grayscale"
        }`}
      >
        {isUnlocked ? (
          reward.icon
        ) : isNext ? (
          <span className="opacity-50">{reward.icon}</span>
        ) : (
          <Lock size={16} className="text-muted-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p
            className={`text-sm font-semibold truncate ${
              isUnlocked
                ? "text-foreground"
                : isNext
                ? "text-foreground/70"
                : "text-muted-foreground"
            }`}
          >
            {reward.title}
          </p>
          {isUnlocked && (
            <CheckCircle2 size={13} className="text-primary shrink-0" />
          )}
          {isNext && (
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary shrink-0">
              PRÓXIMO
            </span>
          )}
        </div>
        <p
          className={`text-[11px] leading-tight ${
            isUnlocked
              ? "text-muted-foreground"
              : isNext
              ? "text-muted-foreground/70"
              : "text-muted-foreground/50"
          }`}
        >
          {reward.description}
        </p>
      </div>

      {/* Tag + Level */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
            isUnlocked ? tagStyle.className : "bg-muted text-muted-foreground"
          }`}
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
