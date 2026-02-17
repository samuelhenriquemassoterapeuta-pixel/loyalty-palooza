import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  Trophy,
  HelpCircle,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CursoModuloData } from "@/features/cursos/components/CursoShell";

const iconMap: Record<string, React.ElementType> = {
  Lightbulb: () => null, // will be replaced below
};

// Lazy import icon map to avoid circular deps
import {
  Lightbulb,
  Heart,
  Package,
  Target,
  MessageCircle,
  BarChart3,
  GraduationCap,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Lightbulb,
  Heart,
  Package,
  Target,
  MessageCircle,
  BarChart3,
  BookOpen,
  GraduationCap,
};

interface CursoModuleViewProps {
  modulo: CursoModuloData;
  moduloIndex: number;
  isComplete: (mi: number, ai: number) => boolean;
  moduloAulasCompleted: (mi: number, count: number) => number;
  onBack: () => void;
  onSelectAula: (ai: number) => void;
}

export function CursoModuleView({
  modulo,
  moduloIndex,
  isComplete,
  moduloAulasCompleted,
  onBack,
  onSelectAula,
}: CursoModuleViewProps) {
  const Icon = ICON_MAP[modulo.icone] || BookOpen;
  const done = moduloAulasCompleted(moduloIndex, modulo.aulas.length);

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
            <Icon size={24} className="text-primary" />
            <div className="flex-1">
              <h1 className="text-lg font-bold">{modulo.titulo}</h1>
              <p className="text-xs text-muted-foreground">
                {modulo.aulas.length} aulas · {done}/{modulo.aulas.length} concluídas
              </p>
            </div>
          </div>
          <Progress
            value={(done / modulo.aulas.length) * 100}
            className="h-2"
          />
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {modulo.aulas.map((aula, ai) => {
          const aulaComplete = isComplete(moduloIndex, ai);
          return (
            <motion.div
              key={ai}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ai * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  aulaComplete ? "border-primary/30 bg-primary/5" : ""
                }`}
                onClick={() => onSelectAula(ai)}
              >
                <div className="flex items-center gap-3">
                  {aulaComplete ? (
                    <CheckCircle2 size={20} className="text-primary shrink-0" />
                  ) : (
                    <Circle size={20} className="text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold">{aula.titulo}</h3>
                    <p className="text-xs text-muted-foreground truncate">{aula.descricao}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {aula.quiz && <HelpCircle size={12} className="text-primary" />}
                    {aula.checklist && (
                      <ClipboardCheck size={12} className="text-accent-foreground" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {aula.duracaoMinutos}min
                  </span>
                  <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
