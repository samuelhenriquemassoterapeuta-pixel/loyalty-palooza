import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useFeedbackRapido = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedback-rapido", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback_rapido")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const enviarFeedback = useMutation({
    mutationFn: async (params: { agendamento_id: string; emoji: number; comentario?: string }) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("feedback_rapido").insert({
        user_id: user.id,
        agendamento_id: params.agendamento_id,
        emoji: params.emoji,
        comentario: params.comentario || null,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback-rapido"] });
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      toast.success("Obrigado pelo feedback! 💚");
    },
    onError: (err: any) => {
      if (err.message?.includes("duplicate")) {
        toast.info("Você já enviou feedback para esta sessão");
      } else {
        toast.error(err.message || "Erro ao enviar feedback");
      }
    },
  });

  return { feedbacks, isLoading, enviarFeedback };
};
