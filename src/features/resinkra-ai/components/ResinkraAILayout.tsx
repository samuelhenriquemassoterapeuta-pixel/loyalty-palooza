import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import {
  LayoutDashboard, PenTool, Anchor, CalendarDays, Sparkles,
  Lightbulb, History, FileText, Settings, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ResinkraAILayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/resinkra-ai", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/resinkra-ai/create", icon: PenTool, label: "Criar Roteiro" },
  { path: "/resinkra-ai/hooks", icon: Anchor, label: "Ganchos" },
  { path: "/resinkra-ai/calendar", icon: CalendarDays, label: "Calendário" },
  { path: "/resinkra-ai/viral-analysis", icon: Sparkles, label: "Análise Viral" },
  { path: "/resinkra-ai/ideas", icon: Lightbulb, label: "Ideias" },
  { path: "/resinkra-ai/history", icon: History, label: "Histórico" },
  { path: "/resinkra-ai/templates", icon: FileText, label: "Templates" },
  { path: "/resinkra-ai/settings", icon: Settings, label: "Config" },
];

export const ResinkraAILayout = ({ children }: ResinkraAILayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/resinkra-ai") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-4 safe-top">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-primary font-serif">Resinkra AI</h1>
          </div>

          {/* Horizontal Sub-Navigation */}
          <ScrollArea className="w-full mb-6">
            <div className="flex gap-1 pb-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Content */}
          {children}
        </div>
      </div>
    </AppLayout>
  );
};
