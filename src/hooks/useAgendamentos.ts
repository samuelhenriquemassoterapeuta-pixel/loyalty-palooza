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
  terapeuta_id: string | null;
  created_at: string;
  terapeutas?: {
    id: string;
    nome: string;
    especialidade: string | null;
  } | null;
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
        .select(`
          *,
          terapeutas (
            id,
            nome,
            especialidade
          )
        `)
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
    observacoes?: string,
    terapeuta_id?: string
  ) => {
    if (!user) return { error: new Error("Usuário não autenticado"), data: null };

    try {
      // Quick client-side check (database also enforces uniqueness via unique index)
      const { data: existente, error: checkError } = await supabase
        .from("agendamentos")
        .select("id")
        .eq("data_hora", data_hora.toISOString())
        .eq("status", "agendado")
        .maybeSingle();

      if (checkError) throw checkError;

      if (existente) {
        return { 
          error: new Error("Este horário já está ocupado. Por favor, escolha outro."), 
          data: null 
        };
      }

      const { data, error } = await supabase
        .from("agendamentos")
        .insert({
          user_id: user.id,
          data_hora: data_hora.toISOString(),
          servico,
          observacoes,
          terapeuta_id,
          status: "agendado",
        })
        .select()
        .single();

      // Handle unique constraint violation (race condition protection)
      if (error) {
        if (error.code === '23505') {
          return { 
            error: new Error("Este horário já está ocupado. Por favor, escolha outro."), 
            data: null 
          };
        }
        throw error;
      }
      
      await fetchAgendamentos();
      return { error: null, data };
    } catch (err: any) {
      return { error: err, data: null };
    }
  };

  // Função para verificar horários disponíveis em uma data
  const checkHorarioDisponivel = async (data: Date, horario: string): Promise<boolean> => {
    const [hours, minutes] = horario.split(":").map(Number);
    const dataHora = new Date(data);
    dataHora.setHours(hours, minutes, 0, 0);

    const { data: existente } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("data_hora", dataHora.toISOString())
      .eq("status", "agendado")
      .maybeSingle();

    return !existente;
  };

  const getHorariosOcupados = async (data: Date): Promise<string[]> => {
    const startOfDay = new Date(data);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(data);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: agendamentosDoDia } = await supabase
      .from("agendamentos")
      .select("data_hora")
      .eq("status", "agendado")
      .gte("data_hora", startOfDay.toISOString())
      .lte("data_hora", endOfDay.toISOString());

    return (agendamentosDoDia || []).map(a => {
      const d = new Date(a.data_hora);
      return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    });
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
    checkHorarioDisponivel,
    getHorariosOcupados,
    refetch: fetchAgendamentos,
  };
};
