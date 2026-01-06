import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Indicacao {
  id: string;
  indicador_id: string;
  indicado_id: string;
  cashback_valor: number;
  status: string;
  created_at: string;
  processado_at: string | null;
  indicado?: {
    nome: string | null;
  };
}

export const useIndicacoes = () => {
  const { user } = useAuth();
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>([]);
  const [codigoIndicacao, setCodigoIndicacao] = useState<string | null>(null);
  const [totalCashbackIndicacoes, setTotalCashbackIndicacoes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndicacoes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Buscar código de indicação do usuário
      const { data: profile } = await supabase
        .from("profiles")
        .select("codigo_indicacao")
        .eq("id", user.id)
        .single();

      if (profile) {
        setCodigoIndicacao(profile.codigo_indicacao);
      }

      // Buscar indicações feitas pelo usuário
      const { data: indicacoesData, error: indicacoesError } = await supabase
        .from("indicacoes")
        .select("*")
        .eq("indicador_id", user.id)
        .order("created_at", { ascending: false });

      if (indicacoesError) throw indicacoesError;

      // Buscar nomes dos indicados
      const indicacoesComNomes = await Promise.all(
        (indicacoesData || []).map(async (ind) => {
          const { data: indicadoProfile } = await supabase
            .from("profiles")
            .select("nome")
            .eq("id", ind.indicado_id)
            .single();
          
          return {
            ...ind,
            indicado: indicadoProfile || { nome: null }
          };
        })
      );

      setIndicacoes(indicacoesComNomes);
      
      // Calcular total de cashback das indicações
      const total = (indicacoesComNomes || [])
        .filter(i => i.status === 'processado')
        .reduce((acc, i) => acc + Number(i.cashback_valor), 0);
      setTotalCashbackIndicacoes(total);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar indicações");
    } finally {
      setLoading(false);
    }
  };

  const aplicarCodigoIndicacao = async (codigo: string) => {
    if (!user) return { success: false, message: "Usuário não autenticado" };

    try {
      // Verificar se o código existe
      const { data: indicador, error: indicadorError } = await supabase
        .from("profiles")
        .select("id, nome")
        .eq("codigo_indicacao", codigo.toUpperCase())
        .single();

      if (indicadorError || !indicador) {
        return { success: false, message: "Código de indicação inválido" };
      }

      if (indicador.id === user.id) {
        return { success: false, message: "Você não pode usar seu próprio código" };
      }

      // Verificar se já foi indicado
      const { data: profile } = await supabase
        .from("profiles")
        .select("indicado_por")
        .eq("id", user.id)
        .single();

      if (profile?.indicado_por) {
        return { success: false, message: "Você já usou um código de indicação" };
      }

      // Atualizar perfil com o indicador
      await supabase
        .from("profiles")
        .update({ indicado_por: indicador.id })
        .eq("id", user.id);

      // Criar registro de indicação (cashback será processado após primeira compra)
      await supabase
        .from("indicacoes")
        .insert({
          indicador_id: indicador.id,
          indicado_id: user.id,
          cashback_valor: 10, // R$ 10 de cashback por indicação
          status: 'pendente'
        });

      return { success: true, message: `Código aplicado! ${indicador.nome || 'O indicador'} receberá cashback.` };
    } catch (err) {
      return { success: false, message: "Erro ao aplicar código" };
    }
  };

  useEffect(() => {
    fetchIndicacoes();
  }, [user]);

  return {
    indicacoes,
    codigoIndicacao,
    totalCashbackIndicacoes,
    loading,
    error,
    aplicarCodigoIndicacao,
    refetch: fetchIndicacoes
  };
};
