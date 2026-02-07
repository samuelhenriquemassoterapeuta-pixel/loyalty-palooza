/**
 * Postural Evolution PDF Generator
 *
 * Generates a comparative PDF report with:
 * - Side-by-side photos per vista with annotations composited
 * - Biomechanical measurements comparative table
 * - Observations section
 */
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AvaliacaoPostural, VistaPostural } from "@/hooks/useAvaliacaoPostural";
import { supabase } from "@/integrations/supabase/client";
import type { Annotation } from "@/components/avaliacao-postural/annotations/types";
import { compositeImageWithAnnotations } from "@/components/avaliacao-postural/annotations/compositeRenderer";
import type { ReferenceLine } from "@/components/avaliacao-postural/measurements/types";
import { calcLineAngle } from "@/components/avaliacao-postural/measurements/types";

// ── Constants ────────────────────────────────────

const VISTAS: { key: VistaPostural; label: string }[] = [
  { key: "anterior", label: "Anterior" },
  { key: "posterior", label: "Posterior" },
  { key: "lateral_direita", label: "Lat. Direita" },
  { key: "lateral_esquerda", label: "Lat. Esquerda" },
];

// ── Data fetching helpers ────────────────────────

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { mode: "cors" });
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function getSignedUrl(av: AvaliacaoPostural, vista: VistaPostural): string | undefined {
  const key = `signed_${vista}` as keyof AvaliacaoPostural;
  return av[key] as string | undefined;
}

async function fetchAnnotations(
  avaliacaoId: string,
  vista: VistaPostural,
  userId: string
): Promise<Annotation[]> {
  try {
    const { data, error } = await supabase
      .from("anotacoes_posturais")
      .select("anotacoes")
      .eq("avaliacao_id", avaliacaoId)
      .eq("vista", vista)
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return [];
    return (data.anotacoes as unknown as Annotation[]) || [];
  } catch {
    return [];
  }
}

async function fetchMeasurements(
  avaliacaoId: string,
  vista: VistaPostural,
  userId: string
): Promise<ReferenceLine[]> {
  try {
    const measureVista = `${vista}_measurements`;
    const { data, error } = await supabase
      .from("anotacoes_posturais")
      .select("anotacoes")
      .eq("avaliacao_id", avaliacaoId)
      .eq("vista", measureVista)
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return [];
    return (data.anotacoes as unknown as ReferenceLine[]) || [];
  } catch {
    return [];
  }
}

// ── PDF helper types ─────────────────────────────

interface MeasurementRow {
  vista: string;
  label: string;
  leftAngle: number | null;
  rightAngle: number | null;
  delta: number | null;
  color: string;
}

