import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Conquista {
  id: string;
  codigo: string;
  titulo: string;
  descricao: string;
  icone: string;
  categoria: string;
  condicao_tipo: string;
  condicao_valor: number;
  recompensa_valor: number;
  secreta: boolean;
  ordem: number;
}

export interface UsuarioConquista {
  id: string;
  user_id: string;
  conquista_id: string;
  desbloqueada_em: string;
}

export interface ConquistaComStatus extends Conquista {
  desbloqueada: boolean;
  desbloqueada_em: string | null;
}

export const useConquistas = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["conquistas", user?.id],
    enabled: !!user,
    queryFn: async () => {
      // Fetch all achievements
      const { data: conquistas, error: cError } = await supabase
        .from("conquistas")
        .select("*")
        .eq("ativo", true)
        .order("ordem");

      if (cError) throw cError;

      // Fetch user's unlocked achievements
      const { data: userConquistas, error: ucError } = await supabase
        .from("usuario_conquistas")
        .select("*")
        .eq("user_id", user!.id);

      if (ucError) throw ucError;

      const unlockedMap = new Map(
        (userConquistas || []).map((uc: UsuarioConquista) => [uc.conquista_id, uc.desbloqueada_em])
      );

      const result: ConquistaComStatus[] = (conquistas || []).map((c: Conquista) => ({
        ...c,
        desbloqueada: unlockedMap.has(c.id),
        desbloqueada_em: unlockedMap.get(c.id) || null,
      }));

      return result;
    },
    staleTime: 60_000,
  });

  const checkAchievements = async () => {
    if (!user) return [];
    const { data, error } = await supabase.rpc("check_and_unlock_achievements", {
      p_user_id: user.id,
    });
    if (error) {
      console.error("Erro ao verificar conquistas:", error);
      return [];
    }
    if (data && data.length > 0) {
      queryClient.invalidateQueries({ queryKey: ["conquistas"] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    }
    return data || [];
  };

  const totalDesbloqueadas = data?.filter((c) => c.desbloqueada).length ?? 0;
  const totalConquistas = data?.length ?? 0;
  const progresso = totalConquistas > 0 ? Math.round((totalDesbloqueadas / totalConquistas) * 100) : 0;

  return {
    conquistas: data ?? [],
    totalDesbloqueadas,
    totalConquistas,
    progresso,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    checkAchievements,
  };
};
