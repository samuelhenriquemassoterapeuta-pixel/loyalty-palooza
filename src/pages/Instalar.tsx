import { useState, useEffect } from "react";
import { Download, Smartphone, Share, Plus, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Instalar = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-highlight/20 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-highlight" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">App Instalado!</h1>
        <p className="text-muted-foreground mb-8">
          O Resinkra já está na sua tela inicial.
        </p>
        <Button onClick={() => navigate("/")} className="w-full max-w-xs">
          Abrir App
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Instalar App</h1>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* App Preview */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
            <img 
              src="/pwa-192x192.png" 
              alt="Resinkra" 
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-foreground">Resinkra</h2>
          <p className="text-sm text-muted-foreground">Cashback Sustentável</p>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Por que instalar?</h3>
          <div className="space-y-3">
            {[
              { icon: Smartphone, text: "Acesso rápido pela tela inicial" },
              { icon: Download, text: "Funciona offline" },
              { icon: Check, text: "Notificações em tempo real" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="p-2 bg-highlight/20 rounded-lg">
                  <item.icon size={18} className="text-highlight" />
                </div>
                <span className="text-sm text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Install Instructions */}
        {isIOS ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Como instalar no iPhone/iPad</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Toque em</span>
                  <Share size={18} className="text-primary" />
                  <span className="text-sm text-foreground">(Compartilhar)</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Selecione</span>
                  <Plus size={18} className="text-primary" />
                  <span className="text-sm text-foreground">"Adicionar à Tela de Início"</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  3
                </div>
                <span className="text-sm text-foreground">Toque em "Adicionar"</span>
              </div>
            </div>
          </div>
        ) : deferredPrompt ? (
          <Button onClick={handleInstall} className="w-full" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Instalar Agora
          </Button>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Como instalar</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </div>
                <span className="text-sm text-foreground">Abra o menu do navegador (⋮)</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </div>
                <span className="text-sm text-foreground">Selecione "Instalar app" ou "Adicionar à tela inicial"</span>
              </div>
            </div>
          </div>
        )}

        {/* Continue without installing */}
        <button 
          onClick={() => navigate("/")}
          className="w-full text-center text-sm text-muted-foreground underline"
        >
          Continuar sem instalar
        </button>
      </div>
    </div>
  );
};

export default Instalar;
