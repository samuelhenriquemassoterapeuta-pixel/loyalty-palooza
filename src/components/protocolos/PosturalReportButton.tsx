import { useState, useRef } from "react";
import { Loader2, Share2, MessageCircle, Mail, Download, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SendToTherapistDialog } from "../protocolos/SendToTherapistDialog";
import { AvaliacaoPostural, VistaPostural } from "@/hooks/useAvaliacaoPostural";

interface FichaRow {
  id: string;
  data: string;
  peso?: number | null;
  imc?: number | null;
  gordura_corporal?: number | null;
  medida_cintura?: number | null;
  medida_quadril?: number | null;
  medida_braco?: number | null;
  medida_coxa?: number | null;
  medida_torax?: number | null;
  escala_eva?: number | null;
  observacoes?: string | null;
}

interface PosturalReportButtonProps {
  fichas: FichaRow[];
  avaliacoes: AvaliacaoPostural[];
  chartRef: React.RefObject<HTMLDivElement | null>;
  protocoloNome?: string;
  protocoloUsuarioId?: string;
}

const VISTAS: { key: VistaPostural; label: string }[] = [
  { key: "anterior", label: "Anterior" },
  { key: "posterior", label: "Posterior" },
  { key: "lateral_direita", label: "Lateral D." },
  { key: "lateral_esquerda", label: "Lateral E." },
];

const FIELDS = [
  { key: "peso", label: "Peso", suffix: "kg" },
  { key: "medida_cintura", label: "Cintura", suffix: "cm" },
  { key: "medida_quadril", label: "Quadril", suffix: "cm" },
  { key: "medida_braco", label: "Braço", suffix: "cm" },
  { key: "medida_coxa", label: "Coxa", suffix: "cm" },
  { key: "medida_torax", label: "Tórax", suffix: "cm" },
  { key: "gordura_corporal", label: "Gordura", suffix: "%" },
  { key: "imc", label: "IMC", suffix: "" },
] as const;

const EVA_LABELS = ["Sem dor", "", "Leve", "", "Moderada", "", "Moderada-Intensa", "", "Intensa", "", "Máxima"];

/** Load an image from URL and return as base64 data URL */
async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

const buildShareText = (
  fichas: FichaRow[],
  avaliacoes: AvaliacaoPostural[],
  protocoloNome?: string
): string => {
  const lines: string[] = [
    `📊 *Relatório Postural Completo*`,
    protocoloNome ? `Protocolo: ${protocoloNome}` : "Resinkra — Avaliação Postural",
  ];

  if (fichas.length > 0) {
    const first = fichas[0];
    const last = fichas[fichas.length - 1];
    lines.push(
      `📅 Período: ${format(new Date(first.data), "dd/MM/yyyy")} → ${format(new Date(last.data), "dd/MM/yyyy")}`,
      `📝 ${fichas.length} medições registradas`
    );

    // EVA evolution
    const firstEva = fichas.find((f) => f.escala_eva != null);
    const lastEva = [...fichas].reverse().find((f) => f.escala_eva != null);
    if (firstEva?.escala_eva != null && lastEva?.escala_eva != null && firstEva !== lastEva) {
      const diff = lastEva.escala_eva - firstEva.escala_eva;
      const arrow = diff < 0 ? "↓" : diff > 0 ? "↑" : "→";
      lines.push(`🩺 EVA (dor): ${firstEva.escala_eva} → ${lastEva.escala_eva} ${arrow}`);
    }

    lines.push("", "📈 *Evolução:*");
    const getVal = (f: FichaRow, key: string) =>
      (f as unknown as Record<string, unknown>)[key] as number | null | undefined;

    for (const field of FIELDS) {
      const firstVal = getVal(first, field.key);
      const lastVal = getVal(last, field.key);
      if (firstVal != null && lastVal != null) {
        const diff = Number((lastVal - firstVal).toFixed(1));
        const arrow = diff < 0 ? "↓" : diff > 0 ? "↑" : "→";
        lines.push(
          `${arrow} ${field.label}: ${firstVal} → ${lastVal}${field.suffix} (${diff > 0 ? "+" : ""}${diff})`
        );
      }
    }
  }

  if (avaliacoes.length > 0) {
    const total = avaliacoes.reduce((acc, a) => {
      return acc + [a.foto_anterior, a.foto_posterior, a.foto_lateral_direita, a.foto_lateral_esquerda].filter(Boolean).length;
    }, 0);
    lines.push("", `📸 ${avaliacoes.length} avaliações posturais (${total} fotos)`);
  }

  lines.push("", "Gerado pela Resinkra 🌿");
  return lines.join("\n");
};

