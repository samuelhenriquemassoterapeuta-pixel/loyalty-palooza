import { useState, useEffect } from "react";
import { Smartphone, Monitor, Globe, Clock, LogOut, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DevicesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SessionInfo {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: Date;
  isCurrent: boolean;
}

export const DevicesSheet = ({ open, onOpenChange }: DevicesSheetProps) => {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      loadSessions();
    }
  }, [open]);

  const loadSessions = async () => {
    setLoading(true);
    
    // Get current session info
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // Parse user agent to get device info
      const userAgent = navigator.userAgent;
      const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
      const browser = getBrowserName(userAgent);
      
      setSessions([
        {
          id: session.access_token.slice(0, 10),
          device: isMobile ? "Celular" : "Computador",
          browser,
          location: "Sessão atual",
          lastActive: new Date(),
          isCurrent: true,
        },
      ]);
    }
    
    setLoading(false);
  };

  const getBrowserName = (userAgent: string): string => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Navegador";
  };

  const handleLogoutSession = async (sessionId: string, isCurrent: boolean) => {
    if (isCurrent) {
      toast.info("Para sair desta sessão, use o botão 'Sair da conta'");
      return;
    }
    
    toast.success("Sessão encerrada");
    setSessions(sessions.filter(s => s.id !== sessionId));
  };

  const handleLogoutAllDevices = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut({ scope: "global" });
    setLoading(false);

    if (error) {
      toast.error("Erro ao encerrar sessões");
    } else {
      toast.success("Todas as sessões foram encerradas");
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device === "Celular") return Smartphone;
    return Monitor;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-secondary">
              <Smartphone size={20} className="text-foreground" />
            </div>
            <SheetTitle className="text-xl">Dispositivos</SheetTitle>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Sessões Ativas */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Dispositivos conectados à sua conta
                </p>

                {sessions.map((session) => {
                  const DeviceIcon = getDeviceIcon(session.device);
                  return (
                    <div
                      key={session.id}
                      className="p-4 rounded-xl bg-card shadow-card"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-secondary">
                          <DeviceIcon size={20} className="text-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              {session.device}
                            </p>
                            {session.isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-highlight/10 text-highlight text-xs font-medium">
                                Este dispositivo
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Globe size={12} />
                            <span>{session.browser}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock size={12} />
                            <span>
                              Ativo {format(session.lastActive, "dd 'de' MMM 'às' HH:mm", { locale: ptBR })}
                            </span>
                          </div>
                        </div>
                        {!session.isCurrent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLogoutSession(session.id, session.isCurrent)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <LogOut size={16} />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Encerrar Todas as Sessões */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleLogoutAllDevices}
                  disabled={loading}
                  className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <LogOut size={16} className="mr-2" />
                  )}
                  Sair de todos os dispositivos
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Isso encerrará todas as sessões, incluindo esta
                </p>
              </div>

              {/* Info */}
              <div className="p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground">
                  Se você não reconhece algum dispositivo, encerre a sessão e altere sua senha imediatamente.
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
