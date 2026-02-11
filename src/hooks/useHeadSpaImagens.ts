import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ETAPA_KEYS = [
  "analise-couro",
  "limpeza-profunda",
  "massagem-terapeutica",
  "tratamentos-nutritivos",
  "aromaterapia-vapor",
] as const;

export type EtapaKey = (typeof ETAPA_KEYS)[number];

export const ETAPA_LABELS: Record<EtapaKey, string> = {
  "analise-couro": "Análise do Couro Cabeludo",
  "limpeza-profunda": "Limpeza Profunda",
  "massagem-terapeutica": "Massagem Terapêutica",
  "tratamentos-nutritivos": "Tratamentos Nutritivos",
  "aromaterapia-vapor": "Aromaterapia & Vapor",
};

export function useHeadSpaImagens() {
  const queryClient = useQueryClient();

  const { data: imagens = [], isLoading } = useQuery({
    queryKey: ["headspa-imagens"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("headspa_imagens")
        .select("*");
      if (error) throw error;
      return data as { id: string; etapa_key: string; imagem_url: string }[];
    },
  });

  const imagemMap = new Map(imagens.map((i) => [i.etapa_key, i.imagem_url]));

  const uploadMutation = useMutation({
    mutationFn: async ({ etapaKey, file }: { etapaKey: EtapaKey; file: File }) => {
      const ext = file.name.split(".").pop();
      const path = `${etapaKey}.${ext}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("headspa-imagens")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("headspa-imagens")
        .getPublicUrl(path);

      const imageUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      // Upsert in DB
      const { error: dbError } = await supabase
        .from("headspa_imagens")
        .upsert(
          { etapa_key: etapaKey, imagem_url: imageUrl },
          { onConflict: "etapa_key" }
        );
      if (dbError) throw dbError;

      return imageUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headspa-imagens"] });
      toast.success("Imagem atualizada com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao enviar imagem");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (etapaKey: EtapaKey) => {
      // Delete from DB
      const { error } = await supabase
        .from("headspa_imagens")
        .delete()
        .eq("etapa_key", etapaKey);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headspa-imagens"] });
      toast.success("Imagem removida, voltando à imagem padrão.");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao remover imagem");
    },
  });

  return {
    imagens,
    imagemMap,
    isLoading,
    uploadImage: uploadMutation.mutateAsync,
    deleteImage: deleteMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
  };
}
