import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Home, CalendarDays, Activity, Apple, Globe, Ticket, Handshake } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";

const baseNavItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: CalendarDays, label: "Agendar", path: "/agendamento" },
  { icon: Activity, label: "Protocolos", path: "/protocolos" },
  { icon: Apple, label: "Dietas", path: "/dietas" },
  { icon: Globe, label: "Site", path: "/site" },
  { icon: Handshake, label: "Parceiros", path: "/parceiro-dashboard" },
];

const adminNavItem = { icon: Ticket, label: "Cupom", path: "/cupom-editor" };

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ x: 0, width: 0 });

  const navItems = useMemo(
    () => (isAdmin ? [...baseNavItems, adminNavItem] : baseNavItems),
    [isAdmin]
  );

  const activeIndex = navItems.findIndex((item) => item.path === location.pathname);

  // Measure active button and compute pill position
  useEffect(() => {
    if (!containerRef.current || activeIndex < 0) return;
    const buttons = containerRef.current.querySelectorAll<HTMLButtonElement>("[data-nav-btn]");
    const btn = buttons[activeIndex];
    if (!btn) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    setPillStyle({
      x: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [activeIndex, navItems.length]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="mx-4 mb-4 safe-bottom">
        <div className="glass-strong rounded-2xl border border-border/50 shadow-elevated">
          <div
            ref={containerRef}
            className="relative flex items-center justify-around py-2 px-2 max-w-lg mx-auto"
          >
            {/* Sliding pill indicator */}
            {activeIndex >= 0 && (
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-xl bg-primary/10"
                animate={{
                  x: pillStyle.x,
                  width: pillStyle.width,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                style={{ left: 0 }}
              />
            )}

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  data-nav-btn
                  onClick={() => navigate(item.path)}
                  whileTap={{ scale: 0.88 }}
                  className="relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl z-10"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  >
                    <item.icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      className={`transition-colors duration-300 ${
                        isActive ? "text-primary drop-shadow-sm" : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>
                  <motion.span
                    animate={{
                      fontWeight: isActive ? 700 : 500,
                    }}
                    className={`text-[10px] transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </motion.span>

                  {/* Top dot indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navDot"
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full gradient-primary"
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
