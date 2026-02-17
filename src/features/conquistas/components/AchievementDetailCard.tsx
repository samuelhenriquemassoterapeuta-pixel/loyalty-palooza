import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, MessageCircle, Share2, Copy, Instagram, X, ChevronDown, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import type { Achievement } from "@/features/conquistas/hooks/useAchievements";

const APP_URL = "https://loyalty-palooza.lovable.app";

const buildShareText = (achievement: Achievement) => {
  const secretLabel = achievement.secret ? " secreta" : "";
  return `🏆 Desbloqueei a conquista${secretLabel} "${achievement.name}" ${achievement.icon} no app Resinkra!\n\n${achievement.description}\n\n👉 Baixe o app: ${APP_URL}`;
};

const triggerHaptic = () => {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  } catch {
    // Haptic not supported — silent fail
  }
};

interface AchievementDetailCardProps {
  achievement: Achievement;
  index: number;
}

export const AchievementDetailCard = ({
  achievement,
  index,
}: AchievementDetailCardProps) => {
  const [showShare, setShowShare] = useState(false);
  const isSecret = achievement.secret;
  const isRevealed = isSecret && achievement.unlocked;
  const isHidden = isSecret && !achievement.unlocked;
  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    const text = buildShareText(achievement);

    // Try Web Share API first (mobile primary)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `🏆 Conquista: ${achievement.name}`,
          text,
          url: APP_URL,
        });
        toast.success("Compartilhado com sucesso! 🎉");
        return;
      } catch (err: any) {
        // User cancelled — don't fallback
        if (err?.name === "AbortError") return;
        // Other errors — fall through to drawer
      }
    }
    // Desktop / fallback: toggle expanded share options
    setShowShare((prev) => !prev);
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    const text = buildShareText(achievement);
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    toast.success("Abrindo WhatsApp...");
    setShowShare(false);
  };

  const handleInstagramCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    const text = buildShareText(achievement);
    navigator.clipboard.writeText(text);
    toast.success("Texto copiado! Cole nos seus Stories do Instagram 📸");
    setShowShare(false);
  };

  const handleCopyText = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    const text = buildShareText(achievement);
    navigator.clipboard.writeText(text);
    toast.success("Texto copiado para a área de transferência!");
    setShowShare(false);
  };

  const handleCloseDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShare(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`
        rounded-xl border transition-all relative overflow-hidden
        ${
          achievement.unlocked
            ? "glass-card-strong border-primary/20 shadow-sm"
            : "bg-muted/30 border-border/40"
        }
        ${isRevealed ? "ring-1 ring-accent/40" : ""}
      `}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 p-3.5">
        {/* Secret reveal shimmer overlay */}
        {isRevealed && (
          <motion.div
            initial={{ x: "-100%", opacity: 0.6 }}
            animate={{ x: "200%", opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none z-10"
          />
        )}

        {/* Badge Icon */}
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0
            ${
              isHidden
                ? "bg-muted/80 border border-dashed border-muted-foreground/30"
                : achievement.unlocked
                ? "bg-primary/15 border border-primary/30"
                : "bg-muted/60 border border-border/40 grayscale opacity-60"
            }
          `}
        >
          <AnimatePresence mode="wait">
            {isHidden ? (
              <motion.div
                key="hidden"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <HelpCircle size={22} className="text-muted-foreground/50" />
              </motion.div>
            ) : isRevealed ? (
              <motion.span
                key="revealed"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {achievement.icon}
              </motion.span>
            ) : (
              <span>{achievement.icon}</span>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p
              className={`font-semibold text-sm truncate ${
                isHidden
                  ? "text-muted-foreground/50 italic"
                  : achievement.unlocked
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {isHidden ? "Conquista Secreta" : achievement.name}
            </p>
            {achievement.unlocked && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                ✓
              </span>
            )}
            {isSecret && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 ${
                  isRevealed
                    ? "bg-accent/20 text-accent-foreground"
                    : "bg-muted-foreground/10 text-muted-foreground/50"
                }`}
              >
                {isRevealed ? "🔓 Revelada!" : "🔒 Secreta"}
              </span>
            )}
          </div>
          <p className={`text-xs mt-0.5 ${isHidden ? "text-muted-foreground/40 italic" : "text-muted-foreground"}`}>
            {isHidden ? "Desbloqueie para descobrir..." : achievement.description}
          </p>

          {/* Progress bar for locked */}
          {!achievement.unlocked && !isHidden && (
            <div className="flex items-center gap-2 mt-1.5">
              <Progress value={achievement.progress} className="h-1.5 flex-1" />
              <span className="text-[10px] text-muted-foreground font-medium flex-shrink-0">
                {achievement.current}/{achievement.target}
              </span>
            </div>
          )}

          {/* Hidden progress hint */}
          {isHidden && (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="h-1.5 flex-1 rounded-full bg-muted-foreground/10 overflow-hidden">
                <div className="h-full w-1/4 rounded-full bg-muted-foreground/20 animate-pulse" />
              </div>
              <span className="text-[10px] text-muted-foreground/40 font-medium flex-shrink-0">
                ???
              </span>
            </div>
          )}
        </div>

        {/* Category badge */}
        <CategoryBadge category={isHidden ? "secreto" : achievement.category} />
      </div>

      {/* Share button — visible for unlocked achievements */}
      {achievement.unlocked && (
        <div className="px-3.5 pb-2.5 pt-0 flex items-center">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground 
              hover:text-primary hover:bg-primary/5 active:scale-95 transition-all group"
          >
            {hasNativeShare ? (
              <>
                <ExternalLink size={13} className="group-active:scale-110 transition-transform" />
                Compartilhar
              </>
            ) : (
              <>
                <Share2 size={13} className="group-hover:scale-110 transition-transform" />
                Compartilhar
                <motion.div
                  animate={{ rotate: showShare ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} />
                </motion.div>
              </>
            )}
          </button>
        </div>
      )}

      {/* Fallback share drawer — desktop or when Web Share fails */}
      <AnimatePresence>
        {showShare && achievement.unlocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-3 pt-2 border-t border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-muted-foreground font-medium">
                  Escolha como compartilhar
                </span>
                <button
                  onClick={handleCloseDrawer}
                  className="p-0.5 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 active:scale-95 transition-all"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>
                <button
                  onClick={handleInstagramCopy}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#E4405F]/15 text-[#E4405F] hover:bg-[#E4405F]/25 active:scale-95 transition-all"
                >
                  <Instagram size={14} />
                  Instagram
                </button>
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-muted text-muted-foreground hover:bg-muted/80 active:scale-95 transition-all"
                >
                  <Copy size={14} />
                  Copiar texto
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  agendamento: { label: "Sessões", color: "text-info bg-info/10" },
  cashback: { label: "Cashback", color: "text-highlight bg-highlight/10" },
  protocolo: { label: "Protocolo", color: "text-warning bg-warning/10" },
  social: { label: "Social", color: "text-accent bg-accent/10" },
  loja: { label: "Loja", color: "text-primary bg-primary/10" },
  secreto: { label: "???", color: "text-muted-foreground/50 bg-muted-foreground/5" },
};

const CategoryBadge = ({ category }: { category: string }) => {
  const config = categoryConfig[category] || categoryConfig.social;
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${config.color}`}>
      {config.label}
    </span>
  );
};
