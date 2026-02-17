import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Timer, Dumbbell, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePausasPosturais, MICRO_EXERCICIOS } from "@/features/alongamento/hooks/usePausasPosturais";
import { PausaConfigCard } from "./PausaConfigCard";
import { MicroExercicioCard } from "./MicroExercicioCard";
import { AderenciaTracker } from "./AderenciaTracker";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const PausasPosturaisSection = () => {
  const {
    config,
    isLoading,
    registrosHoje,
    salvarConfig,
    registrarPausa,
    aderencia,
  } = usePausasPosturais();

  const [showConfig, setShowConfig] = useState(false);
  const [showAllExercicios, setShowAllExercicios] = useState(false);

  const completedIds = new Set(registrosHoje.map((r) => r.exercicio_id));

  const handleComplete = useCallback(
    (exercicioId: string, duracao: number) => {
      registrarPausa.mutate({ exercicioId, duracaoSegundos: duracao });
    },
    [registrarPausa]
  );

  // Show 4 random exercises, or all if expanded
  const exerciciosVisiveis = showAllExercicios
    ? MICRO_EXERCICIOS
    : MICRO_EXERCICIOS.slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Timer size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Pausas Posturais</h2>
            <p className="text-xs text-muted-foreground">
              Lembretes e microexercícios para quem trabalha sentado
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs gap-1"
          onClick={() => setShowConfig(!showConfig)}
        >
          {showConfig ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showConfig ? "Fechar" : "Ajustar"}
        </Button>
      </div>

      {/* Config card (collapsible) */}
      {showConfig && (
        <PausaConfigCard
          config={config}
          onSave={(data) => salvarConfig.mutate(data)}
          isPending={salvarConfig.isPending}
        />
      )}

      {/* Adherence tracking */}
      {config && (
        <AderenciaTracker
          hoje={aderencia.hoje}
          metaHoje={aderencia.metaHoje}
          semana={aderencia.semana}
        />
      )}

      {/* Quick start prompt if no config */}
      {!config && !showConfig && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-accent/5 border border-accent/20 text-center"
        >
          <Timer size={28} className="mx-auto mb-2 text-accent" />
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Configure suas pausas
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Defina intervalos de 30 a 120 minutos para receber lembretes e manter uma boa postura ao longo do dia
          </p>
          <Button size="sm" onClick={() => setShowConfig(true)} className="gap-1.5">
            <Timer size={14} />
            Começar
          </Button>
        </motion.div>
      )}

      {/* Micro-exercises */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 px-1">
          <Dumbbell size={14} className="text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Microexercícios
          </span>
          <span className="text-[10px] text-muted-foreground">
            ({completedIds.size}/{MICRO_EXERCICIOS.length} hoje)
          </span>
        </div>

        <div className="space-y-2">
          {exerciciosVisiveis.map((ex) => (
            <MicroExercicioCard
              key={ex.id}
              exercicio={ex}
              onComplete={handleComplete}
              isPending={registrarPausa.isPending}
              isCompleted={completedIds.has(ex.id)}
            />
          ))}
        </div>

        {MICRO_EXERCICIOS.length > 4 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground"
            onClick={() => setShowAllExercicios(!showAllExercicios)}
          >
            {showAllExercicios
              ? "Mostrar menos"
              : `Ver todos os ${MICRO_EXERCICIOS.length} exercícios`}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
