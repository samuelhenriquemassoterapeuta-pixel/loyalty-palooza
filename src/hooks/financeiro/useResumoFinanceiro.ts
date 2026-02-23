import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useResumoFinanceiro(dataInicio?: string, dataFim?: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["resumo-financeiro", dataInicio, dataFim],
    queryFn: async () => {
      const params: any = {};
      if (dataInicio) params.p_data_inicio = dataInicio;
      if (dataFim) params.p_data_fim = dataFim;
      const { data, error } = await supabase.rpc("get_resumo_financeiro" as any, params);
      if (error) throw error;
      return data as any;
    },
    staleTime: 2 * 60 * 1000,
  });

  return {
    resumo: data,
    receitas: data?.receitas ?? 0,
    despesasPagas: data?.despesas_pagas ?? 0,
    despesasPendentes: data?.despesas_pendentes ?? 0,
    despesasVencidas: data?.despesas_vencidas ?? 0,
    saldo: data?.saldo ?? 0,
    margem: data?.margem_percentual ?? 0,
    receitasPorCategoria: data?.receitas_por_categoria ?? [],
    despesasPorCategoria: data?.despesas_por_categoria ?? [],
    contasVencendo: data?.contas_vencendo_7d ?? [],
    isLoading, refetch,
  };
}
