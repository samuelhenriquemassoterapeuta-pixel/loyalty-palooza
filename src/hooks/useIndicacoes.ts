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
  const [indicadoPor, setIndicadoPor] = useState<string | null>(null);
  const [nomeIndicador, setNomeIndicador] = useState<string | null>(null);
  const [totalCashbackIndicacoes, setTotalCashbackIndicacoes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndicacoes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch profile (referral code + who referred this user)
      const { data: profile } = await supabase
        .from("profiles")
        .select("codigo_indicacao, indicado_por")
        .eq("id", user.id)
        .single();

      if (profile) {
        setCodigoIndicacao(profile.codigo_indicacao);
        setIndicadoPor(profile.indicado_por);

        // If referred by someone, fetch their name
        if (profile.indicado_por) {
          const { data: indicadorProfile } = await supabase
            .from("profiles")
            .select("nome")
            .eq("id", profile.indicado_por)
            .single();
          setNomeIndicador(indicadorProfile?.nome || "Alguém");
        }
      }

      // Fetch referrals made by this user
      const { data: indicacoesData, error: indicacoesError } = await supabase
        .from("indicacoes")
        .select("*")
        .eq("indicador_id", user.id)
        .order("created_at", { ascending: false });

      if (indicacoesError) throw indicacoesError;

      const list = indicacoesData || [];

      // Batch fetch referred user names with .in() instead of N+1 queries
      if (list.length > 0) {
        const indicadoIds = list.map((ind) => ind.indicado_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, nome")
          .in("id", indicadoIds);

        const nameMap = new Map(
          (profiles || []).map((p) => [p.id, p.nome])
        );

        const indicacoesComNomes: Indicacao[] = list.map((ind) => ({
          ...ind,
          indicado: { nome: nameMap.get(ind.indicado_id) || null },
        }));

        setIndicacoes(indicacoesComNomes);

        const total = indicacoesComNomes
          .filter((i) => i.status === "processado")
          .reduce((acc, i) => acc + Number(i.cashback_valor), 0);
        setTotalCashbackIndicacoes(total);
      } else {
        setIndicacoes([]);
        setTotalCashbackIndicacoes(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar indicações");
    } finally {
      setLoading(false);
    }
  };

  const aplicarCodigoIndicacao = async (codigo: string) => {
    if (!user) return { success: false, message: "Usuário não autenticado" };

    try {
      // Check if code exists
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

      // Check if already referred
      const { data: profile } = await supabase
        .from("profiles")
        .select("indicado_por")
        .eq("id", user.id)
        .single();

      if (profile?.indicado_por) {
        return { success: false, message: "Você já usou um código de indicação" };
      }

      // Update profile with referrer
      await supabase
        .from("profiles")
        .update({ indicado_por: indicador.id })
        .eq("id", user.id);

      // Create referral record
      await supabase
        .from("indicacoes")
        .insert({
          indicador_id: indicador.id,
          indicado_id: user.id,
          cashback_valor: 10,
          status: "pendente",
        });

      // Update local state
      setIndicadoPor(indicador.id);
      setNomeIndicador(indicador.nome || "Alguém");

      return {
        success: true,
        message: `Código aplicado! ${indicador.nome || "O indicador"} receberá cashback.`,
      };
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
    indicadoPor,
    nomeIndicador,
    totalCashbackIndicacoes,
    loading,
    error,
    aplicarCodigoIndicacao,
    refetch: fetchIndicacoes,
  };
};
