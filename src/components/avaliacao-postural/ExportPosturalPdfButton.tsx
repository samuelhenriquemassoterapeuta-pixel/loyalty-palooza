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
import { AvaliacaoPostural } from "@/hooks/useAvaliacaoPostural";
import { generatePosturalPdf } from "./posturalPdfGenerator";

interface ExportPosturalPdfButtonProps {
  leftAvaliacao: AvaliacaoPostural;
  rightAvaliacao: AvaliacaoPostural;
}

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
