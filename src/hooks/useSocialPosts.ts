import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface SocialPostConfig {
  id: string;
  tipo_post: string;
  cashback_valor: number;
  xp_valor: number;
  label: string;
  descricao: string | null;
  icone: string;
  ativo: boolean;
}

export interface SocialPost {
  id: string;
  user_id: string;
  agendamento_id: string | null;
  tipo_post: string;
  plataforma: string;
  link_post: string | null;
  screenshot_url: string | null;
  descricao: string | null;
  status: string;
  motivo_rejeicao: string | null;
  cashback_valor: number;
  xp_valor: number;
  created_at: string;
}

export const useSocialPosts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: config = [], isLoading: loadingConfig } = useQuery({
    queryKey: ["social-posts-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_posts_config")
        .select("*")
        .eq("ativo", true)
        .order("cashback_valor");
      if (error) throw error;
      return data as SocialPostConfig[];
    },
    enabled: !!user,
  });

  const { data: posts = [], isLoading: loadingPosts } = useQuery({
    queryKey: ["social-posts", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_posts")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as SocialPost[];
    },
    enabled: !!user,
  });

  // Check if user has a recent completed appointment without a social post
  const { data: agendamentosDisponiveis = [] } = useQuery({
    queryKey: ["agendamentos-para-post", user?.id],
    queryFn: async () => {
      const { data: agendamentos, error } = await supabase
        .from("agendamentos")
        .select("id, servico, data_hora")
        .eq("user_id", user!.id)
        .in("status", ["concluido", "realizado"])
        .order("data_hora", { ascending: false })
        .limit(10);
      if (error) throw error;

      // Filter out those that already have a social post
      const usedIds = posts
        .filter((p) => p.agendamento_id)
        .map((p) => p.agendamento_id);

      return (agendamentos || []).filter((a) => !usedIds.includes(a.id));
    },
    enabled: !!user && posts !== undefined,
  });

  const submitPost = useMutation({
    mutationFn: async (params: {
      tipo_post: string;
      plataforma: string;
      link_post?: string;
      screenshot_url?: string;
      descricao?: string;
      agendamento_id?: string;
    }) => {
      const { data, error } = await supabase
        .from("social_posts")
        .insert({
          user_id: user!.id,
          tipo_post: params.tipo_post,
          plataforma: params.plataforma,
          link_post: params.link_post || null,
          screenshot_url: params.screenshot_url || null,
          descricao: params.descricao || null,
          agendamento_id: params.agendamento_id || null,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-posts"] });
      queryClient.invalidateQueries({ queryKey: ["agendamentos-para-post"] });
    },
  });

  const totalCashbackGanho = posts
    .filter((p) => p.status === "aprovado")
    .reduce((acc, p) => acc + Number(p.cashback_valor), 0);

  const totalPostsAprovados = posts.filter((p) => p.status === "aprovado").length;
  const totalPostsPendentes = posts.filter((p) => p.status === "pendente").length;

  return {
    config,
    posts,
    agendamentosDisponiveis,
    submitPost,
    totalCashbackGanho,
    totalPostsAprovados,
    totalPostsPendentes,
    loading: loadingConfig || loadingPosts,
  };
};
