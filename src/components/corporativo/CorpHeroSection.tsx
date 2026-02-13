import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import corpHeroBg from "@/assets/corporativo-hero.jpg";
import videoBemEstar from "@/assets/corporativo/video-bem-estar.mp4";

const stats = [
  { icon: Building2, value: 150, suffix: "+", label: "Empresas atendidas" },
  { icon: Users, value: 12000, suffix: "+", label: "Colaboradores beneficiados", format: (n: number) => n.toLocaleString("pt-BR") },
  { icon: TrendingUp, value: 34, suffix: "%", label: "Redução em afastamentos" },
];

export const CorpHeroSection = () => {
  const scrollToPlanos = () => {
    document.querySelector("#planos-corporativos")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContato = () => {
    document.querySelector("#orcamento-corporativo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background video with image fallback */}
      <div className="absolute inset-0">
        <video
          src={videoBemEstar}
          autoPlay
          muted
          loop
          playsInline
          poster={corpHeroBg}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="absolute inset-0 gradient-hero opacity-40" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.15)]"
          >
            Bem-estar corporativo que{" "}
            <span className="font-serif italic text-gradient">transforma resultados</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-foreground/90 leading-relaxed max-w-2xl [text-shadow:0_1px_3px_rgba(0,0,0,0.1)]"
          >
            Massoterapia corporativa para eventos, escritórios e programas de qualidade de vida. 
            Reduza o estresse da equipe, aumente a produtividade e promova saúde no ambiente de trabalho.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button size="xl" onClick={scrollToContato} className="group">
              Solicitar orçamento
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline" onClick={scrollToPlanos}>
              Ver planos
            </Button>
          </motion.div>
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-organic flex items-center gap-4"
            >
              <div className="shrink-0 p-3 rounded-2xl bg-primary/10">
                <stat.icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  <AnimatedCounter
                    value={stat.value}
                    format={stat.format}
                    duration={1.5}
                    startDelay={800}
                  />
                  {stat.suffix}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
