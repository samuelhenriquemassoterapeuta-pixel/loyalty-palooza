import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";
import resinkraLogo from "@/assets/resinkra-logo.png";

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
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
          <h1 className="text-xl font-bold text-foreground">{userName}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2.5 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
        </button>
        <button className="p-2.5 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow">
          <Settings size={20} className="text-foreground" />
        </button>
      </div>
    </motion.header>
  );
};
