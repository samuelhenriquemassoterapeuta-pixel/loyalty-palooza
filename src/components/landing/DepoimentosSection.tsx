import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useParallax } from "@/hooks/useParallax";
import { CollapsibleSection } from "./CollapsibleSection";

interface Depoimento {
  nome: string;
  nota: number;
  comentario: string;
}

const depoimentosFallback: Depoimento[] = [
  { nome: "Camila R.", nota: 5, comentario: "A Resinkra mudou minha rotina de autocuidado. As terapias são incríveis e ainda ganho cashback!" },
  { nome: "Lucas M.", nota: 5, comentario: "Profissionais excelentes e o programa de fidelidade é um diferencial enorme. Super recomendo." },
  { nome: "Juliana S.", nota: 5, comentario: "Ambiente acolhedor, atendimento impecável. O app facilita muito o agendamento e o acompanhamento." },
  { nome: "Rafael T.", nota: 4, comentario: "Indiquei para três amigos e já acumulei um bom saldo de cashback. Experiência completa!" },
];

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

const useDepoimentos = () => {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>(depoimentosFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const { data, error } = await supabase
          .from("avaliacoes")
          .select("nota, comentario")
          .not("comentario", "is", null)
          .gte("nota", 4)
          .order("created_at", { ascending: false })
          .limit(8);

        if (error || !data || data.length < 2) { setLoading(false); return; }

        const realDepoimentos: Depoimento[] = data
          .filter((a) => a.comentario && a.comentario.trim().length > 10)
          .map((a) => ({ nome: "Cliente Resinkra", nota: a.nota, comentario: a.comentario! }));

        if (realDepoimentos.length >= 2) setDepoimentos(realDepoimentos.slice(0, 4));
      } catch {
        // Keep fallback
      } finally {
        setLoading(false);
      }
    };
    fetchAvaliacoes();
  }, []);

  return { depoimentos, loading };
};

export const DepoimentosSection = () => {
  const { depoimentos } = useDepoimentos();
  const { ref, y } = useParallax({ speed: 0.12 });

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
              <span className="text-xs font-semibold text-accent">Depoimentos</span>
            </div>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              O que nossos clientes{" "}
              <span className="font-serif italic text-gradient">dizem</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Histórias reais de quem já transformou seu bem-estar com a Resinkra.
            </p>
          }
        >
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
