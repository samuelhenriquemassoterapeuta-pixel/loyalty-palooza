import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useDietasConteudo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dietas-conteudo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dietas_conteudo")
        .select("*")
        .eq("disponivel", true)
        .order("ordem");
      if (error) throw error;
      return data;
    },
  });
  return { conteudos: data ?? [], isLoading };
};

export const usePlanosDieta = (protocoloId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["planos-dieta", protocoloId],
    queryFn: async () => {
      let q = supabase.from("planos_dieta").select("*").eq("disponivel", true);
      if (protocoloId) q = q.eq("protocolo_id", protocoloId);
      const { data, error } = await q.order("created_at");
      if (error) throw error;
      return data;
    },
  });
  return { planos: data ?? [], isLoading };
};

export const useDiarioAlimentar = (date?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["diario-alimentar", user?.id, date],
    enabled: !!user,
    queryFn: async () => {
      let q = supabase
        .from("diario_alimentar")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (date) q = q.eq("data", date);
      const { data, error } = await q.limit(50);
      if (error) throw error;
      return data;
    },
  });

  const addEntry = useMutation({
    mutationFn: async (entry: {
      tipo_refeicao: string;
      descricao: string;
      agua_ml?: number;
      observacoes?: string;
      data?: string;
    }) => {
      const { error } = await supabase.from("diario_alimentar").insert({
        user_id: user!.id,
        ...entry,
        data: entry.data ?? new Date().toISOString().split("T")[0],
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["diario-alimentar"] }),
  });

  const deleteEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("diario_alimentar").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["diario-alimentar"] }),
  });

  return { entries: data ?? [], isLoading, addEntry, deleteEntry };
};
