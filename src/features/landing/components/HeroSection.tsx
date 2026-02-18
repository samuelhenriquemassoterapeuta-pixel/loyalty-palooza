import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Leaf, Sparkles, Star, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-options/hero-spa-resinkra.jpg";
import { useLandingConfig } from "@/features/landing/hooks/useLandingConfig";

const socialProof = [
  { icon: Users, value: "2.500+", label: "Clientes atendidos" },
  { icon: Star, value: "4.9", label: "Avaliação média" },
  { icon: Calendar, value: "15.000+", label: "Sessões realizadas" },
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const { config } = useLandingConfig("hero");
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

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
    <section id="inicio" ref={heroRef}>
      {/* Background image with parallax */}
      <div className="relative pt-16 h-[50vh] sm:h-[55vh] lg:h-[65vh] overflow-hidden">
        <motion.img
          src={imagemFundo}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ y: imageY, scale: imageScale }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background"
          style={{ opacity: overlayOpacity }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      {/* Text content — always visible for conversion */}
      <div className="bg-background relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm mb-6">
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Sparkles size={14} className="text-primary" />
                </motion.div>
                <span className="text-xs font-semibold text-foreground">{badge}</span>
              </div>
            </motion.div>

            {/* Title — always visible */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
            >
              {tituloParte1}{" "}
              <span className="text-gradient font-serif italic">{tituloDestaque}</span>{" "}
              {tituloParte2}
            </motion.h1>

            {/* Subtitle — always visible */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              {subtitulo}
            </motion.p>

            {/* CTA Buttons — always visible */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button size="xl" onClick={() => navigate("/auth")} className="group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-primary-foreground/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                {botaoPrimario}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" })}
                className="group"
              >
                <Leaf size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                {botaoSecundario}
              </Button>
            </motion.div>

            {/* Sinais */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-8 flex items-center gap-6 text-foreground/80"
            >
              {sinais.map((sinal: string, i: number) => {
                const colors = ["bg-highlight", "bg-accent", "bg-primary"];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 300 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full ${colors[i % colors.length]} shadow-sm`}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <span className="text-sm font-medium">{sinal}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Social Proof Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
              {socialProof.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                    <item.icon size={14} className="text-primary" />
                    <span className="text-xl sm:text-2xl font-black text-foreground">{item.value}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HeroAuthButtons = () => null;
