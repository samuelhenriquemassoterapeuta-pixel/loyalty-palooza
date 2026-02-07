import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Annotation, AngleAnnotation } from "@/components/avaliacao-postural/annotations/types";
import type { VistaPostural } from "@/hooks/useAvaliacaoPostural";

export interface AngleDataPoint {
  date: string; // ISO string
  dateLabel: string; // "dd/MM/yyyy"
  avaliacaoId: string;
  vista: VistaPostural;
  /** label derived from angle annotation id or position */
  label: string;
  angle: number;
}

export interface AngleSeries {
  label: string;
  vista: VistaPostural;
  vistaLabel: string;
  points: { date: string; dateLabel: string; angle: number }[];
}

const VISTA_LABELS: Record<VistaPostural, string> = {
  anterior: "Anterior",
  posterior: "Posterior",
  lateral_direita: "Lat. Direita",
  lateral_esquerda: "Lat. Esquerda",
};

function calcAngle(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): number {
  const a = Math.atan2(p1.y - p2.y, p1.x - p2.x);
  const b = Math.atan2(p3.y - p2.y, p3.x - p2.x);
  let angle = ((b - a) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  if (angle > 180) angle = 360 - angle;
  return Math.round(angle);
}

function extractAnglesFromAnnotations(annotations: Annotation[]): { label: string; angle: number }[] {
  return annotations
    .filter((a): a is AngleAnnotation => a.type === "angle")
    .map((a, idx) => ({
      label: `Ângulo ${idx + 1}`,
      angle: calcAngle(a.points[0], a.points[1], a.points[2]),
    }));
}

export const useAngleHistory = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["angle_history", user?.id],
    enabled: !!user,
    staleTime: 30_000,
    queryFn: async (): Promise<AngleSeries[]> => {
      // 1. Fetch all postural assessments ordered by date
      const { data: avaliacoes, error: avErr } = await supabase
        .from("avaliacoes_posturais")
        .select("id, data")
        .eq("user_id", user!.id)
        .order("data", { ascending: true });
      if (avErr) throw avErr;
      if (!avaliacoes?.length) return [];

      // 2. Fetch all annotations for this user
      const { data: anotacoes, error: anErr } = await supabase
        .from("anotacoes_posturais")
        .select("avaliacao_id, vista, anotacoes")
        .eq("user_id", user!.id);
      if (anErr) throw anErr;
      if (!anotacoes?.length) return [];

      // 3. Build date map
      const dateMap = new Map(
        avaliacoes.map((a) => [a.id, a.data])
      );

      // 4. Extract angle data points
      const dataPoints: AngleDataPoint[] = [];
      for (const row of anotacoes) {
        const date = dateMap.get(row.avaliacao_id);
        if (!date) continue;

        const vista = row.vista as VistaPostural;
        if (!VISTA_LABELS[vista]) continue;

        const annotations = (row.anotacoes as unknown as Annotation[]) || [];
        const angles = extractAnglesFromAnnotations(annotations);

        for (const { label, angle } of angles) {
          const d = new Date(date);
          dataPoints.push({
            date,
            dateLabel: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`,
            avaliacaoId: row.avaliacao_id,
            vista,
            label: `${VISTA_LABELS[vista]} — ${label}`,
            angle,
          });
        }
      }

      // 5. Group into series by label
      const seriesMap = new Map<string, AngleSeries>();
      for (const dp of dataPoints) {
        if (!seriesMap.has(dp.label)) {
          seriesMap.set(dp.label, {
            label: dp.label,
            vista: dp.vista,
            vistaLabel: VISTA_LABELS[dp.vista],
            points: [],
          });
        }
        seriesMap.get(dp.label)!.points.push({
          date: dp.date,
          dateLabel: dp.dateLabel,
          angle: dp.angle,
        });
      }

      // Sort points by date within each series
      for (const series of seriesMap.values()) {
        series.points.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }

      return Array.from(seriesMap.values());
    },
  });
};
