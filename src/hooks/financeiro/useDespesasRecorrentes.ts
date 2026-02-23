import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DespesaRecorrente {
  id: string;
  descricao: string;
  valor: number;
  categoria_id: string | null;
  fornecedor_id: string | null;
  frequencia: string;
  dia_vencimento: number;
  forma_pagamento: string | null;
  data_inicio: string;
  data_fim: string | null;
  ativo: boolean;
  ultima_geracao: string | null;
  total_gerado: number;
  observacoes: string | null;
}

export function useDespesasRecorrentes() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["despesas-recorrentes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("despesas_recorrentes" as any)
        .select(`*, categoria:categorias_financeiras(nome, cor, icone), fornecedor:fornecedores(nome)`)
        .order("descricao");
      if (error) throw error;
      return data as any[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { mutateAsync: criarRecorrente, isPending: isCriando } = useMutation({
    mutationFn: async (despesa: Partial<DespesaRecorrente>) => {
      const { data, error } = await supabase
        .from("despesas_recorrentes" as any).insert(despesa as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["despesas-recorrentes"] });
      toast.success("Despesa recorrente criada");
    },
    onError: () => toast.error("Erro ao criar despesa recorrente"),
  });

  const { mutateAsync: editarRecorrente } = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DespesaRecorrente> & { id: string }) => {
      const { error } = await supabase.from("despesas_recorrentes" as any).update(updates as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["despesas-recorrentes"] });
      toast.success("Despesa recorrente atualizada");
    },
  });

  const { mutateAsync: toggleRecorrente } = useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase.from("despesas_recorrentes" as any).update({ ativo } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["despesas-recorrentes"] });
      toast.success(vars.ativo ? "Despesa reativada" : "Despesa pausada");
    },
  });

  const { mutateAsync: gerarContasMes, isPending: isGerando } = useMutation({
    mutationFn: async (mes?: string) => {
      const { data, error } = await supabase.rpc("gerar_contas_recorrentes" as any, {
        p_mes: mes || new Date().toISOString().split("T")[0],
      });
      if (error) throw error;
      return data as any;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["contas-pagar"] });
      queryClient.invalidateQueries({ queryKey: ["despesas-recorrentes"] });
      toast.success(`${data.contas_geradas} conta(s) gerada(s) para o mês`);
    },
    onError: () => toast.error("Erro ao gerar contas"),
  });

  const custoMensalTotal = (data ?? [])
    .filter((d: any) => d.ativo && d.frequencia === "mensal")
    .reduce((s: number, d: any) => s + d.valor, 0);

  return {
    recorrentes: data ?? [], custoMensalTotal, isLoading,
    criarRecorrente, editarRecorrente, toggleRecorrente, gerarContasMes,
    isCriando, isGerando,
  };
}
