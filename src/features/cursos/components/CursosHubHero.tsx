import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Clock,
  PlayCircle,
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
    <div
      className="relative w-full cursor-pointer"
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Fullwidth image with heavy overlay */}
      <div className="relative w-full overflow-hidden">
        <img
          src={capaCursosHub}
          alt="Academia Resinkra"
          className="w-full h-56 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Centered content over image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-white/20">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Academia Resinkra
            </h1>
            <p className="text-xs text-white/70 mt-1">
              Formação completa em bem-estar e massoterapia
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats row below image */}
      <div className="bg-background border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              <BookOpen size={10} /> {totalCursos} Cursos
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              <PlayCircle size={10} /> {totalAulas} Aulas
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              <Clock size={10} /> {totalHoras}h+
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-accent/50 text-accent-foreground px-2 py-0.5 rounded-full">
              <Award size={11} /> Certificados
            </span>
            {started && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {overallPct}%{overallPct === 100 && " 🏆"}
              </span>
            )}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-1 rounded-full bg-muted/50"
            >
              <ChevronDown size={14} className="text-muted-foreground" />
            </motion.div>
          </div>

          {/* Expandable progress */}
          <AnimatePresence>
            {expanded && started && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-3 rounded-xl border border-primary/20 bg-primary/5">
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
