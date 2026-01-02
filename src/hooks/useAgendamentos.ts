import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Agendamento {
  id: string;
  user_id: string;
  data_hora: string;
  servico: string;
  status: string;
  observacoes: string | null;
  created_at: string;
}

export const useAgendamentos = () => {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgendamentos = async () => {
    if (!user) {
      setAgendamentos([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("agendamentos")
        .select("*")
        .eq("user_id", user.id)
        .order("data_hora", { ascending: true });

      if (error) throw error;
      setAgendamentos(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAgendamento = async (
    data_hora: Date,
    servico: string,
    observacoes?: string
  ) => {
    if (!user) return { error: new Error("Usuário não autenticado"), data: null };

    try {
      const { data, error } = await supabase
        .from("agendamentos")
        .insert({
          user_id: user.id,
          data_hora: data_hora.toISOString(),
          servico,
          observacoes,
          status: "agendado",
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchAgendamentos();
      return { error: null, data };
    } catch (err: any) {
      return { error: err, data: null };
    }
  };

  const cancelAgendamento = async (id: string) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("agendamentos")
        .update({ status: "cancelado" })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      await fetchAgendamentos();
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const getProximosAgendamentos = () => {
    const now = new Date();
    return agendamentos.filter(
      (a) => new Date(a.data_hora) >= now && a.status === "agendado"
    );
  };

  useEffect(() => {
    fetchAgendamentos();
  }, [user]);

  return {
    agendamentos,
    loading,
    error,
    createAgendamento,
    cancelAgendamento,
    getProximosAgendamentos,
    refetch: fetchAgendamentos,
  };
};
