import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Check, RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MicroExercicio {
  id: string;
  nome: string;
  descricao: string;
  duracao: number;
  icone: string;
  musculos: string;
}

interface MicroExercicioCardProps {
  exercicio: MicroExercicio;
  onComplete: (exercicioId: string, duracao: number) => void;
  isPending: boolean;
  isCompleted: boolean;
}

export const MicroExercicioCard = ({
  exercicio,
  onComplete,
  isPending,
  isCompleted,
}: MicroExercicioCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercicio.duracao);
  const [done, setDone] = useState(isCompleted);

  useEffect(() => {
    setDone(isCompleted);
  }, [isCompleted]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setDone(true);
      onComplete(exercicio.id, exercicio.duracao);
    }
  }, [timeLeft, isActive, exercicio, onComplete]);

  const reset = () => {
    setIsActive(false);
    setTimeLeft(exercicio.duracao);
    setDone(false);
  };

  const progress = ((exercicio.duracao - timeLeft) / exercicio.duracao) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-xl border transition-all ${
        done
          ? "bg-primary/5 border-primary/30"
          : isActive
          ? "bg-accent/5 border-accent/30"
          : "bg-card border-border"
      }`}
    >
      {/* Progress bar */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-primary/60 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="p-3.5">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="text-2xl shrink-0 mt-0.5">{exercicio.icone}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground truncate">
                {exercicio.nome}
              </h4>
              {done && <Check size={16} className="text-primary shrink-0" />}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              {exercicio.descricao}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                {exercicio.musculos}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Timer size={10} />
                {exercicio.duracao}s
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={reset}>
                    <RotateCcw size={14} className="text-muted-foreground" />
                  </Button>
                </motion.div>
              ) : isActive ? (
                <motion.div key="active" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setIsActive(false)}
                  >
                    <Pause size={14} />
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setIsActive(true)}
                    disabled={isPending}
                  >
                    <Play size={14} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {isActive && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-mono font-bold text-accent"
              >
                {timeLeft}s
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
