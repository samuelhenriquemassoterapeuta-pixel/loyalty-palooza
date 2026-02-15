import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NarracaoPlayer } from "@/components/curso/NarracaoPlayer";
import { AulaHeroCard } from "@/components/curso/AulaHeroCard";
import { QuizSection } from "@/components/curso/QuizSection";
import { ChecklistSection } from "@/components/curso/ChecklistSection";
import { renderCursoContent } from "@/components/curso/CursoContentRenderer";
import type { CursoModuloData, CursoAssetPair } from "@/components/curso/CursoShell";

interface CursoLessonViewProps {
  modulo: CursoModuloData;
  moduloIndex: number;
  aulaIndex: number;
  assetPair?: CursoAssetPair;
  isComplete: (mi: number, ai: number) => boolean;
  toggle: (mi: number, ai: number) => void;
  storageKey: string;
  onBack: () => void;
  onNavigate: (ai: number) => void;
}

export function CursoLessonView({
  modulo,
  moduloIndex,
  aulaIndex,
  assetPair,
  isComplete,
  toggle,
  storageKey,
  onBack,
  onNavigate,
}: CursoLessonViewProps) {
  const aula = modulo.aulas[aulaIndex];
  const complete = isComplete(moduloIndex, aulaIndex);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{modulo.titulo}</p>
            <h2 className="text-base font-bold truncate">{aula.titulo}</h2>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {aula.duracaoMinutos} min
          </span>
        </div>

        {/* Hero Card */}
        {assetPair && (
          <AulaHeroCard
            image={assetPair.image}
            video={assetPair.video}
            title={aula.titulo}
            description={aula.descricao}
          />
        )}

        {/* Narration */}
        <div className="mb-4">
          <NarracaoPlayer texto={aula.conteudo} titulo={aula.titulo} />
        </div>

        {/* Content */}
        <Card className="p-4 mb-4">{renderCursoContent(aula.conteudo)}</Card>

        {/* Checklist */}
        {aula.checklist && (
          <div className="mb-4">
            <ChecklistSection
              items={aula.checklist}
              persistKey={`${storageKey}_checklist_${moduloIndex}_${aulaIndex}`}
            />
          </div>
        )}

        {/* Quiz */}
        {aula.quiz && (
          <div className="mb-4">
            <QuizSection quiz={aula.quiz} />
          </div>
        )}

        {/* Complete button */}
        <Button
          onClick={() => toggle(moduloIndex, aulaIndex)}
          variant={complete ? "default" : "outline"}
          className="w-full gap-2"
        >
          {complete ? (
            <CheckCircle2 size={18} />
          ) : (
            <Circle size={18} />
          )}
          {complete ? "Aula concluída ✓" : "Marcar como concluída"}
        </Button>
      </motion.div>

      {/* Prev/Next navigation */}
      <div className="flex gap-2 mt-4">
        {aulaIndex > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate(aulaIndex - 1)}
            className="flex-1"
          >
            ← Anterior
          </Button>
        )}
        {aulaIndex < modulo.aulas.length - 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate(aulaIndex + 1)}
            className="flex-1"
          >
            Próxima →
          </Button>
        )}
      </div>
    </div>
  );
}
