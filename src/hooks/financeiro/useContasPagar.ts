import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useInvalidateFinanceiro } from "./useInvalidateFinanceiro";

export interface ContaPagar {
  id: string;
  descricao: string;
  valor: number;
  valor_pago: number;
  categoria_id: string | null;
  fornecedor_id: string | null;
  data_emissao: string;
  data_vencimento: string;
  data_pagamento: string | null;
  status: "pendente" | "pago" | "parcial" | "vencido" | "cancelado" | "agendado";
  forma_pagamento: string | null;
  comprovante_url: string | null;
  numero_documento: string | null;
  codigo_barras: string | null;
  despesa_recorrente_id: string | null;
  parcela_atual: number | null;
  total_parcelas: number | null;
  observacoes: string | null;
  tags: string[];
  anexos: string[];
}

export interface ContaPagarComRelacionamentos {
  id: string;
  descricao: string;
  valor: number;
  valor_pago: number;
  categoria_nome: string | null;
  categoria_cor: string | null;
  fornecedor_nome: string | null;
  data_vencimento: string;
  data_pagamento: string | null;
  status: string;
  forma_pagamento: string | null;
  dias_vencimento: number;
  despesa_recorrente: boolean;
  created_at: string;
}

interface FiltrosContas {
  status?: string;
  categoriaId?: string;
  fornecedorId?: string;
  dataInicio?: string;
  dataFim?: string;
  limit?: number;
  offset?: number;
}

export function useContasPagar(filtros?: FiltrosContas) {
  const queryClient = useQueryClient();
  const invalidateAll = useInvalidateFinanceiro();

  const { data: contas, isLoading } = useQuery({
    queryKey: ["contas-pagar", filtros],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("listar_contas_pagar" as any, {
        p_status: filtros?.status || null,
        p_categoria_id: filtros?.categoriaId || null,
        p_fornecedor_id: filtros?.fornecedorId || null,
        p_data_inicio: filtros?.dataInicio || null,
        p_data_fim: filtros?.dataFim || null,
        p_limit: filtros?.limit || 50,
        p_offset: filtros?.offset || 0,
      });
      if (error) throw error;
      return data as unknown as ContaPagarComRelacionamentos[];
    },
  });

  const { mutateAsync: criarConta, isPending: isCriando } = useMutation({
    mutationFn: async (conta: Partial<ContaPagar>) => {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("contas_pagar" as any)
        .insert({ ...conta, criado_por: userData.user?.id } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas-pagar"] });
      invalidateAll();
      toast.success("Conta registrada com sucesso");
    },
    onError: (e: Error) => toast.error("Erro ao registrar: " + e.message),
  });

  const { mutateAsync: criarContaParcelada } = useMutation({
    mutationFn: async ({ conta, parcelas }: { conta: Partial<ContaPagar>; parcelas: number }) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      const valorParcela = Number(((conta.valor || 0) / parcelas).toFixed(2));
      const dataBase = new Date(conta.data_vencimento || new Date());

      const contasParceladas = Array.from({ length: parcelas }, (_, i) => {
        const dataVencimento = new Date(dataBase);
        dataVencimento.setMonth(dataVencimento.getMonth() + i);

        return {
          ...conta,
          descricao: `${conta.descricao} (${i + 1}/${parcelas})`,
          valor: i === parcelas - 1
            ? (conta.valor || 0) - valorParcela * (parcelas - 1)
            : valorParcela,
          data_vencimento: dataVencimento.toISOString().split("T")[0],
          parcela_atual: i + 1,
          total_parcelas: parcelas,
          criado_por: userId,
        };
      });

      const { error } = await supabase.from("contas_pagar" as any).insert(contasParceladas as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas-pagar"] });
      invalidateAll();
      toast.success("Parcelas criadas com sucesso");
    },
  });

  const { mutateAsync: pagarConta, isPending: isPagando } = useMutation({
    mutationFn: async ({
      contaId, valorPago, formaPagamento, dataPagamento, comprovanteUrl,
    }: {
      contaId: string; valorPago?: number; formaPagamento?: string;
      dataPagamento?: string; comprovanteUrl?: string;
    }) => {
      const { data, error } = await supabase.rpc("pagar_conta" as any, {
        p_conta_id: contaId,
        p_valor_pago: valorPago || null,
        p_forma_pagamento: formaPagamento || null,
        p_data_pagamento: dataPagamento || new Date().toISOString().split("T")[0],
        p_comprovante_url: comprovanteUrl || null,
      });
      if (error) throw error;
      const result = data as any;
      if (result?.error) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas-pagar"] });
      invalidateAll();
      toast.success("Pagamento registrado!");
    },
    onError: (e: Error) => toast.error("Erro: " + e.message),
  });

  const { mutateAsync: cancelarConta } = useMutation({
    mutationFn: async (contaId: string) => {
      const { error } = await supabase
        .from("contas_pagar" as any)
        .update({ status: "cancelado" } as any)
        .eq("id", contaId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas-pagar"] });
      invalidateAll();
      toast.success("Conta cancelada");
    },
  });

  const { mutateAsync: editarConta } = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ContaPagar> & { id: string }) => {
      const { error } = await supabase.from("contas_pagar" as any).update(updates as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas-pagar"] });
      toast.success("Conta atualizada");
    },
  });

  const totais = {
    pendentes: (contas ?? []).filter((c) => c.status === "pendente").reduce((s, c) => s + c.valor, 0),
    vencidas: (contas ?? []).filter((c) => c.status === "vencido").reduce((s, c) => s + c.valor, 0),
    pagas: (contas ?? []).filter((c) => c.status === "pago").reduce((s, c) => s + c.valor_pago, 0),
    total: (contas ?? []).reduce((s, c) => s + c.valor, 0),
    quantidade: contas?.length ?? 0,
  };

  return {
    contas: contas ?? [], totais, isLoading,
    criarConta, criarContaParcelada, pagarConta, cancelarConta, editarConta,
    isCriando, isPagando,
  };
}
