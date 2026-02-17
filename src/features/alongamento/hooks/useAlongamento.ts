import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ExercicioAlongamento {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string;
  nivel: string;
  duracao_segundos: number;
  repeticoes: number | null;
  imagem_url: string | null;
  video_url: string | null;
  instrucoes: string | null;
  musculos_alvo: string | null;
  disponivel: boolean | null;
  created_at: string;
}

export interface PlanoAlongamento {
  id: string;
  nome: string;
  descricao: string | null;
  nivel: string;
  duracao_semanas: number;
  frequencia_semanal: number;
  objetivo: string;
  imagem_url: string | null;
  disponivel: boolean | null;
  created_at: string;
}

export interface PlanoExercicio {
  id: string;
  plano_id: string;
  exercicio_id: string;
  dia_semana: number;
  ordem: number;
  series: number;
  duracao_segundos: number;
  exercicios_alongamento?: ExercicioAlongamento;
}

export interface UsuarioPlano {
  id: string;
  user_id: string;
  plano_id: string;
  data_inicio: string;
  data_fim: string | null;
  status: string;
  created_at: string;
  planos_alongamento?: PlanoAlongamento;
}

export interface SessaoAlongamento {
  id: string;
  user_id: string;
  plano_id: string | null;
  data: string;
  duracao_total_segundos: number;
  exercicios_completados: number;
  notas: string | null;
  created_at: string;
}

export const useExercicios = () => {
  const [exercicios, setExercicios] = useState<ExercicioAlongamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("exercicios_alongamento")
      .select("*")
      .eq("disponivel", true)
      .order("categoria")
      .order("nivel")
      .order("nome");
    setExercicios(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { exercicios, loading, refetch: fetch };
};

export const usePlanosAlongamento = () => {
  const [planos, setPlanos] = useState<PlanoAlongamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("planos_alongamento")
      .select("*")
      .eq("disponivel", true)
      .order("nivel")
      .order("nome");
    setPlanos(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { planos, loading, refetch: fetch };
};

export const usePlanoExercicios = (planoId: string | null) => {
  const [exercicios, setExercicios] = useState<PlanoExercicio[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    if (!planoId) { setExercicios([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from("plano_exercicios")
      .select("*, exercicios_alongamento(*)")
      .eq("plano_id", planoId)
      .order("dia_semana")
      .order("ordem");
    setExercicios(data || []);
    setLoading(false);
  }, [planoId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { exercicios, loading, refetch: fetch };
};

export const useUsuarioPlanos = () => {
  const { user } = useAuth();
  const [planos, setPlanos] = useState<UsuarioPlano[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!user) { setPlanos([]); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("usuario_planos_alongamento")
      .select("*, planos_alongamento(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setPlanos(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetch(); }, [fetch]);

  const ativarPlano = async (planoId: string) => {
    if (!user) return { error: "Não autenticado" };

    // Pausar planos ativos anteriores
    await supabase
      .from("usuario_planos_alongamento")
      .update({ status: "pausado" })
      .eq("user_id", user.id)
      .eq("status", "ativo");

    const { error } = await supabase
      .from("usuario_planos_alongamento")
      .insert({ user_id: user.id, plano_id: planoId });

    if (!error) await fetch();
    return { error: error?.message || null };
  };

  const pausarPlano = async (id: string) => {
    const { error } = await supabase
      .from("usuario_planos_alongamento")
      .update({ status: "pausado" })
      .eq("id", id);
    if (!error) await fetch();
    return { error: error?.message || null };
  };

  return { planos, loading, ativarPlano, pausarPlano, refetch: fetch };
};

export const useSessoesAlongamento = () => {
  const { user } = useAuth();
  const [sessoes, setSessoes] = useState<SessaoAlongamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!user) { setSessoes([]); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("sessoes_alongamento")
      .select("*")
      .eq("user_id", user.id)
      .order("data", { ascending: false })
      .limit(50);
    setSessoes(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetch(); }, [fetch]);

  const registrarSessao = async (
    planoId: string | null,
    duracaoSegundos: number,
    exerciciosCompletados: number,
    notas?: string
  ) => {
    if (!user) return { error: "Não autenticado" };
    const { error } = await supabase
      .from("sessoes_alongamento")
      .insert({
        user_id: user.id,
        plano_id: planoId,
        duracao_total_segundos: duracaoSegundos,
        exercicios_completados: exerciciosCompletados,
        notas: notas || null,
      });
    if (!error) await fetch();
    return { error: error?.message || null };
  };

  const totalSessoes = sessoes.length;
  const totalMinutos = Math.round(sessoes.reduce((a, s) => a + s.duracao_total_segundos, 0) / 60);
  const totalExercicios = sessoes.reduce((a, s) => a + s.exercicios_completados, 0);

  return { sessoes, loading, registrarSessao, totalSessoes, totalMinutos, totalExercicios, refetch: fetch };
};
