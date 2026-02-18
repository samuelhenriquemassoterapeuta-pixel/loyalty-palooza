import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CampoTemplate {
  key: string;
  label: string;
  type: "text" | "boolean" | "select" | "multiselect" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

export interface AnamneseTemplate {
  id: string;
  servico_nome: string;
  titulo: string;
  descricao: string | null;
  campos: CampoTemplate[];
  ativo: boolean;
  ordem: number;
}

export const useAnamneseTemplates = (servicoNome?: string) => {
  const [templates, setTemplates] = useState<AnamneseTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let query = supabase
        .from("anamnese_templates")
        .select("*")
        .eq("ativo", true)
        .order("ordem");

      if (servicoNome) {
        query = query.eq("servico_nome", servicoNome);
      }

      const { data } = await query;
      setTemplates(
        (data || []).map((t: any) => ({
          ...t,
          campos: Array.isArray(t.campos) ? t.campos : JSON.parse(t.campos || "[]"),
        }))
      );
      setLoading(false);
    };
    fetch();
  }, [servicoNome]);

  return { templates, loading };
};
