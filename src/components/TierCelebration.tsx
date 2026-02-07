import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { TIER_CONFIG, TierName } from "@/hooks/useUserTier";

interface TierCelebrationProps {
  isOpen: boolean;
  tierName: TierName;
  multiplier: number;
  onClose: () => void;
}

const ConfettiParticle = ({ index }: { index: number }) => {
  const style = useMemo(() => {
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--accent))",
      "hsl(var(--highlight))",
      "hsl(var(--warning))",
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
    ];
    return {
      left: `${Math.random() * 100}%`,
      color: colors[index % colors.length],
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 1.5,
      rotation: Math.random() * 720 - 360,
      xDrift: Math.random() * 200 - 100,
      size: 6 + Math.random() * 6,
      shape: index % 3, // 0 = square, 1 = circle, 2 = triangle
    };
  }, [index]);

  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{ left: style.left }}
      initial={{ y: -20, opacity: 1, rotate: 0, x: 0 }}
      animate={{
        y: "100vh",
        opacity: [1, 1, 0],
        rotate: style.rotation,
        x: style.xDrift,
      }}
      transition={{
        duration: style.duration,
        delay: style.delay,
        ease: "easeIn",
      }}
    >
      <div
        style={{
          width: style.size,
          height: style.shape === 2 ? 0 : style.size,
          backgroundColor: style.shape !== 2 ? style.color : "transparent",
          borderRadius: style.shape === 1 ? "50%" : "2px",
          borderLeft: style.shape === 2 ? `${style.size / 2}px solid transparent` : undefined,
          borderRight: style.shape === 2 ? `${style.size / 2}px solid transparent` : undefined,
          borderBottom: style.shape === 2 ? `${style.size}px solid ${style.color}` : undefined,
        }}
      />
    </motion.div>
  );
};

export const TierCelebration = ({
  isOpen,
  tierName,
  multiplier,
  onClose,
}: TierCelebrationProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const config = TIER_CONFIG[tierName];

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <ConfettiParticle key={i} index={i} />
              ))}
            </div>
          )}

          {/* Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Gradient header */}
            <div className={`bg-gradient-to-br ${config.color} p-8 text-center`}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur-sm mb-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.8, repeat: 2 }}
                >
                  <Crown size={40} className="text-primary-foreground" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium text-primary-foreground/80 mb-1">
                  🎉 Parabéns! Você subiu de nível!
                </p>
                <h2 className="text-3xl font-bold text-primary-foreground font-serif">
                  {config.emoji} {tierName}
                </h2>
              </motion.div>
            </div>

            {/* Body */}
            <div className="bg-card p-6 text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles size={18} className="text-warning" />
                  <span className="text-sm text-muted-foreground">
                    Seu novo multiplicador de cashback
                  </span>
                </div>
                <p className="text-5xl font-bold font-serif text-foreground">
                  {multiplier}x
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xs text-muted-foreground"
              >
                Continue comprando para manter e evoluir seu nível!
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className={`w-full py-3 rounded-2xl font-semibold text-primary-foreground bg-gradient-to-r ${config.color} shadow-lg`}
              >
                Incrível! 🚀
              </motion.button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
