import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface UserStreak {
  streak_atual: number;
  melhor_streak: number;
  ultima_semana_contada: string | null;
  bonus_total_creditado: number;
}

export const useUserStreak = () => {
  const { user } = useAuth();

  const { data: streak, isLoading } = useQuery({
    queryKey: ["user-streak", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (error) throw error;
      return data as UserStreak | null;
    },
    staleTime: 60_000,
  });

  // Calculate next milestone
  const streakAtual = streak?.streak_atual ?? 0;
  const nextMilestone = streakAtual < 4 ? 4 : streakAtual < 8 ? 8 : streakAtual < 12 ? 12 : null;
  const nextBonus = nextMilestone ? nextMilestone * 2.5 : null;

  return {
    streak: streak ?? { streak_atual: 0, melhor_streak: 0, ultima_semana_contada: null, bonus_total_creditado: 0 },
    loading: isLoading,
    nextMilestone,
    nextBonus,
  };
};
