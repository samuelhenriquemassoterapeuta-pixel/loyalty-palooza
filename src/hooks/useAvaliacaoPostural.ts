import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type VistaPostural = "anterior" | "posterior" | "lateral_direita" | "lateral_esquerda";

export interface AvaliacaoPostural {
  id: string;
  user_id: string;
  data: string;
  foto_anterior: string | null;
  foto_posterior: string | null;
  foto_lateral_direita: string | null;
  foto_lateral_esquerda: string | null;
  observacoes: string | null;
  created_at: string;
  // Signed URLs (computed client-side)
  signed_anterior?: string;
  signed_posterior?: string;
  signed_lateral_direita?: string;
  signed_lateral_esquerda?: string;
}

const BUCKET = "avaliacoes-posturais";

async function getSignedUrl(path: string | null): Promise<string | undefined> {
  if (!path) return undefined;
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600);
  if (error || !data?.signedUrl) return undefined;
  return data.signedUrl;
}

export const useAvaliacoesPosturais = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: avaliacoes = [], isLoading } = useQuery({
    queryKey: ["avaliacoes_posturais", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("avaliacoes_posturais")
        .select("*")
        .eq("user_id", user!.id)
        .order("data", { ascending: false });
      if (error) throw error;

      // Generate signed URLs for all photos
      const withUrls: AvaliacaoPostural[] = await Promise.all(
        (data || []).map(async (av: AvaliacaoPostural) => ({
          ...av,
          signed_anterior: await getSignedUrl(av.foto_anterior),
          signed_posterior: await getSignedUrl(av.foto_posterior),
          signed_lateral_direita: await getSignedUrl(av.foto_lateral_direita),
          signed_lateral_esquerda: await getSignedUrl(av.foto_lateral_esquerda),
        }))
      );
      return withUrls;
    },
  });

  const criar = useMutation({
    mutationFn: async (observacoes?: string) => {
      if (!user) throw new Error("Não autenticado");
      const { data, error } = await supabase
        .from("avaliacoes_posturais")
        .insert({ user_id: user.id, observacoes })
        .select()
        .single();
      if (error) throw error;
      return data as AvaliacaoPostural;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avaliacoes_posturais"] });
    },
    onError: () => toast.error("Erro ao criar avaliação"),
  });

  const uploadFoto = useMutation({
    mutationFn: async ({
      avaliacaoId,
      vista,
      file,
    }: {
      avaliacaoId: string;
      vista: VistaPostural;
      file: File;
    }) => {
      if (!user) throw new Error("Não autenticado");

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Use JPEG, PNG ou WebP.");
      }
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("Máximo: 10MB.");
      }

      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${avaliacaoId}/${vista}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;

      const column = `foto_${vista}` as const;
      const { error: dbErr } = await supabase
        .from("avaliacoes_posturais")
        .update({ [column]: path })
        .eq("id", avaliacaoId);
      if (dbErr) throw dbErr;

      return path;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avaliacoes_posturais"] });
      toast.success("Foto salva!");
    },
    onError: (err: Error) => toast.error(err.message || "Erro no upload"),
  });

  const atualizar = useMutation({
    mutationFn: async ({ id, observacoes }: { id: string; observacoes: string }) => {
      const { error } = await supabase
        .from("avaliacoes_posturais")
        .update({ observacoes })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avaliacoes_posturais"] });
      toast.success("Observações salvas!");
    },
    onError: () => toast.error("Erro ao atualizar"),
  });

  const remover = useMutation({
    mutationFn: async (av: AvaliacaoPostural) => {
      // Delete storage files
      const paths = [av.foto_anterior, av.foto_posterior, av.foto_lateral_direita, av.foto_lateral_esquerda].filter(Boolean) as string[];
      if (paths.length > 0) {
        await supabase.storage.from(BUCKET).remove(paths);
      }
      const { error } = await supabase.from("avaliacoes_posturais").delete().eq("id", av.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avaliacoes_posturais"] });
      toast.success("Avaliação removida");
    },
    onError: () => toast.error("Erro ao remover"),
  });

  return { avaliacoes, isLoading, criar, uploadFoto, atualizar, remover };
};
