import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Replace with the actual Google review link for Resinkra
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID";

interface GoogleReviewPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nota: number;
}

export const GoogleReviewPrompt = ({
  open,
  onOpenChange,
  nota,
}: GoogleReviewPromptProps) => {
  const handleOpenGoogle = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  // Only prompt for good ratings (4-5 stars)
  if (nota < 4) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">
            Obrigado pela avaliação! 💚
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex justify-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={20}
                className={
                  s <= nota
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }
              />
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Ficamos felizes que você gostou! Que tal compartilhar sua experiência
            no <span className="font-semibold text-foreground">Google</span>?
            Sua avaliação ajuda outras pessoas a nos encontrarem 🙏
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <Button onClick={handleOpenGoogle} className="w-full gap-2">
              <ExternalLink size={16} />
              Avaliar no Google
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground"
            >
              Agora não
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
