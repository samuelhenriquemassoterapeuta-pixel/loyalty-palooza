import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QRCode from "react-qr-code";
import { toast } from "sonner";

interface QRCodeFaixaProps {
  youtubeId: string;
  title: string;
  onClose: () => void;
}

export function QRCodeFaixa({ youtubeId, title, onClose }: QRCodeFaixaProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <Card className="w-full max-w-xs" onClick={e => e.stopPropagation()}>
        <CardContent className="p-6 space-y-4 text-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <QrCode size={16} />
              Ouça em casa
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
              <X size={14} />
            </Button>
          </div>

          <div className="bg-white p-4 rounded-xl inline-block mx-auto">
            <QRCode value={url} size={180} />
          </div>

          <p className="text-sm font-medium text-foreground truncate">{title}</p>
          <p className="text-xs text-muted-foreground">Escaneie para continuar ouvindo no seu celular</p>

          <Button variant="outline" size="sm" className="gap-2 w-full" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copiado!" : "Copiar link"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
