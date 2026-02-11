import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/headspa-hero.jpg";
import imgAnalise from "@/assets/headspa/analise-couro.jpg";
import imgLimpeza from "@/assets/headspa/limpeza-profunda.jpg";
import imgMassagem from "@/assets/headspa/massagem-terapeutica.jpg";
import imgNutritivos from "@/assets/headspa/tratamentos-nutritivos.jpg";
import imgAroma from "@/assets/headspa/aromaterapia-vapor.jpg";

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
    image: imgAnalise,
    duracao: "10–15 min",
    detalhes: [
      "Utilizamos microcâmeras de alta resolução (aumento de 200x) para examinar folículos, poros e a microbiota do couro cabeludo.",
      "Identificamos condições como dermatite seborreica, psoríase leve, foliculite, excesso de sebo ou ressecamento.",
      "A análise é documentada com imagens para acompanhar a evolução ao longo das sessões.",
      "Com base no diagnóstico, personalizamos todo o restante do tratamento — produtos, técnicas e tempo de cada etapa.",
    ],
    beneficiosEtapa: [
      "Diagnóstico preciso e personalizado",
      "Acompanhamento visual da evolução",
      "Detecção precoce de problemas capilares",
    ],
  },
  {
    icon: Droplets,
    title: "Limpeza Profunda",
    desc: "Aplicação de produtos de limpeza específicos com escovação suave para remover células mortas e resíduos.",
    color: "bg-primary/10 text-primary",
    image: imgLimpeza,
    duracao: "15–20 min",
    detalhes: [
      "Esfoliação enzimática suave que dissolve células mortas, resíduos de produtos e excesso de sebo sem agredir o couro cabeludo.",
      "Utilizamos escovas de silicone médico com cerdas ultra macias em movimentos circulares para estimular a microcirculação.",
      "Produtos formulados com ácido salicílico, tea tree e extrato de centella asiática para ação antibacteriana e calmante.",
      "O processo desobstrui os folículos, permitindo melhor oxigenação e absorção dos tratamentos seguintes.",
    ],
    beneficiosEtapa: [
      "Remoção profunda de impurezas",
      "Desobstrução dos folículos capilares",
      "Preparação ideal para os ativos nutritivos",
    ],
  },
  {
    icon: Hand,
    title: "Massagem Terapêutica",
    desc: "Técnicas coreanas que estimulam a circulação, aliviam tensão no couro cabeludo, têmporas, pescoço e ombros.",
    color: "bg-accent/10 text-accent",
    image: imgMassagem,
    duracao: "20–25 min",
    detalhes: [
      "Combinamos técnicas de acupressão coreana (지압, Jiap) com movimentos de drenagem linfática facial e cervical.",
      "Trabalhamos pontos de tensão específicos: têmporas, base do crânio, trapézios e linha da mandíbula para alívio imediato.",
      "A massagem aumenta o fluxo sanguíneo para os folículos em até 40%, estimulando crescimento e fortalecimento capilar.",
      "Incluímos técnicas de relaxamento com pedras quentes nos ombros e pescoço, promovendo liberação de endorfina e serotonina.",
    ],
    beneficiosEtapa: [
      "Alívio de tensão e dores de cabeça",
      "Estímulo à circulação e crescimento capilar",
      "Relaxamento profundo do sistema nervoso",
    ],
  },
  {
    icon: FlaskConical,
    title: "Tratamentos Nutritivos",
    desc: "Máscaras, ampolas e séruns nutritivos escolhidos sob medida para o seu tipo de cabelo.",
    color: "bg-highlight/10 text-highlight",
    image: imgNutritivos,
    duracao: "15–20 min",
    detalhes: [
      "Seleção personalizada de ativos com base na análise inicial: biotina, pantenol, queratina hidrolisada, extrato de ginseng ou ceramidas.",
      "Ampolas concentradas de alta penetração são aplicadas diretamente no couro cabeludo com técnica de micro-punctura (sem agulhas).",
      "Máscaras capilares com tecnologia de encapsulamento que liberam ativos gradualmente por até 72 horas após a sessão.",
      "Para cabelos danificados, aplicamos tratamento de reconstrução com aminoácidos e proteínas vegetais que selam as cutículas.",
    ],
    beneficiosEtapa: [
      "Nutrição profunda e duradoura",
      "Reconstrução da fibra capilar",
      "Brilho e maciez imediatos",
    ],
  },
  {
    icon: Wind,
    title: "Aromaterapia & Vapor",
    desc: "Aromas relaxantes e vapor quente para abrir os poros e potencializar a absorção dos ativos.",
    color: "bg-warning/10 text-warning",
    image: imgAroma,
    duracao: "10–15 min",
    detalhes: [
      "Vapor ozonizado a temperatura controlada (38–42°C) que abre os poros do couro cabeludo e potencializa a absorção dos ativos em até 3x.",
      "Blend exclusivo de óleos essenciais: lavanda (relaxamento), alecrim (estímulo capilar), ylang-ylang (equilíbrio) e hortelã-pimenta (frescor).",
      "A aromaterapia atua no sistema límbico, reduzindo cortisol e ansiedade — estudos mostram redução de até 30% nos níveis de estresse.",
      "Finalização com névoa fria de água termal e extrato de camomila para selar os poros e acalmar o couro cabeludo.",
    ],
    beneficiosEtapa: [
      "Potencializa absorção dos tratamentos",
      "Redução de estresse e ansiedade",
      "Sensação de frescor e leveza",
    ],
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleEtapa = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Etapas do <span className="font-serif italic text-primary">Tratamento</span>
            </h2>
            <p className="text-sm text-muted-foreground">Toque em cada etapa para saber mais</p>
          </motion.div>

          <div className="space-y-4">
            {etapas.map((etapa, i) => {
              const Icon = etapa.icon;
              const isOpen = expandedIndex === i;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-border/60 bg-card overflow-hidden"
                >
                  {/* Clickable header */}
                  <button
                    onClick={() => toggleEtapa(i)}
                    className="w-full flex gap-4 sm:gap-5 items-start p-5 sm:p-6 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${etapa.color}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-base sm:text-lg mb-1">
                        {etapa.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {etapa.desc}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground flex items-center gap-1">
                          <Clock size={10} /> {etapa.duracao}
                        </span>
                        <span className="text-[10px] text-primary font-medium">
                          {isOpen ? "Fechar detalhes" : "Ver detalhes →"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-3xl font-bold text-muted/60 font-serif hidden sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} className="text-muted-foreground" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable detail */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/50">
                          {/* Image */}
                          <div className="relative h-48 sm:h-64 overflow-hidden">
                            <img
                              src={etapa.image}
                              alt={etapa.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                          </div>

                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4 -mt-6 relative z-10">
                            {/* Detailed description */}
                            <div className="space-y-2.5">
                              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
                                Como funciona
                              </h4>
                              {etapa.detalhes.map((d, j) => (
                                <p key={j} className="text-sm text-foreground leading-relaxed flex items-start gap-2">
                                  <span className="text-primary mt-1.5 text-[6px] shrink-0">●</span>
                                  {d}
                                </p>
                              ))}
                            </div>

                            {/* Benefits of this step */}
                            <div className="space-y-2">
                              <h4 className="text-xs font-semibold text-highlight uppercase tracking-wider">
                                Benefícios desta etapa
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {etapa.beneficiosEtapa.map((b, j) => (
                                  <span
                                    key={j}
                                    className="inline-flex items-center gap-1 text-xs bg-highlight/10 text-highlight px-2.5 py-1 rounded-full"
                                  >
                                    <CheckCircle2 size={11} />
                                    {b}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
