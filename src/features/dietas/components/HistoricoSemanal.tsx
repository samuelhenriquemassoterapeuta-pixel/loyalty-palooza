import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Droplets, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDiarioAlimentar } from "@/features/dietas/hooks/useDietas";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const HistoricoSemanal = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  // Calculate week dates
  const weekDates = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  }, [weekOffset]);

  const weekLabel = useMemo(() => {
    const start = new Date(weekDates[0]);
    const end = new Date(weekDates[6]);
    const fmt = (d: Date) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
    return `${fmt(start)} — ${fmt(end)}`;
  }, [weekDates]);

  // Get entries for the whole week (no date filter = all recent)
  const { entries } = useDiarioAlimentar();

  // Group entries by date
  const entriesByDate = useMemo(() => {
    const map: Record<string, { count: number; agua: number }> = {};
    entries.forEach((e) => {
      const date = typeof e.data === "string" ? e.data : "";
      if (!map[date]) map[date] = { count: 0, agua: 0 };
      map[date].count++;
      map[date].agua += e.agua_ml ?? 0;
    });
    return map;
  }, [entries]);

  const isToday = (dateStr: string) => dateStr === new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl border glass-card-strong p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          <p className="text-sm font-semibold text-foreground">Histórico Semanal</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setWeekOffset((p) => p - 1)}>
            <ChevronLeft size={14} />
          </Button>
          <span className="text-[10px] text-muted-foreground min-w-[100px] text-center">{weekLabel}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setWeekOffset((p) => Math.min(p + 1, 0))}
            disabled={weekOffset >= 0}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {weekDates.map((date, i) => {
          const dayData = entriesByDate[date];
          const hasEntries = dayData && dayData.count > 0;
          const aguaPct = dayData ? Math.min((dayData.agua / 2000) * 100, 100) : 0;
          const today = isToday(date);

          return (
            <div key={date} className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-muted-foreground">{DIAS_SEMANA[i]}</span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition-colors ${
                  today
                    ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                    : ""
                } ${
                  hasEntries
                    ? "bg-primary/15 text-primary"
                    : "bg-muted/30 text-muted-foreground"
                }`}
              >
                {new Date(date + "T12:00:00").getDate()}
              </div>
              {/* Mini water indicator */}
              <div className="w-6 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-info rounded-full transition-all"
                  style={{ width: `${aguaPct}%` }}
                />
              </div>
              {hasEntries && (
                <span className="text-[8px] text-muted-foreground">{dayData.count}r</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-1">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-primary/15" />
          <span className="text-[9px] text-muted-foreground">Com registro</span>
        </div>
        <div className="flex items-center gap-1">
          <Droplets size={10} className="text-info" />
          <span className="text-[9px] text-muted-foreground">Água</span>
        </div>
      </div>
    </div>
  );
};
