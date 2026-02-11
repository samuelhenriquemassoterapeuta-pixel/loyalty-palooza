import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useSecoesClinicas = (protocoloId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["secoes-clinicas", protocoloId],
    enabled: !!protocoloId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("protocolo_secoes_clinicas")
        .select("*")
        .eq("protocolo_id", protocoloId!)
        .order("ordem");
      if (error) throw error;
      return data;
    },
  });
  return { secoes: data ?? [], isLoading };
};

export const useSecaoChecklist = (secaoId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["secao-checklist", user?.id, secaoId],
    enabled: !!user && !!secaoId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("protocolo_secao_checklist")
        .select("*")
        .eq("user_id", user!.id)
        .eq("secao_id", secaoId!);
      if (error) throw error;
      return data;
    },
  });

  const toggleItem = useMutation({
    mutationFn: async ({ itemKey, concluido }: { itemKey: string; concluido: boolean }) => {
      if (concluido) {
        const { error } = await supabase.from("protocolo_secao_checklist").upsert(
          {
            user_id: user!.id,
            secao_id: secaoId!,
            item_key: itemKey,
            concluido: true,
            data_conclusao: new Date().toISOString(),
          },
          { onConflict: "user_id,secao_id,item_key" }
        );
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("protocolo_secao_checklist")
          .delete()
          .eq("user_id", user!.id)
          .eq("secao_id", secaoId!)
          .eq("item_key", itemKey);
        if (error) throw error;
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["secao-checklist", user?.id, secaoId] }),
  });

  const completedItems = new Set((data ?? []).filter((d) => d.concluido).map((d) => d.item_key));

  return { completedItems, isLoading, toggleItem };
};
