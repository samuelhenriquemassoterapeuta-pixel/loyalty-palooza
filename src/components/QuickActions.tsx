import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, ShoppingBag, Clock, Gift, Crown, Brain, QrCode, Trophy, TrendingUp, Camera, Ticket, FileText, Headphones, Sparkles, MessageCircle, BookHeart } from "lucide-react";

const actions = [
  {
    icon: Calendar,
    label: "Agendar",
    description: "Nova sessão",
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    path: "/agendamento",
  },
  {
    icon: QrCode,
    label: "Check-in",
    description: "Na clínica",
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
    path: "/checkin",
  },
  {
    icon: Trophy,
    label: "Desafios",
    description: "Temáticos",
    iconColor: "text-highlight",
    iconBg: "bg-highlight/15",
    path: "/desafios",
  },
  {
    icon: Camera,
    label: "Moments",
    description: "Postar",
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    path: "/resinkra-moments",
  },
  {
    icon: TrendingUp,
    label: "Jornada",
    description: "Timeline",
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
    path: "/minha-jornada",
  },
  {
    icon: Ticket,
    label: "Presente",
    description: "Vale",
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    path: "/vale-presente",
  },
  {
    icon: Crown,
    label: "VIP",
    description: "Clube",
    iconColor: "text-highlight",
    iconBg: "bg-highlight/15",
    path: "/clube-vip",
  },
  {
    icon: FileText,
    label: "Anamnese",
    description: "Fichas",
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
    path: "/anamnese",
  },
  {
    icon: Sparkles,
    label: "Bem-Estar",
    description: "Plano IA",
    iconColor: "text-highlight",
    iconBg: "bg-highlight/15",
    path: "/bem-estar",
  },
  {
    icon: MessageCircle,
    label: "Aria",
    description: "Assistente IA",
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    path: "/assistente-saude",
  },
  {
    icon: BookHeart,
    label: "Diário",
    description: "Humor & IA",
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
    path: "/diario-humor",
  },
  {
    icon: Headphones,
    label: "Playlist",
    description: "Musical",
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    path: "/playlist",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 26 },
  },
};

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 sm:grid-cols-6 gap-2.5"
    >
      {actions.map((action) => (
        <motion.button
          key={action.label}
          variants={item}
          whileTap={{ scale: 0.93 }}
          whileHover={{ y: -4 }}
          onClick={() => action.path && navigate(action.path)}
          className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl glass-card hover:shadow-elevated transition-all duration-300 ${
            !action.path ? "opacity-60" : ""
          }`}
        >
          {/* Icon */}
          <div
            className={`p-3.5 rounded-2xl ${action.iconBg} transition-transform duration-300 group-hover:scale-110`}
          >
            <action.icon
              size={24}
              className={`${action.iconColor} drop-shadow-sm`}
            />
          </div>

          {/* Label */}
          <div className="text-center">
            <span className="block text-xs font-semibold text-foreground">
              {action.label}
            </span>
            <span className="block text-[9px] text-muted-foreground mt-0.5">
              {action.description}
            </span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};
