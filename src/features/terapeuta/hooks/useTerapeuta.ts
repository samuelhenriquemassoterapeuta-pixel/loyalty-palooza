import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useTerapeuta = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Check if current user is a therapist
  const { data: terapeuta, isLoading: loadingTerapeuta } = useQuery({
    queryKey: ["terapeuta-perfil", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("terapeutas")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const isTerapeuta = !!terapeuta && terapeuta.disponivel;

  // Fetch therapist's coupons
  const { data: cupons = [], isLoading: loadingCupons } = useQuery({
    queryKey: ["terapeuta-cupons", terapeuta?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("terapeuta_cupons" as any)
        .select("*")
        .eq("terapeuta_id", terapeuta!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
    enabled: !!terapeuta,
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
        .from("terapeuta_cupons" as any)
        .insert({
          terapeuta_id: terapeuta!.id,
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
      queryClient.invalidateQueries({ queryKey: ["terapeuta-cupons"] });
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
        .from("terapeuta_cupons" as any)
        .update({ ativo: !ativo } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["terapeuta-cupons"] });
    },
  });

  // Delete coupon
  const deletarCupom = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("terapeuta_cupons" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["terapeuta-cupons"] });
      toast.success("Cupom excluído");
    },
  });

  return {
    terapeuta,
    isTerapeuta,
    loadingTerapeuta,
    cupons,
    loadingCupons,
    criarCupom,
    toggleCupom,
    deletarCupom,
  };
};
