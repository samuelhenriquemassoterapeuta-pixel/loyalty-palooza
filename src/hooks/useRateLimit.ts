import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RateLimitStatus {
  isBlocked: boolean;
  attemptsCount: number;
  nextAttemptAt: string | null;
  remainingAttempts: number;
}

export const useRateLimit = () => {
  const [rateLimitStatus, setRateLimitStatus] = useState<RateLimitStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkRateLimit = useCallback(async (email: string): Promise<RateLimitStatus | null> => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-rate-limit", {
        body: { email, action: "check" },
      });

      if (error) {
        console.error("Rate limit check error:", error);
        // If the check fails, allow the login attempt (fail open for UX)
        return null;
      }

      const status: RateLimitStatus = {
        isBlocked: data.isBlocked || false,
        attemptsCount: data.attemptsCount || 0,
        nextAttemptAt: data.nextAttemptAt || null,
        remainingAttempts: data.remainingAttempts ?? 5,
      };

      setRateLimitStatus(status);
      return status;
    } catch (error) {
      console.error("Rate limit check failed:", error);
      return null;
    } finally {
      setIsChecking(false);
    }
  }, []);

  const recordAttempt = useCallback(async (email: string, success: boolean): Promise<void> => {
    try {
      await supabase.functions.invoke("check-rate-limit", {
        body: { email, action: "record", success },
      });

      // If it was a failed attempt, update the local status
      if (!success && rateLimitStatus) {
        setRateLimitStatus({
          ...rateLimitStatus,
          attemptsCount: rateLimitStatus.attemptsCount + 1,
          remainingAttempts: Math.max(0, rateLimitStatus.remainingAttempts - 1),
          isBlocked: rateLimitStatus.attemptsCount + 1 >= 5,
        });
      } else if (success) {
        // Reset on successful login
        setRateLimitStatus(null);
      }
    } catch (error) {
      console.error("Failed to record login attempt:", error);
    }
  }, [rateLimitStatus]);

  const getTimeUntilUnblock = useCallback((): string | null => {
    if (!rateLimitStatus?.nextAttemptAt) return null;
    
    const nextAttempt = new Date(rateLimitStatus.nextAttemptAt);
    const now = new Date();
    const diffMs = nextAttempt.getTime() - now.getTime();
    
    if (diffMs <= 0) return null;
    
    const diffMins = Math.ceil(diffMs / 60000);
    if (diffMins === 1) return "1 minuto";
    return `${diffMins} minutos`;
  }, [rateLimitStatus]);

  return {
    rateLimitStatus,
    isChecking,
    checkRateLimit,
    recordAttempt,
    getTimeUntilUnblock,
  };
};
