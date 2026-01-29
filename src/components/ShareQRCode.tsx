import { useState, useRef } from "react";
import { QrCode, Share2, X, Printer, Download, Copy, Check, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { toast } from "@/hooks/use-toast";

const APP_URL = "https://d9766493-319f-4158-82d6-caca99a7199a.lovableproject.com/instalar";

export const ShareQRCode = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "Compartilhe com seus amigos",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Resinkra - Instale nosso App",
          text: "Baixe o app Resinkra para agendamentos, compras e muito mais!",
          url: APP_URL,
        });
      } catch (error) {
        // User cancelled or share failed - fallback to copy
        if ((error as Error).name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink();
    }
  };

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      const svg = qrRef.current.querySelector("svg");
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      const size = 400;
      const padding = 40;
      canvas.width = size + padding * 2;
      canvas.height = size + padding * 2;

      img.onload = () => {
        if (!ctx) return;
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, padding, padding, size, size);

        const link = document.createElement("a");
        link.download = "resinkra-qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({
          title: "Download concluído!",
          description: "QR Code salvo como resinkra-qrcode.png",
        });
      };

      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      toast({
        title: "Erro ao baixar",
        description: "Não foi possível gerar a imagem",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-secondary/80 via-secondary/60 to-secondary/80 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
      >
        <div className="p-2.5 rounded-xl bg-primary/20 shadow-sm">
          <QrCode className="text-primary" size={22} />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">Compartilhar App</p>
          <p className="text-xs text-muted-foreground">QR Code para instalar o Resinkra</p>
        </div>
        <div className="p-2 rounded-full bg-primary/10">
          <Share2 size={18} className="text-primary" />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-6 bg-white rounded-2xl border border-border/50 shadow-lg">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
              
              <div className="flex flex-col items-center">
                <div ref={qrRef}>
                  <QRCode 
                    value={APP_URL} 
                    size={160}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 160 160`}
                    level="M"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Escaneie para instalar o app
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                  {canNativeShare && (
                    <button 
                      onClick={handleNativeShare}
                      className="flex items-center gap-1.5 text-xs font-medium text-white bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <ExternalLink size={14} />
                      Compartilhar
                    </button>
                  )}
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copiado!" : "Copiar link"}
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <Download size={14} />
                    Baixar PNG
                  </button>
                  <Link 
                    to="/qrcode" 
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <Printer size={14} />
                    Imprimir
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
