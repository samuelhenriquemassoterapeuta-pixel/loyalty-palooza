import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const InstallBanner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const isInstalled = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("install-banner-dismissed");
    
    if (!isInstalled && !dismissed) {
      // Delay appearance for a less intrusive experience
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem("install-banner-dismissed", "true");
  };

  const handleInstall = () => {
    navigate("/instalar");
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-4 z-40 max-w-[280px] lg:bottom-6"
        >
          <div className="relative overflow-hidden rounded-2xl bg-card/95 backdrop-blur-xl border border-border/60 p-4 shadow-elevated">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X size={14} className="text-muted-foreground" />
            </button>

            <div className="flex items-center gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Download size={18} className="text-primary-foreground" />
              </div>
              
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-semibold text-foreground text-xs">
                  Instale o App
                </h3>
                <p className="text-muted-foreground text-[10px] mt-0.5 leading-tight">
                  Acesso direto da sua tela inicial
                </p>
              </div>
            </div>

            <button
              onClick={handleInstall}
              className="w-full mt-3 py-2 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Instalar agora
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
