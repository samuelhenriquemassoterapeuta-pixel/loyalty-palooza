import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface CursoModulo {
  id: string;
  titulo: string;
  descricao: string | null;
  ordem: number;
  icone: string;
  cor: string;
  ativo: boolean;
}

export interface CursoAula {
  id: string;
  modulo_id: string;
  titulo: string;
  descricao: string | null;
  conteudo: string;
  video_url: string | null;
  duracao_minutos: number;
  ordem: number;
  ativo: boolean;
}

export interface CursoProgresso {
  id: string;
  user_id: string;
  aula_id: string;
  concluida: boolean;
  concluida_em: string | null;
}

export const useCursoVendas = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: modulos = [], isLoading: loadingModulos } = useQuery({
    queryKey: ["curso-modulos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("curso_modulos")
        .select("*")
        .eq("ativo", true)
        .order("ordem");
      if (error) throw error;
      return data as CursoModulo[];
    },
    enabled: !!user,
  });

  const { data: aulas = [], isLoading: loadingAulas } = useQuery({
    queryKey: ["curso-aulas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("curso_aulas")
        .select("*")
        .eq("ativo", true)
        .order("ordem");
      if (error) throw error;
      return data as CursoAula[];
    },
    enabled: !!user,
  });

  const { data: progresso = [], isLoading: loadingProgresso } = useQuery({
    queryKey: ["curso-progresso", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("curso_progresso")
        .select("*")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data as CursoProgresso[];
    },
    enabled: !!user,
  });

  const toggleAula = useMutation({
    mutationFn: async (aulaId: string) => {
      if (!user) throw new Error("Não autenticado");
      const existing = progresso.find((p) => p.aula_id === aulaId);
      if (existing) {
        const { error } = await supabase
          .from("curso_progresso")
          .update({
            concluida: !existing.concluida,
            concluida_em: !existing.concluida ? new Date().toISOString() : null,
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("curso_progresso").insert({
          user_id: user.id,
          aula_id: aulaId,
          concluida: true,
          concluida_em: new Date().toISOString(),
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curso-progresso"] });
    },
  });

  const isAulaConcluida = (aulaId: string) =>
    progresso.some((p) => p.aula_id === aulaId && p.concluida);

  const totalAulas = aulas.length;
  const aulasFeitas = progresso.filter((p) => p.concluida).length;
  const percentual = totalAulas > 0 ? Math.round((aulasFeitas / totalAulas) * 100) : 0;

  return {
    modulos,
    aulas,
    progresso,
    loading: loadingModulos || loadingAulas || loadingProgresso,
    toggleAula,
    isAulaConcluida,
    totalAulas,
    aulasFeitas,
    percentual,
  };
};
