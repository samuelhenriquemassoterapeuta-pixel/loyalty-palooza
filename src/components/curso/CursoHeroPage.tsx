import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Layers,
  PlayCircle,
  ChevronRight,
  Trophy,
  HelpCircle,
  ClipboardCheck,
  Award,
  Lightbulb,
  Heart,
  Package,
  Target,
  MessageCircle,
  BarChart3,
  GraduationCap,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/AppLayout";
import { AppCollapsibleSection } from "@/components/AppCollapsibleSection";
import { LazyVideo } from "@/components/curso/LazyVideo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCursoProgress } from "@/hooks/useCursoProgress";
import type { CursoModuloData } from "@/components/curso/CursoShell";

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

interface CursoHeroPageProps {
  storageKey: string;
  modulos: CursoModuloData[];
  courseTitle: string;
  courseSubtitle: string;
  courseIcon: React.ReactNode;
  coverImage: string;
  coverVideo: string;
  courseRoute: string;
  level?: string;
  description?: string;
  embedded?: boolean;
}

export function CursoHeroPage({
  storageKey,
  modulos,
  courseTitle,
  courseSubtitle,
  courseIcon,
  coverImage,
  coverVideo,
  courseRoute,
  level = "Todos os níveis",
  description,
  embedded = false,
}: CursoHeroPageProps) {
  const navigate = useNavigate();

  const totalAulas = modulos.reduce((acc, m) => acc + m.aulas.length, 0);
  const totalMinutos = modulos.reduce(
    (acc, m) => acc + m.aulas.reduce((a, aula) => a + aula.duracaoMinutos, 0),
    0
  );
  const totalHoras = Math.floor(totalMinutos / 60);
  const minutosRestantes = totalMinutos % 60;
  const totalModulos = modulos.length;

  const hasQuiz = modulos.some((m) => m.aulas.some((a) => a.quiz && a.quiz.length > 0));
  const hasChecklist = modulos.some((m) => m.aulas.some((a) => a.checklist && a.checklist.length > 0));
  const totalQuizzes = modulos.reduce(
    (acc, m) => acc + m.aulas.filter((a) => a.quiz && a.quiz.length > 0).length,
    0
  );

  const { completedCount, pct, moduloAulasCompleted, isComplete } = useCursoProgress(storageKey, totalAulas);
  const started = completedCount > 0;

  // Find next incomplete lesson using the hook instead of re-parsing localStorage
  let nextLesson: { modulo: number; aula: number; titulo: string } | null = null;
  if (started && pct < 100) {
    for (let mi = 0; mi < modulos.length && !nextLesson; mi++) {
      for (let ai = 0; ai < modulos[mi].aulas.length && !nextLesson; ai++) {
        if (!isComplete(mi, ai)) {
          nextLesson = { modulo: mi, aula: ai, titulo: modulos[mi].aulas[ai].titulo };
        }
      }
    }
  }

  const durationLabel = totalHoras > 0
    ? `${totalHoras}h${minutosRestantes > 0 ? `${minutosRestantes}min` : ""}`
    : `${minutosRestantes}min`;

  const Wrapper = embedded ? ({ children }: { children: React.ReactNode }) => <>{children}</> : AppLayout;

  return (
    <Wrapper>
      <div className={`min-h-screen bg-background ${embedded ? "pb-8" : "pb-32 lg:pb-8"}`}>
        {/* Hero Cover */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={coverImage}
            alt={courseTitle}
            className="w-full h-full object-cover"
          />
          <video
            src={coverVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

          {/* Back button */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="bg-background/50 backdrop-blur-sm"
            >
              <ArrowLeft size={20} />
            </Button>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 -mt-16 relative z-10">
          {/* Title Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 mb-4 bg-card/95 backdrop-blur-md border-border/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  {courseIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-bold text-foreground">{courseTitle}</h1>
                  <p className="text-sm text-muted-foreground">{courseSubtitle}</p>
                </div>
              </div>

              {description && (
                <p className="text-sm text-muted-foreground mb-3">{description}</p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {hasQuiz && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    <HelpCircle size={12} /> {totalQuizzes} Quizzes
                  </span>
                )}
                {hasChecklist && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                    <ClipboardCheck size={12} /> Checklists
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  <Award size={12} /> {level}
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card className="p-3 text-center">
                <Clock size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-lg font-bold text-foreground">{durationLabel}</p>
                <p className="text-[10px] text-muted-foreground">Duração</p>
              </Card>
              <Card className="p-3 text-center">
                <PlayCircle size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-lg font-bold text-foreground">{totalAulas}</p>
                <p className="text-[10px] text-muted-foreground">Aulas</p>
              </Card>
              <Card className="p-3 text-center">
                <Layers size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-lg font-bold text-foreground">{totalModulos}</p>
                <p className="text-[10px] text-muted-foreground">Módulos</p>
              </Card>
            </div>
          </motion.div>

          {/* Progress (if started) */}
          {started && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="p-4 mb-4 border-primary/20 bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Seu Progresso</span>
                  <span className="text-sm font-bold text-primary">{pct}%</span>
                </div>
                <Progress value={pct} className="h-2.5 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {completedCount} de {totalAulas} aulas concluídas
                  {pct === 100 && " 🏆"}
                </p>
              </Card>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => navigate(courseRoute)}
              className="w-full gap-2 h-12 text-base font-semibold mb-6"
              size="lg"
            >
              {pct === 100 ? (
                <>
                  <Trophy size={20} /> Revisar Curso
                </>
              ) : started ? (
                <>
                  <PlayCircle size={20} /> Continuar Curso
                </>
              ) : (
                <>
                  <PlayCircle size={20} /> Começar Curso
                </>
              )}
            </Button>
            {nextLesson && (
              <p className="text-xs text-muted-foreground text-center -mt-4 mb-6">
                Próxima: {nextLesson.titulo}
              </p>
            )}
          </motion.div>

          {/* Curriculum Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <AppCollapsibleSection title="Grade Curricular" icon={BookOpen} badge={`${totalModulos} módulos`}>
          <Accordion type="multiple" className="space-y-4">
              {(["iniciante", "intermediario", "avancado"] as const).map((nivel) => {
                const levelModulos = modulos
                  .map((m, mi) => ({ ...m, originalIndex: mi }))
                  .filter((m) => (m.nivel ?? "iniciante") === nivel);
                if (levelModulos.length === 0) return null;

                const nivelLabels: Record<string, string> = {
                  iniciante: "🟢 Iniciante",
                  intermediario: "🟡 Intermediário",
                  avancado: "🔴 Avançado",
                };

                // Check if level is unlocked
                const isLevelUnlocked = (): boolean => {
                  if (nivel === "iniciante") return true;
                  const prevLevel = nivel === "avancado" ? "intermediario" : "iniciante";
                  return modulos.every((m, mi) => {
                    if ((m.nivel ?? "iniciante") !== prevLevel) return true;
                    return moduloAulasCompleted(mi, m.aulas.length) === m.aulas.length;
                  });
                };
                const unlocked = isLevelUnlocked();

                return (
                  <div key={nivel} className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold">{nivelLabels[nivel]}</span>
                      {!unlocked && <Lock size={12} className="text-muted-foreground" />}
                    </div>
                    {levelModulos.map((modulo) => {
                      const mi = modulo.originalIndex;
                const Icon = iconMap[modulo.icone] || BookOpen;
                const done = moduloAulasCompleted(mi, modulo.aulas.length);
                const total = modulo.aulas.length;
                const modMinutos = modulo.aulas.reduce((a, l) => a + l.duracaoMinutos, 0);

                return (
                      <AccordionItem key={mi} value={`modulo-${mi}`} className={`border rounded-lg overflow-hidden ${!unlocked ? "opacity-50 grayscale" : ""}`} disabled={!unlocked}>
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3 text-left flex-1">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              {!unlocked ? (
                                <Lock size={16} className="text-muted-foreground" />
                              ) : done === total ? (
                            <Trophy size={16} className="text-primary" />
                          ) : (
                            <Icon size={16} className="text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-snug">{modulo.titulo}</p>
                          <p className="text-[11px] text-muted-foreground">
                                {total} aulas · {modMinutos}min{unlocked ? ` · ${done}/${total} concluídas` : " · Bloqueado"}
                          </p>
                              {unlocked && done > 0 && done < total && (
                            <Progress value={(done / total) * 100} className="h-1 mt-1.5" />
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                        {unlocked && (
                    <AccordionContent className="px-4 pb-3">
                      <div className="space-y-2">
                        {modulo.aulas.map((aula, ai) => {
                          const aulaComplete = isComplete(mi, ai);

                          return (
                            <div
                              key={ai}
                              className="flex items-start gap-2 text-sm"
                            >
                              {aulaComplete ? (
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-[10px] text-primary">✓</span>
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-[10px] text-muted-foreground">{ai + 1}</span>
                                </div>
                              )}
                              <span className={`flex-1 min-w-0 leading-snug ${aulaComplete ? "text-muted-foreground" : "text-foreground"}`}>
                                {aula.titulo}
                              </span>
                              <div className="flex items-center gap-1 shrink-0 mt-0.5">
                                {aula.quiz && <HelpCircle size={10} className="text-primary" />}
                                {aula.checklist && <ClipboardCheck size={10} className="text-accent-foreground" />}
                              </div>
                              <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                                {aula.duracaoMinutos}min
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                        )}
                  </AccordionItem>
                );
              })}
                  </div>
                );
              })}
            </Accordion>
            </AppCollapsibleSection>
          </motion.div>
        </div>
      </div>
    </Wrapper>
  );
}
