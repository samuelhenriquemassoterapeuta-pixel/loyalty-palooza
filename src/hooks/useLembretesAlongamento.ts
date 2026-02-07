import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface LembreteAlongamento {
  id: string;
  user_id: string;
  ativo: boolean;
  horario: string; // TIME format "HH:MM:SS"
  dias_semana: number[]; // 0=dom, 1=seg...6=sab
  mensagem_personalizada: string | null;
  created_at: string;
  updated_at: string;
}

export const useLembretesAlongamento = () => {
  const { user } = useAuth();
  const [lembrete, setLembrete] = useState<LembreteAlongamento | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLembrete = useCallback(async () => {
    if (!user) {
      setLembrete(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("lembretes_alongamento")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      setLembrete(data);
    } catch (err) {
      console.error("Erro ao buscar lembrete:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLembrete();
  }, [fetchLembrete]);

  const salvarLembrete = async (config: {
    ativo: boolean;
    horario: string;
    dias_semana: number[];
    mensagem_personalizada?: string | null;
  }) => {
    if (!user) return { error: "Usuário não autenticado" };

    try {
      setSaving(true);

      if (lembrete) {
        // Update existing
        const { data, error } = await supabase
          .from("lembretes_alongamento")
          .update({
            ativo: config.ativo,
            horario: config.horario,
            dias_semana: config.dias_semana,
            mensagem_personalizada: config.mensagem_personalizada ?? null,
          })
          .eq("id", lembrete.id)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) throw error;
        setLembrete(data);
      } else {
        // Create new
        const { data, error } = await supabase
          .from("lembretes_alongamento")
          .insert({
            user_id: user.id,
            ativo: config.ativo,
            horario: config.horario,
            dias_semana: config.dias_semana,
            mensagem_personalizada: config.mensagem_personalizada ?? null,
          })
          .select()
          .single();

        if (error) throw error;
        setLembrete(data);
      }

      return { error: null };
    } catch (err: any) {
      console.error("Erro ao salvar lembrete:", err);
      return { error: err.message };
    } finally {
      setSaving(false);
    }
  };

  const toggleAtivo = async () => {
    if (!lembrete) {
      // Create with defaults
      return salvarLembrete({
        ativo: true,
        horario: "08:00:00",
        dias_semana: [1, 2, 3, 4, 5],
      });
    }
    return salvarLembrete({ ...lembrete, ativo: !lembrete.ativo });
  };

  return {
    lembrete,
    loading,
    saving,
    salvarLembrete,
    toggleAtivo,
    refetch: fetchLembrete,
  };
};
