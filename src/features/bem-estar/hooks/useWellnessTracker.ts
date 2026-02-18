import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

export interface WellnessCheckin {
  id: string;
  user_id: string;
  data: string;
  humor: number;
  energia: number;
  sono_horas: number | null;
  sono_qualidade: number | null;
  dor: number;
  dor_local: string | null;
  estresse: number | null;
  agua_litros: number | null;
  exercicio_min: number;
  observacoes: string | null;
  created_at: string;
}

export type WellnessCheckinInput = Omit<WellnessCheckin, "id" | "user_id" | "created_at">;

export const useWellnessTracker = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: todayCheckin, isLoading: loadingToday } = useQuery({
    queryKey: ["wellness-checkin-today", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wellness_checkins")
        .select("*")
        .eq("user_id", user!.id)
        .eq("data", today)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as WellnessCheckin | null;
    },
  });

  const { data: history = [], isLoading: loadingHistory } = useQuery({
    queryKey: ["wellness-checkins", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wellness_checkins")
        .select("*")
        .eq("user_id", user!.id)
        .order("data", { ascending: false })
        .limit(30);
      if (error) throw error;
      return data as unknown as WellnessCheckin[];
    },
  });

  const saveCheckin = useMutation({
    mutationFn: async (input: WellnessCheckinInput) => {
      if (!user) throw new Error("Não autenticado");

      const payload = { ...input, user_id: user.id } as any;

      if (todayCheckin) {
        const { error } = await supabase
          .from("wellness_checkins")
          .update(payload)
          .eq("id", todayCheckin.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wellness_checkins")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["wellness-checkin-today"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-checkins"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-streak"] });
      queryClient.invalidateQueries({ queryKey: ["wellness-week-hub"] });
      toast.success("Check-in salvo! 💚");

      // Auto-check conquistas in background
      try {
        const { data } = await supabase.functions.invoke("wellness-check-conquistas");
        if (data?.unlocked?.length > 0) {
          queryClient.invalidateQueries({ queryKey: ["wellness-conquistas-user"] });
          queryClient.invalidateQueries({ queryKey: ["wellness-badges-hub"] });
          data.unlocked.forEach((title: string) => {
            toast.success(`🏆 Conquista desbloqueada: ${title}!`);
          });
        }
      } catch {
        // Silent fail - achievements check is non-critical
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao salvar check-in");
    },
  });

  // Compute averages from last 7 days
  const last7 = history.slice(0, 7);
  const avg = (key: keyof WellnessCheckin) => {
    const vals = last7.map((c) => c[key]).filter((v): v is number => typeof v === "number" && v > 0);
    return vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : null;
  };

  return {
    todayCheckin,
    history,
    loadingToday,
    loadingHistory,
    saveCheckin,
    averages: {
      humor: avg("humor"),
      energia: avg("energia"),
      sono_horas: avg("sono_horas"),
      dor: avg("dor"),
      estresse: avg("estresse"),
    },
  };
};
