import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface UserTier {
  tier_name: string;
  tier_multiplier: number;
  total_gasto: number;
  proximo_tier_nome: string | null;
  proximo_tier_limite: number | null;
  progresso_percentual: number;
}

export const TIER_CONFIG = {
  Bronze: {
    color: "from-accent to-accent/80",
    bgLight: "bg-accent/10",
    textColor: "text-accent",
    borderColor: "border-accent/30",
    emoji: "🥉",
    min: 0,
  },
  Prata: {
    color: "from-muted-foreground to-muted-foreground/80",
    bgLight: "bg-muted",
    textColor: "text-muted-foreground",
    borderColor: "border-border",
    emoji: "🥈",
    min: 200,
  },
  Ouro: {
    color: "from-warning to-warning/80",
    bgLight: "bg-warning/10",
    textColor: "text-warning",
    borderColor: "border-warning/30",
    emoji: "🥇",
    min: 500,
  },
} as const;

export type TierName = keyof typeof TIER_CONFIG;

export const useUserTier = () => {
  const { user } = useAuth();
  const [tier, setTier] = useState<UserTier | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTier = async () => {
    if (!user) {
      setTier(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_user_tier", {
        p_user_id: user.id,
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setTier(data[0] as UserTier);
      }
    } catch (err) {
      console.error("Erro ao buscar nível:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTier();
  }, [user]);

  return { tier, loading, refetch: fetchTier };
};