// ── PDF section renderers ────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function drawPlaceholder(pdf: any, x: number, y: number, w: number, h: number) {
  pdf.setFillColor(240, 240, 240);
  pdf.rect(x, y, w, h, "F");
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(7);
  pdf.text("Sem foto", x + w / 2 - 6, y + h / 2);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderObservation(
  pdf: any,
  text: string,
  date: string,
  margin: number,
  y: number,
  contentWidth: number
): number {
  pdf.setFillColor(245, 245, 240);
  const obsLines = pdf.splitTextToSize(text, contentWidth - 8);
  const obsHeight = Math.max(12, obsLines.length * 3.5 + 8);
  pdf.roundedRect(margin, y, contentWidth, obsHeight, 2, 2, "F");

  pdf.setTextColor(120, 120, 120);
  pdf.setFontSize(6);
  pdf.setFont("helvetica", "bold");
  pdf.text(
    `AVALIAÇÃO DE ${format(new Date(date), "dd/MM/yyyy", { locale: ptBR })}`,
    margin + 3,
    y + 4
  );

  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.text(obsLines, margin + 3, y + 8);
  return y + obsHeight + 3;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderMeasurementsTable(
  pdf: any,
  rows: MeasurementRow[],
  margin: number,
  startY: number,
  contentWidth: number,
  pageHeight: number
): number {
  let y = startY;

  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Medições Biomecânicas — Tabela Comparativa", margin, y);
  y += 2;
  pdf.setFontSize(6);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(120, 120, 120);
  pdf.text(
    "Ângulos de desvio em relação ao eixo de referência (vertical ou horizontal). Valores próximos a 0° indicam melhor alinhamento.",
    margin,
    y + 3
  );
  y += 7;

  // Table header
  const colWidths = [
    contentWidth * 0.18,
    contentWidth * 0.28,
    contentWidth * 0.18,
    contentWidth * 0.18,
    contentWidth * 0.18,
  ];
  const headers = ["Vista", "Medição", "Antes", "Depois", "Δ Variação"];

  const drawTableHeader = () => {
    pdf.setFillColor(34, 87, 64);
    pdf.rect(margin, y, contentWidth, 7, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(6);
    pdf.setFont("helvetica", "bold");
    let colX = margin + 2;
    for (let i = 0; i < headers.length; i++) {
      pdf.text(headers[i], colX, y + 4.5);
      colX += colWidths[i];
    }
    y += 7;
  };

  drawTableHeader();

  let currentVista = "";
  for (let r = 0; r < rows.length; r++) {
    if (y + 7 > pageHeight - margin) {
      pdf.addPage();
      y = margin;
      drawTableHeader();
      currentVista = "";
    }

    const row = rows[r];
    const isAlt = r % 2 === 0;
    pdf.setFillColor(isAlt ? 250 : 245, isAlt ? 250 : 245, isAlt ? 248 : 240);
    pdf.rect(margin, y, contentWidth, 6, "F");

    let colX = margin + 2;
    pdf.setFontSize(6);

    // Vista column
    pdf.setFont("helvetica", row.vista !== currentVista ? "bold" : "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.text(row.vista !== currentVista ? row.vista : "", colX, y + 4);
    currentVista = row.vista;
    colX += colWidths[0];

    // Measurement label with color dot
    pdf.setFillColor(
      parseInt(row.color.slice(1, 3), 16) || 100,
      parseInt(row.color.slice(3, 5), 16) || 100,
      parseInt(row.color.slice(5, 7), 16) || 100
    );
    pdf.circle(colX + 1, y + 3, 1.2, "F");
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(60, 60, 60);
    pdf.text(row.label, colX + 4, y + 4);
    colX += colWidths[1];

    // Before angle
    pdf.setTextColor(80, 80, 80);
    pdf.text(row.leftAngle !== null ? `${row.leftAngle}°` : "—", colX, y + 4);
    colX += colWidths[2];

    // After angle
    pdf.text(row.rightAngle !== null ? `${row.rightAngle}°` : "—", colX, y + 4);
    colX += colWidths[3];

    // Delta with color coding
    if (row.delta !== null) {
      const absDelta = Math.abs(row.delta);
      const improved = row.delta < 0;
      if (absDelta <= 1) {
        pdf.setTextColor(100, 100, 100);
      } else if (improved) {
        pdf.setTextColor(34, 150, 80);
      } else {
        pdf.setTextColor(220, 60, 60);
      }
      pdf.setFont("helvetica", "bold");
      const sign = row.delta > 0 ? "+" : "";
      pdf.text(`${sign}${row.delta}°`, colX, y + 4);
      if (absDelta > 1) {
        pdf.text(improved ? " ↓" : " ↑", colX + 12, y + 4);
      }
    } else {
      pdf.setTextColor(150, 150, 150);
      pdf.text("—", colX, y + 4);
    }

    y += 6;
  }

  // Legend
  y += 3;
  pdf.setFontSize(5);
  pdf.setTextColor(140, 140, 140);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    "↓ = melhora (ângulo diminuiu)   ↑ = piora (ângulo aumentou)   Δ = diferença entre avaliações",
    margin,
    y
  );
  y += 6;

  return y;
}

// ── Main generator ───────────────────────────────

export async function generatePosturalPdf(
  left: AvaliacaoPostural,
  right: AvaliacaoPostural
): Promise<{ blob: Blob; filename: string }> {
  const { default: jsPDF } = await import("jspdf");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ── Header ──────────────────────────────────────
  pdf.setFillColor(34, 87, 64);
  pdf.rect(0, 0, pageWidth, 26, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(15);
  pdf.setFont("helvetica", "bold");
  pdf.text("Relatório de Evolução Postural", margin, 11);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    `Comparação: ${format(new Date(left.data), "dd/MM/yyyy", { locale: ptBR })} → ${format(new Date(right.data), "dd/MM/yyyy", { locale: ptBR })}`,
    margin,
    17
  );
  pdf.text(
    `Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
    margin,
    22
  );
  y = 32;

  // ── Summary section ────────────────────────────
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Informações da Avaliação", margin, y);
  y += 5;

  const leftDate = format(new Date(left.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  const rightDate = format(new Date(right.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  const cardWidth = contentWidth / 2 - 2;
  pdf.setFillColor(245, 245, 240);
  pdf.roundedRect(margin, y, cardWidth, 14, 2, 2, "F");
  pdf.roundedRect(margin + cardWidth + 4, y, cardWidth, 14, 2, 2, "F");

  pdf.setFontSize(7);
  pdf.setTextColor(120, 120, 120);
  pdf.text("AVALIAÇÃO ANTERIOR", margin + 3, y + 4);
  pdf.text("AVALIAÇÃO RECENTE", margin + cardWidth + 7, y + 4);

  pdf.setFontSize(8);
  pdf.setTextColor(40, 40, 40);
  pdf.setFont("helvetica", "normal");
  pdf.text(leftDate, margin + 3, y + 9);
  pdf.text(rightDate, margin + cardWidth + 7, y + 9);
  y += 18;

  // ── Photos side by side per vista ──────────────
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Comparação por Vista", margin, y);
  pdf.setFontSize(6);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(120, 120, 120);
  pdf.text("(com anotações e marcações clínicas)", margin + 42, y);
  y += 5;

  // Pre-load images + annotations in parallel
  const [imageResults, annotationResults] = await Promise.all([
    Promise.all(
      VISTAS.flatMap((v) => [
        loadImageAsDataUrl(getSignedUrl(left, v.key) || "").then((dataUrl) => ({
          vistaKey: v.key,
          side: "left" as const,
          dataUrl,
        })),
        loadImageAsDataUrl(getSignedUrl(right, v.key) || "").then((dataUrl) => ({
          vistaKey: v.key,
          side: "right" as const,
          dataUrl,
        })),
      ])
    ),
    userId
      ? Promise.all(
          VISTAS.flatMap((v) => [
            fetchAnnotations(left.id, v.key, userId).then((annotations) => ({
              vistaKey: v.key,
              side: "left" as const,
              annotations,
            })),
            fetchAnnotations(right.id, v.key, userId).then((annotations) => ({
              vistaKey: v.key,
              side: "right" as const,
              annotations,
            })),
          ])
        )
      : Promise.resolve([]),
  ]);

  const getImage = (vistaKey: VistaPostural, side: "left" | "right") =>
    imageResults.find((r) => r.vistaKey === vistaKey && r.side === side)?.dataUrl ?? null;

  const getAnnotations = (vistaKey: VistaPostural, side: "left" | "right"): Annotation[] =>
    annotationResults.find((r) => r.vistaKey === vistaKey && r.side === side)?.annotations || [];

  // Composite images with annotations
  const compositeCache = new Map<string, string | null>();
  await Promise.all(
    VISTAS.flatMap((v) =>
      (["left", "right"] as const).map(async (side) => {
        const key = `${v.key}-${side}`;
        const imgDataUrl = getImage(v.key, side);
        if (!imgDataUrl) {
          compositeCache.set(key, null);
          return;
        }
        const annotations = getAnnotations(v.key, side);
        try {
          compositeCache.set(key, await compositeImageWithAnnotations(imgDataUrl, annotations, 800));
        } catch {
          compositeCache.set(key, imgDataUrl);
        }
      })
    )
  );

  // Layout: 2 vistas per row
  const photoWidth = (contentWidth - 6) / 2;
  const photoInnerWidth = (photoWidth - 4) / 2;
  const photoHeight = photoInnerWidth * (4 / 3);

  for (let i = 0; i < VISTAS.length; i += 2) {
    const rowVistas = VISTAS.slice(i, i + 2);

    if (y + photoHeight + 16 > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }

    for (let j = 0; j < rowVistas.length; j++) {
      const v = rowVistas[j];
      const xBase = margin + j * (photoWidth + 6);

      // Vista label bar
      pdf.setFillColor(34, 87, 64);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "bold");
      pdf.roundedRect(xBase, y, photoWidth, 6, 1, 1, "F");
      pdf.text(v.label.toUpperCase(), xBase + 3, y + 4);

      const leftAnns = getAnnotations(v.key, "left");
      const rightAnns = getAnnotations(v.key, "right");
      if (leftAnns.length > 0 || rightAnns.length > 0) {
        pdf.setFontSize(5);
        pdf.text("com anotacoes", xBase + photoWidth - 22, y + 4);
      }

      const imgY = y + 8;

      pdf.setTextColor(120, 120, 120);
      pdf.setFontSize(6);
      pdf.setFont("helvetica", "normal");
      pdf.text("ANTES", xBase + 1, imgY - 1);
      pdf.text("DEPOIS", xBase + photoInnerWidth + 3, imgY - 1);

      // Before image
      const beforeImg = compositeCache.get(`${v.key}-left`);
      if (beforeImg) {
        try {
          pdf.addImage(beforeImg, "JPEG", xBase, imgY, photoInnerWidth, photoHeight);
        } catch {
          drawPlaceholder(pdf, xBase, imgY, photoInnerWidth, photoHeight);
        }
      } else {
        drawPlaceholder(pdf, xBase, imgY, photoInnerWidth, photoHeight);
      }

      // After image
      const afterImg = compositeCache.get(`${v.key}-right`);
      const afterX = xBase + photoInnerWidth + 2;
      if (afterImg) {
        try {
          pdf.addImage(afterImg, "JPEG", afterX, imgY, photoInnerWidth, photoHeight);
        } catch {
          drawPlaceholder(pdf, afterX, imgY, photoInnerWidth, photoHeight);
        }
      } else {
        drawPlaceholder(pdf, afterX, imgY, photoInnerWidth, photoHeight);
      }
    }

    y += photoHeight + 14;
  }

  // ── Measurements Comparative Table ─────────────
  if (userId) {
    const measurementResults = await Promise.all(
      VISTAS.flatMap((v) =>
        (["left", "right"] as const).map(async (side) => ({
          vistaKey: v.key,
          vistaLabel: v.label,
          side,
          lines: await fetchMeasurements(
            side === "left" ? left.id : right.id,
            v.key,
            userId
          ),
        }))
      )
    );

    const getLines = (vistaKey: VistaPostural, side: "left" | "right"): ReferenceLine[] =>
      measurementResults.find((r) => r.vistaKey === vistaKey && r.side === side)?.lines || [];

    const rows: MeasurementRow[] = [];
    for (const v of VISTAS) {
      const leftLines = getLines(v.key, "left");
      const rightLines = getLines(v.key, "right");
      const allIds = new Set([...leftLines.map((l) => l.id), ...rightLines.map((l) => l.id)]);

      for (const lineId of allIds) {
        const lLine = leftLines.find((l) => l.id === lineId);
        const rLine = rightLines.find((l) => l.id === lineId);
        const refLine = lLine || rLine;
        if (!refLine) continue;

        const lAngle = lLine ? calcLineAngle(lLine.start, lLine.end, lLine.referenceAxis) : null;
        const rAngle = rLine ? calcLineAngle(rLine.start, rLine.end, rLine.referenceAxis) : null;
        const delta = lAngle !== null && rAngle !== null
          ? Math.round((rAngle - lAngle) * 10) / 10
          : null;

        rows.push({
          vista: v.label,
          label: refLine.label,
          leftAngle: lAngle,
          rightAngle: rAngle,
          delta,
          color: refLine.color,
        });
      }
    }

    if (rows.length > 0) {
      const tableEstimate = 22 + rows.length * 6;
      if (y + tableEstimate > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      y = renderMeasurementsTable(pdf, rows, margin, y, contentWidth, pageHeight);
    }
  }

  // ── Observations ───────────────────────────────
  if (left.observacoes || right.observacoes) {
    if (y + 30 > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }

    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Observações", margin, y);
    y += 5;

    if (left.observacoes) {
      y = renderObservation(pdf, left.observacoes, left.data, margin, y, contentWidth);
    }
    if (right.observacoes) {
      y = renderObservation(pdf, right.observacoes, right.data, margin, y, contentWidth);
    }
  }

  // ── Footer ─────────────────────────────────────
  y += 4;
  if (y > pageHeight - 12) {
    pdf.addPage();
    y = pageHeight - 12;
  }
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 4;
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(7);
  pdf.text("Resinkra — Relatório de Evolução Postural", margin, y);
  pdf.text(format(new Date(), "dd/MM/yyyy", { locale: ptBR }), pageWidth - margin - 20, y);

  const filename = `relatorio-postural-${format(new Date(), "yyyy-MM-dd")}.pdf`;
  const blob = pdf.output("blob");
  return { blob, filename };
}
