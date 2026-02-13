import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface RecomendacaoIA {
  id: string;
  user_id: string;
  tipo: string;
  titulo: string;
  descricao: string;
  confianca: number;
  dados_base: Record<string, any>;
  aceita: boolean | null;
  created_at: string;
}

export const useRecomendacoesIA = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: recomendacoes = [], isLoading } = useQuery({
    queryKey: ["recomendacoes-ia", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recomendacoes_ia")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as unknown as RecomendacaoIA[];
    },
  });

  const gerarRecomendacoes = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Usuário não autenticado");

      const response = await supabase.functions.invoke("gerar-recomendacoes", {
        body: { user_id: user.id },
      });

      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recomendacoes-ia"] });
      toast.success("Novas recomendações geradas! ✨");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao gerar recomendações");
    },
  });

  const responderRecomendacao = useMutation({
    mutationFn: async ({ id, aceita }: { id: string; aceita: boolean }) => {
      const { error } = await supabase
        .from("recomendacoes_ia")
        .update({ aceita } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recomendacoes-ia"] });
    },
  });

  return { recomendacoes, isLoading, gerarRecomendacoes, responderRecomendacao };
};
