import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ChecklistAvaliacao {
  id: string;
  user_id: string;
  protocolo_usuario_id: string | null;
  agendamento_id: string | null;
  itens_marcados: string[];
  observacoes: string | null;
  created_at: string;
}

export const useChecklistsAvaliacao = (protocoloUsuarioId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: checklists = [], isLoading } = useQuery({
    queryKey: ["checklists-avaliacao", protocoloUsuarioId],
    queryFn: async () => {
      let query = supabase
        .from("checklists_avaliacao" as any)
        .select("*")
        .order("created_at", { ascending: false });

      if (protocoloUsuarioId) {
        query = query.eq("protocolo_usuario_id", protocoloUsuarioId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as ChecklistAvaliacao[];
    },
    enabled: !!user,
    staleTime: 30_000,
  });

  const salvar = useMutation({
    mutationFn: async ({
      itensMarcados,
      observacoes,
      protocoloUsuarioId: protoId,
      agendamentoId,
    }: {
      itensMarcados: string[];
      observacoes: string;
      protocoloUsuarioId?: string;
      agendamentoId?: string;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from("checklists_avaliacao" as any)
        .insert({
          user_id: user.id,
          itens_marcados: itensMarcados,
          observacoes: observacoes || null,
          protocolo_usuario_id: protoId || null,
          agendamento_id: agendamentoId || null,
        } as any);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Checklist salvo com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["checklists-avaliacao"] });
    },
    onError: () => {
      toast.error("Erro ao salvar checklist");
    },
  });

  const excluir = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("checklists_avaliacao" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Checklist removido");
      queryClient.invalidateQueries({ queryKey: ["checklists-avaliacao"] });
    },
    onError: () => {
      toast.error("Erro ao remover checklist");
    },
  });

  return { checklists, isLoading, salvar, excluir };
};
