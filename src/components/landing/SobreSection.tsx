import { motion } from "framer-motion";
import { Heart, Shield, Gift, TrendingUp } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import seloCompleto from "@/assets/selo-completo.png";
import { CollapsibleSection } from "./CollapsibleSection";

const features = [
  { icon: Heart, title: "Terapias naturais", description: "Técnicas holísticas focadas no equilíbrio do corpo e da mente." },
  { icon: Gift, title: "Cashback em tudo", description: "Ganhe de volta uma porcentagem em cada sessão e compra na loja." },
  { icon: TrendingUp, title: "Programa de fidelidade", description: "Suba de nível e desbloqueie multiplicadores de cashback exclusivos." },
  { icon: Shield, title: "Indicação premiada", description: "Indique amigos e ganhe R$ 10 de crédito para cada indicação." },
];

export const SobreSection = () => {
  const { ref, y } = useParallax({ speed: 0.2 });

  return (
    <div ref={ref} className="py-14 sm:py-20 lg:py-28 bg-background relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute top-10 right-[5%] w-96 h-96 bg-primary/4 rounded-full blur-3xl pointer-events-none hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <CollapsibleSection
          id="sobre"
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Por que escolher a{" "}
              <span className="font-serif italic text-gradient">Resinkra</span>?
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Somos mais que uma clínica de terapias — somos uma comunidade que valoriza
              seu compromisso com o bem-estar.
            </p>
          }
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                whileInView={{ rotate: [8, 6, 8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                viewport={{ once: false }}
                className="relative w-72 h-72 sm:w-80 sm:h-80"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/8 rotate-6" />
                <div className="absolute inset-0 rounded-3xl bg-card shadow-elevated border border-border/50 flex items-center justify-center p-8">
                  <img src={seloCompleto} alt="Selo Resinkra" className="w-full h-full object-contain" />
                </div>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="flex gap-3 cursor-default"
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
        </CollapsibleSection>
      </div>
    </div>
  );
};
