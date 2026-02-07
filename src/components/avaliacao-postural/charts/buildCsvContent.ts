import type { AngleSeries } from "@/hooks/useAngleHistory";
import type { MeasurementDataPoint } from "@/hooks/useMeasurementHistory";
import type { ClinicalCsvData } from "@/hooks/useClinicalCsvData";

export function buildCsvContent(
  angleSeries: AngleSeries[],
  measurements: MeasurementDataPoint[],
  clinicalData?: ClinicalCsvData
): string {
  const BOM = "\uFEFF";
  const lines: string[] = [];

  // Angle annotations section
  if (angleSeries.length > 0) {
    lines.push("EVOLUÇÃO ANGULAR - ANOTAÇÕES");
    lines.push("Vista,Medição,Data,Ângulo (°)");
    for (const s of angleSeries) {
      for (const p of s.points) {
        lines.push(`${s.vistaLabel},"${s.label}",${p.dateLabel},${p.angle}`);
      }
    }
    lines.push("");
  }

  // Reference line measurements section
  if (measurements.length > 0) {
    lines.push("MEDIÇÕES DE LINHAS DE REFERÊNCIA");
    lines.push("Vista,Medição,Data,Ângulo (°),Eixo de Referência");
    for (const m of measurements) {
      lines.push(
        `${m.vista},"${m.label}",${m.dateLabel},${m.angle},${m.referenceAxis === "vertical" ? "Vertical" : "Horizontal"}`
      );
    }
    lines.push("");
  }

  // Clinical observations section
  if (clinicalData?.observacoes && clinicalData.observacoes.length > 0) {
    lines.push("OBSERVAÇÕES CLÍNICAS - AVALIAÇÕES POSTURAIS");
    lines.push("Data,Observações");
    for (const obs of clinicalData.observacoes) {
      const escaped = obs.observacoes.replace(/"/g, '""').replace(/\n/g, " ");
      lines.push(`${obs.dateLabel},"${escaped}"`);
    }
    lines.push("");
  }

  // Fichas de acompanhamento section
  if (clinicalData?.fichas && clinicalData.fichas.length > 0) {
    lines.push("FICHAS DE ACOMPANHAMENTO - PROTOCOLOS");
    lines.push("Data,Protocolo,Peso (kg),IMC,Gordura (%),Cintura (cm),Quadril (cm),Braço (cm),Coxa (cm),Tórax (cm),EVA (0-10),Observações");
    for (const f of clinicalData.fichas) {
      const obsEscaped = f.observacoes ? f.observacoes.replace(/"/g, '""').replace(/\n/g, " ") : "";
      lines.push(
        [
          f.dateLabel,
          `"${f.protocolo}"`,
          f.peso ?? "",
          f.imc ?? "",
          f.gordura_corporal ?? "",
          f.medida_cintura ?? "",
          f.medida_quadril ?? "",
          f.medida_braco ?? "",
          f.medida_coxa ?? "",
          f.medida_torax ?? "",
          f.escala_eva ?? "",
          `"${obsEscaped}"`,
        ].join(",")
      );
    }
    lines.push("");
  }

  // Summary statistics
  lines.push("RESUMO ESTATÍSTICO");
  lines.push("Medição,Mínimo (°),Máximo (°),Média (°),Variação Total (°)");

  for (const s of angleSeries) {
    if (s.points.length < 2) continue;
    const angles = s.points.map((p) => p.angle);
    const min = Math.min(...angles);
    const max = Math.max(...angles);
    const avg = Math.round(angles.reduce((a, b) => a + b, 0) / angles.length);
    const delta = angles[angles.length - 1] - angles[0];
    lines.push(`"${s.label}",${min},${max},${avg},${delta > 0 ? "+" : ""}${delta}`);
  }

  // Group measurements by label for stats
  const measByLabel = new Map<string, number[]>();
  for (const m of measurements) {
    const key = `${m.vista} — ${m.label}`;
    if (!measByLabel.has(key)) measByLabel.set(key, []);
    measByLabel.get(key)!.push(m.angle);
  }
  for (const [label, angles] of measByLabel) {
    if (angles.length < 2) continue;
    const min = Math.min(...angles);
    const max = Math.max(...angles);
    const avg = Math.round((angles.reduce((a, b) => a + b, 0) / angles.length) * 10) / 10;
    const delta = Math.round((angles[angles.length - 1] - angles[0]) * 10) / 10;
    lines.push(`"${label}",${min},${max},${avg},${delta > 0 ? "+" : ""}${delta}`);
  }

  return BOM + lines.join("\n");
}
