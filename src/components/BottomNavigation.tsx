import { motion } from "framer-motion";
import { Home, CalendarDays, ShoppingBag, Activity, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: CalendarDays, label: "Agendar", path: "/agendamento" },
  { icon: Activity, label: "Protocolos", path: "/protocolos" },
  { icon: ShoppingBag, label: "Loja", path: "/loja" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-4 mb-4 safe-bottom">
        <div className="glass-strong rounded-2xl border border-border/50 shadow-elevated">
          <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  whileTap={{ scale: 0.9 }}
                  className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-primary/10" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <item.icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>
                  <span
                    className={`text-[10px] font-medium transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
