import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Clock,
  PlayCircle,
  Layers,
  ChevronDown,
  BookOpen,
  Award,
} from "lucide-react";
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

  const totalCursos = courses.length;
  const totalAulas = courses.reduce((a, c) => a + c.totalAulas, 0);
  const totalMinutos = courses.reduce((a, c) => a + c.totalMinutos, 0);
  const totalHoras = Math.floor(totalMinutos / 60);

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
      {/* Banner image */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={capaCursosHub}
          alt="Academia Resinkra"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/20" />
      </div>

      {/* Glass card overlapping banner */}
      <div className="max-w-lg mx-auto px-4 -mt-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div
            className="p-4 rounded-2xl bg-card/60 backdrop-blur-xl border border-white/15 shadow-xl cursor-pointer"
            onClick={() => setExpanded((v) => !v)}
          >
            {/* Title row */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-primary/20">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-foreground tracking-tight">
                  Academia Resinkra
                </h1>
                <p className="text-[11px] text-muted-foreground">
                  Formação completa em bem-estar e massoterapia
                </p>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="p-1.5 rounded-full bg-muted/50"
              >
                <ChevronDown size={16} className="text-muted-foreground" />
              </motion.div>
            </div>

            {/* Stat pills - always visible */}
            <div className="flex items-center gap-1.5 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                <BookOpen size={10} /> {totalCursos} Cursos
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                <PlayCircle size={10} /> {totalAulas} Aulas
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                <Clock size={10} /> {totalHoras}h+
              </span>
              {started && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {overallPct}%{overallPct === 100 && " 🏆"}
                </span>
              )}
            </div>

            {/* Expandable details */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3">
                    {/* Metrics grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <Clock size={16} className="mx-auto mb-1 text-primary" />
                        <p className="text-sm font-bold text-foreground">{totalHoras}h+</p>
                        <p className="text-[10px] text-muted-foreground">Conteúdo</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <PlayCircle size={16} className="mx-auto mb-1 text-primary" />
                        <p className="text-sm font-bold text-foreground">{totalAulas}</p>
                        <p className="text-[10px] text-muted-foreground">Aulas</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <Layers size={16} className="mx-auto mb-1 text-primary" />
                        <p className="text-sm font-bold text-foreground">{totalCursos}</p>
                        <p className="text-[10px] text-muted-foreground">Cursos</p>
                      </div>
                    </div>

                    {/* Certificate badge */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-accent/50 text-accent-foreground px-2.5 py-1 rounded-full">
                      <Award size={11} /> Certificados inclusos
                    </span>

                    {/* Progress */}
                    {started && (
                      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-medium text-foreground">Progresso Geral</span>
                          <span className="text-[11px] font-bold text-primary">
                            {overallPct}%{overallPct === 100 && " 🏆"}
                          </span>
                        </div>
                        <Progress value={overallPct} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {completedTotal} de {totalAulas} aulas concluídas
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
