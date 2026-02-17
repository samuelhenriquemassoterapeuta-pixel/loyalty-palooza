import { useState, useEffect, useCallback, useRef } from "react";
import { useAchievements, type Achievement } from "@/features/conquistas/hooks/useAchievements";

const STORAGE_KEY = "resinkra_unlocked_achievements";
const SESSION_KEY = "resinkra_celebration_checked";

export const useAchievementCelebration = () => {
  const { achievements, totalUnlocked } = useAchievements();
  const [celebration, setCelebration] = useState<Achievement | null>(null);
  const [queue, setQueue] = useState<Achievement[]>([]);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (achievements.length === 0 || hasChecked.current) return;

    // Only run the check once per session
    const alreadyCheckedThisSession = sessionStorage.getItem(SESSION_KEY);
    if (alreadyCheckedThisSession) {
      hasChecked.current = true;
      // Still persist current state
      const currentUnlockedIds = achievements.filter((a) => a.unlocked).map((a) => a.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUnlockedIds));
      return;
    }

    hasChecked.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");

    const savedRaw = localStorage.getItem(STORAGE_KEY);
    const savedIds: string[] = savedRaw ? JSON.parse(savedRaw) : [];

    const currentUnlockedIds = achievements
      .filter((a) => a.unlocked)
      .map((a) => a.id);

    // Find newly unlocked (present in current but not in saved)
    const newlyUnlocked = achievements.filter(
      (a) => a.unlocked && !savedIds.includes(a.id)
    );

    // Always persist current state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUnlockedIds));

    // Only celebrate if there were previously saved ids (not first load ever)
    if (savedRaw && newlyUnlocked.length > 0) {
      setQueue(newlyUnlocked);
    }
  }, [achievements]);

  // Show next in queue when no celebration is active
  useEffect(() => {
    if (!celebration && queue.length > 0) {
      setCelebration(queue[0]);
      setQueue((q) => q.slice(1));
    }
  }, [celebration, queue]);

  const dismiss = useCallback(() => setCelebration(null), []);

  return { celebration, dismiss, achievements, totalUnlocked };
};
