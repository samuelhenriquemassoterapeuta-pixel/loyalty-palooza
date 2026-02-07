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
    color: "from-amber-700 to-amber-600",
    bgLight: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-400",
    borderColor: "border-amber-300 dark:border-amber-700",
    emoji: "🥉",
    min: 0,
  },
  Prata: {
    color: "from-slate-400 to-slate-300",
    bgLight: "bg-slate-100 dark:bg-slate-800/40",
    textColor: "text-slate-600 dark:text-slate-300",
    borderColor: "border-slate-300 dark:border-slate-600",
    emoji: "🥈",
    min: 200,
  },
  Ouro: {
    color: "from-yellow-500 to-amber-400",
    bgLight: "bg-yellow-50 dark:bg-yellow-900/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    borderColor: "border-yellow-300 dark:border-yellow-600",
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
