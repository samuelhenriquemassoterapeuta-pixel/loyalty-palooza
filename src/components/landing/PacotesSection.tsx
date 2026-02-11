import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useParallax } from "@/hooks/useParallax";

interface Pacote {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  preco_original: number | null;
  total_sessoes: number;
  validade_dias: number | null;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } },
};

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const usePacotesPublic = () => {
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from("pacotes")
          .select("id, nome, descricao, preco, preco_original, total_sessoes, validade_dias")
          .eq("disponivel", true)
          .order("preco", { ascending: true });

        if (!error && data) setPacotes(data);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { pacotes, loading };
};

export const PacotesSection = () => {
  const navigate = useNavigate();
  const { pacotes, loading } = usePacotesPublic();
  const { ref, y } = useParallax({ speed: 0.15 });

  // Don't render section if no packages and not loading
  if (!loading && pacotes.length === 0) return null;

  const bestValueIndex =
    pacotes.length >= 3 ? 1 : pacotes.length === 2 ? 1 : 0;

  return (
    <section id="pacotes" ref={ref} className="py-14 sm:py-20 lg:py-28 bg-card/50 relative overflow-hidden">
      {/* Parallax decorative blob */}
      <motion.div
        style={{ y }}
        className="absolute -top-16 left-[8%] w-72 h-72 bg-highlight/4 rounded-full blur-3xl pointer-events-none hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/10 border border-highlight/20 mb-4">
            <Crown size={14} className="text-highlight" />
            <span className="text-xs font-semibold text-highlight">
              Pacotes
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Planos que cabem no seu{" "}
            <span className="font-serif italic text-gradient">bem-estar</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Economize com nossos pacotes de sessões e aproveite cashback em
            todas as terapias.
          </p>
        </motion.div>

        {/* Loading state */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-2xl bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch"
          >
            {pacotes.map((pacote, i) => {
              const isBestValue = i === bestValueIndex && pacotes.length > 1;
              const discount =
                pacote.preco_original && pacote.preco_original > pacote.preco
                  ? Math.round(
                      ((pacote.preco_original - pacote.preco) /
                        pacote.preco_original) *
                        100
                    )
                  : null;

              return (
                <motion.div
                  key={pacote.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                  className={`relative card-organic p-6 flex flex-col ${
                    isBestValue
                      ? "ring-2 ring-primary shadow-elevated"
                      : ""
                  }`}
                >
                  {/* Best value badge */}
                  {isBestValue && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold shadow-button flex items-center gap-1">
                      <Sparkles size={12} />
                      Mais popular
                    </div>
                  )}

                  {/* Name & description */}
                  <h3 className="text-xl font-bold text-foreground mt-2">
                    {pacote.nome}
                  </h3>
                  {pacote.descricao && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {pacote.descricao}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mt-5">
                    {pacote.preco_original &&
                      pacote.preco_original > pacote.preco && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(pacote.preco_original)}
                          </span>
                          {discount && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-highlight/10 text-highlight">
                              -{discount}%
                            </span>
                          )}
                        </div>
                      )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">
                        {formatPrice(pacote.preco)}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-5 space-y-2.5 flex-1">
                    <li className="flex items-center gap-2 text-sm text-foreground">
                      <Check
                        size={16}
                        className="text-highlight shrink-0"
                      />
                      {pacote.total_sessoes} sessões incluídas
                    </li>
                    <li className="flex items-center gap-2 text-sm text-foreground">
                      <Check
                        size={16}
                        className="text-highlight shrink-0"
                      />
                      {formatPrice(pacote.preco / pacote.total_sessoes)}/sessão
                    </li>
                    {pacote.validade_dias && (
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <Check
                          size={16}
                          className="text-highlight shrink-0"
                        />
                        Validade de {pacote.validade_dias} dias
                      </li>
                    )}
                    <li className="flex items-center gap-2 text-sm text-foreground">
                      <Check
                        size={16}
                        className="text-highlight shrink-0"
                      />
                      Cashback em todas as sessões
                    </li>
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => navigate("/auth")}
                    variant={isBestValue ? "default" : "outline"}
                    className="w-full mt-6 group"
                  >
                    Começar agora
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
