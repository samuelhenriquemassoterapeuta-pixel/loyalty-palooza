import { motion } from "framer-motion";
import { Heart, Shield, Gift, TrendingUp, CheckCircle2, Award, Clock, Leaf } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import seloCompleto from "@/assets/selo-completo.png";
import sobreBannerDefault from "@/assets/landing/sobre-banner.jpg";
import { CollapsibleSection } from "./CollapsibleSection";
import { useLandingConfig } from "@/hooks/useLandingConfig";

const defaultFeatures = [
  { icon: Heart, titulo: "Humanização em cada detalhe", descricao: "Escuta, acolhimento e cuidado genuíno. Cada pessoa é única e merece uma experiência feita sob medida." },
  { icon: Shield, titulo: "Equilíbrio e serenidade", descricao: "Um refúgio sensorial de calma e presença, pensado para inspirar equilíbrio e reconexão." },
  { icon: Gift, titulo: "Bem-estar contínuo", descricao: "O cuidado vai além da sessão: é uma experiência de ressincronização entre corpo, mente e rotina." },
  { icon: TrendingUp, titulo: "Evolução contínua", descricao: "Aprender, ajustar e seguir em movimento. A cada atendimento, refinamos a experiência." },
];

const featureIcons = [Heart, Shield, Gift, TrendingUp];

const stats = [
  { value: "+500", label: "Clientes atendidos", icon: Award },
  { value: "13+", label: "Tipos de terapias", icon: Leaf },
  { value: "98%", label: "Satisfação", icon: Heart },
  { value: "5 anos", label: "De experiência", icon: Clock },
];

export const SobreSection = () => {
  const { ref, y } = useParallax({ speed: 0.2 });
  const { config } = useLandingConfig("sobre");

  const tituloParte1 = config?.titulo_parte1 || "Equilíbrio que se sente,";
  const tituloDestaque = config?.titulo_destaque || "cuidado que permanece";
  const subtitulo = config?.subtitulo || "A Resinkra é um espaço de cuidado integral que une terapias, bem-estar e experiências sensoriais. Onde técnica e sensibilidade se unem para gerar bem-estar contínuo e duradouro.";
  const features = config?.features || defaultFeatures;
  const sobreBanner = config?.banner_url || sobreBannerDefault;

  const configStats = config?.stats?.length > 0 ? config.stats : null;
  const dynamicStats = configStats || stats;

  const configDiffs = config?.diferenciais?.length > 0 ? config.diferenciais : null;
  const diferenciais = configDiffs || [
    { text: "Ambiente sensorial projetado para desacelerar", detail: "Aromas, iluminação e sonoridade cuidadosamente calibrados." },
    { text: "Protocolos exclusivos e personalizados", detail: "Cada sessão é adaptada às suas necessidades específicas." },
    { text: "Programa de fidelidade com cashback real", detail: "Ganhe recompensas a cada sessão realizada." },
    { text: "Equipe multidisciplinar certificada", detail: "Profissionais especializados em diversas técnicas terapêuticas." },
  ];

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
              {tituloParte1}{" "}
              <span className="font-serif italic text-gradient">{tituloDestaque}</span>
            </h2>
          }
          subtitle={<p className="text-muted-foreground">{subtitulo}</p>}
        >
          {/* Banner image */}
          <div className="mb-8 rounded-2xl overflow-hidden relative aspect-[21/9]">
            <img src={sobreBanner} alt="Espaço Resinkra" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <img src={seloCompleto} alt="Selo Resinkra" className="w-12 h-12 object-contain" />
              <div>
                <p className="text-sm font-bold text-foreground drop-shadow-sm">Resinkra Spa & Terapia</p>
                <p className="text-[11px] text-foreground/80 drop-shadow-sm">Onde técnica e sensibilidade se encontram</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dynamicStats.map((stat: any, i: number) => {
              const StatIcon = stats[i % stats.length]?.icon || Award;
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10"
              >
                <StatIcon size={18} className="text-primary mx-auto mb-2" />
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </motion.div>
              );
            })}
          </div>

          {/* Features grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {features.map((feature: any, i: number) => {
                  const Icon = featureIcons[i % featureIcons.length];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="flex gap-3 cursor-default"
                    >
                      <div className="shrink-0 p-2 rounded-xl bg-primary/10 h-fit">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{feature.titulo || feature.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {feature.descricao || feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Differentials */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="p-6 rounded-2xl bg-card border border-border/50"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">Nossos diferenciais</h3>
              <div className="space-y-4">
                {diferenciais.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.text}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};
