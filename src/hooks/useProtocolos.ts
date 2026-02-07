import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// ── Protocolos (catálogo) ──────────────────────────
export const useProtocolos = () => {
  const { data: protocolos = [], isLoading } = useQuery({
    queryKey: ["protocolos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("protocolos")
        .select("*")
        .eq("disponivel", true)
        .order("nome");
      if (error) throw error;
      return data;
    },
  });
  return { protocolos, isLoading };
};

// ── Protocolo do Usuário ───────────────────────────
export const useUsuarioProtocolos = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: meus = [], isLoading } = useQuery({
    queryKey: ["usuario_protocolos", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("usuario_protocolos")
        .select("*, protocolos(*)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const ativar = useMutation({
    mutationFn: async (protocoloId: string) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("usuario_protocolos").insert({
        user_id: user.id,
        protocolo_id: protocoloId,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuario_protocolos"] });
      toast.success("Protocolo ativado com sucesso!");
    },
    onError: () => toast.error("Erro ao ativar protocolo"),
  });

  const atualizarStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const update: Record<string, unknown> = { status };
      if (status === "concluido") update.data_fim = new Date().toISOString();
      const { error } = await supabase
        .from("usuario_protocolos")
        .update(update)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuario_protocolos"] });
      toast.success("Status atualizado!");
    },
    onError: () => toast.error("Erro ao atualizar status"),
  });

  const protocoloAtivo = meus.find((p) => p.status === "ativo");

  return { meus, protocoloAtivo, isLoading, ativar, atualizarStatus };
};

// ── Fichas de Acompanhamento ───────────────────────
export interface FichaData {
  protocolo_usuario_id: string;
  peso?: number;
  imc?: number;
  gordura_corporal?: number;
  medida_cintura?: number;
  medida_quadril?: number;
  medida_braco?: number;
  medida_coxa?: number;
  medida_torax?: number;
  escala_eva?: number;
  observacoes?: string;
}

export const useFichas = (protocoloUsuarioId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: fichas = [], isLoading } = useQuery({
    queryKey: ["fichas_acompanhamento", protocoloUsuarioId],
    enabled: !!user && !!protocoloUsuarioId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fichas_acompanhamento")
        .select("*")
        .eq("protocolo_usuario_id", protocoloUsuarioId!)
        .order("data", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const adicionar = useMutation({
    mutationFn: async (ficha: FichaData) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("fichas_acompanhamento").insert({
        user_id: user.id,
        ...ficha,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fichas_acompanhamento"] });
      toast.success("Ficha registrada!");
    },
    onError: () => toast.error("Erro ao salvar ficha"),
  });

  return { fichas, isLoading, adicionar };
};

// ── Metas Semanais ─────────────────────────────────
export const useMetas = (protocoloUsuarioId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: metas = [], isLoading } = useQuery({
    queryKey: ["metas_semanais", protocoloUsuarioId],
    enabled: !!user && !!protocoloUsuarioId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("metas_semanais")
        .select("*")
        .eq("protocolo_usuario_id", protocoloUsuarioId!)
        .order("semana_numero");
      if (error) throw error;
      return data;
    },
  });

  const adicionar = useMutation({
    mutationFn: async (meta: {
      protocolo_usuario_id: string;
      semana_numero: number;
      descricao: string;
      meta_valor?: string;
    }) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("metas_semanais").insert({
        user_id: user.id,
        ...meta,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metas_semanais"] });
      toast.success("Meta adicionada!");
    },
    onError: () => toast.error("Erro ao adicionar meta"),
  });

  const concluir = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("metas_semanais")
        .update({ concluida: true, data_conclusao: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metas_semanais"] });
      toast.success("Meta concluída! 🎉");
    },
    onError: () => toast.error("Erro ao concluir meta"),
  });

  return { metas, isLoading, adicionar, concluir };
};

// ── Fotos de Evolução ──────────────────────────────
export interface FotoWithSignedUrl {
  id: string;
  user_id: string;
  protocolo_usuario_id: string;
  data: string;
  foto_url: string;
  tipo: string;
  observacoes: string | null;
  created_at: string;
  signed_url?: string;
}

export const useFotos = (protocoloUsuarioId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: fotos = [], isLoading } = useQuery({
    queryKey: ["fotos_evolucao", protocoloUsuarioId],
    enabled: !!user && !!protocoloUsuarioId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fotos_evolucao")
        .select("*")
        .eq("protocolo_usuario_id", protocoloUsuarioId!)
        .order("data", { ascending: true });
      if (error) throw error;

      // Generate signed URLs for each photo (valid for 1 hour)
      const fotosWithUrls: FotoWithSignedUrl[] = await Promise.all(
        (data || []).map(async (foto) => {
          // Extract the storage path from the foto_url
          const storagePath = extractStoragePath(foto.foto_url);
          if (storagePath) {
            const { data: signedData, error: signError } = await supabase.storage
              .from("fotos-evolucao")
              .createSignedUrl(storagePath, 3600); // 1 hour
            if (!signError && signedData?.signedUrl) {
              return { ...foto, signed_url: signedData.signedUrl };
            }
          }
          return { ...foto, signed_url: foto.foto_url };
        })
      );

      return fotosWithUrls;
    },
  });

  const upload = useMutation({
    mutationFn: async ({
      file,
      tipo,
      protocoloUsuarioId: pId,
      observacoes,
    }: {
      file: File;
      tipo: string;
      protocoloUsuarioId: string;
      observacoes?: string;
    }) => {
      if (!user) throw new Error("Não autenticado");

      // Validate file type and size
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Tipo de arquivo não permitido. Use JPEG, PNG ou WebP.");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Arquivo muito grande. Máximo: 5MB.");
      }

      const ext = file.name.split(".").pop();
      const path = `${user.id}/${pId}/${Date.now()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("fotos-evolucao")
        .upload(path, file);
      if (uploadErr) throw uploadErr;

      // Store the path reference, not the public URL
      const { error: insertErr } = await supabase
        .from("fotos_evolucao")
        .insert({
          user_id: user.id,
          protocolo_usuario_id: pId,
          foto_url: path, // Store path instead of public URL
          tipo,
          observacoes,
        });
      if (insertErr) throw insertErr;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fotos_evolucao"] });
      toast.success("Foto adicionada!");
    },
    onError: (err: Error) => toast.error(err.message || "Erro ao enviar foto"),
  });

  const remover = useMutation({
    mutationFn: async (id: string) => {
      // Find the photo to get storage path
      const foto = fotos.find((f) => f.id === id);
      if (foto) {
        const storagePath = extractStoragePath(foto.foto_url);
        if (storagePath) {
          await supabase.storage.from("fotos-evolucao").remove([storagePath]);
        }
      }
      const { error } = await supabase
        .from("fotos_evolucao")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fotos_evolucao"] });
      toast.success("Foto removida");
    },
    onError: () => toast.error("Erro ao remover foto"),
  });

  return { fotos, isLoading, upload, remover };
};

/** Extract storage path from a foto_url (handles both old public URLs and new path-only values) */
function extractStoragePath(fotoUrl: string): string | null {
  // If it's already a path (new format), return as-is
  if (!fotoUrl.startsWith("http")) {
    return fotoUrl;
  }
  // If it's a full URL (old format), extract path after bucket name
  const match = fotoUrl.match(/fotos-evolucao\/(.+)$/);
  return match ? match[1] : null;
}
