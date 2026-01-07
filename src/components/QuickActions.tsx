import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, ShoppingBag, Clock, Send } from "lucide-react";

const actions = [
  { 
    icon: Calendar,
    label: "Agendar", 
    description: "Nova sessão",
    gradient: "from-primary/30 to-primary/10",
    iconColor: "text-primary",
    iconBg: "bg-primary/20",
    path: "/agendamento" 
  },
  { 
    icon: Clock,
    label: "Planos", 
    description: "Horas",
    gradient: "from-highlight/30 to-highlight/10",
    iconColor: "text-highlight",
    iconBg: "bg-highlight/20",
    path: "/pacotes" 
  },
  { 
    icon: ShoppingBag,
    label: "Loja", 
    description: "Produtos",
    gradient: "from-accent/30 to-accent/10",
    iconColor: "text-accent",
    iconBg: "bg-accent/20",
    path: "/loja" 
  },
  { 
    icon: Send,
    label: "Transferir", 
    description: "Enviar créditos",
    gradient: "from-info/30 to-info/10",
    iconColor: "text-info",
    iconBg: "bg-info/20",
    path: "/transferir" 
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
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          variants={item}
          whileTap={{ scale: 0.92 }}
          whileHover={{ y: -6, scale: 1.02 }}
          onClick={() => action.path && navigate(action.path)}
          className={`group relative flex flex-col items-center gap-2 p-4 rounded-3xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden ${
            !action.path ? "opacity-60" : ""
          }`}
        >
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </div>
          
          {/* Glow effect */}
          <div className={`absolute -inset-1 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10`} />
          
          {/* Icon with enhanced effects and pulse */}
          <motion.div 
            className={`relative z-10 p-4 rounded-2xl ${action.iconBg} shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }}
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Pulse ring effect */}
            <motion.div 
              className={`absolute inset-0 rounded-2xl ${action.iconBg}`}
              animate={{ 
                scale: [1, 1.3, 1.3],
                opacity: [0.6, 0, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: index * 0.2
              }}
            />
            
            <action.icon size={40} className={`${action.iconColor} relative z-10 drop-shadow-sm`} />
          </motion.div>
          
          {/* Label with fade effect */}
          <div className="relative z-10 text-center">
            <span className="block text-xs font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {action.label}
            </span>
            <span className="block text-[9px] text-muted-foreground mt-0.5 transition-all duration-300 group-hover:text-foreground/70">
              {action.description}
            </span>
          </div>
          
          {/* Bottom accent line */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${action.gradient.replace('/20', '').replace('/5', '').replace('/30', '').replace('/10', '')} group-hover:w-3/4 transition-all duration-500 rounded-full`} />
        </motion.button>
      ))}
    </motion.div>
  );
};
