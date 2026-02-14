import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Building2, Users, TrendingUp, ChevronDown, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import corpHeroBg from "@/assets/corporativo-hero.jpg";
import videoBemEstar from "@/assets/corporativo/video-bem-estar.mp4";

const stats = [
  { icon: Building2, value: 150, suffix: "+", label: "Empresas atendidas" },
  { icon: Users, value: 12000, suffix: "+", label: "Colaboradores beneficiados", format: (n: number) => n.toLocaleString("pt-BR") },
  { icon: TrendingUp, value: 34, suffix: "%", label: "Redução em afastamentos" },
];

const StatsCollapsible = () => {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-16"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 mb-4 group"
        aria-expanded={open}
      >
        <div className="p-2 rounded-xl bg-primary/10">
          <BarChart3 size={16} className="text-primary" />
        </div>
        <span className="text-sm font-semibold text-foreground flex-1 text-left [text-shadow:0_1px_3px_rgba(0,0,0,0.1)]">
          Nossos números
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-1.5 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
        >
          <ChevronDown size={14} className="text-primary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="card-organic flex items-center gap-4">
                  <div className="shrink-0 p-3 rounded-2xl bg-primary/10">
                    <stat.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      <AnimatedCounter value={stat.value} format={stat.format} duration={1.5} startDelay={800} />
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const CorpHeroSection = () => {
  const [heroOpen, setHeroOpen] = useState(true);

  const scrollToPlanos = () => {
    document.querySelector("#planos-corporativos")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContato = () => {
    document.querySelector("#orcamento-corporativo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      {/* Video/Image hero — visual only */}
      <div className="relative pt-16 h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
        <video
          src={videoBemEstar}
          autoPlay
          muted
          loop
          playsInline
          poster={corpHeroBg}
          className="absolute inset-0 w-full h-full object-cover"
        />
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
              <span className="pill mb-6 inline-flex">
                <Building2 size={14} />
                Soluções Corporativas
              </span>
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
                Bem-estar corporativo que{" "}
                <span className="font-serif italic text-gradient">transforma resultados</span>
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
                    Massoterapia corporativa para eventos, escritórios e programas de qualidade de vida. 
                    Reduza o estresse da equipe, aumente a produtividade e promova saúde no ambiente de trabalho.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button size="xl" onClick={scrollToContato} className="group">
                      Solicitar orçamento
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="xl" variant="outline" onClick={scrollToPlanos}>
                      Ver planos
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapsible Stats */}
          <StatsCollapsible />
        </div>
      </div>
    </section>
  );
};
