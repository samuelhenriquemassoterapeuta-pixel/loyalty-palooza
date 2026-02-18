import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface InsightSaude {
  categoria: "corpo" | "tratamentos" | "alimentacao" | "habitos" | "mental";
  titulo: string;
  descricao: string;
  tendencia: "positiva" | "neutra" | "atencao";
  icone?: string;
}

export interface InsightsSaudeData {
  resumo: string;
  insights: InsightSaude[];
  pontuacao_bem_estar: number;
  alertas?: string[];
  proximos_passos: string[];
}

export const useInsightsSaude = () => {
  const [data, setData] = useState<InsightsSaudeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gerarInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("insights-saude");
      if (fnError) throw fnError;
      if (!result?.success) throw new Error(result?.error || "Erro ao gerar insights");
      setData(result as InsightsSaudeData);
    } catch (e: any) {
      const msg = e?.message || "Erro ao gerar insights";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, gerarInsights };
};
