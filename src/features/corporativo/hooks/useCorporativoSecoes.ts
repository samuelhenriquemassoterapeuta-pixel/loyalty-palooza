import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CorporativoSecao {
  id: string;
  titulo: string;
  subtitulo: string | null;
  descricao: string | null;
  conteudo_detalhado: string | null;
  icone: string;
  cor: string;
  imagem_url: string | null;
  video_url: string | null;
  galeria_urls: string[];
  ordem: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export const useCorporativoSecoes = () => {
  const queryClient = useQueryClient();

  const { data: secoes = [], isLoading } = useQuery({
    queryKey: ["corporativo-secoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("corporativo_secoes" as any)
        .select("*")
        .order("ordem");
      if (error) throw error;
      return (data || []) as unknown as CorporativoSecao[];
    },
  });

  const upsertSecao = useMutation({
    mutationFn: async (secao: Partial<CorporativoSecao> & { id?: string }) => {
      if (secao.id) {
        const { error } = await supabase
          .from("corporativo_secoes" as any)
          .update(secao as any)
          .eq("id", secao.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("corporativo_secoes" as any)
          .insert(secao as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corporativo-secoes"] });
      toast.success("Seção salva!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteSecao = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("corporativo_secoes" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corporativo-secoes"] });
      toast.success("Seção excluída!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  return { secoes, isLoading, upsertSecao, deleteSecao };
};
