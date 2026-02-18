import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Download, X, Flame, Trophy, Heart } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";

interface ShareCardProps {
  streakAtual: number;
  melhorStreak: number;
  totalCheckins: number;
  conquistas?: { icone: string; titulo: string }[];
  weekStats?: { humor: number; energia: number; sono: number; agua: number };
}

const WellnessShareCard = ({ streakAtual, melhorStreak, totalCheckins, conquistas = [], weekStats }: ShareCardProps) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        if (navigator.share && navigator.canShare?.({ files: [new File([blob], "wellness.png", { type: "image/png" })] })) {
          await navigator.share({
            title: "Meu progresso de Bem-Estar",
            files: [new File([blob], "wellness.png", { type: "image/png" })],
          });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "meu-bem-estar.png";
          a.click();
          URL.revokeObjectURL(url);
          toast.success("Imagem salva! 📸");
        }
      }, "image/png");
    } catch {
      toast.error("Erro ao gerar imagem");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
        aria-label="Compartilhar"
      >
        <Share2 size={16} className="text-primary" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm space-y-4"
            >
              {/* Shareable Card */}
              <div
                ref={cardRef}
                className="rounded-3xl p-6 text-white"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Heart size={20} fill="currentColor" className="text-rose-400" />
                  <span className="text-sm font-bold tracking-wider opacity-80">MEU BEM-ESTAR</span>
                </div>

                <div className="text-center mb-5">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Flame size={32} className="text-orange-400" />
                    <span className="text-5xl font-black">{streakAtual}</span>
                  </div>
                  <p className="text-sm opacity-70">dias de streak</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center">
                    <p className="text-lg font-bold">{totalCheckins}</p>
                    <p className="text-[10px] opacity-60">check-ins</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{melhorStreak}</p>
                    <p className="text-[10px] opacity-60">melhor streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{conquistas.length}</p>
                    <p className="text-[10px] opacity-60">conquistas</p>
                  </div>
                </div>

                {weekStats && (
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { icon: "😊", value: weekStats.humor, label: "Humor" },
                      { icon: "⚡", value: weekStats.energia, label: "Energia" },
                      { icon: "🌙", value: `${weekStats.sono}h`, label: "Sono" },
                      { icon: "💧", value: `${weekStats.agua}L`, label: "Água" },
                    ].map((s) => (
                      <div key={s.label} className="text-center rounded-xl bg-white/10 py-2">
                        <span className="text-sm">{s.icon}</span>
                        <p className="text-xs font-bold mt-0.5">{s.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {conquistas.length > 0 && (
                  <div className="flex items-center justify-center gap-1 flex-wrap">
                    {conquistas.slice(0, 6).map((c, i) => (
                      <span key={i} className="text-xl">{c.icone}</span>
                    ))}
                    {conquistas.length > 6 && (
                      <span className="text-xs opacity-50">+{conquistas.length - 6}</span>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[9px] opacity-40">resinkra.com</span>
                  {streakAtual >= 7 && <Trophy size={14} className="text-yellow-400 opacity-60" />}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm"
                >
                  <Download size={16} />
                  Salvar / Compartilhar
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-3 rounded-2xl bg-muted text-muted-foreground"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WellnessShareCard;
