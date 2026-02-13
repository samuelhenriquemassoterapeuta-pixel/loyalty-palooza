import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import simboloVerde from "@/assets/simbolo-verde.png";
import iconeFlor from "@/assets/icone-flor.png";
import heroBg from "@/assets/hero-options/hero-spa-resinkra.jpg";
import { useLandingConfig } from "@/hooks/useLandingConfig";

export const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useLandingConfig("hero");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgBlobY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgBlobY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);

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
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-2"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={imagemFundo} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/25" />
      </div>
      <div className="absolute inset-0 gradient-hero opacity-40" />
      <motion.div style={{ y: bgBlobY1 }} className="absolute top-20 right-[10%] w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
      <motion.div style={{ y: bgBlobY2 }} className="absolute bottom-20 left-[5%] w-96 h-96 bg-accent/6 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-[15%] w-4 h-4 bg-accent/40 rounded-full animate-float" />
      <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-highlight/50 rounded-full animate-bounce-subtle" />
      <div className="absolute bottom-[30%] right-[15%] w-5 h-5 bg-primary/20 rounded-full animate-pulse-soft" />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-24 sm:pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div style={{ y: textY }} className="will-change-transform">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs font-semibold text-primary">{badge}</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {tituloParte1}{" "}
                <span className="text-gradient font-serif italic">{tituloDestaque}</span>{" "}
                {tituloParte2}
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {subtitulo}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
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
                transition={{ delay: 0.6 }}
                className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-muted-foreground"
              >
                {sinais.map((sinal: string, i: number) => {
                  const colors = ["bg-highlight", "bg-accent", "bg-primary"];
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colors[i % colors.length]}`} />
                      <span className="text-sm">{sinal}</span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual element with parallax */}
          <motion.div style={{ y: imageY }} className="will-change-transform">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-2xl animate-pulse-soft" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 shadow-elevated" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={simboloVerde} alt="Resinkra" className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain drop-shadow-lg animate-float mix-blend-multiply" />
                </div>
                <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-2 right-8 p-3 rounded-2xl bg-card shadow-card border border-border/50">
                  <img src={iconeFlor} alt="" className="w-8 h-8 object-contain" />
                </motion.div>
                <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-4 -left-4 px-4 py-2 rounded-2xl bg-card shadow-card border border-border/50">
                  <span className="text-sm font-bold text-highlight">+5% cashback</span>
                </motion.div>
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-1/2 -right-6 px-3 py-2 rounded-xl bg-card shadow-card border border-border/50">
                  <span className="text-xs font-semibold text-accent">⭐ 4.9</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
