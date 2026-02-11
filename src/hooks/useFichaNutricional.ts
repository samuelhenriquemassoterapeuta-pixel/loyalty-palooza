import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface FichaNutricional {
  id: string;
  user_id: string;
  peso: number | null;
  altura: number | null;
  idade: number | null;
  sexo: string | null;
  objetivo: string | null;
  doencas: string[];
  alergias_alimentares: string[];
  alimentos_restritos: string[];
  medicamentos: string | null;
  fumante: boolean;
  consumo_alcool: string;
  nivel_atividade: string;
  historico_cirurgias: string | null;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
}

export const useFichaNutricional = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["ficha-nutricional", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ficha_nutricional" as any)
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as FichaNutricional | null;
    },
  });

  const upsert = useMutation({
    mutationFn: async (ficha: Partial<Omit<FichaNutricional, "id" | "user_id" | "created_at" | "updated_at">>) => {
      if (data?.id) {
        const { error } = await supabase
          .from("ficha_nutricional" as any)
          .update(ficha as any)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("ficha_nutricional" as any)
          .insert({ user_id: user!.id, ...ficha } as any);
        if (error) throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ficha-nutricional"] }),
  });

  return { ficha: data, isLoading, upsert };
};
