import { useEffect, useRef, useState, useCallback } from "react";
import type { Achievement } from "./useAchievements";
import { calculateXpFromAchievements, getLevelFromXp } from "@/components/conquistas/xpLevelUtils";

interface LevelUpState {
  isOpen: boolean;
  levelName: string;
  levelIcon: string;
  levelNumber: number;
}

export function useLevelUpCelebration(achievements: Achievement[]) {
  const [celebration, setCelebration] = useState<LevelUpState>({
    isOpen: false,
    levelName: "",
    levelIcon: "",
    levelNumber: 0,
  });

  const prevLevelRef = useRef<number | null>(null);

  useEffect(() => {
    if (achievements.length === 0) return;

    const totalXp = calculateXpFromAchievements(achievements);
    const level = getLevelFromXp(totalXp);

    if (prevLevelRef.current === null) {
      // First render — just set the ref
      prevLevelRef.current = level.level;
      return;
    }

    if (level.level > prevLevelRef.current) {
      setCelebration({
        isOpen: true,
        levelName: level.name,
        levelIcon: level.icon,
        levelNumber: level.level,
      });
    }

    prevLevelRef.current = level.level;
  }, [achievements]);

  const dismiss = useCallback(() => {
    setCelebration((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return { celebration, dismiss };
}
