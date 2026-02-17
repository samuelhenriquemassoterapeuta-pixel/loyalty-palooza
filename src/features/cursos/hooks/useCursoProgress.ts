import { useState, useCallback, useMemo } from "react";

/**
 * Shared hook for managing course progress via localStorage.
 * Each course uses a unique storageKey to persist progress independently.
 */
export function useCursoProgress(storageKey: string, totalAulas: number) {
  const [localProgress, setLocalProgress] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const getAulaKey = (mi: number, ai: number) => `${mi}-${ai}`;

  const isComplete = useCallback(
    (mi: number, ai: number) => localProgress.has(getAulaKey(mi, ai)),
    [localProgress]
  );

  const toggle = useCallback(
    (mi: number, ai: number) => {
      setLocalProgress((prev) => {
        const next = new Set(prev);
        const key = getAulaKey(mi, ai);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        localStorage.setItem(storageKey, JSON.stringify([...next]));
        return next;
      });
    },
    [storageKey]
  );

  const completedCount = localProgress.size;
  const pct = totalAulas > 0 ? Math.round((completedCount / totalAulas) * 100) : 0;

  const moduloAulasCompleted = useCallback(
    (mi: number, moduloAulasCount: number) => {
      let count = 0;
      for (let ai = 0; ai < moduloAulasCount; ai++) {
        if (localProgress.has(getAulaKey(mi, ai))) count++;
      }
      return count;
    },
    [localProgress]
  );

  return { isComplete, toggle, completedCount, pct, moduloAulasCompleted };
}
