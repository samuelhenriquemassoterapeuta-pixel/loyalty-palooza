import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DREData {
  periodo: { inicio: string; fim: string };
  receitas: {
    servicos: number;
    produtos: number;
    assinaturas: number;
    total: number;
  };
  despesas: {
    fixas: number;
    variaveis: number;
    pessoal: number;
    marketing: number;
    impostos: number;
    outras: number;
    total: number;
  };
  resultado: {
    lucro_bruto: number;
    lucro_operacional: number;
    lucro_liquido: number;
    margem_bruta: number;
    margem_liquida: number;
  };
}

export function useDRE(dataInicio?: string, dataFim?: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dre", dataInicio, dataFim],
    queryFn: async () => {
      const params: any = {};
      if (dataInicio) params.p_data_inicio = dataInicio;
      if (dataFim) params.p_data_fim = dataFim;
      const { data, error } = await supabase.rpc("get_dre" as any, params);
      if (error) throw error;
      return data as unknown as DREData;
    },
    staleTime: 2 * 60 * 1000,
  });

  return { dre: data, isLoading, refetch };
}
