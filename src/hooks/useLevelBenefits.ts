import { useMemo } from "react";
import { useAchievements } from "./useAchievements";
import { calculateXpFromAchievements, getLevelFromXp } from "@/components/conquistas/xpLevelUtils";

export interface LevelBenefits {
  /** Current XP level number (1-7) */
  level: number;
  /** Level name (e.g. "Curiosa", "Iniciante") */
  levelName: string;
  /** Level icon emoji */
  levelIcon: string;
  /** Active store discount percentage (0-15) */
  storeDiscountPercent: number;
  /** Active cashback bonus percentage (0-30) */
  cashbackBonusPercent: number;
  /** Whether user has priority scheduling */
  hasPriorityScheduling: boolean;
  /** Whether user has early access to products */
  hasEarlyAccess: boolean;
  /** Whether user is VIP */
  isVip: boolean;
}

/**
 * Calculates the active benefits based on the user's XP level.
 * Benefits are cumulative by replacement — only the highest tier applies.
 *
 * Level 1: No benefits (welcome only)
 * Level 2: 5% store discount, +5% cashback bonus
 * Level 3: +10% cashback bonus, priority scheduling
 * Level 4: 10% store discount, bonus session perk
 * Level 5: +20% cashback bonus, early access
 * Level 6: 15% store discount, +30% cashback bonus
 * Level 7: VIP club (all above + exclusive perks)
 */
export function useLevelBenefits(): LevelBenefits {
  const { achievements } = useAchievements();

  return useMemo(() => {
    const totalXp = calculateXpFromAchievements(achievements);
    const levelInfo = getLevelFromXp(totalXp);
    const lvl = levelInfo.level;

    // Store discount: highest applicable
    let storeDiscountPercent = 0;
    if (lvl >= 6) storeDiscountPercent = 15;
    else if (lvl >= 4) storeDiscountPercent = 10;
    else if (lvl >= 2) storeDiscountPercent = 5;

    // Cashback bonus: highest applicable
    let cashbackBonusPercent = 0;
    if (lvl >= 6) cashbackBonusPercent = 30;
    else if (lvl >= 5) cashbackBonusPercent = 20;
    else if (lvl >= 3) cashbackBonusPercent = 10;
    else if (lvl >= 2) cashbackBonusPercent = 5;

    return {
      level: lvl,
      levelName: levelInfo.name,
      levelIcon: levelInfo.icon,
      storeDiscountPercent,
      cashbackBonusPercent,
      hasPriorityScheduling: lvl >= 3,
      hasEarlyAccess: lvl >= 5,
      isVip: lvl >= 7,
    };
  }, [achievements]);
}
