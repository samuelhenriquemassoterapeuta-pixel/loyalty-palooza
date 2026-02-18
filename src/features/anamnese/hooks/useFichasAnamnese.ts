import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface FichaAnamnese {
  id: string;
  user_id: string;
  terapeuta_id: string | null;
  servico_nome: string;
  status: string;
  nome_completo: string;
  data_nascimento: string | null;
  sexo: string | null;
  profissao: string | null;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  queixa_principal: string | null;
  historico_doencas: string[] | null;
  medicamentos_uso: string | null;
  alergias: string[] | null;
  cirurgias_previas: string | null;
  fumante: boolean;
  etilista: boolean;
  pratica_atividade_fisica: boolean;
  atividade_fisica_descricao: string | null;
  pressao_arterial: string | null;
  campos_especificos: Record<string, any>;
  observacoes_gerais: string | null;
  assinatura_paciente: string | null;
  assinatura_data: string | null;
  protocolo_usuario_id: string | null;
  agendamento_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useFichasAnamnese = () => {
  const { user } = useAuth();
  const [fichas, setFichas] = useState<FichaAnamnese[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFichas = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("fichas_anamnese")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar fichas");
    } else {
      setFichas((data || []) as unknown as FichaAnamnese[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchFichas();
  }, [fetchFichas]);

  const createFicha = async (ficha: Partial<FichaAnamnese>) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("fichas_anamnese")
      .insert({ ...ficha, user_id: user.id } as any)
      .select()
      .single();

    if (error) {
      toast.error("Erro ao criar ficha");
      return null;
    }
    toast.success("Ficha criada com sucesso!");
    await fetchFichas();
    return data;
  };

  const updateFicha = async (id: string, updates: Partial<FichaAnamnese>) => {
    const { error } = await supabase
      .from("fichas_anamnese")
      .update(updates as any)
      .eq("id", id);

    if (error) {
      toast.error("Erro ao atualizar ficha");
      return false;
    }
    toast.success("Ficha atualizada!");
    await fetchFichas();
    return true;
  };

  return { fichas, loading, createFicha, updateFicha, refetch: fetchFichas };
};
