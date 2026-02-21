import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

/**
 * Hook que migra automaticamente o progresso do localStorage para o Supabase.
 * Roda UMA vez quando o usuário loga. Após migração, limpa o localStorage.
 *
 * Coloque este hook no componente raiz do módulo de cursos (ex: CursosHub).
 */
export function useMigrateCourseProgress() {
  const { user } = useAuth();
  const hasRun = useRef(false);

  const { mutate: migrate } = useMutation({
    mutationFn: async (userId: string) => {
      const localKeys = Object.keys(localStorage).filter(
        (k) =>
          k.startsWith("curso_progresso_") ||
          k.startsWith("course_progress_") ||
          k.startsWith("curso_") ||
          k.includes("_progress_") ||
          k.includes("_aula_") ||
          k.includes("_modulo_")
      );

      if (localKeys.length === 0) {
        console.log("[Migration] Nenhum progresso local encontrado");
        return { migrated: 0 };
      }

      console.log(`[Migration] Encontradas ${localKeys.length} chaves para migrar`);

      const rows: Array<{
        user_id: string;
        curso_id: string;
        aulas_completas: string[];
        percentual_completo: number;
        modulo_atual: string | null;
        aula_atual: string | null;
        migrated_from_local: boolean;
      }> = [];

      for (const key of localKeys) {
        try {
          const raw = localStorage.getItem(key);
          if (!raw) continue;

          const parsed = JSON.parse(raw);

          const cursoId = key
            .replace("curso_progresso_", "")
            .replace("course_progress_", "")
            .replace("curso_", "");

          rows.push({
            user_id: userId,
            curso_id: cursoId,
            aulas_completas: parsed.aulas_completas || parsed.completedLessons || parsed.completed || [],
            percentual_completo: parsed.percentual_completo || parsed.progress || parsed.percentual || 0,
            modulo_atual: parsed.modulo_atual || parsed.currentModule || null,
            aula_atual: parsed.aula_atual || parsed.currentLesson || null,
            migrated_from_local: true,
          });
        } catch (e) {
          console.warn(`[Migration] Erro ao parsear chave ${key}:`, e);
        }
      }

      if (rows.length === 0) {
        return { migrated: 0 };
      }

      const { error } = await supabase
        .from("curso_progresso_geral" as any)
        .upsert(rows as any, { onConflict: "user_id,curso_id" });

      if (error) {
        console.error("[Migration] Erro no upsert:", error);
        throw error;
      }

      // Limpar localStorage após migração
      localKeys.forEach((k) => localStorage.removeItem(k));
      localStorage.setItem("curso_migration_done", "true");

      console.log(`[Migration] ${rows.length} cursos migrados com sucesso`);
      return { migrated: rows.length };
    },
    onSuccess: (data) => {
      if (data.migrated > 0) {
        toast.success(
          `${data.migrated} curso(s) sincronizado(s) com sucesso! Seu progresso agora está salvo na nuvem. ☁️`
        );
      }
    },
    onError: (error) => {
      console.error("[Migration] Falha na migração:", error);
    },
  });

  useEffect(() => {
    if (!user?.id || hasRun.current) return;

    const alreadyMigrated = localStorage.getItem("curso_migration_done");
    if (alreadyMigrated === "true") return;

    hasRun.current = true;
    migrate(user.id);
  }, [user?.id, migrate]);
}
