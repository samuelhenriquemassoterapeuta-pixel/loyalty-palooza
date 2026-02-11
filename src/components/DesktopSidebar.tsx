import { motion } from "framer-motion";
import { Home, CalendarDays, ShoppingBag, User, Gift, Wallet, Crown, Settings, Bell, Dumbbell, Activity, BookOpen, Scan, Apple } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useNotificacoes } from "@/hooks/useNotificacoes";
import logoMarrom from "@/assets/logo-marrom.png";
import simboloVerde from "@/assets/simbolo-verde.png";

const navItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: CalendarDays, label: "Agendar", path: "/agendamento" },
  { icon: ShoppingBag, label: "Loja", path: "/loja" },
  { icon: Dumbbell, label: "Alongamento", path: "/alongamento" },
  { icon: Activity, label: "Protocolos", path: "/protocolos" },
  { icon: Apple, label: "Dietas", path: "/dietas" },
  { icon: Scan, label: "Avaliação Postural", path: "/avaliacao-postural" },
  { icon: BookOpen, label: "Guia Clínico", path: "/guia-clinico" },
  { icon: Crown, label: "Cashback", path: "/cashback" },
  { icon: Gift, label: "Indicações", path: "/indicacoes" },
  { icon: Wallet, label: "Transferir", path: "/transferir" },
];

const bottomItems = [
  { icon: Bell, label: "Notificações", path: "/notificacoes" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export const DesktopSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { profile } = useProfile();
  const { user } = useAuth();
  const { naoLidas } = useNotificacoes();

  const displayName = profile?.nome || user?.email?.split("@")[0] || "Usuário";

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen sticky top-0 border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
        <img src={simboloVerde} alt="Resinkra" className="h-10 w-10 object-contain" />
        <img src={logoMarrom} alt="Resinkra" className="h-5 object-contain" />
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-border">
        <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="desktopActiveIndicator"
                  className="ml-auto w-1.5 h-5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        {isAdmin && (
          <>
            <div className="my-3 border-t border-border" />
            <button
              onClick={() => navigate("/admin")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === "/admin"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Settings size={20} strokeWidth={location.pathname === "/admin" ? 2.5 : 2} />
              <span>Painel Admin</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
                Admin
              </span>
            </button>
          </>
        )}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-3 border-t border-border space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          const hasNotifications = item.path === "/notificacoes" && naoLidas.length > 0;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <div className="relative">
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {hasNotifications && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-0.5 bg-primary text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">
                    {naoLidas.length > 9 ? "9+" : naoLidas.length}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
