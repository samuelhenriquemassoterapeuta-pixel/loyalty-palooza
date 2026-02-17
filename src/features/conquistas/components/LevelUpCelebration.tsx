import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { playLevelUpSound } from "@/lib/celebrationSound";

interface LevelUpCelebrationProps {
  isOpen: boolean;
  levelName: string;
  levelIcon: string;
  levelNumber: number;
  onClose: () => void;
}

// Simple confetti particle
const ConfettiParticle = ({ index }: { index: number }) => {
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--highlight))",
    "hsl(var(--warning))",
    "hsl(var(--secondary))",
    "hsl(var(--muted-foreground))",
  ];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.5;
  const size = 4 + Math.random() * 6;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute rounded-sm pointer-events-none"
      style={{
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        left: `${left}%`,
        top: -10,
        rotate: rotation,
      }}
      initial={{ y: -20, opacity: 1 }}
      animate={{
        y: [0, 300 + Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 120],
        rotate: [rotation, rotation + 360 * (Math.random() > 0.5 ? 1 : -1)],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay,
        ease: "easeOut",
      }}
    />
  );
};

export const LevelUpCelebration = ({
  isOpen,
  levelName,
  levelIcon,
  levelNumber,
  onClose,
}: LevelUpCelebrationProps) => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      setParticles(Array.from({ length: 40 }, (_, i) => i));
      playLevelUpSound();
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>

          {/* Card */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-card border border-primary/30 rounded-3xl p-8 mx-6 max-w-sm text-center shadow-2xl shadow-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow ring behind icon */}
            <motion.div
              className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(78 55% 28% / 0.3) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Level icon */}
            <motion.div
              className="relative w-20 h-20 mx-auto rounded-2xl bg-primary/20 border-2 border-primary flex items-center justify-center text-4xl mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              {levelIcon}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles size={20} className="text-warning" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-black text-foreground mb-1"
            >
              Nível {levelNumber} alcançado!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-primary mb-2"
            >
              {levelIcon} {levelName}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-muted-foreground"
            >
              Continue assim! Você está indo muito bem! 🎉
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="mt-5 px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all"
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
