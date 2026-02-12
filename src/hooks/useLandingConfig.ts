import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLandingConfig = (secao: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["landing-config", secao],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("landing_config" as any)
        .select("conteudo")
        .eq("secao", secao)
        .maybeSingle();
      if (error) throw error;
      return (data as any)?.conteudo as Record<string, any> | null;
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  return { config: data, isLoading };
};

export const useAllLandingConfig = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["landing-config-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("landing_config" as any)
        .select("*")
        .order("secao");
      if (error) throw error;
      return data as any[];
    },
  });

  return { configs: data ?? [], isLoading };
};
