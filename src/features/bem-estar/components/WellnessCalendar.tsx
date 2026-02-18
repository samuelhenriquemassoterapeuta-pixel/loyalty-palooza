import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, subMonths, addMonths, isSameMonth, isToday, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

const WellnessCalendar = () => {
  const { user } = useAuth();
  const [month, setMonth] = useState(new Date());

  const start = startOfMonth(month);
  const end = endOfMonth(month);

  const { data: checkins } = useQuery({
    queryKey: ["wellness-calendar", user?.id, format(start, "yyyy-MM")],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_checkins")
        .select("data, humor")
        .eq("user_id", user!.id)
        .gte("data", format(start, "yyyy-MM-dd"))
        .lte("data", format(end, "yyyy-MM-dd"));
      return data || [];
    },
  });

  const checkinMap = new Map((checkins || []).map(c => [c.data, c.humor]));
  const days = eachDayOfInterval({ start, end });
  const startPad = getDay(start); // 0=Sun

  const totalDays = days.filter(d => !isFuture(d)).length;
  const checkedDays = checkins?.length || 0;
  const pct = totalDays > 0 ? Math.round((checkedDays / totalDays) * 100) : 0;

  const canGoNext = !isSameMonth(month, new Date());

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <button onClick={() => setMonth(m => subMonths(m, 1))} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft size={14} className="text-muted-foreground" />
          </button>
          <p className="text-xs font-medium text-muted-foreground capitalize">
            {format(month, "MMMM yyyy", { locale: ptBR })}
          </p>
          <button
            onClick={() => setMonth(m => addMonths(m, 1))}
            disabled={!canGoNext}
            className="p-1 rounded-lg hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground">
          {checkedDays}/{totalDays} dias ({pct}%)
        </p>
      </div>

      {/* Calendar grid */}
      <div className="glass-card rounded-xl p-3">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="text-[9px] text-muted-foreground text-center font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startPad }).map((_, i) => (
            <div key={`pad-${i}`} className="aspect-square" />
          ))}
          {days.map(day => {
            const dateStr = format(day, "yyyy-MM-dd");
            const humor = checkinMap.get(dateStr);
            const future = isFuture(day);
            const today = isToday(day);

            let bg = "bg-muted/30";
            if (humor != null) {
              if (humor >= 4) bg = "bg-primary/60";
              else if (humor >= 3) bg = "bg-primary/30";
              else bg = "bg-amber-500/30";
            }

            return (
              <div
                key={dateStr}
                className={`aspect-square rounded-md flex items-center justify-center text-[10px] transition-all ${
                  future ? "opacity-20" : ""
                } ${bg} ${today ? "ring-1 ring-primary/50" : ""}`}
                title={humor != null ? `Humor: ${humor}/5` : "Sem check-in"}
              >
                <span className={`${humor != null ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {format(day, "d")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-muted/30" />
            <span className="text-[9px] text-muted-foreground">Sem</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-amber-500/30" />
            <span className="text-[9px] text-muted-foreground">1-2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/30" />
            <span className="text-[9px] text-muted-foreground">3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/60" />
            <span className="text-[9px] text-muted-foreground">4-5</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessCalendar;
