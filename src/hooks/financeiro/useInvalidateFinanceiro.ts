import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateFinanceiro() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["resumo-financeiro"] });
    queryClient.invalidateQueries({ queryKey: ["fluxo-caixa-diario"] });
    queryClient.invalidateQueries({ queryKey: ["fluxo-caixa-mensal"] });
    queryClient.invalidateQueries({ queryKey: ["dre"] });
    queryClient.invalidateQueries({ queryKey: ["kpis-financeiros"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-financeiro-master"] });
    queryClient.invalidateQueries({ queryKey: ["aging-recebiveis"] });
    queryClient.invalidateQueries({ queryKey: ["resumo-repasses"] });
    queryClient.invalidateQueries({ queryKey: ["resumo-reembolsos"] });
    queryClient.invalidateQueries({ queryKey: ["conciliacao-asaas"] });
  };
}
