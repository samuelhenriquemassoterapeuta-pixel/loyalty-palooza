import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface CursoProgressoGeral {
  id: string;
  user_id: string;
  curso_id: string;
  modulo_atual: string | null;
  aula_atual: string | null;
  percentual_completo: number;
  aulas_completas: string[];
  modulos_completos: string[];
  quizzes_completos: any[];
  checklists_completos: any[];
  tempo_total_minutos: number;
  ultimo_acesso: string;
  concluido_em: string | null;
  certificado_gerado: boolean;
}

interface UpdateProgressoParams {
  cursoId: string;
  moduloId: string;
  aulaId: string;
  tempoSegundos?: number;
  completou?: boolean;
  notaQuiz?: number;
  totalAulas: number;
}

/**
 * Hook principal para gerenciar progresso agregado de cursos (per-curso).
 * Usa a tabela curso_progresso_geral + RPC update_curso_progresso_geral.
 */
export function useCursoProgressoGeral(cursoId: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: progresso, isLoading } = useQuery({
    queryKey: ["curso-progresso-geral", cursoId, user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("curso_progresso_geral" as any)
        .select("*")
        .eq("user_id", user.id)
        .eq("curso_id", cursoId)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar progresso geral:", error);
        return null;
      }

      return data as unknown as CursoProgressoGeral | null;
    },
    staleTime: 30 * 1000,
    enabled: !!user?.id && !!cursoId,
  });

  const { mutateAsync: atualizarProgresso, isPending: isSaving } = useMutation({
    mutationFn: async (params: UpdateProgressoParams) => {
      if (!user?.id) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase.rpc("update_curso_progresso_geral" as any, {
        p_user_id: user.id,
        p_curso_id: params.cursoId,
        p_modulo_id: params.moduloId,
        p_aula_id: params.aulaId,
        p_tempo_segundos: params.tempoSegundos || 0,
        p_completou: params.completou || false,
        p_nota_quiz: params.notaQuiz || null,
        p_total_aulas: params.totalAulas,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curso-progresso-geral", cursoId] });
      queryClient.invalidateQueries({ queryKey: ["cursos-em-andamento"] });
    },
    onError: (error) => {
      console.error("Erro ao salvar progresso:", error);
      toast.error("Erro ao salvar progresso. Tente novamente.");
    },
  });

  const isAulaCompleta = (aulaId: string): boolean => {
    return progresso?.aulas_completas?.includes(aulaId) ?? false;
  };

  const isModuloCompleto = (moduloId: string): boolean => {
    return progresso?.modulos_completos?.includes(moduloId) ?? false;
  };

  return {
    progresso,
    isLoading,
    isSaving,
    atualizarProgresso,
    isAulaCompleta,
    isModuloCompleto,
    percentual: progresso?.percentual_completo ?? 0,
    isConcluido: progresso?.concluido_em !== null && progresso?.concluido_em !== undefined,
  };
}

/**
 * Hook para "Continuar Assistindo" no hub de cursos.
 */
export function useCursosEmAndamento() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["cursos-em-andamento", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase.rpc("get_cursos_em_andamento" as any, {
        p_user_id: user.id,
      });

      if (error) {
        console.error("Erro ao buscar cursos em andamento:", error);
        return [];
      }

      return data as Array<{
        curso_id: string;
        modulo_atual: string;
        aula_atual: string;
        percentual_completo: number;
        ultimo_acesso: string;
        tempo_total_minutos: number;
      }>;
    },
    staleTime: 60 * 1000,
    enabled: !!user?.id,
  });

  return { cursosEmAndamento: data ?? [], isLoading };
}

/**
 * Hook para emitir certificado ao concluir curso.
 */
export function useCertificado() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: emitirCertificado, isPending } = useMutation({
    mutationFn: async ({ cursoId, cursoNome }: { cursoId: string; cursoNome: string }) => {
      if (!user?.id) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase.rpc("emitir_certificado" as any, {
        p_user_id: user.id,
        p_curso_id: cursoId,
        p_curso_nome: cursoNome,
      });

      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      return data;
    },
    onSuccess: () => {
      toast.success("Certificado emitido com sucesso! 🎓");
      queryClient.invalidateQueries({ queryKey: ["curso-progresso-geral"] });
    },
    onError: (error) => {
      toast.error("Erro ao emitir certificado: " + error.message);
    },
  });

  return { emitirCertificado, isPending };
}
