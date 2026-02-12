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
  tipo: string;
  experiencia_nome: string | null;
  experiencia_descricao: string | null;
  servicos_inclusos: any;
  data_entrega_agendada: string | null;
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
      return data as unknown as ValePresente[];
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
      tipo?: string;
      experiencia_nome?: string;
      experiencia_descricao?: string;
      servicos_inclusos?: any;
      data_entrega_agendada?: string;
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
          tipo: vale.tipo || "monetario",
          experiencia_nome: vale.experiencia_nome || null,
          experiencia_descricao: vale.experiencia_descricao || null,
          servicos_inclusos: vale.servicos_inclusos || [],
          data_entrega_agendada: vale.data_entrega_agendada || null,
        } as any)
        .select()
        .single();
      if (error) throw error;
      return data as unknown as ValePresente;
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
      // Use server-side RPC to bypass RLS issues
      const { data, error } = await supabase.rpc("resgatar_vale_presente", {
        p_codigo: codigo,
      });

      if (error) throw new Error(error.message);
      return data as any;
    },
    onSuccess: (vale) => {
      queryClient.invalidateQueries({ queryKey: ["vales-presente"] });
      const valor = Number(vale.valor).toFixed(2).replace('.', ',');
      toast.success(`Vale de R$ ${valor} resgatado! 🎉`);
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao resgatar vale presente");
    },
  });

  return { meusVales, isLoading, criarVale, resgatarVale };
};
