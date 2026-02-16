import { useState } from "react";
import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusColors: Record<string, string> = {
  planned: "bg-blue-500",
  created: "bg-violet-500",
  published: "bg-emerald-500",
  cancelled: "bg-gray-500",
};

const ResinkraAICalendar = () => {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });
  const startDay = start.getDay();

  const { data: events = [] } = useQuery({
    queryKey: ["calendar-events", user?.id, format(currentMonth, "yyyy-MM")],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("calendar_events")
        .select("*")
        .eq("user_id", user!.id)
        .gte("scheduled_date", format(start, "yyyy-MM-dd"))
        .lte("scheduled_date", format(end, "yyyy-MM-dd"))
        .order("scheduled_date");
      return data || [];
    },
  });

  const getEventsForDay = (day: Date) =>
    events.filter((e: any) => isSameDay(new Date(e.scheduled_date + "T12:00:00"), day));

  return (
    <ResinkraAILayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-violet-400" /> Calendário
          </h1>
          <Button className="bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm">
            <Plus className="w-4 h-4 mr-1" /> Agendar
          </Button>
        </div>

        {/* Month Nav */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-gray-400 hover:text-white hover:bg-white/5">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold text-white capitalize">
            {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-gray-400 hover:text-white hover:bg-white/5">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-7">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
              <div key={d} className="p-2 text-center text-xs font-medium text-gray-500 border-b border-white/10">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[80px] sm:min-h-[100px] border-b border-r border-white/5" />
            ))}
            {days.map(day => {
              const dayEvents = getEventsForDay(day);
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "min-h-[80px] sm:min-h-[100px] p-1.5 border-b border-r border-white/5 relative",
                    isToday(day) && "bg-violet-500/5",
                    !isSameMonth(day, currentMonth) && "opacity-30"
                  )}
                >
                  <span className={cn(
                    "text-xs font-medium",
                    isToday(day) ? "text-violet-400" : "text-gray-400"
                  )}>
                    {format(day, "d")}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((event: any) => (
                      <div
                        key={event.id}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 truncate cursor-pointer hover:bg-violet-500/30"
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-gray-500">+{dayEvents.length - 2} mais</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-gray-400">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              {status === "planned" ? "Planejado" : status === "created" ? "Criado" : status === "published" ? "Publicado" : "Cancelado"}
            </div>
          ))}
        </div>
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAICalendar;
