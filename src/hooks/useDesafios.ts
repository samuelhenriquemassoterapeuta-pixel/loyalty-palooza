import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string | null;
  icone: string;
  cor: string;
  data_inicio: string;
  data_fim: string;
  meta_tipo: string;
  meta_quantidade: number;
  recompensa_tipo: string;
  recompensa_valor: number;
  ativo: boolean;
  created_at: string;
}

export interface DesafioParticipante {
  id: string;
  desafio_id: string;
  user_id: string;
  progresso: number;
  concluido: boolean;
  concluido_em: string | null;
  recompensa_creditada: boolean;
  created_at: string;
}

export const useDesafios = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: desafios = [], isLoading } = useQuery({
    queryKey: ["desafios"],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("desafios")
        .select("*")
        .eq("ativo", true)
        .gte("data_fim", new Date().toISOString().split("T")[0])
        .order("data_inicio", { ascending: false });
      if (error) throw error;
      return data as unknown as Desafio[];
    },
  });

  const { data: participacoes = [] } = useQuery({
    queryKey: ["desafio-participacoes", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("desafio_participantes")
        .select("*")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data as unknown as DesafioParticipante[];
    },
  });

  const participar = useMutation({
    mutationFn: async (desafioId: string) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("desafio_participantes").insert({
        desafio_id: desafioId,
        user_id: user.id,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desafio-participacoes"] });
      toast.success("Você entrou no desafio! 🏆");
    },
    onError: (err: any) => {
      if (err.message?.includes("duplicate")) {
        toast.info("Você já está participando deste desafio");
      } else {
        toast.error(err.message || "Erro ao participar");
      }
    },
  });

  return { desafios, participacoes, isLoading, participar };
};
