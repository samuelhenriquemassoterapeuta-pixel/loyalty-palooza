import { useState, useRef, useEffect } from "react";
import { QrCode, Share2, X, Printer, Download, Copy, Check, ExternalLink, Smartphone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { toast } from "@/hooks/use-toast";

const APP_URL = "https://resinkra.com.br/instalar";

// Robust mobile detection
const detectMobile = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  
  // Check user agent for mobile devices
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || "";
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  
  // Check for touch capability
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  
  // Check screen width (typical mobile breakpoint)
  const isSmallScreen = window.innerWidth <= 768;
  
  // Check if standalone (PWA installed)
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  
  return mobileRegex.test(userAgent) || (hasTouch && isSmallScreen) || isStandalone;
};

export const ShareQRCode = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(detectMobile());
    
    // Update on resize
    const handleResize = () => setIsMobile(detectMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        return;
      } catch (error) {
        // User cancelled - don't show fallback
        if ((error as Error).name === "AbortError") return;
      }
    }
    
    // Fallback: copy link and show toast with share suggestions
    await handleCopyLink();
    if (isMobile) {
      toast({
        title: "Link copiado!",
        description: "Cole no WhatsApp, Instagram ou qualquer app para compartilhar",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Baixe o app Resinkra para agendamentos, compras e muito mais! ${APP_URL}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleInstagramShare = async () => {
    // Instagram doesn't have a direct share URL, so we copy the link and guide the user
    await navigator.clipboard.writeText(APP_URL);
    toast({
      title: "Link copiado!",
      description: "Cole nos Stories ou Direct do Instagram",
    });
  };

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;
  const showShareButton = canNativeShare || isMobile;
  const showSocialButtons = isMobile && !canNativeShare;

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
                  {showShareButton && (
                    <button 
                      onClick={handleNativeShare}
                      className="flex items-center gap-1.5 text-xs font-medium text-white bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {canNativeShare ? <ExternalLink size={14} /> : <Smartphone size={14} />}
                      Compartilhar
                    </button>
                  )}
                  {showSocialButtons && (
                    <>
                      <button 
                        onClick={handleWhatsAppShare}
                        className="flex items-center gap-1.5 text-xs font-medium text-white bg-[#25D366] hover:bg-[#20bd5a] px-3 py-1.5 rounded-full transition-colors"
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </button>
                      <button 
                        onClick={handleInstagramShare}
                        className="flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                      </button>
                    </>
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