const generatePosturalPdfBlob = async (
  fichas: FichaRow[],
  avaliacoes: AvaliacaoPostural[],
  chartRef: React.RefObject<HTMLDivElement | null>,
  protocoloNome?: string
): Promise<{ blob: Blob; filename: string }> => {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkNewPage = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      pdf.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // ── Header ──────────────────────────────────────
  pdf.setFillColor(34, 87, 64);
  pdf.rect(0, 0, pageWidth, 30, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("Relatório Postural Completo", margin, 13);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    protocoloNome ? `Protocolo: ${protocoloNome}` : "Resinkra — Avaliação Postural",
    margin, 20
  );
  pdf.text(
    `Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
    margin, 26
  );
  y = 37;

  // ── Section 1: EVA Chart ────────────────────────
  const evaFichas = fichas.filter((f) => f.escala_eva != null);
  if (evaFichas.length > 0) {
    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("📊 Escala de Dor (EVA)", margin, y);
    y += 7;

    // Draw EVA timeline
    const evaBarHeight = 8;
    const evaWidth = contentWidth;
    const barY = y;

    // Background gradient zones
    const zones = [
      { from: 0, to: 3, color: [144, 238, 144] },   // Green - Leve
      { from: 3, to: 6, color: [255, 215, 0] },       // Yellow - Moderada
      { from: 6, to: 10, color: [255, 99, 71] },      // Red - Intensa
    ];

    for (const zone of zones) {
      const x1 = margin + (zone.from / 10) * evaWidth;
      const w = ((zone.to - zone.from) / 10) * evaWidth;
      pdf.setFillColor(zone.color[0], zone.color[1], zone.color[2]);
      pdf.roundedRect(x1, barY, w, evaBarHeight, 1, 1, "F");
    }

    // Scale numbers
    pdf.setFontSize(6);
    pdf.setTextColor(100, 100, 100);
    for (let i = 0; i <= 10; i++) {
      const x = margin + (i / 10) * evaWidth;
      pdf.text(String(i), x, barY + evaBarHeight + 4);
    }
    y = barY + evaBarHeight + 8;

    // EVA data points as small table
    if (evaFichas.length > 1) {
      const firstEva = evaFichas[0];
      const lastEva = evaFichas[evaFichas.length - 1];
      const diff = (lastEva.escala_eva ?? 0) - (firstEva.escala_eva ?? 0);

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(60, 60, 60);
      pdf.text(
        `Inicial: ${firstEva.escala_eva}/10 (${format(new Date(firstEva.data), "dd/MM/yy")})  →  Atual: ${lastEva.escala_eva}/10 (${format(new Date(lastEva.data), "dd/MM/yy")})`,
        margin, y
      );
      y += 4;

      const diffColor = diff < 0 ? [34, 139, 34] : diff > 0 ? [200, 50, 50] : [120, 120, 120];
      pdf.setTextColor(diffColor[0], diffColor[1], diffColor[2]);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        `Variação: ${diff > 0 ? "+" : ""}${diff} pontos (${diff < 0 ? "melhora" : diff > 0 ? "piora" : "estável"})`,
        margin, y
      );
      y += 6;
    }

    // List all EVA measurements
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    const evaLine = evaFichas
      .map((f) => `${format(new Date(f.data), "dd/MM")}: ${f.escala_eva}`)
      .join("  |  ");
    pdf.text(evaLine, margin, y, { maxWidth: contentWidth });
    y += 8;
  }

  // ── Section 2: Body Measurements Chart ──────────
  if (chartRef.current && fichas.length > 0) {
    checkNewPage(80);

    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("📏 Evolução de Medidas Corporais", margin, y);
    y += 6;

    try {
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = contentWidth;
      const imgHeight = Math.min((canvas.height / canvas.width) * imgWidth, 70);

      checkNewPage(imgHeight + 10);
      pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
      y += imgHeight + 4;
    } catch {
      // Continue without chart
    }

    // Summary deltas
    if (fichas.length >= 2) {
      const first = fichas[0];
      const last = fichas[fichas.length - 1];
      const getVal = (f: FichaRow, key: string): unknown =>
        (f as unknown as Record<string, unknown>)[key];

      const summaryFields = FIELDS.filter(
        (f) => getVal(first, f.key) != null && getVal(last, f.key) != null
      );

      const colWidth = contentWidth / Math.min(summaryFields.length, 4);

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(60, 60, 60);
      pdf.text("Resumo da Evolução", margin, y);
      y += 5;

      let col = 0;
      const startY = y;

      for (const field of summaryFields) {
        const firstVal = getVal(first, field.key) as number;
        const lastVal = getVal(last, field.key) as number;
        const diff = Number((lastVal - firstVal).toFixed(1));
        const x = margin + col * colWidth;

        pdf.setFillColor(245, 245, 240);
        pdf.roundedRect(x, y, colWidth - 2, 16, 2, 2, "F");

        pdf.setTextColor(120, 120, 120);
        pdf.setFontSize(6.5);
        pdf.setFont("helvetica", "normal");
        pdf.text(field.label, x + 3, y + 4.5);

        pdf.setTextColor(40, 40, 40);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${firstVal} → ${lastVal}${field.suffix}`, x + 3, y + 10);

        const diffColor = diff < 0 ? [34, 139, 34] : diff > 0 ? [200, 50, 50] : [120, 120, 120];
        pdf.setTextColor(diffColor[0], diffColor[1], diffColor[2]);
        pdf.setFontSize(6.5);
        pdf.setFont("helvetica", "normal");
        pdf.text(`${diff > 0 ? "+" : ""}${diff}${field.suffix}`, x + 3, y + 14);

        col++;
        if (col >= 4) {
          col = 0;
          y += 18;
        }
      }
      y = startY + Math.ceil(summaryFields.length / 4) * 18 + 4;
    }
  }

  // ── Section 3: Postural Assessment Photos ────────
  if (avaliacoes.length > 0) {
    checkNewPage(90);

    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("📸 Avaliações Posturais", margin, y);
    y += 3;

    // Show the latest 2 assessments for comparison
    const toShow = avaliacoes.slice(0, 2);

    for (const av of toShow) {
      checkNewPage(75);

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(60, 60, 60);
      y += 5;
      pdf.text(
        `Avaliação de ${format(new Date(av.data), "dd/MM/yyyy", { locale: ptBR })}`,
        margin, y
      );
      y += 5;

      // Load and add photos in a 2x2 grid
      const photoWidth = (contentWidth - 4) / 2;
      const photoHeight = photoWidth * (4 / 3);

      checkNewPage(photoHeight * 2 + 10);

      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
          const vistaIdx = row * 2 + col;
          const vista = VISTAS[vistaIdx];
          const signedKey = `signed_${vista.key}` as keyof AvaliacaoPostural;
          const signedUrl = av[signedKey] as string | undefined;

          const x = margin + col * (photoWidth + 4);
          const photoY = y + row * (photoHeight + 8);

          // Vista label
          pdf.setFontSize(7);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(80, 80, 80);
          pdf.text(vista.label, x, photoY);

          if (signedUrl) {
            try {
              const base64 = await loadImageAsBase64(signedUrl);
              if (base64) {
                pdf.addImage(base64, "JPEG", x, photoY + 2, photoWidth, photoHeight - 4);
              } else {
                pdf.setFillColor(240, 240, 240);
                pdf.roundedRect(x, photoY + 2, photoWidth, photoHeight - 4, 2, 2, "F");
                pdf.setTextColor(150, 150, 150);
                pdf.setFontSize(7);
                pdf.text("Foto indisponível", x + photoWidth / 4, photoY + photoHeight / 2);
              }
            } catch {
              pdf.setFillColor(240, 240, 240);
              pdf.roundedRect(x, photoY + 2, photoWidth, photoHeight - 4, 2, 2, "F");
              pdf.setTextColor(150, 150, 150);
              pdf.setFontSize(7);
              pdf.text("Erro ao carregar", x + photoWidth / 4, photoY + photoHeight / 2);
            }
          } else {
            pdf.setFillColor(245, 245, 240);
            pdf.roundedRect(x, photoY + 2, photoWidth, photoHeight - 4, 2, 2, "F");
            pdf.setTextColor(180, 180, 180);
            pdf.setFontSize(7);
            pdf.text("Sem foto", x + photoWidth / 3, photoY + photoHeight / 2);
          }
        }
      }
      y += photoHeight * 2 + 12;

      // Observations
      if (av.observacoes) {
        checkNewPage(12);
        pdf.setFontSize(7);
        pdf.setFont("helvetica", "italic");
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Observações: ${av.observacoes}`, margin, y, { maxWidth: contentWidth });
        y += 8;
      }
    }

    if (avaliacoes.length > 2) {
      pdf.setFontSize(7);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`+ ${avaliacoes.length - 2} avaliações anteriores não incluídas`, margin, y);
      y += 6;
    }
  }

  // ── Section 4: Measurements Data Table ──────────
  if (fichas.length > 0) {
    checkNewPage(30);

    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("📋 Histórico de Medições", margin, y);
    y += 6;

    const tableCols = [
      { label: "Data", width: 20 },
      { label: "Peso", width: 14 },
      { label: "Cintura", width: 14 },
      { label: "Quadril", width: 14 },
      { label: "Braço", width: 13 },
      { label: "Coxa", width: 13 },
      { label: "Tórax", width: 13 },
      { label: "Gord.%", width: 13 },
      { label: "IMC", width: 11 },
      { label: "EVA", width: 10 },
      { label: "Obs.", width: 45 },
    ];

    const drawTableHeader = () => {
      pdf.setFillColor(34, 87, 64);
      pdf.rect(margin, y, contentWidth, 6, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(6);
      pdf.setFont("helvetica", "bold");
      let tx = margin + 1;
      for (const c of tableCols) {
        pdf.text(c.label, tx, y + 4);
        tx += c.width;
      }
      y += 6;
    };

    drawTableHeader();
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6);

    for (let i = 0; i < fichas.length; i++) {
      if (y + 6 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
        drawTableHeader();
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(6);
      }

      const f = fichas[i];
      const bg = i % 2 === 0 ? [255, 255, 255] : [245, 245, 240];
      pdf.setFillColor(bg[0], bg[1], bg[2]);
      pdf.rect(margin, y, contentWidth, 5.5, "F");
      pdf.setTextColor(60, 60, 60);

      let tx = margin + 1;
      const vals = [
        format(new Date(f.data), "dd/MM/yy"),
        f.peso != null ? `${f.peso}` : "-",
        f.medida_cintura != null ? `${f.medida_cintura}` : "-",
        f.medida_quadril != null ? `${f.medida_quadril}` : "-",
        f.medida_braco != null ? `${f.medida_braco}` : "-",
        f.medida_coxa != null ? `${f.medida_coxa}` : "-",
        f.medida_torax != null ? `${f.medida_torax}` : "-",
        f.gordura_corporal != null ? `${f.gordura_corporal}` : "-",
        f.imc != null ? `${f.imc}` : "-",
        f.escala_eva != null ? `${f.escala_eva}` : "-",
        f.observacoes ? f.observacoes.substring(0, 30) : "-",
      ];

      for (let j = 0; j < vals.length; j++) {
        pdf.text(vals[j], tx, y + 4);
        tx += tableCols[j].width;
      }
      y += 5.5;
    }
  }

  // ── Footer ──────────────────────────────────────
  y += 6;
  checkNewPage(10);
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 5;
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(7);
  pdf.text("Resinkra — Relatório Postural Completo", margin, y);
  const totalPages = pdf.getNumberOfPages();
  pdf.text(`${fichas.length} medição(ões) · ${avaliacoes.length} avaliação(ões) postural(is)`, pageWidth - margin - 60, y);

  const filename = `relatorio-postural-${format(new Date(), "yyyy-MM-dd")}.pdf`;
  const blob = pdf.output("blob");
  return { blob, filename };
};

export const PosturalReportButton = ({
  fichas,
  avaliacoes,
  chartRef,
  protocoloNome,
  protocoloUsuarioId,
}: PosturalReportButtonProps) => {
  const [exporting, setExporting] = useState(false);
  const [therapistDialogOpen, setTherapistDialogOpen] = useState(false);

  const hasContent = fichas.length > 0 || avaliacoes.length > 0;

  const handleDownload = async () => {
    if (!hasContent) return;
    setExporting(true);
    try {
      const { blob, filename } = await generatePosturalPdfBlob(fichas, avaliacoes, chartRef, protocoloNome);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Relatório postural exportado!");
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      toast.error("Erro ao gerar o relatório.");
    } finally {
      setExporting(false);
    }
  };

  const handleWhatsApp = async () => {
    if (!hasContent) return;
    setExporting(true);
    try {
      const text = buildShareText(fichas, avaliacoes, protocoloNome);
      const { blob, filename } = await generatePosturalPdfBlob(fichas, avaliacoes, chartRef, protocoloNome);
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ text, files: [file] });
        toast.success("Relatório compartilhado!");
      } else {
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encoded}`, "_blank");
        toast.success("WhatsApp aberto com o resumo!");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const text = buildShareText(fichas, avaliacoes, protocoloNome);
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/?text=${encoded}`, "_blank");
    } finally {
      setExporting(false);
    }
  };

  const handleEmail = async () => {
    if (!hasContent) return;
    setExporting(true);
    try {
      const { blob, filename } = await generatePosturalPdfBlob(fichas, avaliacoes, chartRef, protocoloNome);
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Relatório Postural — ${protocoloNome || "Resinkra"}`,
          text: "Segue em anexo meu relatório postural completo.",
          files: [file],
        });
        toast.success("Relatório compartilhado!");
      } else {
        const text = buildShareText(fichas, avaliacoes, protocoloNome);
        const subject = encodeURIComponent(`Relatório Postural — ${protocoloNome || "Resinkra"}`);
        const body = encodeURIComponent(text);
        window.open(`mailto:?subject=${subject}&body=${body}`, "_self");

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("PDF baixado! Anexe ao email.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      toast.error("Erro ao compartilhar.");
    } finally {
      setExporting(false);
    }
  };

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  // For the SendToTherapistDialog we need to convert fichas to the expected format
  const fakeFichaRows = fichas.map((f) => ({
    id: f.id,
    data: f.data,
    peso: f.peso,
    imc: f.imc,
    gordura_corporal: f.gordura_corporal,
    medida_cintura: f.medida_cintura,
    medida_quadril: f.medida_quadril,
    medida_braco: f.medida_braco,
    medida_coxa: f.medida_coxa,
    medida_torax: f.medida_torax,
    observacoes: f.observacoes,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={exporting || !hasContent}
          className="gap-1.5"
        >
          {exporting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <FileText size={14} />
          )}
          {exporting ? "Gerando..." : "Relatório PDF"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={handleDownload} className="gap-2 cursor-pointer">
          <Download size={14} />
          Baixar PDF Completo
        </DropdownMenuItem>

        {canShare && (
          <DropdownMenuItem
            onClick={async () => {
              setExporting(true);
              try {
                const { blob, filename } = await generatePosturalPdfBlob(fichas, avaliacoes, chartRef, protocoloNome);
                const file = new File([blob], filename, { type: "application/pdf" });
                await navigator.share({
                  title: "Relatório Postural",
                  files: [file],
                });
              } catch { /* user cancelled */ } finally {
                setExporting(false);
              }
            }}
            className="gap-2 cursor-pointer"
          >
            <Share2 size={14} />
            Compartilhar...
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleWhatsApp} className="gap-2 cursor-pointer">
          <MessageCircle size={14} />
          Enviar por WhatsApp
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleEmail} className="gap-2 cursor-pointer">
          <Mail size={14} />
          Enviar por Email
        </DropdownMenuItem>

        {protocoloUsuarioId && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setTherapistDialogOpen(true)}
              className="gap-2 cursor-pointer"
            >
              <Send size={14} />
              Enviar ao Terapeuta
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>

      {protocoloUsuarioId && (
        <SendToTherapistDialog
          open={therapistDialogOpen}
          onOpenChange={setTherapistDialogOpen}
          fichas={fakeFichaRows}
          protocoloUsuarioId={protocoloUsuarioId}
          protocoloNome={protocoloNome}
          generatePdf={() => generatePosturalPdfBlob(fichas, avaliacoes, chartRef, protocoloNome)}
          buildShareText={() => buildShareText(fichas, avaliacoes, protocoloNome)}
        />
      )}
    </DropdownMenu>
  );
};
