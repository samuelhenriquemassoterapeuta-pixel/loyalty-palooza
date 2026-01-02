import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const InstallBanner = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed as PWA
    const isInstalled = window.matchMedia("(display-mode: standalone)").matches;
    
    // Check if user dismissed the banner before
    const dismissed = localStorage.getItem("install-banner-dismissed");
    
    if (!isInstalled && !dismissed) {
      setIsVisible(true);
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
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-4 shadow-lg"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={14} className="text-primary-foreground" />
          </button>

          <div className="flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Download size={24} className="text-primary-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary-foreground text-sm">
                Instale o App Resinkra
              </h3>
              <p className="text-primary-foreground/80 text-xs mt-0.5">
                Acesso rápido direto da sua tela inicial
              </p>
            </div>

            <Button
              onClick={handleInstall}
              size="sm"
              variant="secondary"
              className="shrink-0 bg-white text-primary hover:bg-white/90 font-semibold shadow-md"
            >
              Instalar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
