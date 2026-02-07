import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface AvaliacaoObservacao {
  data: string;
  dateLabel: string;
  observacoes: string;
}

export interface FichaAcompanhamentoRow {
  data: string;
  dateLabel: string;
  protocolo: string;
  peso: number | null;
  imc: number | null;
  gordura_corporal: number | null;
  medida_cintura: number | null;
  medida_quadril: number | null;
  medida_braco: number | null;
  medida_coxa: number | null;
  medida_torax: number | null;
  escala_eva: number | null;
  observacoes: string | null;
}

export interface ClinicalCsvData {
  observacoes: AvaliacaoObservacao[];
  fichas: FichaAcompanhamentoRow[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export const useClinicalCsvData = () => {
  const { user } = useAuth();

  return useQuery<ClinicalCsvData>({
    queryKey: ["clinical_csv_data", user?.id],
    enabled: !!user,
    staleTime: 30_000,
    queryFn: async () => {
      // Fetch observações from avaliacoes posturais
      const { data: avaliacoes, error: avErr } = await supabase
        .from("avaliacoes_posturais")
        .select("data, observacoes")
        .eq("user_id", user!.id)
        .not("observacoes", "is", null)
        .order("data", { ascending: true });
      if (avErr) throw avErr;

      const observacoes: AvaliacaoObservacao[] = (avaliacoes || [])
        .filter((a) => a.observacoes && a.observacoes.trim().length > 0)
        .map((a) => ({
          data: a.data,
          dateLabel: formatDate(a.data),
          observacoes: a.observacoes!,
        }));

      // Fetch fichas de acompanhamento with protocol name
      const { data: protocolosUsuario, error: puErr } = await supabase
        .from("usuario_protocolos")
        .select("id, protocolos(nome)")
        .eq("user_id", user!.id);
      if (puErr) throw puErr;

      const protocoloNames = new Map<string, string>();
      for (const pu of protocolosUsuario || []) {
        const nome = (pu.protocolos as any)?.nome || "Protocolo";
        protocoloNames.set(pu.id, nome);
      }

      const puIds = (protocolosUsuario || []).map((p) => p.id);
      let fichas: FichaAcompanhamentoRow[] = [];

      if (puIds.length > 0) {
        const { data: fichasData, error: fErr } = await supabase
          .from("fichas_acompanhamento")
          .select("*")
          .in("protocolo_usuario_id", puIds)
          .order("data", { ascending: true });
        if (fErr) throw fErr;

        fichas = (fichasData || []).map((f) => ({
          data: f.data,
          dateLabel: formatDate(f.data),
          protocolo: protocoloNames.get(f.protocolo_usuario_id) || "Protocolo",
          peso: f.peso,
          imc: f.imc,
          gordura_corporal: f.gordura_corporal,
          medida_cintura: f.medida_cintura,
          medida_quadril: f.medida_quadril,
          medida_braco: f.medida_braco,
          medida_coxa: f.medida_coxa,
          medida_torax: f.medida_torax,
          escala_eva: f.escala_eva,
          observacoes: f.observacoes,
        }));
      }

      return { observacoes, fichas };
    },
  });
};
