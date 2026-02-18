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
  cromos_ether: number;
  missao_id: string | null;
  multiplicador_aplicado: number;
  created_at: string;
}

export interface MomentsMissao {
  id: string;
  titulo: string;
  descricao: string | null;
  requisito_tipo: string;
  requisito_valor: string | null;
  multiplicador_cashback: number;
  multiplicador_xp: number;
  multiplicador_cromos: number;
  data_inicio: string;
  data_fim: string;
  ativa: boolean;
}

export interface MomentsRanking {
  id: string;
  user_id: string;
  semana_inicio: string;
  semana_fim: string;
  total_posts: number;
  total_xp: number;
  total_cashback: number;
  total_cromos: number;
  posicao: number | null;
  premio_ganho: string | null;
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

      const usedIds = posts
        .filter((p) => p.agendamento_id)
        .map((p) => p.agendamento_id);

      return (agendamentos || []).filter((a) => !usedIds.includes(a.id));
    },
    enabled: !!user && posts !== undefined,
  });

  // Missões ativas
  const { data: missoes = [] } = useQuery({
    queryKey: ["moments-missoes"],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("moments_missoes")
        .select("*")
        .eq("ativa", true)
        .lte("data_inicio", now)
        .gte("data_fim", now);
      if (error) throw error;
      return data as MomentsMissao[];
    },
    enabled: !!user,
  });

  // Ranking semanal (top 10)
  const { data: ranking = [] } = useQuery({
    queryKey: ["moments-ranking"],
    queryFn: async () => {
      const hoje = new Date();
      const dia = hoje.getDay();
      const inicioSemana = new Date(hoje);
      inicioSemana.setDate(hoje.getDate() - dia);
      const semanaStr = inicioSemana.toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("moments_ranking")
        .select("*")
        .eq("semana_inicio", semanaStr)
        .order("total_xp", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as MomentsRanking[];
    },
    enabled: !!user,
  });

  const submitPost = useMutation({
    mutationFn: async (params: {
      tipo_post: string;
      plataforma: string;
      link_post?: string;
      screenshot_url?: string;
      descricao?: string;
      agendamento_id?: string;
      missao_id?: string;
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
          missao_id: params.missao_id || null,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-posts"] });
      queryClient.invalidateQueries({ queryKey: ["agendamentos-para-post"] });
      queryClient.invalidateQueries({ queryKey: ["moments-ranking"] });
    },
  });

  const totalCashbackGanho = posts
    .filter((p) => p.status === "aprovado")
    .reduce((acc, p) => acc + Number(p.cashback_valor), 0);

  const totalCromosGanhos = posts
    .filter((p) => p.status === "aprovado")
    .reduce((acc, p) => acc + Number(p.cromos_ether || 0), 0);

  const totalPostsAprovados = posts.filter((p) => p.status === "aprovado").length;
  const totalPostsPendentes = posts.filter((p) => p.status === "pendente").length;

  return {
    config,
    posts,
    agendamentosDisponiveis,
    missoes,
    ranking,
    submitPost,
    totalCashbackGanho,
    totalCromosGanhos,
    totalPostsAprovados,
    totalPostsPendentes,
    loading: loadingConfig || loadingPosts,
  };
};
