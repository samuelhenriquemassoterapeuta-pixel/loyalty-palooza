import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Annotation } from "@/features/avaliacao-postural/components/annotations/types";
import type { VistaPostural } from "@/features/avaliacao-postural/hooks/useAvaliacaoPostural";

export const useAnotacoesPosturais = (avaliacaoId: string | undefined, vista: VistaPostural | undefined) => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const key = ["anotacoes_posturais", avaliacaoId, vista];

  const { data: annotations = [], isLoading } = useQuery({
    queryKey: key,
    enabled: !!user && !!avaliacaoId && !!vista,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("anotacoes_posturais")
        .select("anotacoes")
        .eq("avaliacao_id", avaliacaoId!)
        .eq("vista", vista!)
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return (data?.anotacoes as unknown as Annotation[]) || [];
    },
  });

  const salvar = useMutation({
    mutationFn: async (anotacoes: Annotation[]) => {
      if (!user || !avaliacaoId || !vista) throw new Error("Dados faltando");

      const payload = {
        avaliacao_id: avaliacaoId,
        vista,
        user_id: user.id,
        anotacoes: anotacoes as unknown as Record<string, unknown>[],
      };
      const { error } = await supabase
        .from("anotacoes_posturais")
        .upsert(payload as any, { onConflict: "avaliacao_id,vista" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
      toast.success("Anotações salvas!");
    },
    onError: () => toast.error("Erro ao salvar anotações"),
  });

  return { annotations, isLoading, salvar };
};
