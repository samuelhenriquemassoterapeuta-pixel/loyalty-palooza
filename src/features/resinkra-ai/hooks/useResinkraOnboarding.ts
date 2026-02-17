import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useResinkraOnboarding = () => {
  const { user } = useAuth();

  const { data: brandProfile, isLoading } = useQuery({
    queryKey: ["brand-profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("brand_profiles")
        .select("id")
        .eq("user_id", user!.id)
        .limit(1)
        .maybeSingle();
      return data;
    },
  });

  return {
    needsOnboarding: !isLoading && !brandProfile,
    isLoading,
    brandProfile,
  };
};
