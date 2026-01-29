import { useState } from "react";
import { QrCode, Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";

const APP_URL = "https://d9766493-319f-4158-82d6-caca99a7199a.lovableproject.com/instalar";

export const ShareQRCode = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
                <QRCode 
                  value={APP_URL} 
                  size={160}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 160 160`}
                  level="M"
                />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Escaneie para instalar o app
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
