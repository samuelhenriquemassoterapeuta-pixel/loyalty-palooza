import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, ShoppingBag, Clock, Gift } from "lucide-react";

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
    icon: Clock,
    label: "Planos",
    description: "Horas",
    iconColor: "text-highlight",
    iconBg: "bg-highlight/15",
    path: "/pacotes",
  },
  {
    icon: ShoppingBag,
    label: "Loja",
    description: "Produtos",
    iconColor: "text-accent",
    iconBg: "bg-accent/15",
    path: "/loja",
  },
  {
    icon: Gift,
    label: "Presente",
    description: "Vale",
    iconColor: "text-info",
    iconBg: "bg-info/15",
    path: "/vale-presente",
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
      className="grid grid-cols-4 gap-2.5"
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
