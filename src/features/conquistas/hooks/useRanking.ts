import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface RankingEntry {
  posicao: number;
  nome_exibicao: string;
  tier_nome: string;
  total_sessoes: number;
  total_gasto: number;
  is_current_user: boolean;
}

export function useRanking(limit = 20) {
  const { user } = useAuth();

  const { data: ranking = [], isLoading } = useQuery({
    queryKey: ["achievements_ranking", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_achievements_ranking", {
        p_limit: limit,
      });
      if (error) throw error;
      return (data || []) as RankingEntry[];
    },
    staleTime: 60_000,
  });

  const myPosition = ranking.find((r) => r.is_current_user)?.posicao ?? null;

  return { ranking, myPosition, isLoading };
}
