import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface ValePresente {
  id: string;
  comprador_id: string;
  destinatario_nome: string;
  destinatario_email: string | null;
  valor: number;
  codigo: string;
  mensagem: string | null;
  tema: string;
  status: string;
  validade: string;
  usado_em: string | null;
  usado_por: string | null;
  created_at: string;
}

export const useValePresente = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: meusVales = [], isLoading } = useQuery({
    queryKey: ["vales-presente", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vale_presentes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ValePresente[];
    },
    enabled: !!user,
  });

  const criarVale = useMutation({
    mutationFn: async (vale: {
      destinatario_nome: string;
      destinatario_email?: string;
      valor: number;
      mensagem?: string;
      tema: string;
    }) => {
      const { data, error } = await supabase
        .from("vale_presentes")
        .insert({
          comprador_id: user!.id,
          destinatario_nome: vale.destinatario_nome,
          destinatario_email: vale.destinatario_email || null,
          valor: vale.valor,
          mensagem: vale.mensagem || null,
          tema: vale.tema,
        })
        .select()
        .single();
      if (error) throw error;
      return data as ValePresente;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vales-presente"] });
      toast.success("Vale presente criado com sucesso! 🎁");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao criar vale presente");
    },
  });

  const resgatarVale = useMutation({
    mutationFn: async (codigo: string) => {
      // First find the gift card
      const { data: vale, error: findError } = await supabase
        .from("vale_presentes")
        .select("*")
        .eq("codigo", codigo.toUpperCase().trim())
        .eq("status", "ativo")
        .single();

      if (findError || !vale) throw new Error("Vale presente não encontrado ou já utilizado.");

      if (new Date(vale.validade) < new Date()) {
        throw new Error("Este vale presente está expirado.");
      }

      if (vale.comprador_id === user!.id) {
        throw new Error("Você não pode resgatar um vale que você mesmo comprou.");
      }

      // Mark as used
      const { error: updateError } = await supabase
        .from("vale_presentes")
        .update({
          status: "usado",
          usado_em: new Date().toISOString(),
          usado_por: user!.id,
        })
        .eq("id", vale.id);

      if (updateError) throw updateError;

      // Note: cashback credit will be handled by a database trigger
      return vale as ValePresente;
    },
    onSuccess: (vale) => {
      queryClient.invalidateQueries({ queryKey: ["vales-presente"] });
      toast.success(`Vale de R$ ${Number(vale.valor).toFixed(2).replace('.', ',')} resgatado! 🎉`);
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao resgatar vale presente");
    },
  });

  return { meusVales, isLoading, criarVale, resgatarVale };
};
