import { ReactNode, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, PenTool, Anchor, CalendarDays, Sparkles, 
  Lightbulb, History, FileText, Settings, LogOut, Menu, X,
  Zap, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ResinkraAILayoutProps {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { path: "/resinkra-ai", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/resinkra-ai/create", icon: PenTool, label: "Criar Roteiro" },
  { path: "/resinkra-ai/hooks", icon: Anchor, label: "Ganchos" },
  { path: "/resinkra-ai/calendar", icon: CalendarDays, label: "Calendário" },
  { path: "/resinkra-ai/viral-analysis", icon: Sparkles, label: "Análise Viral" },
  { path: "/resinkra-ai/ideas", icon: Lightbulb, label: "Banco de Ideias" },
  { path: "/resinkra-ai/history", icon: History, label: "Histórico" },
  { path: "/resinkra-ai/templates", icon: FileText, label: "Templates" },
  { path: "/resinkra-ai/settings", icon: Settings, label: "Configurações" },
];

export const ResinkraAILayout = ({ children, title }: ResinkraAILayoutProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/resinkra-ai") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="resinkra-ai-theme min-h-screen bg-[#0a0a1a] text-gray-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-[#0d0d24]/80 backdrop-blur-xl fixed inset-y-0 left-0 z-40">
        <div className="p-6">
          <Link to="/resinkra-ai" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Resinkra AI
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Instagram Scripts</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive(item.path)
                  ? "bg-gradient-to-r from-violet-500/20 to-blue-500/10 text-violet-300 shadow-lg shadow-violet-500/5"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {isActive(item.path) && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-gray-400 hover:text-gray-200 hover:bg-white/5"
            onClick={() => { signOut(); navigate("/"); }}
          >
            <LogOut className="w-4 h-4" /> Sair
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/resinkra-ai" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Resinkra AI
            </span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-white/10">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#0a0a1a]/95 backdrop-blur-xl pt-16"
          >
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive(item.path)
                      ? "bg-gradient-to-r from-violet-500/20 to-blue-500/10 text-violet-300"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
