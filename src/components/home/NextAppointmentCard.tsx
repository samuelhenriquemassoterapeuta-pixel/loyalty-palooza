import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
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

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate("/agendamento")}
      className="w-full p-4 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10 border border-primary/20 text-left hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Calendar className="text-primary" size={14} />
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
          Próxima Sessão
        </span>
      </div>
      <p className="font-bold text-foreground capitalize">{dayLabel}</p>
      <div className="flex items-center gap-4 mt-1.5">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={13} />
          <span className="text-sm font-medium">{timeLabel}</span>
        </div>
        <span className="text-sm text-muted-foreground truncate">
          {agendamento.servico}
        </span>
      </div>
      {agendamento.terapeutas?.nome && (
        <p className="text-xs text-muted-foreground mt-1.5">
          com {agendamento.terapeutas.nome}
        </p>
      )}
    </motion.button>
  );
};
