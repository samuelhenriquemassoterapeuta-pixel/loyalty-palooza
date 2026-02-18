import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
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

const PAGE_SIZE = 30;

function calcularStats(data: Transacao[]): UserStats {
  const cashbackGanho = data
    .filter((t) => t.tipo === "cashback")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const cashbackUsado = Math.abs(
    data
      .filter((t) => t.tipo === "uso_cashback")
      .reduce((acc, t) => acc + Number(t.valor), 0)
  );

  const cashbackExpirado = Math.abs(
    data
      .filter((t) => t.tipo === "cashback_expirado")
      .reduce((acc, t) => acc + Number(t.valor), 0)
  );

  const saldoCashback = cashbackGanho - cashbackUsado - cashbackExpirado;

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
    data,
    isLoading: loading,
    error: queryError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["transacoes", user?.id],
    enabled: !!user,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return (data || []) as Transacao[];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    staleTime: 30_000,
  });

  const transacoes = useMemo(
    () => data?.pages.flat() ?? [],
    [data]
  );

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

  return {
    transacoes,
    stats,
    loading,
    error,
    createTransacao,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
