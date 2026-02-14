import { motion } from "framer-motion";
import { Bell, ChevronRight } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useNotificacoes } from "@/hooks/useNotificacoes";
import simboloVerde from "@/assets/simbolo-verde.png";

export const Header = () => {
  const navigate = useNavigate();
  const { profile, loading } = useProfile();
  const { user } = useAuth();
  const { naoLidas } = useNotificacoes();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getDisplayName = () => {
    if (loading) return "...";
    if (profile?.nome) return profile.nome.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "Usuário";
  };

  const getInitials = () => {
    const name = profile?.nome || user?.email?.split("@")[0] || "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between py-3"
    >
      {/* Left: Avatar + Greeting */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-3 group"
      >
        <div className="relative">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
            />
          ) : (
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
              {getInitials()}
            </div>
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-highlight border-2 border-background" />
        </div>
        <div className="text-left">
          <p className="text-[11px] text-muted-foreground leading-tight">
            <TextReveal text={`${getGreeting()} 👋`} delay={0.3} />
          </p>
          <p className="text-base font-bold text-foreground leading-tight flex items-center gap-1 font-serif">
            <TextReveal text={getDisplayName()} delay={0.5} />
            <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>
      </button>

      {/* Right: Logo + Notification */}
      <div className="flex items-center gap-2">
        <img
          src={simboloVerde}
          alt="Resinkra"
          className="h-8 w-8 object-contain opacity-60"
        />
        <button
          className="relative p-2.5 rounded-xl glass-card hover:shadow-elevated transition-all duration-300"
          onClick={() => navigate("/notificacoes")}
        >
          <Bell size={19} className="text-foreground" />
          {naoLidas.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 gradient-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-button"
            >
              {naoLidas.length > 9 ? "9+" : naoLidas.length}
            </motion.span>
          )}
        </button>
      </div>
    </motion.header>
  );
};
