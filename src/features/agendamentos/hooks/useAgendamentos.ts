import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useCallback, useMemo } from "react";

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
  const queryClient = useQueryClient();

  const {
    data: agendamentos = [],
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["agendamentos", user?.id],
    enabled: !!user,
    queryFn: async () => {
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
        .eq("user_id", user!.id)
        .order("data_hora", { ascending: true });

      if (error) throw error;
      return (data || []) as Agendamento[];
    },
    staleTime: 30_000,
  });

  const error = queryError ? (queryError as Error).message : null;

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["agendamentos"] });

  // ── Criar agendamento ──────────────────────────────
  const createMutation = useMutation({
    mutationFn: async ({
      data_hora,
      servico,
      observacoes,
      terapeuta_id,
      servico_id,
      playlist_id,
    }: {
      data_hora: Date;
      servico: string;
      observacoes?: string;
      terapeuta_id?: string;
      servico_id?: string;
      playlist_id?: string;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");

      // Quick client-side check filtered by therapist (database also enforces via unique index)
      if (terapeuta_id) {
        const { data: existente, error: checkError } = await supabase
          .from("agendamentos")
          .select("id")
          .eq("data_hora", data_hora.toISOString())
          .eq("terapeuta_id", terapeuta_id)
          .eq("status", "agendado")
          .maybeSingle();

        if (checkError) throw checkError;
        if (existente) {
          throw new Error(
            "Este horário já está ocupado para este terapeuta. Por favor, escolha outro."
          );
        }
      }

      const { data, error } = await supabase
        .from("agendamentos")
        .insert({
          user_id: user.id,
          data_hora: data_hora.toISOString(),
          servico,
          observacoes,
          terapeuta_id,
          servico_id: servico_id || undefined,
          playlist_id: playlist_id || undefined,
          status: "agendado",
        })
        .select()
        .single();

      // Handle unique constraint violation (race condition protection)
      if (error) {
        if (error.code === "23505" || error.message?.includes("duplicate key") || error.message?.includes("unique constraint")) {
          throw new Error(
            "Este horário já está ocupado. Por favor, escolha outro."
          );
        }
        throw error;
      }

      if (!data) {
        throw new Error("Erro ao criar agendamento. Tente novamente.");
      }

      return data;
    },
    onSuccess: invalidate,
  });

  const createAgendamento = async (
    data_hora: Date,
    servico: string,
    observacoes?: string,
    terapeuta_id?: string,
    servico_id?: string,
    playlist_id?: string
  ) => {
    try {
      const data = await createMutation.mutateAsync({
        data_hora,
        servico,
        observacoes,
        terapeuta_id,
        servico_id,
        playlist_id,
      });
      return { error: null, data };
    } catch (err: unknown) {
      return { error: err as Error, data: null };
    }
  };

  // ── Cancelar agendamento ───────────────────────────
  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error("Usuário não autenticado");
      const { error } = await supabase
        .from("agendamentos")
        .update({ status: "cancelado" })
        .eq("id", id)
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const cancelAgendamento = async (id: string) => {
    try {
      await cancelMutation.mutateAsync(id);
      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  };

  // ── Reagendar ──────────────────────────────────────
  const reagendarMutation = useMutation({
    mutationFn: async ({
      id,
      novaDataHora,
    }: {
      id: string;
      novaDataHora: Date;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");

      // Verificar disponibilidade
      const { data: existente, error: checkError } = await supabase
        .from("agendamentos")
        .select("id")
        .eq("data_hora", novaDataHora.toISOString())
        .eq("status", "agendado")
        .neq("id", id)
        .maybeSingle();

      if (checkError) throw checkError;
      if (existente) {
        throw new Error(
          "Este horário já está ocupado. Por favor, escolha outro."
        );
      }

      const { data, error } = await supabase
        .from("agendamentos")
        .update({ data_hora: novaDataHora.toISOString() })
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error(
            "Este horário já está ocupado. Por favor, escolha outro."
          );
        }
        throw error;
      }
      return data;
    },
    onSuccess: invalidate,
  });

  const reagendarAgendamento = async (id: string, novaDataHora: Date) => {
    try {
      const data = await reagendarMutation.mutateAsync({ id, novaDataHora });
      return { error: null, data };
    } catch (err: unknown) {
      return { error: err as Error, data: null };
    }
  };

  // ── Verificar horários disponíveis ─────────────────
  const checkHorarioDisponivel = useCallback(
    async (data: Date, horario: string): Promise<boolean> => {
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
    },
    []
  );

  const getHorariosOcupados = useCallback(
    async (data: Date, terapeutaId?: string): Promise<string[]> => {
      const startOfDay = new Date(data);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(data);
      endOfDay.setHours(23, 59, 59, 999);

      let query = supabase
        .from("agendamentos")
        .select("data_hora")
        .eq("status", "agendado")
        .gte("data_hora", startOfDay.toISOString())
        .lte("data_hora", endOfDay.toISOString());

      if (terapeutaId) {
        query = query.eq("terapeuta_id", terapeutaId);
      }

      const { data: agendamentosDoDia } = await query;

      return (agendamentosDoDia || []).map((a) => {
        const d = new Date(a.data_hora);
        return `${d.getHours().toString().padStart(2, "0")}:${d
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
      });
    },
    []
  );

  // ── Próximos agendamentos ──────────────────────────
  const getProximosAgendamentos = useCallback(() => {
    const now = new Date();
    return agendamentos.filter(
      (a) => new Date(a.data_hora) >= now && a.status === "agendado"
    );
  }, [agendamentos]);

  return {
    agendamentos,
    loading,
    error,
    createAgendamento,
    cancelAgendamento,
    reagendarAgendamento,
    getProximosAgendamentos,
    checkHorarioDisponivel,
    getHorariosOcupados,
    refetch: invalidate,
  };
};
