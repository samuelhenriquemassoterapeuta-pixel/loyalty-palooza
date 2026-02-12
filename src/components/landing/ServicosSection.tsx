import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Percent, Leaf, ChevronDown, Sparkles, Hand, SmilePlus, Package, Heart, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useServicos } from "@/hooks/useServicos";
import { useParallax } from "@/hooks/useParallax";
import { CollapsibleSection } from "./CollapsibleSection";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const categoryConfig: Record<string, { label: string; icon: typeof Leaf; color: string }> = {
  corporal: { label: "Corporal", icon: Sparkles, color: "text-primary" },
  facial: { label: "Facial", icon: SmilePlus, color: "text-accent" },
  massagem: { label: "Massagem", icon: Hand, color: "text-highlight" },
  pacote: { label: "Pacotes", icon: Package, color: "text-info" },
  terapia: { label: "Terapia", icon: Heart, color: "text-success" },
  geral: { label: "Geral", icon: Leaf, color: "text-primary" },
};

export const ServicosSection = () => {
  const { servicos, loading } = useServicos();
  const { ref, y } = useParallax({ speed: 0.15 });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    if (!servicos.length) return [];
    const grouped: Record<string, typeof servicos> = {};
    servicos.forEach((s) => {
      const cat = s.categoria || "geral";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });
    return Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
  }, [servicos]);

  const toggle = (cat: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });

  return (
    <div ref={ref} className="py-14 sm:py-20 lg:py-28 bg-card/50 relative overflow-hidden">
      {/* Parallax decorative blobs */}
      <motion.div
        style={{ y }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none hidden lg:block"
      />
      <motion.div
        style={{ y }}
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <CollapsibleSection
          id="servicos"
          
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Leaf size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Nossos serviços</span>
            </div>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Terapias que{" "}
              <span className="font-serif italic text-gradient">transformam</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Descubra nossas terapias naturais e ganhe cashback em cada sessão.
              Seu bem-estar é recompensado.
            </p>
          }
        >
          {/* Categories */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 rounded-2xl bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="space-y-3"
            >
              {categories.map(([cat, items]) => {
                const config = categoryConfig[cat] || categoryConfig.geral;
                const Icon = config.icon;
                const isOpen = expanded.has(cat);

                return (
                  <motion.div
                    key={cat}
                    variants={cardVariants}
                    className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggle(cat)}
                      className="w-full flex items-center gap-3 p-4 sm:p-5 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div className={`p-2.5 rounded-xl bg-primary/10 ${config.color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-base sm:text-lg">
                          {config.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {items.length} {items.length === 1 ? "serviço" : "serviços"}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={18} className="text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {items.map((servico) => (
                              <motion.div
                                key={servico.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="group rounded-xl border border-border/40 bg-background/60 p-4 cursor-default"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <h3 className="text-sm font-bold text-foreground leading-snug pr-2">
                                    {servico.nome}
                                  </h3>
                                  {servico.cashback_percentual > 0 && (
                                    <span className="pill text-[10px] shrink-0">
                                      <Percent size={9} />
                                      {servico.cashback_percentual}%
                                    </span>
                                  )}
                                </div>

                                {servico.descricao && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                    {servico.descricao}
                                  </p>
                                )}

                                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Clock size={12} />
                                    <span className="text-[11px]">{servico.duracao} min</span>
                                  </div>
                                  <span className="text-sm font-bold text-foreground">
                                    R$ {servico.preco.toFixed(2).replace(".", ",")}
                                  </span>
                                </div>

                                <Link to={`/auth?redirect=${encodeURIComponent(`/agendamento?servico=${encodeURIComponent(servico.nome)}`)}`} className="mt-3 block">
                                  <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
                                    <Calendar size={13} />
                                    Agendar
                                  </button>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Serviços em breve disponíveis.</p>
            </div>
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
};
