import { useState } from "react";
import { Loader2, Share2, MessageCircle, Mail, Download, Send } from "lucide-react";
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
import { SendToTherapistDialog } from "./SendToTherapistDialog";

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
  observacoes?: string | null;
}

interface ExportPdfButtonProps {
  fichas: FichaRow[];
  chartRef: React.RefObject<HTMLDivElement | null>;
  protocoloNome?: string;
  protocoloUsuarioId?: string;
}

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

/** Build a text summary of the evolution for sharing */
const buildShareText = (fichas: FichaRow[], protocoloNome?: string): string => {
  const first = fichas[0];
  const last = fichas[fichas.length - 1];

  const getVal = (f: FichaRow, key: string) =>
    (f as unknown as Record<string, unknown>)[key] as number | null | undefined;

  const lines: string[] = [
    `📊 *Ficha de Acompanhamento*`,
    protocoloNome ? `Protocolo: ${protocoloNome}` : "Resinkra — Acompanhamento",
    `📅 ${format(new Date(first.data), "dd/MM/yyyy")} → ${format(new Date(last.data), "dd/MM/yyyy")}`,
    `📝 ${fichas.length} medições registradas`,
    "",
    "📈 *Evolução:*",
  ];

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

  lines.push("", "Gerado pela Resinkra 🌿");
  return lines.join("\n");
};

