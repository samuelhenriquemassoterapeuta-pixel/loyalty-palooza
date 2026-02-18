import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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

interface IndicacoesData {
  indicacoes: Indicacao[];
  codigoIndicacao: string | null;
  indicadoPor: string | null;
  nomeIndicador: string | null;
  totalCashbackIndicacoes: number;
}

async function fetchIndicacoesData(userId: string): Promise<IndicacoesData> {
  // Fetch profile (referral code + who referred this user)
  const { data: profile } = await supabase
    .from("profiles")
    .select("codigo_indicacao, indicado_por")
    .eq("id", userId)
    .single();

  let codigoIndicacao: string | null = null;
  let indicadoPor: string | null = null;
  let nomeIndicador: string | null = null;

  if (profile) {
    codigoIndicacao = profile.codigo_indicacao;
    indicadoPor = profile.indicado_por;

    if (profile.indicado_por) {
      const { data: indicadorProfile } = await supabase
        .from("profiles")
        .select("nome")
        .eq("id", profile.indicado_por)
        .single();
      nomeIndicador = indicadorProfile?.nome || "Alguém";
    }
  }

  // Fetch referrals made by this user
  const { data: indicacoesData, error } = await supabase
    .from("indicacoes")
    .select("*")
    .eq("indicador_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const list = indicacoesData || [];
  let indicacoes: Indicacao[] = [];
  let totalCashbackIndicacoes = 0;

  if (list.length > 0) {
    const indicadoIds = list.map((ind) => ind.indicado_id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, nome")
      .in("id", indicadoIds);

    const nameMap = new Map((profiles || []).map((p) => [p.id, p.nome]));

    indicacoes = list.map((ind) => ({
      ...ind,
      indicado: { nome: nameMap.get(ind.indicado_id) || null },
    }));

    totalCashbackIndicacoes = indicacoes
      .filter((i) => i.status === "processado")
      .reduce((acc, i) => acc + Number(i.cashback_valor), 0);
  }

  return {
    indicacoes,
    codigoIndicacao,
    indicadoPor,
    nomeIndicador,
    totalCashbackIndicacoes,
  };
}

export const useIndicacoes = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["indicacoes", user?.id],
    enabled: !!user,
    queryFn: () => fetchIndicacoesData(user!.id),
    staleTime: 30_000,
  });

  const error = queryError ? (queryError as Error).message : null;

  const aplicarMutation = useMutation({
    mutationFn: async (codigo: string) => {
      if (!user) throw new Error("Usuário não autenticado");

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

      const { data: profile } = await supabase
        .from("profiles")
        .select("indicado_por")
        .eq("id", user.id)
        .single();

      if (profile?.indicado_por) {
        return { success: false, message: "Você já usou um código de indicação" };
      }

      await supabase
        .from("profiles")
        .update({ indicado_por: indicador.id })
        .eq("id", user.id);

      await supabase.from("indicacoes").insert({
        indicador_id: indicador.id,
        indicado_id: user.id,
        cashback_valor: 10,
        status: "pendente",
      });

      return {
        success: true,
        message: `Código aplicado! ${indicador.nome || "O indicador"} receberá cashback.`,
      };
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["indicacoes"] });
      }
    },
  });

  const aplicarCodigoIndicacao = async (codigo: string) => {
    try {
      return await aplicarMutation.mutateAsync(codigo);
    } catch {
      return { success: false, message: "Erro ao aplicar código" };
    }
  };

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["indicacoes"] });
  };

  return {
    indicacoes: data?.indicacoes ?? [],
    codigoIndicacao: data?.codigoIndicacao ?? null,
    indicadoPor: data?.indicadoPor ?? null,
    nomeIndicador: data?.nomeIndicador ?? null,
    totalCashbackIndicacoes: data?.totalCashbackIndicacoes ?? 0,
    loading,
    error,
    aplicarCodigoIndicacao,
    refetch,
  };
};
