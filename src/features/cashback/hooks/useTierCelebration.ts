import { useState, useEffect, useCallback } from "react";
import { useUserTier, type UserTier, type TierName } from "./useUserTier";

const TIER_ORDER: TierName[] = ["Bronze", "Prata", "Ouro"];
const STORAGE_KEY = "resinkra_last_tier";

export const useTierCelebration = () => {
  const { tier, loading } = useUserTier();
  const [celebration, setCelebration] = useState<{
    tierName: TierName;
    multiplier: number;
  } | null>(null);

  useEffect(() => {
    if (loading || !tier) return;

    const currentTier = tier.tier_name as TierName;
    const savedTier = localStorage.getItem(STORAGE_KEY) as TierName | null;

    if (savedTier && TIER_ORDER.includes(savedTier) && TIER_ORDER.includes(currentTier)) {
      const prevIndex = TIER_ORDER.indexOf(savedTier);
      const currIndex = TIER_ORDER.indexOf(currentTier);

      if (currIndex > prevIndex) {
        setCelebration({
          tierName: currentTier,
          multiplier: tier.tier_multiplier,
        });
      }
    }

    localStorage.setItem(STORAGE_KEY, currentTier);
  }, [tier, loading]);

  const dismiss = useCallback(() => setCelebration(null), []);

  return { celebration, dismiss, tier, loading };
};
