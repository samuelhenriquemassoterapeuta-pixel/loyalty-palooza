import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Timer, Play, Pause, RotateCcw, X } from "lucide-react";

interface TimerSessaoProps {
  onClose: () => void;
  onTempoEsgotado?: () => void;
}

const PRESETS = [
  { label: "30 min", minutos: 30, desc: "Sessão rápida" },
  { label: "45 min", minutos: 45, desc: "Sessão padrão" },
  { label: "60 min", minutos: 60, desc: "Sessão completa" },
  { label: "90 min", minutos: 90, desc: "Sessão premium" },
];

export function TimerSessao({ onClose, onTempoEsgotado }: TimerSessaoProps) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onTempoEsgotado?.();
            return 0;
          }
          // Alert at 5 min remaining
          if (prev === 300 && !alertShown) {
            setAlertShown(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining, alertShown, onTempoEsgotado]);

  const selectPreset = useCallback((minutos: number) => {
    const secs = minutos * 60;
    setTotalSeconds(secs);
    setRemaining(secs);
    setIsRunning(true);
    setAlertShown(false);
  }, []);

  const togglePause = () => setIsRunning(prev => !prev);

  const reset = () => {
    setIsRunning(false);
    setRemaining(totalSeconds);
    setAlertShown(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progress = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;

  return (
    <Card className="border-accent/30 bg-accent/5">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Timer size={16} />
            Timer da Sessão
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            <X size={14} />
          </Button>
        </div>

        {totalSeconds === 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map(p => (
              <Button
                key={p.minutos}
                variant="outline"
                size="sm"
                onClick={() => selectPreset(p.minutos)}
                className="flex flex-col h-auto py-2"
              >
                <span className="font-bold">{p.label}</span>
                <span className="text-[10px] text-muted-foreground">{p.desc}</span>
              </Button>
            ))}
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className={`text-3xl font-mono font-bold ${remaining <= 300 ? "text-destructive animate-pulse" : "text-foreground"}`}>
                {formatTime(remaining)}
              </div>
              {alertShown && remaining > 0 && (
                <p className="text-xs text-destructive mt-1 animate-pulse">⚠️ Faltam 5 minutos!</p>
              )}
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={togglePause} className="gap-1">
                {isRunning ? <Pause size={14} /> : <Play size={14} />}
                {isRunning ? "Pausar" : "Retomar"}
              </Button>
              <Button variant="outline" size="sm" onClick={reset} className="gap-1">
                <RotateCcw size={14} /> Reiniciar
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setTotalSeconds(0); setRemaining(0); setIsRunning(false); }}>
                Novo timer
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
