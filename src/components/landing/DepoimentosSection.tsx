import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart, Users, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useParallax } from "@/hooks/useParallax";
import { CollapsibleSection } from "./CollapsibleSection";
import { useLandingConfig } from "@/hooks/useLandingConfig";
import depoimentosBannerDefault from "@/assets/landing/depoimentos-banner.jpg";

interface Depoimento {
  nome: string;
  nota: number;
  comentario: string;
}

const StarRating = ({ nota }: { nota: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < nota ? "text-warning fill-warning" : "text-border"} />
    ))}
  </div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, rotateX: 8 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};

const defaultFallback: Depoimento[] = [
  { nome: "Camila R.", nota: 5, comentario: "A Resinkra mudou minha rotina de autocuidado. As terapias são incríveis e ainda ganho cashback!" },
  { nome: "Lucas M.", nota: 5, comentario: "Profissionais excelentes e o programa de fidelidade é um diferencial enorme. Super recomendo." },
  { nome: "Juliana S.", nota: 5, comentario: "Ambiente acolhedor, atendimento impecável. O app facilita muito o agendamento e o acompanhamento." },
  { nome: "Rafael T.", nota: 4, comentario: "Indiquei para três amigos e já acumulei um bom saldo de cashback. Experiência completa!" },
];

const socialProof = [
  { icon: Star, value: "4.9", label: "Nota média" },
  { icon: Users, value: "+500", label: "Clientes" },
  { icon: Award, value: "98%", label: "Recomendam" },
];

export const DepoimentosSection = () => {
  const { config } = useLandingConfig("depoimentos");
  const { ref, y } = useParallax({ speed: 0.12 });

  const badgeText = config?.badge || "Depoimentos";
  const tituloParte1 = config?.titulo_parte1 || "O que nossos clientes";
  const tituloDestaque = config?.titulo_destaque || "dizem";
  const subtitulo = config?.subtitulo || "Histórias reais de quem já transformou seu bem-estar com a Resinkra.";
  const fallbackDeps: Depoimento[] = config?.depoimentos_fallback || defaultFallback;
  const depoimentosBanner = config?.banner_url || depoimentosBannerDefault;

  const [depoimentos, setDepoimentos] = useState<Depoimento[]>(fallbackDeps);

  useEffect(() => {
    setDepoimentos(fallbackDeps);
    const fetchAvaliacoes = async () => {
      try {
        const { data, error } = await supabase
          .from("avaliacoes")
          .select("nota, comentario")
          .not("comentario", "is", null)
          .gte("nota", 4)
          .order("created_at", { ascending: false })
          .limit(8);

        if (error || !data || data.length < 2) return;

        const realDepoimentos: Depoimento[] = data
          .filter((a) => a.comentario && a.comentario.trim().length > 10)
          .map((a) => ({ nome: "Cliente Resinkra", nota: a.nota, comentario: a.comentario! }));

        if (realDepoimentos.length >= 2) setDepoimentos(realDepoimentos.slice(0, 4));
      } catch {
        // Keep fallback
      }
    };
    fetchAvaliacoes();
  }, [config]);

  return (
    <div ref={ref} className="py-14 sm:py-20 lg:py-28 bg-background relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -top-32 left-[10%] w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <CollapsibleSection
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Quote size={14} className="text-accent" />
              <span className="text-xs font-semibold text-accent">{badgeText}</span>
            </div>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {tituloParte1}{" "}
              <span className="font-serif italic text-gradient">{tituloDestaque}</span>
            </h2>
          }
          subtitle={<p className="text-muted-foreground">{subtitulo}</p>}
        >
          {/* Banner */}
          <div className="mb-8 rounded-2xl overflow-hidden relative aspect-[21/9]">
            <img src={depoimentosBanner} alt="Comunidade Resinkra" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-background/30" />
            <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-10">
              {socialProof.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="text-center"
                >
                  <item.icon size={20} className="text-primary mx-auto mb-1" />
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            style={{ perspective: 1000 }}
          >
            {depoimentos.map((dep, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                className="card-organic p-6 flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Quote size={24} className="text-primary/20 mb-3" />
                <p className="text-sm text-foreground leading-relaxed flex-1">"{dep.comentario}"</p>
                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">{dep.nome}</p>
                    <p className="text-[11px] text-muted-foreground">Cliente Resinkra</p>
                  </div>
                  <StarRating nota={dep.nota} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CollapsibleSection>
      </div>
    </div>
  );
};
