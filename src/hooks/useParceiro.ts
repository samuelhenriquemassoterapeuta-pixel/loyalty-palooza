import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useParceiro = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Check if current user is a partner
  const { data: parceiro, isLoading: loadingParceiro } = useQuery({
    queryKey: ["parceiro-perfil", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiros")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const isParceiro = !!parceiro && parceiro.ativo;

  // Fetch partner's coupons
  const { data: cupons = [], isLoading: loadingCupons } = useQuery({
    queryKey: ["parceiro-cupons", parceiro?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_cupons")
        .select("*")
        .eq("parceiro_id", parceiro!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!parceiro,
  });

  // Fetch coupon usage stats
  const { data: cupomUsos = [] } = useQuery({
    queryKey: ["parceiro-cupom-usos", parceiro?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_cupom_usos")
        .select("*")
        .eq("parceiro_id", parceiro!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!parceiro,
  });

  // Fetch commissions
  const { data: comissoes = [] } = useQuery({
    queryKey: ["parceiro-comissoes", parceiro?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_comissoes")
        .select("*")
        .eq("parceiro_id", parceiro!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!parceiro,
  });

  // Fetch commission tiers
  const { data: faixas = [] } = useQuery({
    queryKey: ["parceiro-faixas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_faixas_comissao")
        .select("*")
        .order("ordem");
      if (error) throw error;
      return data;
    },
  });

  // Create coupon
  const criarCupom = useMutation({
    mutationFn: async (cupom: {
      codigo: string;
      descricao?: string;
      tipo_desconto: string;
      valor_desconto: number;
      valor_minimo_compra?: number;
      max_usos?: number;
      valido_ate?: string;
    }) => {
      const { data, error } = await supabase
        .from("parceiro_cupons")
        .insert({
          parceiro_id: parceiro!.id,
          codigo: cupom.codigo.toUpperCase(),
          descricao: cupom.descricao || null,
          tipo_desconto: cupom.tipo_desconto,
          valor_desconto: cupom.valor_desconto,
          valor_minimo_compra: cupom.valor_minimo_compra || 0,
          max_usos: cupom.max_usos || null,
          valido_ate: cupom.valido_ate || null,
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parceiro-cupons"] });
      toast.success("Cupom criado com sucesso! 🎟️");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao criar cupom");
    },
  });

  // Toggle coupon active status
  const toggleCupom = useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase
        .from("parceiro_cupons")
        .update({ ativo: !ativo } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parceiro-cupons"] });
    },
  });

  // Delete coupon
  const deletarCupom = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("parceiro_cupons").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parceiro-cupons"] });
      toast.success("Cupom excluído");
    },
  });

  // Update partner profile
  const atualizarPerfil = useMutation({
    mutationFn: async (updates: Record<string, any>) => {
      const { error } = await supabase
        .from("parceiros")
        .update(updates as any)
        .eq("id", parceiro!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parceiro-perfil"] });
      toast.success("Perfil atualizado!");
    },
  });

  // Computed stats
  const totalVendas = cupomUsos.reduce((acc, u) => acc + Number(u.valor_compra), 0);
  const totalComissoes = comissoes.reduce((acc, c) => acc + Number(c.valor_comissao), 0);
  const comissoesPendentes = comissoes
    .filter((c) => c.status === "pendente")
    .reduce((acc, c) => acc + Number(c.valor_comissao), 0);
  const totalClientes = new Set(cupomUsos.map((u) => u.user_id)).size;

  const faixaAtual = faixas.find((f) => f.nome === parceiro?.faixa_comissao_atual);
  const proximaFaixa = faixas.find((f) => f.ordem === (faixaAtual?.ordem || 0) + 1);

  return {
    parceiro,
    isParceiro,
    loadingParceiro,
    cupons,
    loadingCupons,
    cupomUsos,
    comissoes,
    faixas,
    faixaAtual,
    proximaFaixa,
    criarCupom,
    toggleCupom,
    deletarCupom,
    atualizarPerfil,
    stats: {
      totalVendas,
      totalComissoes,
      comissoesPendentes,
      totalClientes,
      totalCupons: cupons.length,
      cuponsAtivos: cupons.filter((c) => c.ativo).length,
    },
  };
};
