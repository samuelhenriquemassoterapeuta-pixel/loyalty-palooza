import { useState, useEffect } from "react";
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

export const useTransacoes = () => {
  const { user } = useAuth();
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [stats, setStats] = useState<UserStats>({
    saldo: 0,
    totalCashback: 0,
    totalGasto: 0,
    totalCompras: 0,
    totalAgendamentos: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransacoes = async () => {
    if (!user) {
      setTransacoes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransacoes(data || []);
      
      // Calcular estatísticas
      const cashbackGanho = (data || [])
        .filter(t => t.tipo === "cashback")
        .reduce((acc, t) => acc + Number(t.valor), 0);
      
      const cashbackUsado = Math.abs((data || [])
        .filter(t => t.tipo === "uso_cashback")
        .reduce((acc, t) => acc + Number(t.valor), 0));
      
      // Saldo de cashback disponível = ganho - usado
      const saldoCashback = cashbackGanho - cashbackUsado;
      
      // Total gasto (débitos - valores negativos)
      const gasto = Math.abs((data || [])
        .filter(t => Number(t.valor) < 0)
        .reduce((acc, t) => acc + Number(t.valor), 0));
      
      // Saldo é a soma de todas as transações
      const saldoTotal = (data || []).reduce((acc, t) => acc + Number(t.valor), 0);
      
      const compras = (data || []).filter(t => t.tipo === "compra" || t.tipo === "debito").length;
      const agendamentos = (data || []).filter(t => t.tipo === "agendamento").length;
      
      setStats({
        saldo: saldoTotal,
        totalCashback: saldoCashback,
        totalGasto: gasto,
        totalCompras: compras,
        totalAgendamentos: agendamentos,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao carregar transações";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const createTransacao = async (
    tipo: string,
    valor: number,
    descricao?: string,
    referenciaId?: string
  ) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("transacoes")
        .insert({
          user_id: user.id,
          tipo,
          valor,
          descricao,
          referencia_id: referenciaId,
        });

      if (error) throw error;
      await fetchTransacoes();
      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  };

  useEffect(() => {
    fetchTransacoes();
  }, [user]);

  return { transacoes, stats, loading, error, createTransacao, refetch: fetchTransacoes };
};
