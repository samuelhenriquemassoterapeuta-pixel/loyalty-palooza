import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AgendamentoTerapeuta {
  id: string;
  user_id: string;
  data_hora: string;
  servico: string;
  status: string;
  observacoes: string | null;
  created_at: string;
  terapeuta_id: string;
  paciente_nome: string | null;
  paciente_telefone: string | null;
}

export const useTerapeutaAgenda = (terapeutaId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: agendamentos = [], isLoading } = useQuery({
    queryKey: ["terapeuta-agendamentos", terapeutaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agendamentos")
        .select("*, profiles:user_id(nome, telefone)")
        .eq("terapeuta_id", terapeutaId!)
        .order("data_hora", { ascending: true });
      if (error) throw error;
      return (data || []).map((a: any) => ({
        ...a,
        paciente_nome: a.profiles?.nome || "Paciente",
        paciente_telefone: a.profiles?.telefone || null,
      })) as AgendamentoTerapeuta[];
    },
    enabled: !!terapeutaId,
  });

  const atualizarStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("agendamentos")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["terapeuta-agendamentos"] });
      toast.success("Status atualizado!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const hoje = new Date().toISOString().split("T")[0];
  const proximos = agendamentos.filter(
    (a) => a.data_hora >= hoje && !["cancelado"].includes(a.status)
  );
  const passados = agendamentos.filter(
    (a) => a.data_hora < hoje || a.status === "cancelado"
  );

  // Unique patients
  const pacientesMap = new Map<string, { user_id: string; nome: string; telefone: string | null; total: number; ultimo: string }>();
  agendamentos.forEach((a) => {
    const existing = pacientesMap.get(a.user_id);
    if (existing) {
      existing.total++;
      if (a.data_hora > existing.ultimo) existing.ultimo = a.data_hora;
    } else {
      pacientesMap.set(a.user_id, {
        user_id: a.user_id,
        nome: a.paciente_nome || "Paciente",
        telefone: a.paciente_telefone,
        total: 1,
        ultimo: a.data_hora,
      });
    }
  });
  const pacientes = Array.from(pacientesMap.values()).sort((a, b) => b.ultimo.localeCompare(a.ultimo));

  return {
    agendamentos,
    proximos,
    passados,
    pacientes,
    isLoading,
    atualizarStatus,
  };
};
