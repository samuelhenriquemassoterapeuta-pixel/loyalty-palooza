import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ObjetivoBemEstar {
  titulo: string;
  descricao: string;
  prioridade: "alta" | "media" | "baixa";
  prazo_semanas: number;
}

export interface AtividadeSemanal {
  tipo: "servico" | "exercicio" | "alimentacao" | "habito" | "descanso";
  titulo: string;
  descricao: string;
  duracao_min?: number;
}

export interface DiaSemanal {
  dia: string;
  atividades: AtividadeSemanal[];
}

export interface MetricaBemEstar {
  nome: string;
  valor_atual?: string;
  meta: string;
  unidade?: string;
}

export interface PlanoBemEstar {
  nome: string;
  diagnostico: string;
  objetivos: ObjetivoBemEstar[];
  plano_semanal: DiaSemanal[];
  metricas: MetricaBemEstar[];
  dicas: string[];
  mensagem_motivacional: string;
}

export const usePlanoBemEstar = () => {
  const [plano, setPlano] = useState<PlanoBemEstar | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gerarPlano = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("plano-bem-estar");
      if (fnError) throw fnError;
      if (!data?.success) throw new Error(data?.error || "Erro ao gerar plano");
      setPlano(data as PlanoBemEstar);
      toast.success("Plano de Bem-Estar gerado com sucesso! 🌿");
    } catch (e: any) {
      const msg = e?.message || "Erro ao gerar plano";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { plano, loading, error, gerarPlano };
};
