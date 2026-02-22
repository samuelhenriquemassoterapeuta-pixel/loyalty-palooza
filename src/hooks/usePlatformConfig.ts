import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlatformText {
  id: string;
  key: string;
  value: string;
  section: string;
  description: string | null;
  updated_at: string;
  updated_by: string | null;
}

interface PlatformMedia {
  id: string;
  key: string;
  url: string;
  type: string;
  section: string;
  alt_text: string | null;
  updated_at: string;
}

interface PlatformModule {
  id: string;
  module_name: string;
  is_active: boolean;
  visible_for_roles: string[] | null;
  settings: Record<string, any> | null;
  updated_at: string;
}

export const usePlatformTexts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["platform-texts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_texts" as any)
        .select("*")
        .order("section");
      if (error) throw error;
      return data as unknown as PlatformText[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const texts: Record<string, string> = {};
  data?.forEach((t) => { texts[t.key] = t.value; });

  return { texts, textsList: data ?? [], isLoading };
};

export const usePlatformMedia = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["platform-media"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_media" as any)
        .select("*")
        .order("section");
      if (error) throw error;
      return data as unknown as PlatformMedia[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const media: Record<string, string> = {};
  data?.forEach((m) => { media[m.key] = m.url; });

  return { media, mediaList: data ?? [], isLoading };
};

export const usePlatformModules = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["platform-modules"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_modules" as any)
        .select("*")
        .order("module_name");
      if (error) throw error;
      return data as unknown as PlatformModule[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const modules: Record<string, PlatformModule> = {};
  data?.forEach((m) => { modules[m.module_name] = m; });

  return { modules, modulesList: data ?? [], isLoading };
};

/**
 * Hook combinado para consumo fácil nos componentes.
 */
export const usePlatformConfig = () => {
  const { texts, textsList, isLoading: textsLoading } = usePlatformTexts();
  const { media, mediaList, isLoading: mediaLoading } = usePlatformMedia();
  const { modules, modulesList, isLoading: modulesLoading } = usePlatformModules();

  return {
    texts,
    media,
    modules,
    textsList,
    mediaList,
    modulesList,
    isLoading: textsLoading || mediaLoading || modulesLoading,
  };
};