/** Generate the PDF and return it as a Blob + filename */
const generatePdfBlob = async (
  fichas: FichaRow[],
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

  // ── Header ──────────────────────────────────────
  pdf.setFillColor(34, 87, 64);
  pdf.rect(0, 0, pageWidth, 28, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Ficha de Acompanhamento", margin, 12);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    protocoloNome
      ? `Protocolo: ${protocoloNome}`
      : "Resinkra — Acompanhamento de Medidas",
    margin,
    19
  );
  pdf.text(
    `Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
    margin,
    24
  );
  y = 35;

  // ── Summary cards ───────────────────────────────
  const first = fichas[0];
  const last = fichas[fichas.length - 1];

  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("Resumo da Evolução", margin, y);
  y += 6;

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");

  const getVal = (f: FichaRow, key: string): unknown =>
    (f as unknown as Record<string, unknown>)[key];

  const summaryFields = FIELDS.filter(
    (f) => getVal(first, f.key) != null && getVal(last, f.key) != null
  );

  const colWidth = contentWidth / Math.min(summaryFields.length, 4);
  let col = 0;
  const startY = y;

  for (const field of summaryFields) {
    const firstVal = getVal(first, field.key) as number;
    const lastVal = getVal(last, field.key) as number;
    const diff = Number((lastVal - firstVal).toFixed(1));
    const x = margin + col * colWidth;

    pdf.setFillColor(245, 245, 240);
    pdf.roundedRect(x, y, colWidth - 2, 18, 2, 2, "F");

    pdf.setTextColor(120, 120, 120);
    pdf.setFontSize(7);
    pdf.text(field.label, x + 3, y + 5);

    pdf.setTextColor(40, 40, 40);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${firstVal} → ${lastVal}${field.suffix}`, x + 3, y + 11);

    const diffColor =
      diff < 0 ? [34, 139, 34] : diff > 0 ? [200, 50, 50] : [120, 120, 120];
    pdf.setTextColor(diffColor[0], diffColor[1], diffColor[2]);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${diff > 0 ? "+" : ""}${diff}${field.suffix}`, x + 3, y + 16);

    col++;
    if (col >= 4) {
      col = 0;
      y += 20;
    }
  }
  y = startY + Math.ceil(summaryFields.length / 4) * 20 + 4;

  // ── Chart capture ───────────────────────────────
  if (chartRef.current) {
    try {
      const canvas = await html2canvas(chartRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      if (y + imgHeight + 10 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("Gráfico de Evolução", margin, y);
      y += 5;

      pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
      y += imgHeight + 6;
    } catch {
      // Chart capture failed, continue without it
    }
  }

  // ── Data table ──────────────────────────────────
  if (y + 30 > pageHeight - margin) {
    pdf.addPage();
    y = margin;
  }

  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("Histórico de Medições", margin, y);
  y += 6;

  const tableCols = [
    { label: "Data", width: 22 },
    { label: "Peso", width: 16 },
    { label: "Cintura", width: 16 },
    { label: "Quadril", width: 16 },
    { label: "Braço", width: 14 },
    { label: "Coxa", width: 14 },
    { label: "Tórax", width: 14 },
    { label: "Gord.%", width: 14 },
    { label: "IMC", width: 12 },
    { label: "Obs.", width: 42 },
  ];

  pdf.setFillColor(34, 87, 64);
  pdf.rect(margin, y, contentWidth, 6, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(6.5);
  pdf.setFont("helvetica", "bold");

  let tx = margin + 1;
  for (const c of tableCols) {
    pdf.text(c.label, tx, y + 4);
    tx += c.width;
  }
  y += 6;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(6.5);

  for (let i = 0; i < fichas.length; i++) {
    if (y + 6 > pageHeight - margin) {
      pdf.addPage();
      y = margin;
      pdf.setFillColor(34, 87, 64);
      pdf.rect(margin, y, contentWidth, 6, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(6.5);
      pdf.setFont("helvetica", "bold");
      tx = margin + 1;
      for (const c of tableCols) {
        pdf.text(c.label, tx, y + 4);
        tx += c.width;
      }
      y += 6;
      pdf.setFont("helvetica", "normal");
    }

    const f = fichas[i];
    const bg = i % 2 === 0 ? [255, 255, 255] : [245, 245, 240];
    pdf.setFillColor(bg[0], bg[1], bg[2]);
    pdf.rect(margin, y, contentWidth, 5.5, "F");
    pdf.setTextColor(60, 60, 60);

    tx = margin + 1;
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
      f.observacoes ? f.observacoes.substring(0, 35) : "-",
    ];

    for (let j = 0; j < vals.length; j++) {
      pdf.text(vals[j], tx, y + 4);
      tx += tableCols[j].width;
    }
    y += 5.5;
  }

  // ── Footer ──────────────────────────────────────
  y += 4;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 4;
  pdf.setTextColor(150, 150, 150);
  pdf.setFontSize(7);
  pdf.text("Resinkra — Ficha de Acompanhamento Corporal", margin, y);
  pdf.text(`${fichas.length} registro(s) | Página 1`, pageWidth - margin - 40, y);

  const filename = `ficha-acompanhamento-${format(new Date(), "yyyy-MM-dd")}.pdf`;
  const blob = pdf.output("blob");
  return { blob, filename };
};

export const ExportPdfButton = ({ fichas, chartRef, protocoloNome, protocoloUsuarioId }: ExportPdfButtonProps) => {
  const [exporting, setExporting] = useState(false);
  const [therapistDialogOpen, setTherapistDialogOpen] = useState(false);

  const handleDownload = async () => {
    if (fichas.length === 0) return;
    setExporting(true);
    try {
      const { blob, filename } = await generatePdfBlob(fichas, chartRef, protocoloNome);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF exportado com sucesso!");
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      toast.error("Erro ao gerar o PDF. Tente novamente.");
    } finally {
      setExporting(false);
    }
  };

  const handleShareNative = async () => {
    if (fichas.length === 0) return;
    setExporting(true);
    try {
      const { blob, filename } = await generatePdfBlob(fichas, chartRef, protocoloNome);
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Ficha de Acompanhamento",
          text: "Confira minha evolução nas medidas! 📊",
          files: [file],
        });
        toast.success("Compartilhado com sucesso!");
      } else {
        // Fallback: download if share not supported
        handleDownload();
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Erro ao compartilhar:", err);
      toast.error("Erro ao compartilhar. Tente baixar o PDF.");
    } finally {
      setExporting(false);
    }
  };

  const handleWhatsApp = async () => {
    if (fichas.length === 0) return;
    setExporting(true);
    try {
      const text = buildShareText(fichas, protocoloNome);

      // Try native share with file first (mobile)
      const { blob, filename } = await generatePdfBlob(fichas, chartRef, protocoloNome);
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          text,
          files: [file],
        });
        toast.success("Compartilhado com sucesso!");
      } else {
        // Fallback: open WhatsApp with text summary
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encoded}`, "_blank");
        toast.success("Resumo enviado ao WhatsApp!");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      // Fallback to text-only WhatsApp
      const text = buildShareText(fichas, protocoloNome);
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/?text=${encoded}`, "_blank");
    } finally {
      setExporting(false);
    }
  };

  const handleEmail = async () => {
    if (fichas.length === 0) return;
    setExporting(true);
    try {
      const { blob, filename } = await generatePdfBlob(fichas, chartRef, protocoloNome);
      const file = new File([blob], filename, { type: "application/pdf" });

      // Try native share targeting email
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Ficha de Acompanhamento — Resinkra",
          text: "Segue em anexo minha ficha de acompanhamento com a evolução das medidas.",
          files: [file],
        });
        toast.success("Compartilhado com sucesso!");
      } else {
        // Fallback: mailto with text summary
        const text = buildShareText(fichas, protocoloNome);
        const subject = encodeURIComponent("Ficha de Acompanhamento — Resinkra");
        const body = encodeURIComponent(text);
        window.open(`mailto:?subject=${subject}&body=${body}`, "_self");

        // Also download the PDF so user can attach manually
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
      console.error("Erro ao compartilhar por email:", err);
      toast.error("Erro ao compartilhar. Tente baixar o PDF.");
    } finally {
      setExporting(false);
    }
  };

  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={exporting || fichas.length === 0}
          className="gap-1.5"
        >
          {exporting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Share2 size={14} />
          )}
          {exporting ? "Gerando..." : "Exportar"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleDownload} className="gap-2 cursor-pointer">
          <Download size={14} />
          Baixar PDF
        </DropdownMenuItem>

        {canShare && (
          <DropdownMenuItem onClick={handleShareNative} className="gap-2 cursor-pointer">
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
          fichas={fichas}
          protocoloUsuarioId={protocoloUsuarioId}
          protocoloNome={protocoloNome}
          generatePdf={() => generatePdfBlob(fichas, chartRef, protocoloNome)}
          buildShareText={() => buildShareText(fichas, protocoloNome)}
        />
      )}
    </DropdownMenu>
  );
};
