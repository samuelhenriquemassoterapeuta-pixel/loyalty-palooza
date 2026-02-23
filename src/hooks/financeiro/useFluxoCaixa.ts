import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FluxoCaixaMes {
  mes: string;
  entradas: number;
  saidas: number;
  saldo_mes: number;
  saldo_acumulado: number;
}

export function useFluxoCaixa(meses = 6) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fluxo-caixa", meses],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_fluxo_caixa" as any, { p_meses: meses });
      if (error) throw error;
      return data as unknown as FluxoCaixaMes[];
    },
    staleTime: 2 * 60 * 1000,
  });

  return { fluxo: data ?? [], isLoading, refetch };
}
