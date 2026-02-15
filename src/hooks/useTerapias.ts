import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Terapia {
  id: string;
  slug: string;
  nome: string;
  subtitulo: string | null;
  descricao: string | null;
  beneficios: string[];
  indicacoes: string[];
  contraindicacoes: string[];
  como_funciona: string | null;
  duracao_media: string | null;
  icone: string | null;
  imagem_capa: string | null;
  galeria_urls: string[];
  video_urls: string[];
  ordem: number;
}

export function useTerapias() {
  const { data: terapias = [], isLoading } = useQuery({
    queryKey: ["terapias-conteudo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("terapias_conteudo")
        .select("*")
        .eq("ativo", true)
        .order("ordem");
      if (error) throw error;
      return data as Terapia[];
    },
  });

  return { terapias, isLoading };
}
