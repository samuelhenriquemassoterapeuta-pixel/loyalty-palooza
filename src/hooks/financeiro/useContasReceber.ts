import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useInvalidateFinanceiro } from "./useInvalidateFinanceiro";

export interface ContaReceber {
  id: string;
  descricao: string;
  valor: number;
  valor_recebido: number | null;
  data_emissao: string;
  data_vencimento: string;
  data_recebimento: string | null;
  status: string;
  categoria_id: string | null;
  cliente_id: string | null;
  cliente_nome: string | null;
  referencia_tipo: string | null;
  referencia_id: string | null;
  forma_recebimento: string | null;
  numero_documento: string | null;
  parcela_atual: number | null;
  total_parcelas: number | null;
  observacoes: string | null;
  tags: string[] | null;
  criado_por: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContaReceberComCategoria extends ContaReceber {
  categorias_financeiras: { nome: string; cor: string | null } | null;
}

export function useContasReceber(statusFilter?: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contas-receber", statusFilter],
    queryFn: async () => {
      let q = supabase
        .from("contas_receber" as any)
        .select("*, categorias_financeiras(nome, cor)")
        .order("data_vencimento", { ascending: true });

      if (statusFilter && statusFilter !== "todos") {
        q = q.eq("status", statusFilter);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data as unknown as ContaReceberComCategoria[];
    },
  });

  return { contas: data ?? [], isLoading, refetch };
}

export function useContaReceberMutations() {
  const invalidate = useInvalidateFinanceiro();

  const criar = useMutation({
    mutationFn: async (conta: Partial<ContaReceber>) => {
      const { data, error } = await supabase
        .from("contas_receber" as any)
        .insert(conta as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { toast.success("Conta a receber criada!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const atualizar = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ContaReceber> & { id: string }) => {
      const { error } = await supabase
        .from("contas_receber" as any)
        .update(updates as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Conta atualizada!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const registrarRecebimento = useMutation({
    mutationFn: async ({ id, valor_recebido, forma_recebimento }: { id: string; valor_recebido: number; forma_recebimento: string }) => {
      const { error } = await supabase
        .from("contas_receber" as any)
        .update({
          status: "recebido",
          valor_recebido,
          forma_recebimento,
          data_recebimento: new Date().toISOString().split("T")[0],
        } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Recebimento registrado!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const deletar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contas_receber" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Conta removida!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return { criar, atualizar, registrarRecebimento, deletar };
}
