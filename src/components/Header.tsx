import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useNotificacoes } from "@/hooks/useNotificacoes";
import resinkraLogo from "@/assets/resinkra-logo.png";

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
    if (profile?.nome) return profile.nome;
    if (user?.email) return user.email.split("@")[0];
    return "Usuário";
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-4"
    >
      <div className="flex items-center gap-3">
        <img 
          src={resinkraLogo} 
          alt="Resinkra" 
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div>
          <p className="text-sm text-muted-foreground">{getGreeting()},</p>
          <h1 className="text-xl font-bold text-foreground">{getDisplayName()}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          className="relative p-2.5 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow"
          onClick={() => navigate("/notificacoes")}
        >
          <Bell size={20} className="text-foreground" />
          {naoLidas.length > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {naoLidas.length > 9 ? "9+" : naoLidas.length}
            </span>
          )}
        </button>
        <button 
          className="p-2.5 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow"
          onClick={() => navigate("/profile")}
        >
          <Settings size={20} className="text-foreground" />
        </button>
      </div>
    </motion.header>
  );
};
