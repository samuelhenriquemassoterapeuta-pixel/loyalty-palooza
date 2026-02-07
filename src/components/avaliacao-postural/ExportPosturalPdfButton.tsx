import { useState } from "react";
import { Loader2, FileText, Share2, Download, MessageCircle, Mail } from "lucide-react";
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
import { AvaliacaoPostural, VistaPostural } from "@/hooks/useAvaliacaoPostural";
import { supabase } from "@/integrations/supabase/client";
import type { Annotation } from "@/components/avaliacao-postural/annotations/types";
import { compositeImageWithAnnotations } from "@/components/avaliacao-postural/annotations/compositeRenderer";

const VISTAS: { key: VistaPostural; label: string }[] = [
  { key: "anterior", label: "Anterior" },
  { key: "posterior", label: "Posterior" },
  { key: "lateral_direita", label: "Lat. Direita" },
  { key: "lateral_esquerda", label: "Lat. Esquerda" },
];

/** Load an image from a URL and return it as a data URL */
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

/** Fetch annotations for a given avaliacao + vista from the database */
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

interface ExportPosturalPdfButtonProps {
  leftAvaliacao: AvaliacaoPostural;
  rightAvaliacao: AvaliacaoPostural;
}

async function generatePosturalPdf(
  left: AvaliacaoPostural,
  right: AvaliacaoPostural
): Promise<{ blob: Blob; filename: string }> {
  const { default: jsPDF } = await import("jspdf");

  // Get current user for annotation queries
  const { data: { user } } = await supabase.auth.getUser();
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

  // Subtitle about annotations
  pdf.setFontSize(6);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(120, 120, 120);
  pdf.text("(com anotações e marcações clínicas)", margin + 42, y);

  y += 5;

  // Pre-load all images in parallel
  const imagePromises = VISTAS.flatMap((v) => [
    { vista: v, side: "left" as const, promise: loadImageAsDataUrl(getSignedUrl(left, v.key) || "") },
    { vista: v, side: "right" as const, promise: loadImageAsDataUrl(getSignedUrl(right, v.key) || "") },
  ]);

  const imageResults = await Promise.all(
    imagePromises.map(async (item) => ({
      ...item,
      dataUrl: await item.promise,
    }))
  );

  // Fetch annotations for all vistas in parallel
  const annotationPromises = userId
    ? VISTAS.flatMap((v) => [
        { vistaKey: v.key, side: "left" as const, promise: fetchAnnotations(left.id, v.key, userId) },
        { vistaKey: v.key, side: "right" as const, promise: fetchAnnotations(right.id, v.key, userId) },
      ])
    : [];

  const annotationResults = await Promise.all(
    annotationPromises.map(async (item) => ({
      ...item,
      annotations: await item.promise,
    }))
  );

  const getImage = (vistaKey: VistaPostural, side: "left" | "right") =>
    imageResults.find((r) => r.vista.key === vistaKey && r.side === side)?.dataUrl;

  const getAnnotations = (vistaKey: VistaPostural, side: "left" | "right"): Annotation[] =>
    annotationResults.find((r) => r.vistaKey === vistaKey && r.side === side)?.annotations || [];

  // Composite images with annotations
  const compositeCache = new Map<string, string | null>();
  const getCompositeImage = async (vistaKey: VistaPostural, side: "left" | "right"): Promise<string | null> => {
    const cacheKey = `${vistaKey}-${side}`;
    if (compositeCache.has(cacheKey)) return compositeCache.get(cacheKey) || null;

    const imgDataUrl = getImage(vistaKey, side);
    if (!imgDataUrl) {
      compositeCache.set(cacheKey, null);
      return null;
    }

    const annotations = getAnnotations(vistaKey, side);
    try {
      const result = await compositeImageWithAnnotations(imgDataUrl, annotations, 800);
      compositeCache.set(cacheKey, result);
      return result;
    } catch {
      compositeCache.set(cacheKey, imgDataUrl);
      return imgDataUrl;
    }
  };

  // Pre-composite all images
  await Promise.all(
    VISTAS.flatMap((v) => [
      getCompositeImage(v.key, "left"),
      getCompositeImage(v.key, "right"),
    ])
  );

  // Layout: 2 vistas per row, each with before/after
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

      // Vista label
      pdf.setFillColor(34, 87, 64);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "bold");
      pdf.roundedRect(xBase, y, photoWidth, 6, 1, 1, "F");
      pdf.text(v.label.toUpperCase(), xBase + 3, y + 4);

      // Annotation indicator
      const leftAnns = getAnnotations(v.key, "left");
      const rightAnns = getAnnotations(v.key, "right");
      if (leftAnns.length > 0 || rightAnns.length > 0) {
        pdf.setFontSize(5);
        pdf.text("✏️ com anotações", xBase + photoWidth - 25, y + 4);
      }

      const imgY = y + 8;

      // Before label
      pdf.setTextColor(120, 120, 120);
      pdf.setFontSize(6);
      pdf.setFont("helvetica", "normal");
      pdf.text("ANTES", xBase + 1, imgY - 1);
      pdf.text("DEPOIS", xBase + photoInnerWidth + 3, imgY - 1);

      // Before image (with annotations composited)
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

      // After image (with annotations composited)
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
  pdf.text(
    format(new Date(), "dd/MM/yyyy", { locale: ptBR }),
    pageWidth - margin - 20,
    y
  );

  const filename = `relatorio-postural-${format(new Date(), "yyyy-MM-dd")}.pdf`;
  const blob = pdf.output("blob");
  return { blob, filename };
}

