import { useState, useEffect } from "react";
import { Download, Smartphone, Share, Plus, Check, ArrowLeft, Zap, Bell, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
  };

  const benefits = [
    { icon: Zap, text: "Acesso instantâneo", desc: "Abra direto da tela inicial" },
    { icon: Download, text: "Funciona offline", desc: "Use mesmo sem internet" },
    { icon: Bell, text: "Notificações", desc: "Receba alertas em tempo real" },
    { icon: Shield, text: "Seguro e privado", desc: "Seus dados protegidos" },
  ];

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-highlight/30 blur-3xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-highlight to-highlight/70 flex items-center justify-center mb-6 shadow-2xl">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          App Instalado!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mb-8 max-w-xs"
        >
          O Resinkra já está pronto na sua tela inicial. Aproveite todos os benefícios!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button onClick={() => navigate("/")} size="lg" className="px-8 shadow-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Abrir App
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-highlight/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 rounded-full hover:bg-secondary/50 transition-colors"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Instalar App</h1>
        </div>
      </header>

      <div className="relative p-6 space-y-8 pb-20">
        {/* App Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-highlight/20 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-br from-card via-card to-card/80 border border-border/50 rounded-3xl p-8 text-center">
            <div className="relative mx-auto w-28 h-28 mb-5">
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-lg animate-pulse" />
              <img 
                src="/pwa-192x192.png" 
                alt="Resinkra" 
                className="relative w-full h-full rounded-3xl object-cover shadow-2xl ring-4 ring-primary/20"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-highlight rounded-full flex items-center justify-center shadow-lg">
                <Download size={16} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Resinkra</h2>
            <p className="text-muted-foreground font-medium">Cashback Sustentável</p>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Sparkles key={star} size={14} className="text-highlight fill-highlight" />
              ))}
              <span className="text-xs text-muted-foreground ml-2">App Premium</span>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles size={18} className="text-highlight" />
            Por que instalar?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border/50 p-4 hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-highlight/20 flex items-center justify-center mb-3">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Install Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isIOS ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Como instalar no iPhone/iPad</h3>
              <div className="space-y-3">
                {[
                  { step: 1, content: (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>Toque em</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-lg">
                        <Share size={16} className="text-primary" />
                        <span className="text-primary font-medium">Compartilhar</span>
                      </span>
                    </div>
                  )},
                  { step: 2, content: (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>Selecione</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-lg">
                        <Plus size={16} className="text-primary" />
                        <span className="text-primary font-medium">Tela de Início</span>
                      </span>
                    </div>
                  )},
                  { step: 3, content: <span>Toque em <strong className="text-primary">"Adicionar"</strong></span> },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-secondary/50 rounded-2xl border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-lg font-bold shrink-0 shadow-lg">
                      {item.step}
                    </div>
                    <div className="text-sm text-foreground">{item.content}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : deferredPrompt ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={handleInstall} 
                className="w-full h-14 text-lg font-semibold shadow-xl shadow-primary/20" 
                size="lg"
              >
                <Download className="w-6 h-6 mr-3" />
                Instalar Agora
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Como instalar</h3>
              <div className="space-y-3">
                {[
                  { step: 1, text: 'Abra o menu do navegador', icon: '⋮' },
                  { step: 2, text: 'Selecione "Instalar app" ou "Adicionar à tela inicial"', icon: '📲' },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-secondary/50 rounded-2xl border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-lg font-bold shrink-0 shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-foreground">{item.text}</span>
                    </div>
                    <span className="text-2xl">{item.icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Continue without installing */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate("/")}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-3"
        >
          Continuar sem instalar →
        </motion.button>
      </div>
    </div>
  );
};

export default Instalar;
