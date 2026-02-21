import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FeatureFlag {
  feature_key: string;
  is_enabled: boolean;
  description: string;
}

/**
 * Verifica se uma feature flag específica está habilitada para o usuário atual.
 */
export function useFeatureFlag(featureKey: string) {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["feature-flag", featureKey, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("is_feature_enabled" as any, {
        p_key: featureKey,
        p_user_id: user?.id || null,
      });
      if (error) {
        console.error("Erro ao verificar feature flag:", error);
        return false;
      }
      return data as boolean;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!featureKey,
  });

  return { isEnabled: data ?? false, isLoading };
}

/**
 * Lista todas as features e se estão habilitadas para o usuário atual.
 */
export function useUserFeatures() {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user-features", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase.rpc("get_user_features" as any, {
        p_user_id: user.id,
      });
      if (error) {
        console.error("Erro ao listar features:", error);
        return [];
      }
      return data as unknown as FeatureFlag[];
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.id,
  });

  const isFeatureEnabled = (key: string): boolean => {
    return data?.find((f) => f.feature_key === key)?.is_enabled ?? false;
  };

  return { features: data ?? [], isLoading, isFeatureEnabled, refetch };
}

/**
 * Hook admin para gerenciar todas as feature flags.
 */
export function useAdminFeatureFlags() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-feature-flags"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_all_feature_flags" as any);
      if (error) throw error;
      return data as unknown as Array<{
        id: string;
        key: string;
        enabled: boolean;
        description: string;
        allowed_roles: string[];
        allowed_user_ids: string[];
        allowed_empresa_ids: string[];
        metadata: any;
        created_at: string;
        updated_at: string;
      }>;
    },
  });

  const toggleFeature = async (key: string, enabled: boolean) => {
    const { error } = await supabase
      .from("feature_flags" as any)
      .update({ enabled } as any)
      .eq("key", key);
    if (error) throw error;
    await refetch();
  };

  const updateFeature = async (
    key: string,
    updates: {
      enabled?: boolean;
      allowed_roles?: string[];
      allowed_user_ids?: string[];
      description?: string;
    }
  ) => {
    const { error } = await supabase
      .from("feature_flags" as any)
      .update(updates as any)
      .eq("key", key);
    if (error) throw error;
    await refetch();
  };

  return { flags: data ?? [], isLoading, toggleFeature, updateFeature, refetch };
}
