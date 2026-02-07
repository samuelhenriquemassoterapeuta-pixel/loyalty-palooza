import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Depoimento {
  nome: string;
  nota: number;
  comentario: string;
}

const depoimentosFallback: Depoimento[] = [
  {
    nome: "Camila R.",
    nota: 5,
    comentario:
      "A Resinkra mudou minha rotina de autocuidado. As terapias são incríveis e ainda ganho cashback!",
  },
  {
    nome: "Lucas M.",
    nota: 5,
    comentario:
      "Profissionais excelentes e o programa de fidelidade é um diferencial enorme. Super recomendo.",
  },
  {
    nome: "Juliana S.",
    nota: 5,
    comentario:
      "Ambiente acolhedor, atendimento impecável. O app facilita muito o agendamento e o acompanhamento.",
  },
  {
    nome: "Rafael T.",
    nota: 4,
    comentario:
      "Indiquei para três amigos e já acumulei um bom saldo de cashback. Experiência completa!",
  },
];

/** Abbreviate name for privacy: "Samuel Henrique" → "Samuel H." */
const abbreviateName = (nome: string | null): string => {
  if (!nome) return "Cliente";
  const parts = nome.trim().split(/\s+/);
  if (parts.length <= 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
};

const StarRating = ({ nota }: { nota: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < nota ? "text-warning fill-warning" : "text-border"}
      />
    ))}
  </div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const useDepoimentos = () => {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>(depoimentosFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        // Fetch reviews that have comments (avaliacoes table is publicly readable)
        const { data, error } = await supabase
          .from("avaliacoes")
          .select("nota, comentario")
          .not("comentario", "is", null)
          .gte("nota", 4)
          .order("created_at", { ascending: false })
          .limit(8);

        if (error || !data || data.length < 2) {
          // Not enough real reviews, keep fallback
          setLoading(false);
          return;
        }

        // Since profiles RLS requires auth, use anonymized names
        const realDepoimentos: Depoimento[] = data
          .filter((a) => a.comentario && a.comentario.trim().length > 10)
          .map((a) => ({
            nome: "Cliente Resinkra",
            nota: a.nota,
            comentario: a.comentario!,
          }));

        if (realDepoimentos.length >= 2) {
          setDepoimentos(realDepoimentos.slice(0, 4));
        }
      } catch {
        // Keep fallback on any error
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

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Quote size={14} className="text-accent" />
            <span className="text-xs font-semibold text-accent">Depoimentos</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            O que nossos clientes{" "}
            <span className="font-serif italic text-gradient">dizem</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de quem já transformou seu bem-estar com a Resinkra.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {depoimentos.map((dep, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="card-organic hover-lift p-6 flex flex-col"
            >
              <Quote size={24} className="text-primary/20 mb-3" />

              <p className="text-sm text-foreground leading-relaxed flex-1">
                "{dep.comentario}"
              </p>

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
      </div>
    </section>
  );
};
