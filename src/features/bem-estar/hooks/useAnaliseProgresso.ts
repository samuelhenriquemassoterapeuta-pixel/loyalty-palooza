import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ProgressTrend {
  category: string;
  direction: "up" | "down" | "stable";
  description: string;
  percentage?: number;
}

export interface ProgressRecommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  icon: string;
}

export interface WeeklyComparison {
  this_week_avg_humor: number;
  last_week_avg_humor: number;
  this_week_avg_energia: number;
  last_week_avg_energia: number;
  improvement_areas: string[];
  strength_areas: string[];
}

export interface ProgressAnalysis {
  score: number | null;
  score_label: string;
  summary: string;
  trends: ProgressTrend[];
  recommendations: ProgressRecommendation[];
  weekly_comparison: WeeklyComparison | null;
}

export const useAnaliseProgresso = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["analise-progresso", user?.id],
    enabled: !!user,
    staleTime: 1000 * 60 * 30, // 30 min cache
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("analise-progresso");
      if (error) throw error;
      return data as ProgressAnalysis;
    },
  });
};
