import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Servico {
  id: string;
  nome: string;
  descricao: string | null;
  duracao: number;
  preco: number;
  categoria: string | null;
  disponivel: boolean | null;
  created_at: string;
}

export const useServicos = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("servicos")
        .select("*")
        .eq("disponivel", true)
        .order("nome");

      if (error) throw error;
      setServicos(data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao carregar serviços";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  return { servicos, loading, error, refetch: fetchServicos };
};
