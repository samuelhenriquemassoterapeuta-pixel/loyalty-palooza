import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import type { Achievement } from "@/hooks/useAchievements";

interface AchievementCelebrationProps {
  isOpen: boolean;
  achievement: Achievement | null;
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
      shape: index % 3,
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

const categoryGradients: Record<string, string> = {
  agendamento: "from-blue-500 to-blue-700",
  cashback: "from-emerald-500 to-emerald-700",
  protocolo: "from-amber-500 to-amber-700",
  social: "from-purple-500 to-purple-700",
  loja: "from-pink-500 to-pink-700",
};

export const AchievementCelebration = ({
  isOpen,
  achievement,
  onClose,
}: AchievementCelebrationProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!achievement) return null;

  const gradient = categoryGradients[achievement.category] || categoryGradients.agendamento;

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
              {Array.from({ length: 40 }).map((_, i) => (
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
            <div className={`bg-gradient-to-br ${gradient} p-8 text-center`}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-4"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: 0.8, repeat: 2 }}
                  className="text-5xl"
                >
                  {achievement.icon}
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium text-white/80 mb-1">
                  🎉 Conquista Desbloqueada!
                </p>
                <h2 className="text-2xl font-bold text-white font-serif">
                  {achievement.name}
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
                    {achievement.description}
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xs text-muted-foreground"
              >
                Continue assim para desbloquear mais conquistas!
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className={`w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r ${gradient} shadow-lg`}
              >
                Incrível! 🚀
              </motion.button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
