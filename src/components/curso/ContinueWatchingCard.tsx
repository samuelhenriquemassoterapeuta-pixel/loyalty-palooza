import { Play, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface CourseProgress {
  title: string;
  storageKey: string;
  totalAulas: number;
  tabValue: string;
}

interface ContinueWatchingCardProps {
  courses: CourseProgress[];
  onSelect: (tab: string) => void;
}

function getCourseProgress(storageKey: string): number {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as string[]).length : 0;
  } catch {
    return 0;
  }
}

export function ContinueWatchingCard({ courses, onSelect }: ContinueWatchingCardProps) {
  // Find the in-progress course with highest completion (but not 100%)
  const inProgress = courses
    .map((c) => ({
      ...c,
      completed: getCourseProgress(c.storageKey),
      pct: c.totalAulas > 0 ? Math.round((getCourseProgress(c.storageKey) / c.totalAulas) * 100) : 0,
    }))
    .filter((c) => c.completed > 0 && c.pct < 100)
    .sort((a, b) => b.pct - a.pct);

  if (inProgress.length === 0) return null;

  const course = inProgress[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card
        className="p-3 bg-card/95 backdrop-blur-md border-border/50 cursor-pointer hover-lift"
        onClick={() => onSelect(course.tabValue)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
            <Play size={16} className="text-info ml-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Continuar assistindo
            </p>
            <p className="text-sm font-semibold text-foreground truncate">{course.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={course.pct} className="h-1 flex-1" />
              <span className="text-[10px] font-bold text-info shrink-0">{course.pct}%</span>
            </div>
          </div>
          <ChevronRight size={16} className="text-muted-foreground shrink-0" />
        </div>
      </Card>
    </motion.div>
  );
}
