import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Pacote {
  id: string;
  nome: string;
  descricao: string | null;
  total_sessoes: number;
  preco: number;
  preco_original: number | null;
  validade_dias: number | null;
  disponivel: boolean | null;
  created_at: string;
}

export interface PacoteUsuario {
  id: string;
  user_id: string;
  pacote_id: string;
  sessoes_usadas: number;
  data_compra: string;
  data_validade: string;
  status: string;
  pacote?: Pacote;
}

export const usePacotes = () => {
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPacotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("pacotes")
        .select("*")
        .eq("disponivel", true)
        .order("preco");

      if (error) throw error;
      setPacotes(data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao carregar pacotes";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacotes();
  }, []);

  return { pacotes, loading, error, refetch: fetchPacotes };
};

export const useMeusPacotes = () => {
  const { user } = useAuth();
  const [meusPacotes, setMeusPacotes] = useState<PacoteUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeusPacotes = async () => {
    if (!user) {
      setMeusPacotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("pacotes_usuario")
        .select(`
          *,
          pacote:pacotes(*)
        `)
        .eq("user_id", user.id)
        .order("data_compra", { ascending: false });

      if (error) throw error;
      setMeusPacotes(data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao carregar seus pacotes";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const comprarPacote = async (pacoteId: string, validadeDias: number) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const dataValidade = new Date();
      dataValidade.setDate(dataValidade.getDate() + validadeDias);

      const { error } = await supabase
        .from("pacotes_usuario")
        .insert({
          user_id: user.id,
          pacote_id: pacoteId,
          data_validade: dataValidade.toISOString(),
        });

      if (error) throw error;
      await fetchMeusPacotes();
      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  };

  useEffect(() => {
    fetchMeusPacotes();
  }, [user]);

  return { meusPacotes, loading, error, comprarPacote, refetch: fetchMeusPacotes };
};
