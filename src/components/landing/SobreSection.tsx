import { motion } from "framer-motion";
import { Heart, Shield, Gift, TrendingUp } from "lucide-react";
import seloCompleto from "@/assets/selo-completo.png";

const features = [
  {
    icon: Heart,
    title: "Terapias naturais",
    description: "Técnicas holísticas focadas no equilíbrio do corpo e da mente.",
  },
  {
    icon: Gift,
    title: "Cashback em tudo",
    description: "Ganhe de volta uma porcentagem em cada sessão e compra na loja.",
  },
  {
    icon: TrendingUp,
    title: "Programa de fidelidade",
    description: "Suba de nível e desbloqueie multiplicadores de cashback exclusivos.",
  },
  {
    icon: Shield,
    title: "Indicação premiada",
    description: "Indique amigos e ganhe R$ 10 de crédito para cada indicação.",
  },
];

export const SobreSection = () => {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/8 rotate-6" />
              <div className="absolute inset-0 rounded-3xl bg-card shadow-elevated border border-border/50 flex items-center justify-center p-8">
                <img
                  src={seloCompleto}
                  alt="Selo Resinkra"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Por que escolher a{" "}
              <span className="font-serif italic text-gradient">Resinkra</span>?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Somos mais que uma clínica de terapias — somos uma comunidade que valoriza 
              seu compromisso com o bem-estar. Cada visita é recompensada.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 p-2 rounded-xl bg-primary/10 h-fit">
                    <feature.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
