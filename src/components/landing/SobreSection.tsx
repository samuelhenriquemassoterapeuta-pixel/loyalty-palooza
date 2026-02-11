import { motion } from "framer-motion";
import { Heart, Shield, Gift, TrendingUp } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import seloCompleto from "@/assets/selo-completo.png";
import { CollapsibleSection } from "./CollapsibleSection";

const features = [
  { icon: Heart, title: "Humanização em cada detalhe", description: "Escuta, acolhimento e cuidado genuíno. Cada pessoa é única e merece uma experiência feita sob medida." },
  { icon: Shield, title: "Equilíbrio e serenidade", description: "Um refúgio sensorial de calma e presença, pensado para inspirar equilíbrio e reconexão." },
  { icon: Gift, title: "Bem-estar contínuo", description: "O cuidado vai além da sessão: é uma experiência de ressincronização entre corpo, mente e rotina." },
  { icon: TrendingUp, title: "Evolução contínua", description: "Aprender, ajustar e seguir em movimento. A cada atendimento, refinamos a experiência." },
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
              Equilíbrio que se sente,{" "}
              <span className="font-serif italic text-gradient">cuidado que permanece</span>
            </h2>
          }
          subtitle={
          <p className="text-muted-foreground">
              A Resinkra é um espaço de cuidado integral que une terapias, bem-estar e experiências 
              sensoriais. Onde técnica e sensibilidade se unem para gerar bem-estar contínuo e duradouro.
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
