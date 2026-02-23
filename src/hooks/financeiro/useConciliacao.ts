import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useInvalidateFinanceiro } from "./useInvalidateFinanceiro";

export interface ContaBancaria {
  id: string;
  nome: string;
  banco: string | null;
  agencia: string | null;
  conta: string | null;
  tipo: string;
  saldo_atual: number;
  ativo: boolean;
}

export interface ExtratoItem {
  id: string;
  conta_bancaria_id: string;
  data_transacao: string;
  descricao: string;
  valor: number;
  tipo: string;
  conciliado: boolean;
  referencia_externa: string | null;
}

export interface SugestaoConciliacao {
  extrato_id: string;
  extrato_descricao: string;
  extrato_valor: number;
  extrato_data: string;
  lancamento_id: string;
  lancamento_descricao: string;
  lancamento_valor: number;
  tipo_lancamento: string;
  diferenca: number;
}

export function useContasBancarias() {
  const invalidate = useInvalidateFinanceiro();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contas-bancarias"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contas_bancarias" as any)
        .select("*")
        .eq("ativo", true)
        .order("nome");
      if (error) throw error;
      return data as unknown as ContaBancaria[];
    },
  });

  const criarConta = useMutation({
    mutationFn: async (conta: Partial<ContaBancaria>) => {
      const { error } = await supabase.from("contas_bancarias" as any).insert(conta as any);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Conta criada!"); invalidate(); refetch(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return { contas: data ?? [], isLoading, refetch, criarConta };
}

export function useExtratoBancario(contaId: string) {
  const invalidate = useInvalidateFinanceiro();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["extrato-bancario", contaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("extrato_bancario" as any)
        .select("*")
        .eq("conta_bancaria_id", contaId)
        .order("data_transacao", { ascending: false });
      if (error) throw error;
      return data as unknown as ExtratoItem[];
    },
    enabled: !!contaId,
  });

  const importarExtrato = useMutation({
    mutationFn: async (itens: Partial<ExtratoItem>[]) => {
      const { error } = await supabase.from("extrato_bancario" as any).insert(
        itens.map(i => ({ ...i, conta_bancaria_id: contaId })) as any
      );
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Extrato importado!"); invalidate(); refetch(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return { extrato: data ?? [], isLoading, refetch, importarExtrato };
}

export function useConciliacao(contaId: string) {
  const invalidate = useInvalidateFinanceiro();

  const sugerir = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("sugerir_conciliacoes" as any, {
        p_conta_bancaria_id: contaId,
      });
      if (error) throw error;
      return data as unknown as SugestaoConciliacao[];
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const conciliar = useMutation({
    mutationFn: async (sugestao: SugestaoConciliacao) => {
      // Criar registro de conciliação
      const { data: conc, error: concErr } = await supabase
        .from("conciliacoes" as any)
        .insert({
          extrato_id: sugestao.extrato_id,
          tipo_lancamento: sugestao.tipo_lancamento,
          lancamento_id: sugestao.lancamento_id,
          valor_extrato: Math.abs(sugestao.extrato_valor),
          valor_lancamento: sugestao.lancamento_valor,
          status: Math.abs(sugestao.diferenca) < 0.02 ? "conciliado" : "divergente",
        } as any)
        .select()
        .single();
      if (concErr) throw concErr;

      // Marcar extrato como conciliado
      const { error: extErr } = await supabase
        .from("extrato_bancario" as any)
        .update({ conciliado: true, conciliacao_id: (conc as any).id } as any)
        .eq("id", sugestao.extrato_id);
      if (extErr) throw extErr;
    },
    onSuccess: () => { toast.success("Item conciliado!"); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  return { sugerir, conciliar };
}
