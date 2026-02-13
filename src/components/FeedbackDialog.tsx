import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFeedbackRapido } from "@/hooks/useFeedbackRapido";
import { GoogleReviewPrompt } from "@/components/GoogleReviewPrompt";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamentoId: string;
  servico: string;
}

const emojis = [
  { value: 1, emoji: "😞", label: "Ruim" },
  { value: 2, emoji: "😐", label: "Regular" },
  { value: 3, emoji: "😊", label: "Ótimo" },
];

export const FeedbackDialog = ({ open, onOpenChange, agendamentoId, servico }: FeedbackDialogProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [comentario, setComentario] = useState("");
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const { enviarFeedback } = useFeedbackRapido();

  const handleSubmit = () => {
    if (selectedEmoji === null) return;
    const emojiValue = selectedEmoji;
    enviarFeedback.mutate(
      { agendamento_id: agendamentoId, emoji: emojiValue, comentario: comentario || undefined },
      {
        onSuccess: () => {
          onOpenChange(false);
          setSelectedEmoji(null);
          setComentario("");
          // Emoji 3 = Ótimo → prompt Google review
          if (emojiValue === 3) {
            setTimeout(() => setShowGooglePrompt(true), 400);
          }
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Como foi sua sessão?</DialogTitle>
            <p className="text-center text-sm text-muted-foreground">{servico}</p>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Emoji selection */}
            <div className="flex justify-center gap-6">
              {emojis.map((e) => (
                <motion.button
                  key={e.value}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedEmoji(e.value)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${
                    selectedEmoji === e.value
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="text-4xl">{e.emoji}</span>
                  <span className="text-[10px] font-medium text-muted-foreground">{e.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Optional comment */}
            <AnimatePresence>
              {selectedEmoji !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Textarea
                    placeholder="Quer dizer algo mais? (opcional)"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="resize-none"
                    rows={2}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={selectedEmoji === null || enviarFeedback.isPending}
            >
              Enviar feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <GoogleReviewPrompt
        open={showGooglePrompt}
        onOpenChange={setShowGooglePrompt}
        nota={5}
      />
    </>
  );
};
