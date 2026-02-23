import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useInvalidateFinanceiro } from "./useInvalidateFinanceiro";

export interface Repasse {
  id: string;
  terapeuta_id: string;
  periodo_inicio: string;
  periodo_fim: string;
  total_sessoes: number;
  valor_bruto: number;
  percentual_comissao: number;
  valor_comissao: number;
  valor_descontos: number | null;
  valor_liquido: number;
  status: string;
  data_pagamento: string | null;
  forma_pagamento: string | null;
  observacoes: string | null;
  created_at: string;
}

export interface RepasseComTerapeuta extends Repasse {
  terapeutas: { nome: string } | null;
}

export function useRepasses(statusFilter?: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["repasses", statusFilter],
    queryFn: async () => {
      let q = supabase
        .from("repasses" as any)
        .select("*, terapeutas(nome)")
        .order("created_at", { ascending: false });

      if (statusFilter && statusFilter !== "todos") {
        q = q.eq("status", statusFilter);
      }

      const { data, error } = await q;
      if (error) throw error;
      return data as unknown as RepasseComTerapeuta[];
    },
  });

  return { repasses: data ?? [], isLoading, refetch };
}

export function useCalcularRepasse() {
  return useMutation({
    mutationFn: async ({ terapeuta_id, periodo_inicio, periodo_fim }: { terapeuta_id: string; periodo_inicio: string; periodo_fim: string }) => {
      const { data, error } = await supabase.rpc("calcular_repasse" as any, {
        p_terapeuta_id: terapeuta_id,
        p_periodo_inicio: periodo_inicio,
        p_periodo_fim: periodo_fim,
      });
      if (error) throw error;
      return data as {
        terapeuta_id: string;
        periodo_inicio: string;
        periodo_fim: string;
        total_sessoes: number;
        valor_bruto: number;
        percentual_comissao: number;
        valor_comissao: number;
        itens: Array<{
          agendamento_id: string;
          servico_nome: string;
          data_sessao: string;
          valor_servico: number;
          percentual_comissao: number;
          valor_comissao: number;
        }>;
      };
    },
    onError: (e: Error) => toast.error("Erro ao calcular: " + e.message),
  });
}

export function useRepasseMutations() {
  const invalidate = useInvalidateFinanceiro();

  const criar = useMutation({
    mutationFn: async (repasse: Partial<Repasse> & { itens?: any[] }) => {
      const { itens, ...repasseData } = repasse;
      const { data, error } = await supabase
        .from("repasses" as any)
        .insert(repasseData as any)
        .select()
        .single();
      if (error) throw error;

      // Inserir itens se existirem
      if (itens && itens.length > 0 && data) {
        const itensComRepasse = itens.map(item => ({ ...item, repasse_id: (data as any).id }));
        const { error: itensError } = await supabase
          .from("repasse_itens" as any)
          .insert(itensComRepasse as any);
        if (itensError) throw itensError;
      }

      return data;
    },
    onSuccess: () => { toast.success("Repasse criado!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const aprovar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("repasses" as any)
        .update({ status: "aprovado", aprovado_por: (await supabase.auth.getUser()).data.user?.id } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Repasse aprovado!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const pagar = useMutation({
    mutationFn: async ({ id, forma_pagamento }: { id: string; forma_pagamento: string }) => {
      const { error } = await supabase
        .from("repasses" as any)
        .update({
          status: "pago",
          forma_pagamento,
          data_pagamento: new Date().toISOString().split("T")[0],
        } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Pagamento registrado!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return { criar, aprovar, pagar };
}
