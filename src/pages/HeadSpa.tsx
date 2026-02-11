import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Search,
  Droplets,
  Hand,
  FlaskConical,
  Wind,
  Leaf,
  Heart,
  Brain,
  Sun,
  Smile,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/headspa-hero.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const etapas = [
  {
    icon: Search,
    title: "Análise do Couro Cabeludo",
    desc: "Exame detalhado com câmeras especiais para identificar oleosidade, ressecamento ou acúmulo de produtos.",
    color: "bg-info/10 text-info",
  },
  {
    icon: Droplets,
    title: "Limpeza Profunda",
    desc: "Aplicação de produtos de limpeza específicos com escovação suave para remover células mortas e resíduos.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Hand,
    title: "Massagem Terapêutica",
    desc: "Técnicas coreanas que estimulam a circulação, aliviam tensão no couro cabeludo, têmporas, pescoço e ombros.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FlaskConical,
    title: "Tratamentos Nutritivos",
    desc: "Máscaras, ampolas e séruns nutritivos escolhidos sob medida para o seu tipo de cabelo.",
    color: "bg-highlight/10 text-highlight",
  },
  {
    icon: Wind,
    title: "Aromaterapia & Vapor",
    desc: "Aromas relaxantes e vapor quente para abrir os poros e potencializar a absorção dos ativos.",
    color: "bg-warning/10 text-warning",
  },
];

const beneficios = [
  { icon: Leaf, text: "Melhora a saúde do couro cabeludo" },
  { icon: Sparkles, text: "Estimula o crescimento capilar" },
  { icon: Droplets, text: "Reduz caspa e oleosidade excessiva" },
  { icon: Brain, text: "Alivia dores de cabeça e tensão" },
  { icon: Heart, text: "Promove relaxamento profundo" },
  { icon: Sun, text: "Cabelos mais brilhantes e saudáveis" },
];

const HeadSpa = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Head SPA Coreano ambiente"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/30 to-background" />

        <div className="relative z-10 h-full flex flex-col justify-between px-5 sm:px-8 lg:px-16 py-6">
          <Link to="/" className="self-start">
            <Button variant="ghost" size="sm" className="text-primary-foreground/90 hover:text-primary-foreground gap-1.5">
              <ArrowLeft size={16} /> Voltar
            </Button>
          </Link>

          <div className="max-w-3xl pb-6 sm:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-semibold mb-4 backdrop-blur-sm">
                <Sparkles size={13} /> Terapia Exclusiva
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Head SPA{" "}
                <span className="font-serif italic">Coreano</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-primary-foreground/80 text-sm sm:text-lg max-w-xl leading-relaxed">
                Um ritual de beleza que vai além: cuidado profundo para o couro cabeludo, 
                massagens terapêuticas e bem-estar holístico.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-5 py-5 sm:py-6 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} className="text-primary" />
            <span>60 a 90 minutos</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star size={16} className="text-accent" />
            <span>Experiência Premium</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Smile size={16} className="text-highlight" />
            <span>Autocuidado Holístico</span>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              O que é o{" "}
              <span className="font-serif italic text-primary">Head SPA?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              O Head SPA Coreano é um tratamento capilar e de relaxamento que combina cuidados 
              profundos para o couro cabeludo com técnicas de massagem e bem-estar. Uma experiência 
              sensorial completa que conecta saúde capilar e mental — tratando cada sessão como 
              um momento de autocuidado holístico, não apenas estético.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Etapas */}
      <section className="py-14 sm:py-20 px-5 sm:px-8 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10"
          >
            Etapas do <span className="font-serif italic text-primary">Tratamento</span>
          </motion.h2>

          <div className="space-y-4">
            {etapas.map((etapa, i) => {
              const Icon = etapa.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  variants={fadeUp}
                  className="flex gap-4 sm:gap-5 items-start p-5 sm:p-6 rounded-2xl border border-border/60 bg-card"
                >
                  <div className={`p-3 rounded-xl shrink-0 ${etapa.color}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base sm:text-lg mb-1">
                      {etapa.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {etapa.desc}
                    </p>
                  </div>
                  <span className="ml-auto text-3xl font-bold text-muted/60 font-serif hidden sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10"
          >
            Benefícios do <span className="font-serif italic text-primary">Head SPA</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficios.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card hover:shadow-md transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{b.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diferencial */}
      <section className="py-14 sm:py-20 px-5 sm:px-8 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <Heart size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Diferencial Coreano</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Bem-estar <span className="font-serif italic text-primary">holístico</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A abordagem coreana enfatiza a conexão entre bem-estar mental e saúde capilar. 
              Cada sessão de Head SPA é tratada como um momento sagrado de autocuidado — 
              onde mente e corpo se reconectam através do toque terapêutico e da atenção 
              plena ao cuidado de si.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Pronta para experimentar?
            </h2>
            <p className="text-muted-foreground mb-6">
              Agende sua sessão de Head SPA Coreano e descubra uma nova forma de cuidar de você.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Sparkles size={16} /> Agendar Sessão
                </Button>
              </Link>
              <Link to="/#contato">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeadSpa;
