import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface PlanoAssinatura {
  id: string;
  nome: string;
  descricao: string | null;
  preco_mensal: number;
  beneficios: string[];
  cashback_bonus_percentual: number;
  desconto_servicos_percentual: number;
  prioridade_agendamento: boolean;
  disponivel: boolean;
  cor: string;
  icone: string;
  ordem: number;
  created_at: string;
}

export interface AssinaturaUsuario {
  id: string;
  user_id: string;
  plano_id: string;
  status: string;
  data_inicio: string;
  data_fim: string | null;
  renovacao_automatica: boolean;
  created_at: string;
  updated_at: string;
  plano?: PlanoAssinatura;
}

export const usePlanos = () => {
  return useQuery({
    queryKey: ["assinaturas-planos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assinaturas_planos")
        .select("*")
        .eq("disponivel", true)
        .order("ordem");
      if (error) throw error;
      return (data || []).map((p: any) => ({
        ...p,
        beneficios: Array.isArray(p.beneficios) ? p.beneficios : JSON.parse(p.beneficios || "[]"),
      })) as PlanoAssinatura[];
    },
  });
};

export const useMinhaAssinatura = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["minha-assinatura", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assinaturas_usuario")
        .select("*, plano:assinaturas_planos(*)")
        .eq("user_id", user!.id)
        .eq("status", "ativo")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        plano: data.plano
          ? {
              ...(data.plano as any),
              beneficios: Array.isArray((data.plano as any).beneficios)
                ? (data.plano as any).beneficios
                : JSON.parse((data.plano as any).beneficios || "[]"),
            }
          : undefined,
      } as AssinaturaUsuario;
    },
  });
};

export const useAssinar = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planoId: string) => {
      if (!user) throw new Error("Usuário não autenticado");

      // Cancel existing subscription if any
      await supabase
        .from("assinaturas_usuario")
        .update({ status: "cancelado" } as any)
        .eq("user_id", user.id)
        .eq("status", "ativo");

      const dataFim = new Date();
      dataFim.setMonth(dataFim.getMonth() + 1);

      const { data, error } = await supabase
        .from("assinaturas_usuario")
        .insert({
          user_id: user.id,
          plano_id: planoId,
          data_fim: dataFim.toISOString(),
        } as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["minha-assinatura"] });
      toast.success("Assinatura ativada com sucesso! 👑");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao assinar plano");
    },
  });
};

export const useCancelarAssinatura = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assinaturaId: string) => {
      if (!user) throw new Error("Usuário não autenticado");
      const { error } = await supabase
        .from("assinaturas_usuario")
        .update({ status: "cancelado", renovacao_automatica: false } as any)
        .eq("id", assinaturaId)
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["minha-assinatura"] });
      toast.success("Assinatura cancelada.");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao cancelar assinatura");
    },
  });
};
