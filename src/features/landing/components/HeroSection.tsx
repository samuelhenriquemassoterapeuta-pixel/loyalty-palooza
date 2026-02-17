import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Sparkles, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import simboloVerde from "@/assets/simbolo-verde.png";
import iconeFlor from "@/assets/icone-flor.png";
import heroBg from "@/assets/hero-options/hero-spa-resinkra.jpg";
import { useLandingConfig } from "@/features/landing/hooks/useLandingConfig";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [heroOpen, setHeroOpen] = useState(false);
  const { config } = useLandingConfig("hero");

  // Dynamic content with fallbacks
  const badge = config?.badge || "Spa Terapia & Bem-estar";
  const tituloParte1 = config?.titulo_parte1 || "Onde o tempo";
  const tituloDestaque = config?.titulo_destaque || "desacelera";
  const tituloParte2 = config?.titulo_parte2 || "e o cuidado começa";
  const subtitulo = config?.subtitulo || "Um cuidado que começa no corpo, atravessa os sentidos e permanece na rotina. Técnica, sensibilidade e bem-estar em perfeita sincronia.";
  const botaoPrimario = config?.botao_primario || "Agende seu horário";
  const botaoSecundario = config?.botao_secundario || "Conheça nossos serviços";
  const sinais = config?.sinais || ["Equilíbrio", "Pausa", "Essência"];
  const imagemFundo = config?.imagem_fundo || heroBg;

  return (
    <section id="inicio">
      {/* Background image — visual only */}
      <div className="relative pt-16 h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
        <img src={imagemFundo} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
      </div>

      {/* Text content — below the image */}
      <div className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm mb-6">
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs font-semibold text-foreground">{badge}</span>
              </div>
            </motion.div>

            {/* Clickable title with chevron */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => setHeroOpen((v) => !v)}
              className="w-full flex items-start gap-3 text-left group"
              aria-expanded={heroOpen}
            >
              <h1 className="flex-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {tituloParte1}{" "}
                <span className="text-gradient font-serif italic">{tituloDestaque}</span>{" "}
                {tituloParte2}
              </h1>
              <motion.div
                animate={{ rotate: heroOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 mt-2 p-1.5 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
              >
                <ChevronDown size={18} className="text-primary" />
              </motion.div>
            </motion.button>

            {/* Collapsible content */}
            <AnimatePresence initial={false}>
              {heroOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {subtitulo}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button size="xl" onClick={() => navigate("/auth")} className="group">
                      {botaoPrimario}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      size="xl"
                      variant="outline"
                      onClick={() => { document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" }); }}
                    >
                      <Leaf size={18} />
                      {botaoSecundario}
                    </Button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 flex items-center gap-6 text-foreground/80"
                  >
                    {sinais.map((sinal: string, i: number) => {
                      const colors = ["bg-highlight", "bg-accent", "bg-primary"];
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${colors[i % colors.length]} shadow-sm`} />
                          <span className="text-sm font-medium">{sinal}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroAuthButtons = () => null;
