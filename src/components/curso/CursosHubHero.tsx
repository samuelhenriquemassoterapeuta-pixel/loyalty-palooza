import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Clock,
  PlayCircle,
  Layers,
  Trophy,
  ChevronDown,
  BookOpen,
  Award,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import capaCursosHub from "@/assets/cursos/capa-cursos-hub.jpg";

interface CourseStats {
  title: string;
  storageKey: string;
  totalAulas: number;
  totalMinutos: number;
  totalModulos: number;
}

interface CursosHubHeroProps {
  courses: CourseStats[];
}

export function CursosHubHero({ courses }: CursosHubHeroProps) {
  const [expanded, setExpanded] = useState(false);

  // Aggregate stats
  const totalCursos = courses.length;
  const totalAulas = courses.reduce((a, c) => a + c.totalAulas, 0);
  const totalMinutos = courses.reduce((a, c) => a + c.totalMinutos, 0);
  const totalHoras = Math.floor(totalMinutos / 60);

  // Aggregate progress from localStorage
  const completedTotal = courses.reduce((acc, course) => {
    try {
      const saved = localStorage.getItem(course.storageKey);
      return acc + (saved ? (JSON.parse(saved) as string[]).length : 0);
    } catch {
      return acc;
    }
  }, 0);

  const overallPct = totalAulas > 0 ? Math.round((completedTotal / totalAulas) * 100) : 0;
  const started = completedTotal > 0;

  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={capaCursosHub}
          alt="Academia Resinkra"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Collapsible content area */}
      <div className="max-w-lg mx-auto px-4 -mt-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* Title trigger */}
          <Card
            className="p-4 bg-card/95 backdrop-blur-md border-border/50 cursor-pointer"
            onClick={() => setExpanded((v) => !v)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <GraduationCap size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-foreground">Academia Resinkra</h1>
                <p className="text-xs text-muted-foreground">
                  Formação completa em bem-estar e massoterapia
                </p>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-muted-foreground" />
              </motion.div>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-3 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <BookOpen size={12} /> {totalCursos} Cursos
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                      <PlayCircle size={12} /> {totalAulas} Aulas
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted text-muted-foreground px-2 py-1 rounded-full">
                      <Award size={12} /> Certificados
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Clock size={16} className="mx-auto mb-0.5 text-primary" />
                      <p className="text-sm font-bold text-foreground">{totalHoras}h+</p>
                      <p className="text-[10px] text-muted-foreground">Conteúdo</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <PlayCircle size={16} className="mx-auto mb-0.5 text-primary" />
                      <p className="text-sm font-bold text-foreground">{totalAulas}</p>
                      <p className="text-[10px] text-muted-foreground">Aulas</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Layers size={16} className="mx-auto mb-0.5 text-primary" />
                      <p className="text-sm font-bold text-foreground">{totalCursos}</p>
                      <p className="text-[10px] text-muted-foreground">Cursos</p>
                    </div>
                  </div>

                  {/* Progress */}
                  {started && (
                    <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium">Progresso Geral</span>
                        <span className="text-xs font-bold text-primary">
                          {overallPct}%
                          {overallPct === 100 && " 🏆"}
                        </span>
                      </div>
                      <Progress value={overallPct} className="h-2" />
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {completedTotal} de {totalAulas} aulas concluídas
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
