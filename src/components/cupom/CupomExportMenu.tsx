import { useState } from "react";
import { Download, Image, FileText, Copy, Share2, MessageCircle, Instagram, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CupomExportMenuProps {
  cupomRef: React.RefObject<HTMLDivElement>;
  formato: string;
  formatoLabel: string;
  disabled?: boolean;
  variant?: "header" | "mobile" | "inline";
}

type ExportFormat = "png" | "jpg" | "webp";

const getCanvas = async (el: HTMLDivElement) => {
  const exportWidth = parseInt(el.getAttribute("data-export-width") || "1080");
  const scale = exportWidth / el.offsetWidth;
  return html2canvas(el, {
    scale,
    useCORS: true,
    backgroundColor: null,
    width: el.offsetWidth,
    height: el.offsetHeight,
  });
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

export const CupomExportMenu = ({ cupomRef, formato, formatoLabel, disabled, variant = "header" }: CupomExportMenuProps) => {
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const timestamp = () => Date.now();

  const exportAsImage = async (format: ExportFormat) => {
    if (!cupomRef.current || exporting) return;
    setExporting(true);
    try {
      const canvas = await getCanvas(cupomRef.current);
      const mimeType = format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
      const quality = format === "png" ? undefined : 0.92;
      canvas.toBlob(
        (blob) => {
          if (!blob) throw new Error("Falha ao gerar imagem");
          downloadBlob(blob, `cupom-resinkra-${formato}-${timestamp()}.${format}`);
          toast.success(`Cupom exportado como ${format.toUpperCase()}! 🎟️`);
        },
        mimeType,
        quality
      );
    } catch {
      toast.error("Erro ao exportar cupom");
    } finally {
      setExporting(false);
    }
  };

  const exportAsPdf = async () => {
    if (!cupomRef.current || exporting) return;
    setExporting(true);
    try {
      const canvas = await getCanvas(cupomRef.current);
      const imgData = canvas.toDataURL("image/png");
      const imgW = canvas.width;
      const imgH = canvas.height;
      const orientation = imgW > imgH ? "landscape" : "portrait";
      const pdf = new jsPDF({ orientation, unit: "px", format: [imgW, imgH] });
      pdf.addImage(imgData, "PNG", 0, 0, imgW, imgH);
      pdf.save(`cupom-resinkra-${formato}-${timestamp()}.pdf`);
      toast.success("Cupom exportado como PDF! 📄");
    } catch {
      toast.error("Erro ao exportar PDF");
    } finally {
      setExporting(false);
    }
  };

  const copyToClipboard = async () => {
    if (!cupomRef.current || exporting) return;
    setExporting(true);
    try {
      const canvas = await getCanvas(cupomRef.current);
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Falha ao copiar");
        try {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          setCopied(true);
          toast.success("Cupom copiado para a área de transferência! 📋");
          setTimeout(() => setCopied(false), 2000);
        } catch {
          toast.error("Seu navegador não suporta copiar imagens");
        }
        setExporting(false);
      }, "image/png");
      return;
    } catch {
      toast.error("Erro ao copiar imagem");
    }
    setExporting(false);
  };

  const shareVia = async (target: "whatsapp" | "instagram" | "native") => {
    if (!cupomRef.current || exporting) return;
    setExporting(true);
    try {
      const canvas = await getCanvas(cupomRef.current);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Falha"))), "image/png")
      );
      const file = new File([blob], `cupom-resinkra-${formato}.png`, { type: "image/png" });

      if (target === "native" && navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Cupom Resinkra",
          text: "Confira este cupom especial! 🎟️",
          files: [file],
        });
        toast.success("Compartilhado com sucesso!");
      } else if (target === "whatsapp") {
        // Try native share with file first (works on mobile)
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            title: "Cupom Resinkra",
            text: "Confira este cupom especial da Resinkra! 🎟️✨",
            files: [file],
          });
          toast.success("Compartilhado com sucesso!");
        } else {
          // Fallback: download + open WhatsApp Web
          downloadBlob(blob, `cupom-resinkra-${formato}.png`);
          const text = encodeURIComponent("Confira este cupom especial da Resinkra! 🎟️✨");
          window.open(`https://wa.me/?text=${text}`, "_blank");
          toast.success("Imagem baixada! Cole no WhatsApp 💬");
        }
      } else if (target === "instagram") {
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            title: "Cupom Resinkra",
            files: [file],
          });
          toast.success("Compartilhado com sucesso!");
        } else {
          downloadBlob(blob, `cupom-resinkra-${formato}.png`);
          toast.success("Imagem baixada! Abra o Instagram e adicione aos Stories 📸");
        }
      } else {
        // Fallback: try native share without file
        if (navigator.share) {
          await navigator.share({
            title: "Cupom Resinkra",
            text: "Confira este cupom especial da Resinkra! 🎟️",
          });
        } else {
          downloadBlob(blob, `cupom-resinkra-${formato}.png`);
          toast.success("Imagem baixada!");
        }
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        toast.error("Erro ao compartilhar");
      }
    } finally {
      setExporting(false);
    }
  };

  if (variant === "mobile") {
    return (
      <div className="fixed bottom-20 left-3 right-3 lg:hidden z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full gap-2 bg-primary text-primary-foreground shadow-elevated" size="lg" disabled={exporting}>
              <Download size={18} />
              {exporting ? "Exportando..." : `Exportar ${formatoLabel}`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-[calc(100vw-1.5rem)] max-w-md" side="top">
            <ExportMenuItems
              onExportImage={exportAsImage}
              onExportPdf={exportAsPdf}
              onCopy={copyToClipboard}
              onShare={shareVia}
              copied={copied}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full gap-2 bg-primary text-primary-foreground shadow-button" disabled={exporting}>
            <Download size={16} />
            {exporting ? "Exportando..." : `Exportar ${formatoLabel}`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-64">
          <ExportMenuItems
            onExportImage={exportAsImage}
            onExportPdf={exportAsPdf}
            onCopy={copyToClipboard}
            onShare={shareVia}
            copied={copied}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-2 bg-primary text-primary-foreground" disabled={exporting}>
          <Download size={16} />
          {exporting ? "..." : "Exportar"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <ExportMenuItems
          onExportImage={exportAsImage}
          onExportPdf={exportAsPdf}
          onCopy={copyToClipboard}
          onShare={shareVia}
          copied={copied}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ExportMenuItems = ({
  onExportImage,
  onExportPdf,
  onCopy,
  onShare,
  copied,
}: {
  onExportImage: (f: ExportFormat) => void;
  onExportPdf: () => void;
  onCopy: () => void;
  onShare: (t: "whatsapp" | "instagram" | "native") => void;
  copied: boolean;
}) => (
  <>
    <DropdownMenuLabel className="text-xs text-muted-foreground">Baixar imagem</DropdownMenuLabel>
    <DropdownMenuItem onClick={() => onExportImage("png")} className="gap-2">
      <Image className="w-4 h-4" /> PNG <span className="ml-auto text-[10px] text-muted-foreground">alta qualidade</span>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => onExportImage("jpg")} className="gap-2">
      <Image className="w-4 h-4" /> JPG <span className="ml-auto text-[10px] text-muted-foreground">menor tamanho</span>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => onExportImage("webp")} className="gap-2">
      <Image className="w-4 h-4" /> WebP <span className="ml-auto text-[10px] text-muted-foreground">moderno</span>
    </DropdownMenuItem>

    <DropdownMenuSeparator />
    <DropdownMenuLabel className="text-xs text-muted-foreground">Documento</DropdownMenuLabel>
    <DropdownMenuItem onClick={onExportPdf} className="gap-2">
      <FileText className="w-4 h-4" /> PDF <span className="ml-auto text-[10px] text-muted-foreground">impressão</span>
    </DropdownMenuItem>

    <DropdownMenuSeparator />
    <DropdownMenuLabel className="text-xs text-muted-foreground">Ações</DropdownMenuLabel>
    <DropdownMenuItem onClick={onCopy} className="gap-2">
      {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copiado!" : "Copiar imagem"}
    </DropdownMenuItem>

    <DropdownMenuSeparator />
    <DropdownMenuLabel className="text-xs text-muted-foreground">Compartilhar</DropdownMenuLabel>
    <DropdownMenuItem onClick={() => onShare("native")} className="gap-2">
      <Share2 className="w-4 h-4" /> Compartilhar...
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => onShare("whatsapp")} className="gap-2">
      <MessageCircle className="w-4 h-4" /> WhatsApp
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => onShare("instagram")} className="gap-2">
      <Instagram className="w-4 h-4" /> Instagram Stories
    </DropdownMenuItem>
  </>
);
