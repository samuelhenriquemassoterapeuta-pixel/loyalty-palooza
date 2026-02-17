import type { VistaPostural } from "@/features/avaliacao-postural/hooks/useAvaliacaoPostural";

export interface MeasurePoint {
  x: number; // 0–1 relative
  y: number; // 0–1 relative
}

export interface ReferenceLine {
  id: string;
  label: string;
  color: string;
  start: MeasurePoint;
  end: MeasurePoint;
  /** Angle relative to vertical (for vertical ref) or horizontal */
  referenceAxis: "vertical" | "horizontal";
  locked: boolean;
}

export interface MeasurementPreset {
  id: string;
  label: string;
  icon: string;
  description: string;
  color: string;
  referenceAxis: "vertical" | "horizontal";
  /** Default start/end positions (relative 0–1) */
  defaultStart: MeasurePoint;
  defaultEnd: MeasurePoint;
  /** Which vistas this preset applies to */
  vistas: VistaPostural[];
}

/** Calculate angle in degrees that a line makes relative to an axis */
export function calcLineAngle(
  start: MeasurePoint,
  end: MeasurePoint,
  axis: "vertical" | "horizontal"
): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (axis === "vertical") {
    // Angle relative to a vertical line (0° = perfectly vertical)
    const angle = Math.atan2(Math.abs(dx), Math.abs(dy)) * (180 / Math.PI);
    return Math.round(angle * 10) / 10;
  } else {
    // Angle relative to a horizontal line (0° = perfectly horizontal)
    const angle = Math.atan2(Math.abs(dy), Math.abs(dx)) * (180 / Math.PI);
    return Math.round(angle * 10) / 10;
  }
}

/** Calculate angle between two lines at their intersection or vertex point */
export function calcAngleBetweenLines(
  line1: ReferenceLine,
  line2: ReferenceLine
): number | null {
  const a1 = Math.atan2(line1.end.y - line1.start.y, line1.end.x - line1.start.x);
  const a2 = Math.atan2(line2.end.y - line2.start.y, line2.end.x - line2.start.x);
  let angle = Math.abs((a2 - a1) * (180 / Math.PI));
  if (angle > 180) angle = 360 - angle;
  return Math.round(angle * 10) / 10;
}

export const MEASUREMENT_PRESETS: MeasurementPreset[] = [
  {
    id: "plumb",
    label: "Linha de Prumo",
    icon: "↕",
    description: "Referência vertical — alinhamento gravitacional",
    color: "#3b82f6",
    referenceAxis: "vertical",
    defaultStart: { x: 0.5, y: 0.05 },
    defaultEnd: { x: 0.5, y: 0.95 },
    vistas: ["anterior", "posterior", "lateral_direita", "lateral_esquerda"],
  },
  {
    id: "shoulders",
    label: "Ombros",
    icon: "↔",
    description: "Alinhamento horizontal dos ombros",
    color: "#ef4444",
    referenceAxis: "horizontal",
    defaultStart: { x: 0.2, y: 0.22 },
    defaultEnd: { x: 0.8, y: 0.22 },
    vistas: ["anterior", "posterior"],
  },
  {
    id: "hips",
    label: "Quadril",
    icon: "↔",
    description: "Alinhamento horizontal do quadril",
    color: "#f97316",
    referenceAxis: "horizontal",
    defaultStart: { x: 0.25, y: 0.5 },
    defaultEnd: { x: 0.75, y: 0.5 },
    vistas: ["anterior", "posterior"],
  },
  {
    id: "knees",
    label: "Joelhos",
    icon: "↔",
    description: "Alinhamento horizontal dos joelhos",
    color: "#eab308",
    referenceAxis: "horizontal",
    defaultStart: { x: 0.3, y: 0.72 },
    defaultEnd: { x: 0.7, y: 0.72 },
    vistas: ["anterior", "posterior"],
  },
  {
    id: "head-tilt",
    label: "Inclinação Cabeça",
    icon: "↗",
    description: "Inclinação lateral da cabeça",
    color: "#8b5cf6",
    referenceAxis: "horizontal",
    defaultStart: { x: 0.38, y: 0.08 },
    defaultEnd: { x: 0.62, y: 0.08 },
    vistas: ["anterior", "posterior"],
  },
  {
    id: "spine-lat",
    label: "Coluna Lateral",
    icon: "↕",
    description: "Alinhamento da coluna em vista lateral",
    color: "#22c55e",
    referenceAxis: "vertical",
    defaultStart: { x: 0.5, y: 0.1 },
    defaultEnd: { x: 0.5, y: 0.55 },
    vistas: ["lateral_direita", "lateral_esquerda"],
  },
  {
    id: "head-forward",
    label: "Projeção Cabeça",
    icon: "↗",
    description: "Anteriorização da cabeça",
    color: "#ec4899",
    referenceAxis: "vertical",
    defaultStart: { x: 0.5, y: 0.05 },
    defaultEnd: { x: 0.5, y: 0.2 },
    vistas: ["lateral_direita", "lateral_esquerda"],
  },
  {
    id: "lordosis",
    label: "Lordose Lombar",
    icon: "⌒",
    description: "Curvatura lombar em vista lateral",
    color: "#14b8a6",
    referenceAxis: "vertical",
    defaultStart: { x: 0.45, y: 0.4 },
    defaultEnd: { x: 0.55, y: 0.55 },
    vistas: ["lateral_direita", "lateral_esquerda"],
  },
];