// ── Helper functions ─────────────────────────────

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

// ── Component ────────────────────────────────────

export const ExportPosturalPdfButton = ({
  leftAvaliacao,
  rightAvaliacao,
}: ExportPosturalPdfButtonProps) => {
  const [exporting, setExporting] = useState(false);

  const handleDownload = async () => {
    setExporting(true);
    try {
      const { blob, filename } = await generatePosturalPdf(leftAvaliacao, rightAvaliacao);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF exportado com sucesso!");
    } catch (err) {
      console.error("Erro ao gerar PDF postural:", err);
      toast.error("Erro ao gerar o PDF. Tente novamente.");
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    setExporting(true);
    try {
      const { blob, filename } = await generatePosturalPdf(leftAvaliacao, rightAvaliacao);
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Relatório de Evolução Postural",
          text: "Confira minha evolução postural! 📸",
          files: [file],
        });
        toast.success("Compartilhado com sucesso!");
      } else {
        await handleDownload();
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Erro ao compartilhar:", err);
      await handleDownload();
    } finally {
      setExporting(false);
    }
  };

  const handleWhatsApp = async () => {
    setExporting(true);
    try {
      const { blob, filename } = await generatePosturalPdf(leftAvaliacao, rightAvaliacao);
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ text: "Minha evolução postural 📸", files: [file] });
        toast.success("Compartilhado!");
      } else {
        const text = encodeURIComponent(
          `📸 Relatório de Evolução Postural\n` +
            `Comparação: ${format(new Date(leftAvaliacao.data), "dd/MM/yyyy")} → ${format(new Date(rightAvaliacao.data), "dd/MM/yyyy")}\n\n` +
            `Gerado pela Resinkra 🌿`
        );
        window.open(`https://wa.me/?text=${text}`, "_blank");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      toast.error("Erro ao compartilhar.");
    } finally {
      setExporting(false);
    }
  };

  const handleEmail = async () => {
    setExporting(true);
    try {
      const { blob, filename } = await generatePosturalPdf(leftAvaliacao, rightAvaliacao);
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Relatório Postural — Resinkra",
          text: "Segue meu relatório de evolução postural.",
          files: [file],
        });
        toast.success("Compartilhado!");
      } else {
        const subject = encodeURIComponent("Relatório de Evolução Postural — Resinkra");
        const body = encodeURIComponent(
          `Olá!\n\nSegue meu relatório de evolução postural.\n\nComparação: ${format(new Date(leftAvaliacao.data), "dd/MM/yyyy")} → ${format(new Date(rightAvaliacao.data), "dd/MM/yyyy")}\n\nResinkra 🌿`
        );
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={exporting}
          title="Relatório PDF"
        >
          {exporting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <FileText size={16} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleDownload} className="gap-2 cursor-pointer">
          <Download size={14} />
          Baixar PDF
        </DropdownMenuItem>

        {canShare && (
          <DropdownMenuItem onClick={handleShare} className="gap-2 cursor-pointer">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
