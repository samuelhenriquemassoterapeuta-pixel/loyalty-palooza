import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useCheckins = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: checkins = [], isLoading } = useQuery({
    queryKey: ["checkins", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const fazerCheckin = useMutation({
    mutationFn: async (agendamentoId?: string) => {
      if (!user) throw new Error("Não autenticado");
      const { data, error } = await supabase
        .from("checkins")
        .insert({
          user_id: user.id,
          agendamento_id: agendamentoId || null,
          metodo: "qr_code",
          xp_ganho: 25,
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkins"] });
      toast.success("Check-in realizado! +25 XP ✅");
    },
    onError: (err: any) => {
      if (err.message?.includes("duplicate")) {
        toast.error("Você já fez check-in para este agendamento");
      } else {
        toast.error(err.message || "Erro no check-in");
      }
    },
  });

  return { checkins, isLoading, fazerCheckin };
};
