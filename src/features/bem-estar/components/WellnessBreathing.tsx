import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Play, Square } from "lucide-react";

const PHASES = [
  { label: "Inspire", duration: 4, scale: 1.4, color: "text-primary" },
  { label: "Segure", duration: 4, scale: 1.4, color: "text-accent" },
  { label: "Expire", duration: 6, scale: 1, color: "text-highlight" },
  { label: "Segure", duration: 2, scale: 1, color: "text-muted-foreground" },
];

const TOTAL_CYCLE = PHASES.reduce((s, p) => s + p.duration, 0); // 16s

const WellnessBreathing = () => {
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [cycles, setCycles] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  const stop = useCallback(() => {
    setActive(false);
    cancelAnimationFrame(rafRef.current);
    setElapsed(0);
  }, []);

  const start = useCallback(() => {
    setActive(true);
    setCycles(0);
    startRef.current = performance.now();
    const tick = (now: number) => {
      const e = (now - startRef.current) / 1000;
      setElapsed(e);
      // Auto-stop after 3 cycles
      if (e >= TOTAL_CYCLE * 3) {
        stop();
        setCycles(3);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [stop]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Current phase
  const cyclePos = elapsed % TOTAL_CYCLE;
  let acc = 0;
  let currentPhase = PHASES[0];
  let phaseProgress = 0;
  for (const p of PHASES) {
    if (cyclePos < acc + p.duration) {
      currentPhase = p;
      phaseProgress = (cyclePos - acc) / p.duration;
      break;
    }
    acc += p.duration;
  }

  const completedCycles = Math.floor(elapsed / TOTAL_CYCLE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Wind size={12} /> Respiração guiada
        </p>
        {!active && cycles === 3 && (
          <span className="text-[10px] text-primary font-medium">✓ Completo!</span>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        {!active ? (
          <button
            onClick={start}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors"
          >
            <Play size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground">
              {cycles === 3 ? "Repetir exercício" : "Iniciar 4-4-6-2"}
            </span>
            <span className="text-[10px] text-muted-foreground">(~48s)</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* Animated circle */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/10 border-2 border-primary/30"
                animate={{ scale: currentPhase.scale }}
                transition={{ duration: currentPhase.duration, ease: "easeInOut" }}
              />
              <div className="z-10 text-center">
                <p className={`text-sm font-bold ${currentPhase.color}`}>
                  {currentPhase.label}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {currentPhase.duration}s
                </p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    completedCycles > i ? "bg-primary" : "bg-muted/50"
                  }`}
                />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">
                {completedCycles}/3 ciclos
              </span>
            </div>

            <button
              onClick={stop}
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Square size={10} /> Parar
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessBreathing;
