import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface SugestaoCashback {
  titulo: string;
  descricao: string;
  tipo: "agendamento" | "compra" | "indicacao" | "streak" | "tier";
  prioridade: "alta" | "media" | "baixa";
}

interface CashbackInteligenteData {
  sugestoes: SugestaoCashback[];
  mensagem_motivacional: string;
}

export const useCashbackInteligente = () => {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cashback-inteligente", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("cashback-inteligente");
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Erro ao gerar sugestões");
      return data as CashbackInteligenteData & { success: boolean };
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 1,
  });

  return {
    sugestoes: data?.sugestoes ?? [],
    mensagem: data?.mensagem_motivacional ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
};
