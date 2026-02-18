import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Elemento = "terra" | "agua" | "fogo" | "ar" | "eter";

export interface CromoSaldo {
  id: string;
  user_id: string;
  elemento: Elemento;
  quantidade: number;
  updated_at: string;
}

export interface TransacaoCromo {
  id: string;
  user_id: string;
  tipo: string;
  elemento: Elemento;
  quantidade: number;
  descricao: string | null;
  referencia_id: string | null;
  created_at: string;
}

export interface ReceitaAlquimia {
  id: string;
  nome: string;
  descricao: string | null;
  icone: string;
  terra_requerido: number;
  agua_requerido: number;
  fogo_requerido: number;
  ar_requerido: number;
  eter_requerido: number;
  recompensa_tipo: string;
  recompensa_valor: number;
  recompensa_descricao: string | null;
  elemento_gerado: Elemento | null;
  quantidade_gerada: number | null;
  ativo: boolean;
  nivel_minimo: string;
  ordem: number;
}

export interface RecompensaCromo {
  id: string;
  nome: string;
  descricao: string | null;
  icone: string;
  elemento_requerido: Elemento;
  quantidade_requerida: number;
  recompensa_tipo: string;
  recompensa_valor: number;
  recompensa_descricao: string | null;
  ativo: boolean;
  estoque: number | null;
  nivel_minimo: string;
  ordem: number;
}

export const ELEMENTO_CONFIG: Record<Elemento, { nome: string; emoji: string; cor: string; corBg: string }> = {
  terra: { nome: "Terra", emoji: "🌿", cor: "text-green-600", corBg: "bg-green-500/15" },
  agua: { nome: "Água", emoji: "💧", cor: "text-blue-600", corBg: "bg-blue-500/15" },
  fogo: { nome: "Fogo", emoji: "🔥", cor: "text-orange-600", corBg: "bg-orange-500/15" },
  ar: { nome: "Ar", emoji: "🌬️", cor: "text-sky-600", corBg: "bg-sky-500/15" },
  eter: { nome: "Éter", emoji: "✨", cor: "text-purple-600", corBg: "bg-purple-500/15" },
};

export const useCromos = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Saldos do usuário
  const { data: saldos = [], isLoading: loadingSaldos } = useQuery({
    queryKey: ["cromos-saldos", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cromos_usuarios")
        .select("*")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data as CromoSaldo[];
    },
    staleTime: 15_000,
  });

  // Histórico
  const { data: historico = [], isLoading: loadingHistorico } = useQuery({
    queryKey: ["cromos-historico", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transacoes_cromos")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as TransacaoCromo[];
    },
    staleTime: 15_000,
  });

  // Receitas
  const { data: receitas = [], isLoading: loadingReceitas } = useQuery({
    queryKey: ["receitas-alquimia"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("receitas_alquimia")
        .select("*")
        .eq("ativo", true)
        .order("ordem");
      if (error) throw error;
      return data as ReceitaAlquimia[];
    },
    staleTime: 60_000,
  });

  // Recompensas
  const { data: recompensas = [], isLoading: loadingRecompensas } = useQuery({
    queryKey: ["recompensas-cromos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recompensas_cromos")
        .select("*")
        .eq("ativo", true)
        .order("ordem");
      if (error) throw error;
      return data as RecompensaCromo[];
    },
    staleTime: 60_000,
  });

  // Executar alquimia
  const alquimiaMutation = useMutation({
    mutationFn: async (receitaId: string) => {
      const { data, error } = await supabase.rpc("executar_alquimia", {
        p_receita_id: receitaId,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cromos-saldos"] });
      queryClient.invalidateQueries({ queryKey: ["cromos-historico"] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
    },
  });

  // Resgatar recompensa
  const resgateMutation = useMutation({
    mutationFn: async (recompensaId: string) => {
      const { data, error } = await supabase.rpc("resgatar_recompensa_cromo", {
        p_recompensa_id: recompensaId,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cromos-saldos"] });
      queryClient.invalidateQueries({ queryKey: ["cromos-historico"] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      queryClient.invalidateQueries({ queryKey: ["recompensas-cromos"] });
    },
  });

  const getSaldo = (elemento: Elemento) =>
    saldos.find((s) => s.elemento === elemento)?.quantidade ?? 0;

  const totalCromos = saldos.reduce((acc, s) => acc + s.quantidade, 0);

  const nivel = totalCromos >= 1000 ? "plenitude" : totalCromos >= 500 ? "harmonia" : "equilibrio";

  const podeExecutarReceita = (receita: ReceitaAlquimia) =>
    getSaldo("terra") >= receita.terra_requerido &&
    getSaldo("agua") >= receita.agua_requerido &&
    getSaldo("fogo") >= receita.fogo_requerido &&
    getSaldo("ar") >= receita.ar_requerido &&
    getSaldo("eter") >= receita.eter_requerido;

  const podeResgatar = (recompensa: RecompensaCromo) =>
    getSaldo(recompensa.elemento_requerido) >= recompensa.quantidade_requerida &&
    (recompensa.estoque === null || recompensa.estoque > 0);

  return {
    saldos,
    historico,
    receitas,
    recompensas,
    loading: loadingSaldos || loadingReceitas || loadingRecompensas,
    loadingHistorico,
    getSaldo,
    totalCromos,
    nivel,
    podeExecutarReceita,
    podeResgatar,
    executarAlquimia: alquimiaMutation.mutateAsync,
    executandoAlquimia: alquimiaMutation.isPending,
    resgatarRecompensa: resgateMutation.mutateAsync,
    resgatando: resgateMutation.isPending,
    refetch: () => {
      queryClient.invalidateQueries({ queryKey: ["cromos-saldos"] });
      queryClient.invalidateQueries({ queryKey: ["cromos-historico"] });
    },
  };
};
