import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Trophy,
  Lightbulb,
  Heart,
  Package,
  Target,
  MessageCircle,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/AppLayout";
import { LazyVideo } from "@/components/curso/LazyVideo";
import { CursoModuleView } from "@/components/curso/CursoModuleView";
import { CursoLessonView } from "@/components/curso/CursoLessonView";
import { useCursoProgress } from "@/hooks/useCursoProgress";
import type { QuizQuestion } from "@/components/curso/QuizSection";

const iconMap: Record<string, React.ElementType> = {
  Lightbulb,
  Heart,
  Package,
  Target,
  MessageCircle,
  BarChart3,
  BookOpen,
  GraduationCap,
};

export interface CursoAulaData {
  titulo: string;
  descricao: string;
  conteudo: string;
  duracaoMinutos: number;
  quiz?: QuizQuestion[];
  checklist?: string[];
}

export interface CursoModuloData {
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
  aulas: CursoAulaData[];
}

export interface CursoAssetPair {
  image: string;
  video: string;
}

interface CursoShellProps {
  embedded?: boolean;
  storageKey: string;
  modulos: CursoModuloData[];
  assets: Record<string, CursoAssetPair>;
  courseTitle: string;
  courseSubtitle: string;
  courseIcon: React.ReactNode;
  coverImage: string;
  coverVideo: string;
  completionMessage?: string;
}

/**
 * Unified course shell that handles 3-level navigation:
 * 1. Main view (module list with progress)
 * 2. Module view (lesson list) — CursoModuleView
 * 3. Lesson view (content, narration, quiz, checklist) — CursoLessonView
 */
export function CursoShell({
  embedded = false,
  storageKey,
  modulos,
  assets,
  courseTitle,
  courseSubtitle,
  courseIcon,
  coverImage,
  coverVideo,
  completionMessage,
}: CursoShellProps) {
  const Wrapper = embedded
    ? ({ children }: { children: React.ReactNode }) => <>{children}</>
    : AppLayout;
  const navigate = useNavigate();
  const [selectedModulo, setSelectedModulo] = useState<number | null>(null);
  const [selectedAula, setSelectedAula] = useState<number | null>(null);

  const totalAulas = modulos.reduce((acc, m) => acc + m.aulas.length, 0);
  const totalMinutos = modulos.reduce((acc, m) => acc + m.aulas.reduce((a, aula) => a + aula.duracaoMinutos, 0), 0);
  const totalHoras = Math.floor(totalMinutos / 60);
  const minutosRestantes = totalMinutos % 60;
  const { isComplete, toggle, completedCount, pct, moduloAulasCompleted } =
    useCursoProgress(storageKey, totalAulas);

  // ─── Lesson View ───
  if (selectedModulo !== null && selectedAula !== null) {
    const modulo = modulos[selectedModulo];
    const assetPair = assets[`${selectedModulo}-${selectedAula}`];

    return (
      <Wrapper>
        <div className={`min-h-screen bg-background ${embedded ? "" : "pb-32 lg:pb-8"}`}>
          <CursoLessonView
            modulo={modulo}
            moduloIndex={selectedModulo}
            aulaIndex={selectedAula}
            assetPair={assetPair}
            isComplete={isComplete}
            toggle={toggle}
            storageKey={storageKey}
            onBack={() => setSelectedAula(null)}
            onNavigate={setSelectedAula}
          />
        </div>
      </Wrapper>
    );
  }

  // ─── Module View (lesson list) ───
  if (selectedModulo !== null) {
    return (
      <Wrapper>
        <div className={`min-h-screen bg-background ${embedded ? "" : "pb-32 lg:pb-8"}`}>
          <CursoModuleView
            modulo={modulos[selectedModulo]}
            moduloIndex={selectedModulo}
            isComplete={isComplete}
            moduloAulasCompleted={moduloAulasCompleted}
            onBack={() => setSelectedModulo(null)}
            onSelectAula={setSelectedAula}
          />
        </div>
      </Wrapper>
    );
  }

  // ─── Main View (module list) ───
  return (
    <Wrapper>
      <div className={`min-h-screen bg-background ${embedded ? "" : "pb-32 lg:pb-8"}`}>
        {/* Cover */}
        <div className="relative w-full h-48 overflow-hidden">
          <img src={coverImage} alt={courseTitle} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <LazyVideo
            src={coverVideo}
            className="absolute inset-0 w-full h-full opacity-30 mix-blend-luminosity"
          />
        </div>

        {/* Header + Progress */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 -mt-12 safe-top">
          <div className="max-w-lg mx-auto relative z-10">
            {!embedded && (
              <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                  <ArrowLeft size={20} />
                </Button>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                    {courseIcon}
                    {courseTitle}
                  </h1>
                  <p className="text-sm text-muted-foreground">{courseSubtitle}</p>
                </div>
              </div>
            )}
            <Card className="p-4 bg-card/80 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Seu Progresso</span>
                <span className="text-sm font-bold text-primary">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2.5 mb-2" />
              <p className="text-xs text-muted-foreground">
                {completedCount} de {totalAulas} aulas concluídas · {totalHoras > 0 ? `${totalHoras}h` : ""}{minutosRestantes > 0 ? `${minutosRestantes}min` : ""} de conteúdo
                {pct === 100 && " 🏆 Parabéns!"}
              </p>
            </Card>
          </div>
        </div>

        {/* Module cards */}
        <div className="max-w-lg mx-auto px-4 py-6 space-y-3">
          {modulos.map((modulo, mi) => {
            const Icon = iconMap[modulo.icone] || BookOpen;
            const done = moduloAulasCompleted(mi, modulo.aulas.length);
            const total = modulo.aulas.length;
            const modPct = Math.round((done / total) * 100);

            return (
              <motion.div
                key={mi}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mi * 0.06 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg bg-gradient-to-br ${modulo.cor} border-border/50`}
                  onClick={() => setSelectedModulo(mi)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center shrink-0">
                      {modPct === 100 ? (
                        <Trophy size={20} className="text-primary" />
                      ) : (
                        <Icon size={20} className="text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold">{modulo.titulo}</h3>
                        <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{modulo.descricao}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={modPct} className="h-1.5 flex-1" />
                        <span className="text-[10px] text-muted-foreground">
                          {done}/{total}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {pct === 100 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <Trophy size={48} className="text-primary mx-auto mb-3" />
                <h2 className="text-lg font-bold">Curso Completo! 🏆</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {completionMessage ||
                    `Parabéns! Você concluiu todas as aulas do curso ${courseTitle}.`}
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
