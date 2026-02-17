import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface Exame {
  id: string;
  user_id: string;
  protocolo_usuario_id: string | null;
  nome: string;
  tipo_exame: string;
  arquivo_url: string;
  arquivo_tipo: string;
  tamanho_bytes: number | null;
  observacoes: string | null;
  data_exame: string | null;
  created_at: string;
}

const TIPOS_EXAME = [
  { value: "sangue", label: "Exame de Sangue" },
  { value: "imagem", label: "Exame de Imagem" },
  { value: "laudo", label: "Laudo Médico" },
  { value: "receita", label: "Receita Médica" },
  { value: "outro", label: "Outro" },
] as const;

export { TIPOS_EXAME };

export const useExames = (protocoloUsuarioId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: exames = [], isLoading } = useQuery({
    queryKey: ["exames", user?.id, protocoloUsuarioId],
    queryFn: async () => {
      let query = supabase
        .from("exames_usuario")
        .select("*")
        .order("data_exame", { ascending: false });

      if (protocoloUsuarioId) {
        query = query.eq("protocolo_usuario_id", protocoloUsuarioId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Exame[];
    },
    enabled: !!user,
  });

  const upload = useMutation({
    mutationFn: async ({
      file,
      nome,
      tipo_exame,
      observacoes,
      data_exame,
      protocolo_usuario_id,
    }: {
      file: File;
      nome: string;
      tipo_exame: string;
      observacoes?: string;
      data_exame?: string;
      protocolo_usuario_id?: string;
    }) => {
      if (!user) throw new Error("Não autenticado");

      const ext = file.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("exames-arquivos")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase
        .from("exames_usuario")
        .insert({
          user_id: user.id,
          nome,
          tipo_exame,
          arquivo_url: path,
          arquivo_tipo: file.type,
          tamanho_bytes: file.size,
          observacoes: observacoes || null,
          data_exame: data_exame || new Date().toISOString().split("T")[0],
          protocolo_usuario_id: protocolo_usuario_id || null,
        });

      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exames"] });
      toast({ title: "Exame anexado com sucesso! 📎" });
    },
    onError: () => {
      toast({ title: "Erro ao anexar exame", variant: "destructive" });
    },
  });

  const remove = useMutation({
    mutationFn: async (exame: Exame) => {
      await supabase.storage.from("exames-arquivos").remove([exame.arquivo_url]);
      const { error } = await supabase.from("exames_usuario").delete().eq("id", exame.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exames"] });
      toast({ title: "Exame removido" });
    },
    onError: () => {
      toast({ title: "Erro ao remover exame", variant: "destructive" });
    },
  });

  const getSignedUrl = async (path: string) => {
    const { data } = await supabase.storage
      .from("exames-arquivos")
      .createSignedUrl(path, 3600);
    return data?.signedUrl || "";
  };

  return { exames, isLoading, upload, remove, getSignedUrl };
};
