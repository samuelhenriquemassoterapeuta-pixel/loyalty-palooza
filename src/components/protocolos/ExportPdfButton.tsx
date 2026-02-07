import { useState, useRef } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

export const ExportPdfButton = ({ fichas, chartRef, protocoloNome }: ExportPdfButtonProps) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (fichas.length === 0) {
      toast.error("Nenhuma medição para exportar.");
      return;
    }

    setExporting(true);
    try {
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
      pdf.setFillColor(34, 87, 64); // primary green
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

      const getVal = (f: FichaRow, key: string): unknown => {
        return (f as unknown as Record<string, unknown>)[key];
      };

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

        // Card background
        pdf.setFillColor(245, 245, 240);
        pdf.roundedRect(x, y, colWidth - 2, 18, 2, 2, "F");

        pdf.setTextColor(120, 120, 120);
        pdf.setFontSize(7);
        pdf.text(field.label, x + 3, y + 5);

        pdf.setTextColor(40, 40, 40);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${firstVal} → ${lastVal}${field.suffix}`, x + 3, y + 11);

        const diffColor = diff < 0 ? [34, 139, 34] : diff > 0 ? [200, 50, 50] : [120, 120, 120];
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

          // Check if chart fits on current page
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

      // Table headers
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
      for (const col of tableCols) {
        pdf.text(col.label, tx, y + 4);
        tx += col.width;
      }
      y += 6;

      // Table rows
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(6.5);

      for (let i = 0; i < fichas.length; i++) {
        if (y + 6 > pageHeight - margin) {
          pdf.addPage();
          y = margin;
          // Re-draw header
          pdf.setFillColor(34, 87, 64);
          pdf.rect(margin, y, contentWidth, 6, "F");
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(6.5);
          pdf.setFont("helvetica", "bold");
          tx = margin + 1;
          for (const col of tableCols) {
            pdf.text(col.label, tx, y + 4);
            tx += col.width;
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
      pdf.text(
        `${fichas.length} registro(s) | Página 1`,
        pageWidth - margin - 40,
        y
      );

      // Download
      const filename = `ficha-acompanhamento-${format(new Date(), "yyyy-MM-dd")}.pdf`;
      pdf.save(filename);
      toast.success("PDF exportado com sucesso!");
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      toast.error("Erro ao gerar o PDF. Tente novamente.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={exporting || fichas.length === 0}
      className="gap-1.5"
    >
      {exporting ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <FileDown size={14} />
      )}
      {exporting ? "Gerando..." : "PDF"}
    </Button>
  );
};
