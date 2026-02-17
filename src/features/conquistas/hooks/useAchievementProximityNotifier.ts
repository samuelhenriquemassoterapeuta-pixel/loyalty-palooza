import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Achievement } from "./useAchievements";

const STORAGE_KEY = "achievement_proximity_notified";

/** Threshold: notify when the user is this many steps away from unlocking */
const PROXIMITY_THRESHOLD = 1;

interface NotifiedMap {
  [achievementId: string]: number; // target value when notification was sent
}

function getNotifiedMap(): NotifiedMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function markNotified(achievementId: string, target: number) {
  const map = getNotifiedMap();
  map[achievementId] = target;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function wasAlreadyNotified(achievementId: string, target: number): boolean {
  const map = getNotifiedMap();
  return map[achievementId] === target;
}

const achievementMessages: Record<string, (remaining: number) => string> = {
  five_sessions: (r) => `Faltam apenas ${r} sessão(ões) para desbloquear a conquista "Frequente"! ⭐`,
  ten_sessions: (r) => `Faltam apenas ${r} sessão(ões) para desbloquear a conquista "Dedicada"! 🏆`,
  loyal_customer: (r) => `Faltam apenas ${r} sessão(ões) para a conquista "Clientela VIP"! 👑`,
  cashback_50: (r) => `Falta pouco para acumular R$ 50 em cashback e desbloquear "Economista"! 💎`,
  five_referrals: (r) => `Faltam apenas ${r} indicação(ões) para desbloquear "Influenciadora"! 🌟`,
  five_purchases: (r) => `Faltam apenas ${r} compra(s) para desbloquear "Compradora Fiel"! 🛒`,
  streak_7: (r) => `Faltam apenas ${r} dia(s) de registro para desbloquear "Constância"! 🔥`,
  secret_streak_14: (r) => `Faltam apenas ${r} dia(s) de registro para desbloquear uma conquista secreta! 🔮`,
  secret_cashback_100: () => `Você está quase lá para desbloquear uma conquista secreta de cashback! ✨`,
  secret_ten_referrals: (r) => `Faltam apenas ${r} indicação(ões) para uma conquista secreta! 💫`,
};

/**
 * Monitors achievement progress and creates in-app notifications
 * when the user is close to unlocking an achievement.
 * Uses localStorage for deduplication to avoid spamming.
 */
export function useAchievementProximityNotifier(achievements: Achievement[]) {
  const { user } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!user || achievements.length === 0 || hasRun.current) return;
    hasRun.current = true;

    const createProximityNotifications = async () => {
      // Only check non-unlocked, multi-step achievements (target > 1)
      const candidates = achievements.filter(
        (a) => !a.unlocked && a.target > 1 && a.current >= a.target - PROXIMITY_THRESHOLD
      );

      for (const achievement of candidates) {
        if (wasAlreadyNotified(achievement.id, achievement.target)) continue;

        const remaining = achievement.target - achievement.current;
        const messageFn = achievementMessages[achievement.id];
        if (!messageFn) continue;

        const mensagem = messageFn(remaining);

        try {
          await supabase.from("notificacoes").insert({
            user_id: user.id,
            titulo: "Conquista quase desbloqueada! 🎯",
            mensagem,
            tipo: "conquista",
          });

          markNotified(achievement.id, achievement.target);
        } catch {
          // Fail silently — non-critical feature
        }
      }
    };

    createProximityNotifications();
  }, [user, achievements]);
}
