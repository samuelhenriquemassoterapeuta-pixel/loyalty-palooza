import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, Check } from "lucide-react";

const DURATIONS = [
  { label: "1 min", seconds: 60 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

export default function WellnessMindfulness() {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const reset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(selectedDuration);
  };

  const selectDuration = (sec: number) => {
    if (isRunning) return;
    setSelectedDuration(sec);
    setTimeLeft(sec);
    setIsComplete(false);
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Timer size={15} className="text-primary" />
          <p className="text-xs font-semibold text-foreground">Mindfulness</p>
        </div>

        {/* Duration selector */}
        <div className="flex gap-1.5 mb-4">
          {DURATIONS.map((d) => (
            <button
              key={d.seconds}
              onClick={() => selectDuration(d.seconds)}
              disabled={isRunning}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                selectedDuration === d.seconds
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
              } disabled:opacity-50`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Timer display */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted/30" strokeWidth="2" />
              <motion.circle
                cx="18" cy="18" r="16" fill="none"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray={`${progress * 1.005} 100.5`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isComplete ? (
                  <motion.div
                    key="done"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check size={24} className="text-primary" />
                  </motion.div>
                ) : (
                  <motion.span
                    key="time"
                    className="text-lg font-black text-foreground tabular-nums"
                  >
                    {formatTime(timeLeft)}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={isComplete}
              className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 disabled:opacity-50"
            >
              {isRunning ? <Pause size={12} /> : <Play size={12} />}
              {isRunning ? "Pausar" : "Iniciar"}
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground text-xs flex items-center gap-1"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {isComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] text-primary font-medium"
            >
              ✨ Sessão completa! Respire fundo.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
