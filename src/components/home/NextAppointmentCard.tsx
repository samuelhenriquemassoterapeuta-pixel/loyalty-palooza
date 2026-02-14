import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import type { Agendamento } from "@/hooks/useAgendamentos";

interface NextAppointmentCardProps {
  agendamento: Agendamento | null;
}

export const NextAppointmentCard = ({ agendamento }: NextAppointmentCardProps) => {
  const navigate = useNavigate();

  if (!agendamento) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/agendamento")}
        className="w-full p-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5 text-left hover:border-primary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Calendar className="text-primary" size={20} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-sm">
              Nenhum agendamento
            </p>
            <p className="text-xs text-muted-foreground">
              Toque para agendar sua próxima sessão
            </p>
          </div>
          <ArrowRight className="text-primary" size={18} />
        </div>
      </motion.button>
    );
  }

  const date = new Date(agendamento.data_hora);
  const dayLabel = isToday(date)
    ? "Hoje"
    : isTomorrow(date)
    ? "Amanhã"
    : format(date, "EEEE, d MMM", { locale: ptBR });

  const timeLabel = format(date, "HH:mm");
  const isNear = isToday(date) || isTomorrow(date);

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate("/agendamento")}
      className={`w-full p-5 rounded-2xl text-left transition-all relative overflow-hidden ${
        isNear
          ? "bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border-2 border-primary/30 shadow-md"
          : "bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10 border border-primary/20"
      }`}
    >
      {/* Decorative sparkle for today/tomorrow */}
      {isNear && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-3 right-3 text-primary/30"
        >
          <Sparkles size={24} />
        </motion.div>
      )}

      <div className="flex items-center gap-1.5 mb-2">
        <Calendar className="text-primary" size={14} />
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
          Próxima Sessão
        </span>
        {isNear && (
          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {isToday(date) ? "🔴 Hoje" : "⏰ Amanhã"}
          </span>
        )}
      </div>
      <p className="font-bold text-foreground capitalize text-lg font-serif">{dayLabel}</p>
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={13} />
          <span className="text-sm font-medium">{timeLabel}</span>
        </div>
        <span className="text-sm text-muted-foreground truncate">
          {agendamento.servico}
        </span>
      </div>
      {agendamento.terapeutas?.nome && (
        <p className="text-xs text-muted-foreground mt-2">
          com <span className="font-medium text-foreground">{agendamento.terapeutas.nome}</span>
        </p>
      )}
    </motion.button>
  );
};
