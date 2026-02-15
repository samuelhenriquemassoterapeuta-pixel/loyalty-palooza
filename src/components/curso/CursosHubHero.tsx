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
    <div className="relative w-full">
      {/* Fullwidth banner with overlay content */}
      <div className="relative w-full min-h-[220px] overflow-hidden">
        <img
          src={capaCursosHub}
          alt="Academia Resinkra"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-background" />

        {/* Content over image */}
        <div className="relative z-10 max-w-lg mx-auto px-5 pt-8 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title row - tap to expand */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full flex items-center gap-3 text-left"
            >
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/20">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Academia Resinkra
                </h1>
                <p className="text-[11px] text-white/70 mt-0.5">
                  Formação completa em bem-estar e massoterapia
                </p>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="p-1.5 rounded-full bg-white/10"
              >
                <ChevronDown size={16} className="text-white/80" />
              </motion.div>
            </button>

            {/* Inline stat pills - always visible */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/10">
                <BookOpen size={11} /> {totalCursos} Cursos
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/10">
                <PlayCircle size={11} /> {totalAulas} Aulas
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/10">
                <Clock size={11} /> {totalHoras}h+
              </span>
              {started && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary/80 text-primary-foreground px-2.5 py-1 rounded-full">
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
                      <div className="text-center p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                        <Clock size={16} className="mx-auto mb-1 text-white/90" />
                        <p className="text-sm font-bold text-white">{totalHoras}h+</p>
                        <p className="text-[10px] text-white/60">Conteúdo</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                        <PlayCircle size={16} className="mx-auto mb-1 text-white/90" />
                        <p className="text-sm font-bold text-white">{totalAulas}</p>
                        <p className="text-[10px] text-white/60">Aulas</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                        <Layers size={16} className="mx-auto mb-1 text-white/90" />
                        <p className="text-sm font-bold text-white">{totalCursos}</p>
                        <p className="text-[10px] text-white/60">Cursos</p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-white/10 text-white/80 px-2 py-1 rounded-full">
                        <Award size={11} /> Certificados inclusos
                      </span>
                    </div>

                    {/* Progress bar */}
                    {started && (
                      <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-medium text-white/80">Progresso Geral</span>
                          <span className="text-[11px] font-bold text-white">
                            {overallPct}%{overallPct === 100 && " 🏆"}
                          </span>
                        </div>
                        <Progress value={overallPct} className="h-1.5" />
                        <p className="text-[10px] text-white/50 mt-1">
                          {completedTotal} de {totalAulas} aulas concluídas
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
