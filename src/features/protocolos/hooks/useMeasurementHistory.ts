import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { VistaPostural } from "@/hooks/useAvaliacaoPostural";
import type { ReferenceLine } from "@/components/avaliacao-postural/measurements/types";
import { calcLineAngle } from "@/components/avaliacao-postural/measurements/types";

export interface MeasurementDataPoint {
  date: string;
  dateLabel: string;
  vista: string;
  label: string;
  angle: number;
  referenceAxis: "vertical" | "horizontal";
  color: string;
}

const VISTA_LABELS: Record<VistaPostural, string> = {
  anterior: "Anterior",
  posterior: "Posterior",
  lateral_direita: "Lat. Direita",
  lateral_esquerda: "Lat. Esquerda",
};

const MEASUREMENT_VISTAS: VistaPostural[] = [
  "anterior",
  "posterior",
  "lateral_direita",
  "lateral_esquerda",
];

export const useMeasurementHistory = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["measurement_history", user?.id],
    enabled: !!user,
    staleTime: 30_000,
    queryFn: async (): Promise<MeasurementDataPoint[]> => {
      const { data: avaliacoes, error: avErr } = await supabase
        .from("avaliacoes_posturais")
        .select("id, data")
        .eq("user_id", user!.id)
        .order("data", { ascending: true });
      if (avErr) throw avErr;
      if (!avaliacoes?.length) return [];

      // Fetch measurement annotations (stored with vista suffix "_measurements")
      const { data: anotacoes, error: anErr } = await supabase
        .from("anotacoes_posturais")
        .select("avaliacao_id, vista, anotacoes")
        .eq("user_id", user!.id)
        .like("vista", "%_measurements");
      if (anErr) throw anErr;
      if (!anotacoes?.length) return [];

      const dateMap = new Map(avaliacoes.map((a) => [a.id, a.data]));

      const points: MeasurementDataPoint[] = [];
      for (const row of anotacoes) {
        const date = dateMap.get(row.avaliacao_id);
        if (!date) continue;

        // Extract base vista from "anterior_measurements" -> "anterior"
        const baseVista = row.vista.replace("_measurements", "") as VistaPostural;
        if (!VISTA_LABELS[baseVista]) continue;

        const lines = (row.anotacoes as unknown as ReferenceLine[]) || [];
        const d = new Date(date);
        const dateLabel = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

        for (const line of lines) {
          const angle = calcLineAngle(line.start, line.end, line.referenceAxis);
          points.push({
            date,
            dateLabel,
            vista: VISTA_LABELS[baseVista],
            label: line.label,
            angle,
            referenceAxis: line.referenceAxis,
            color: line.color,
          });
        }
      }

      return points;
    },
  });
};
