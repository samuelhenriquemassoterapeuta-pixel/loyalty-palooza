import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface HistoricoCirurgico {
  id: string;
  user_id: string;
  tipo_cirurgia: string;
  data_cirurgia: string;
  medico_responsavel: string | null;
  hospital_clinica: string | null;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
}

type HistoricoInsert = Omit<HistoricoCirurgico, "id" | "created_at" | "updated_at">;
type HistoricoUpdate = Partial<Omit<HistoricoCirurgico, "id" | "user_id" | "created_at" | "updated_at">>;

export const useHistoricoCirurgico = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: historico = [], isLoading } = useQuery({
    queryKey: ["historico-cirurgico", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("historico_cirurgico")
        .select("*")
        .eq("user_id", user.id)
        .order("data_cirurgia", { ascending: false });
      if (error) throw error;
      return data as HistoricoCirurgico[];
    },
    enabled: !!user,
    staleTime: 30_000,
  });

  const addMutation = useMutation({
    mutationFn: async (input: Omit<HistoricoInsert, "user_id">) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase
        .from("historico_cirurgico")
        .insert({ ...input, user_id: user.id });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["historico-cirurgico"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: HistoricoUpdate & { id: string }) => {
      const { error } = await supabase
        .from("historico_cirurgico")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["historico-cirurgico"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("historico_cirurgico")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["historico-cirurgico"] }),
  });

  return {
    historico,
    isLoading,
    add: addMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
