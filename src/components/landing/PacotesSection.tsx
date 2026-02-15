import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, ArrowRight, Gift, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useParallax } from "@/hooks/useParallax";
import { CollapsibleSection } from "./CollapsibleSection";
import { useLandingConfig } from "@/hooks/useLandingConfig";
import pacotesBannerDefault from "@/assets/landing/pacotes-banner.jpg";

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

const benefits = [
  { icon: Gift, title: "Cashback garantido", desc: "Ganhe de volta em todas as sessões" },
  { icon: Shield, title: "Validade flexível", desc: "Use no seu ritmo, sem pressa" },
  { icon: TrendingUp, title: "Economia real", desc: "Até 30% de desconto vs. avulso" },
];

export const PacotesSection = () => {
  const navigate = useNavigate();
  const { pacotes, loading } = usePacotesPublic();
  const { ref, y } = useParallax({ speed: 0.15 });
  const { config } = useLandingConfig("pacotes");
  const pacotesBanner = config?.banner_url || pacotesBannerDefault;

  if (!loading && pacotes.length === 0) return null;

  const bestValueIndex =
    pacotes.length >= 3 ? 1 : pacotes.length === 2 ? 1 : 0;

  return (
    <div ref={ref} className="py-14 sm:py-20 lg:py-28 bg-card/50 relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -top-16 left-[8%] w-72 h-72 bg-highlight/4 rounded-full blur-3xl pointer-events-none hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <CollapsibleSection
          id="pacotes"
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-highlight/10 border border-highlight/20">
              <Crown size={14} className="text-highlight" />
              <span className="text-xs font-semibold text-highlight">Pacotes</span>
            </div>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Planos que cabem no seu{" "}
              <span className="font-serif italic text-gradient">bem-estar</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Economize com nossos pacotes de sessões e aproveite cashback em
              todas as terapias.
            </p>
          }
        >
          {/* Banner */}
          <div className="mb-8 rounded-2xl overflow-hidden relative aspect-[21/9]">
            <img src={pacotesBanner} alt="Pacotes de bem-estar" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6">
              <p className="text-lg font-bold text-foreground drop-shadow-sm">Invista no seu bem-estar</p>
              <p className="text-xs text-foreground/80 drop-shadow-sm mt-1">Pacotes com economia real e cashback em cada sessão</p>
            </div>
          </div>

          {/* Benefits row */}
          <div className="mb-8 grid grid-cols-3 gap-3">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center p-3 sm:p-4 rounded-xl bg-highlight/5 border border-highlight/10"
              >
                <b.icon size={18} className="text-highlight mx-auto mb-2" />
                <p className="text-xs font-bold text-foreground">{b.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-muted/50 animate-pulse" />
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
                      isBestValue ? "ring-2 ring-primary shadow-elevated" : ""
                    }`}
                  >
                    {isBestValue && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold shadow-button flex items-center gap-1">
                        <Sparkles size={12} />
                        Mais popular
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-foreground mt-2">
                      {pacote.nome}
                    </h3>
                    {pacote.descricao && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {pacote.descricao}
                      </p>
                    )}

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

                    <ul className="mt-5 space-y-2.5 flex-1">
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={16} className="text-highlight shrink-0" />
                        {pacote.total_sessoes} sessões incluídas
                      </li>
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={16} className="text-highlight shrink-0" />
                        {formatPrice(pacote.preco / pacote.total_sessoes)}/sessão
                      </li>
                      {pacote.validade_dias && (
                        <li className="flex items-center gap-2 text-sm text-foreground">
                          <Check size={16} className="text-highlight shrink-0" />
                          Validade de {pacote.validade_dias} dias
                        </li>
                      )}
                      <li className="flex items-center gap-2 text-sm text-foreground">
                        <Check size={16} className="text-highlight shrink-0" />
                        Cashback em todas as sessões
                      </li>
                    </ul>

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
        </CollapsibleSection>
      </div>
    </div>
  );
};
