import { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, CalendarDays, ShoppingBag, Wallet, MoreHorizontal, X, Activity, Apple, Globe, Handshake, GraduationCap, Ticket, Trophy, Heart, Star, Leaf, Zap, BarChart3, MessageCircle, Phone, Stethoscope } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";

const primaryNavItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: CalendarDays, label: "Agendar", path: "/agendamento" },
  { icon: ShoppingBag, label: "Loja", path: "/loja" },
  { icon: Wallet, label: "Carteira", path: "/wallet" },
];

const moreNavItems = [
  { icon: MessageCircle, label: "Chat IA", path: "/chat" },
  { icon: Phone, label: "WhatsApp", path: "/chat-whatsapp" },
  { icon: Activity, label: "Protocolos", path: "/protocolos" },
  { icon: Apple, label: "Dietas", path: "/dietas" },
  { icon: Trophy, label: "Conquistas", path: "/conquistas" },
  { icon: Heart, label: "Bem-estar", path: "/alongamento" },
  { icon: Star, label: "Cashback", path: "/cashback" },
  { icon: Globe, label: "Site", path: "/site" },
  { icon: Handshake, label: "Parceiros", path: "/parceiro-dashboard" },
  { icon: Stethoscope, label: "Terapeuta", path: "/terapeuta-dashboard" },
  { icon: GraduationCap, label: "Cursos", path: "/cursos" },
  { icon: Leaf, label: "Terapias", path: "/terapias" },
];

const adminMoreItems = [
  { icon: Zap, label: "Resinkra AI", path: "/resinkra-ai" },
  { icon: BarChart3, label: "Google Ads", path: "/admin/google-ads" },
];

const adminMoreItem = { icon: Ticket, label: "Cupom", path: "/cupom-editor" };

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ x: 0, width: 0 });
  const [moreOpen, setMoreOpen] = useState(false);

  const allMoreItems = useMemo(
    () => (isAdmin ? [...moreNavItems, ...adminMoreItems, adminMoreItem] : moreNavItems),
    [isAdmin]
  );

  // Check if active route is in "more" menu
  const isMoreActive = allMoreItems.some((item) => item.path === location.pathname);
  const primaryWithMore = [...primaryNavItems, { icon: MoreHorizontal, label: "Mais", path: "__more__" }];
  
  const activeIndex = isMoreActive 
    ? primaryWithMore.length - 1 // highlight "Mais" 
    : primaryWithMore.findIndex((item) => item.path === location.pathname);

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
  }, [activeIndex]);

  // Close more menu on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* More menu overlay */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="absolute bottom-full mb-3 left-4 right-4 z-50 bg-card/95 backdrop-blur-xl rounded-2xl border border-border/60 shadow-elevated p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground">Mais opções</h3>
                <button
                  onClick={() => setMoreOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {allMoreItems.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => {
                        navigate(item.path);
                        setMoreOpen(false);
                      }}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                      <span className={`text-[10px] leading-tight ${isActive ? "font-bold" : "font-medium"}`}>
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mx-4 mb-4 safe-bottom">
        <div className="glass-strong rounded-2xl border border-border/50 shadow-elevated">
          <div
            ref={containerRef}
            className="relative flex items-center justify-evenly py-2 px-2 max-w-lg mx-auto"
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

            {primaryWithMore.map((item) => {
              const isMore = item.path === "__more__";
              const isActive = isMore ? (isMoreActive || moreOpen) : location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  data-nav-btn
                  onClick={() => {
                    if (isMore) {
                      setMoreOpen((o) => !o);
                    } else {
                      navigate(item.path);
                    }
                  }}
                  whileTap={{ scale: 0.88 }}
                  className="relative flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-xl z-10 min-w-0"
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
                  {isActive && !isMore && (
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
