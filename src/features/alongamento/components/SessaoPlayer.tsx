import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, CheckCircle, X, Timer, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExercicioAlongamento } from "@/features/alongamento/hooks/useAlongamento";

interface SessaoPlayerProps {
  exercicios: ExercicioAlongamento[];
  planoId: string | null;
  onComplete: (duracaoSegundos: number, exerciciosCompletados: number) => void;
  onClose: () => void;
}

/** Breathing cycle: 4s inhale, 4s exhale */
const BREATH_CYCLE = 8;

export const SessaoPlayer = ({ exercicios, planoId, onComplete, onClose }: SessaoPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [completados, setCompletados] = useState(0);
  const [showBreathing, setShowBreathing] = useState(true);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "exhale">("inhale");
  const [breathProgress, setBreathProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathRef = useRef<NodeJS.Timeout | null>(null);

  const exercicio = exercicios[currentIndex];
  const progress = (currentIndex / exercicios.length) * 100;

  useEffect(() => {
    if (exercicio) {
      setTimer(exercicio.duracao_segundos);
    }
  }, [currentIndex, exercicio]);

  // Main timer
  useEffect(() => {
    if (playing && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            setPlaying(false);
            return 0;
          }
          return t - 1;
        });
        setTotalTime((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, timer]);

  // Breathing cycle
  useEffect(() => {
    if (!playing || !showBreathing) {
      if (breathRef.current) clearInterval(breathRef.current);
      return;
    }

    let elapsed = 0;
    breathRef.current = setInterval(() => {
      elapsed += 100;
      const cyclePos = (elapsed % (BREATH_CYCLE * 1000)) / 1000;
      const halfCycle = BREATH_CYCLE / 2;

      if (cyclePos < halfCycle) {
        setBreathPhase("inhale");
        setBreathProgress(cyclePos / halfCycle);
      } else {
        setBreathPhase("exhale");
        setBreathProgress(1 - (cyclePos - halfCycle) / halfCycle);
      }
    }, 100);

    return () => {
      if (breathRef.current) clearInterval(breathRef.current);
    };
  }, [playing, showBreathing]);

  const handleNext = () => {
    setCompletados((c) => c + 1);
    if (currentIndex < exercicios.length - 1) {
      setCurrentIndex((i) => i + 1);
      setPlaying(false);
    } else {
      onComplete(totalTime, completados + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < exercicios.length - 1) {
      setCurrentIndex((i) => i + 1);
      setPlaying(false);
    } else {
      onComplete(totalTime, completados);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (!exercicio) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border safe-top">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {currentIndex + 1} de {exercicios.length}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBreathing(!showBreathing)}
            className={showBreathing ? "text-primary" : "text-muted-foreground"}
            title="Guia de respiração"
          >
            <Wind size={18} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            <SkipForward size={16} />
            Pular
          </Button>
        </div>
      </div>

      <Progress value={progress} className="h-1" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={exercicio.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center w-full max-w-sm"
          >
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-4xl mx-auto mb-6">
              {exercicio.imagem_url || "🧘"}
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2">{exercicio.nome}</h2>
            <p className="text-sm text-muted-foreground mb-6">{exercicio.descricao}</p>

            {/* Timer circle with breathing ring */}
            <div className="relative w-44 h-44 mx-auto mb-6">
              {/* Breathing ring (outer) */}
              {showBreathing && playing && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  animate={{
                    scale: breathPhase === "inhale" ? [1, 1.12] : [1.12, 1],
                  }}
                  transition={{ duration: BREATH_CYCLE / 2, ease: "easeInOut" }}
                />
              )}

              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="4"
                />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - timer / exercicio.duracao_segundos)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Timer size={16} className="text-muted-foreground mb-1" />
                <span className="text-3xl font-bold text-foreground">{formatTime(timer)}</span>

                {/* Breathing label */}
                {showBreathing && playing && (
                  <motion.span
                    key={breathPhase}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] font-medium text-primary mt-1"
                  >
                    {breathPhase === "inhale" ? "Inspire 🌬️" : "Expire 💨"}
                  </motion.span>
                )}
              </div>
            </div>

            {exercicio.instrucoes && (
              <p className="text-xs text-muted-foreground bg-muted/50 rounded-xl p-3 mb-4 text-left">
                {exercicio.instrucoes}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="px-6 pb-8 safe-bottom flex items-center justify-center gap-4">
        <Button
          size="lg"
          variant={playing ? "outline" : "default"}
          className="w-16 h-16 rounded-full"
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <Pause size={24} /> : <Play size={24} />}
        </Button>

        {timer === 0 && (
          <Button
            size="lg"
            className="w-16 h-16 rounded-full"
            onClick={handleNext}
          >
            {currentIndex < exercicios.length - 1 ? (
              <SkipForward size={24} />
            ) : (
              <CheckCircle size={24} />
            )}
          </Button>
        )}
      </div>

      {/* Total time + breathing status */}
      <div className="text-center pb-4 text-xs text-muted-foreground">
        Tempo total: {formatTime(totalTime)} • {completados} completado{completados !== 1 ? "s" : ""}
        {showBreathing && (
          <span className="ml-2 text-primary">• Respiração ativa</span>
        )}
      </div>
    </motion.div>
  );
};
