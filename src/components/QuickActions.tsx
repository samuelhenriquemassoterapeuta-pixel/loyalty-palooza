import { motion } from "framer-motion";
import { QrCode, ShoppingBag, Receipt, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { 
    icon: CalendarDays, 
    label: "Agendar", 
    description: "Nova sessão",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    path: "/agendamento" 
  },
  { 
    icon: ShoppingBag, 
    label: "Loja", 
    description: "Produtos",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
    path: "/loja" 
  },
  { 
    icon: Receipt, 
    label: "Histórico", 
    description: "Compras",
    gradient: "from-highlight/20 to-highlight/5",
    iconColor: "text-highlight",
    path: "/loja" 
  },
  { 
    icon: QrCode, 
    label: "Pagar", 
    description: "QR Code",
    gradient: "from-muted-foreground/20 to-muted-foreground/5",
    iconColor: "text-muted-foreground",
    path: null 
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-4 gap-2"
    >
      {actions.map((action) => (
        <motion.button
          key={action.label}
          variants={item}
          whileTap={{ scale: 0.92 }}
          whileHover={{ y: -4 }}
          onClick={() => action.path && navigate(action.path)}
          className={`group relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden ${
            !action.path ? "opacity-60" : ""
          }`}
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Icon */}
          <div className={`relative z-10 p-3 rounded-xl bg-gradient-to-br ${action.gradient} transition-transform duration-300 group-hover:scale-110`}>
            <action.icon size={20} className={action.iconColor} />
          </div>
          
          {/* Label */}
          <div className="relative z-10 text-center">
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
