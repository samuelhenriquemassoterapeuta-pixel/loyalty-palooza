import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Transacao {
  id: string;
  user_id: string;
  tipo: string;
  valor: number;
  descricao: string | null;
  referencia_id: string | null;
  created_at: string;
  expira_em: string | null;
}

export interface UserStats {
  saldo: number;
  totalCashback: number;
  totalGasto: number;
  totalCompras: number;
  totalAgendamentos: number;
}

function calcularStats(data: Transacao[]): UserStats {
  // Cashback ganho (créditos)
  const cashbackGanho = data
    .filter((t) => t.tipo === "cashback")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  // Cashback usado (débitos de uso)
  const cashbackUsado = Math.abs(
    data
      .filter((t) => t.tipo === "uso_cashback")
      .reduce((acc, t) => acc + Number(t.valor), 0)
  );

  // Cashback expirado (débitos de expiração)
  const cashbackExpirado = Math.abs(
    data
      .filter((t) => t.tipo === "cashback_expirado")
      .reduce((acc, t) => acc + Number(t.valor), 0)
  );

  // Saldo de cashback disponível = ganho - usado - expirado
  const saldoCashback = cashbackGanho - cashbackUsado - cashbackExpirado;

  // Total gasto (débitos - valores negativos, excluindo cashback_expirado e uso_cashback)
  const gasto = Math.abs(
    data
      .filter(
        (t) =>
          Number(t.valor) < 0 &&
          t.tipo !== "cashback_expirado" &&
          t.tipo !== "uso_cashback"
      )
      .reduce((acc, t) => acc + Number(t.valor), 0)
  );

  // Saldo é a soma de todas as transações
  const saldoTotal = data.reduce((acc, t) => acc + Number(t.valor), 0);

  const compras = data.filter(
    (t) => t.tipo === "compra" || t.tipo === "debito"
  ).length;
  const agendamentos = data.filter((t) => t.tipo === "agendamento").length;

  return {
    saldo: saldoTotal,
    totalCashback: Math.max(0, saldoCashback),
    totalGasto: gasto,
    totalCompras: compras,
    totalAgendamentos: agendamentos,
  };
}

export const useTransacoes = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: transacoes = [],
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["transacoes", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return (data || []) as Transacao[];
    },
    staleTime: 30_000, // 30s antes de considerar stale
  });

  const stats = calcularStats(transacoes);
  const error = queryError ? (queryError as Error).message : null;

  const createTransacaoMutation = useMutation({
    mutationFn: async ({
      tipo,
      valor,
      descricao,
      referenciaId,
    }: {
      tipo: string;
      valor: number;
      descricao?: string;
      referenciaId?: string;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from("transacoes").insert({
        user_id: user.id,
        tipo,
        valor,
        descricao,
        referencia_id: referenciaId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
  });

  // Wrapper para manter API compatível com consumers existentes
  const createTransacao = async (
    tipo: string,
    valor: number,
    descricao?: string,
    referenciaId?: string
  ) => {
    try {
      await createTransacaoMutation.mutateAsync({
        tipo,
        valor,
        descricao,
        referenciaId,
      });
      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  };

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["transacoes"] });
  };

  return { transacoes, stats, loading, error, createTransacao, refetch };
};
