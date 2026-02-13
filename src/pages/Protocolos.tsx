import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, Search, Droplets, Accessibility, TreePine, ChevronDown, Dumbbell, ArrowRight, Apple, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { ProtocoloCard } from "@/components/protocolos/ProtocoloCard";
import { DietasSection } from "@/components/protocolos/DietasSection";
import { useProtocolos, useUsuarioProtocolos } from "@/hooks/useProtocolos";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ExamesSection } from "@/components/protocolos/ExamesSection";
import { stagger, fadeUp, gruposProtocolos } from "@/components/protocolos/protocoloConstants";

import drenagemHero from "@/assets/protocolos/drenagem-hero.jpg";
import posturalHero from "@/assets/protocolos/postural-hero.jpg";
import alongamentoHero from "@/assets/protocolos/alongamento-hero.jpg";

const iconMap = {
  Droplets,
  Accessibility,
  Stretch: TreePine,
} as const;

const heroMap: Record<string, string> = {
  drenagem_pos_operatorio: drenagemHero,
  postural: posturalHero,
  alongamento: alongamentoHero,
};

const gradientMap: Record<string, string> = {
  drenagem_pos_operatorio: "from-info/80 to-info/90",
  postural: "from-accent/80 to-accent/90",
  alongamento: "from-highlight/80 to-highlight/90",
};

const Protocolos = () => {
  const navigate = useNavigate();
  const { protocolos, isLoading } = useProtocolos();
  const { meus } = useUsuarioProtocolos();
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showDietas, setShowDietas] = useState(false);

  const toggleGroup = (tipo: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(tipo)) {
        next.delete(tipo);
      } else {
        next.add(tipo);
      }
      return next;
    });
  };

  const activeIds = new Set(
    meus
      .filter((m) => m.status === "ativo" || m.status === "pausado")
      .map((m) => m.protocolo_id)
  );

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AppLayout>
    );
  }

  // When searching, auto-expand all groups
  const isSearching = search.length > 0;

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* Header */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-1">
                <Activity size={22} className="text-primary" />
                <h1 className="text-xl font-bold text-foreground">Protocolos</h1>
                {activeIds.size > 0 && (
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    {activeIds.size} ativo{activeIds.size > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Drenagem, Alinhamento Postural & Alongamento
              </p>
            </motion.div>

            {/* Search */}
            <motion.div variants={fadeUp} className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Buscar protocolo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 rounded-xl"
              />
            </motion.div>

            {/* Groups */}
            {gruposProtocolos.map((grupo) => {
              const Icon = iconMap[grupo.icon];
              const heroImg = heroMap[grupo.tipo];
              const gradient = gradientMap[grupo.tipo];
              const isExpanded = isSearching || expandedGroups.has(grupo.tipo);

              const grupoProtocolos = protocolos
                .filter((p) => {
                  if (p.tipo !== grupo.tipo) return false;
                  if (!search) return true;
                  const s = search.toLowerCase();
                  return (
                    p.nome.toLowerCase().includes(s) ||
                    p.descricao?.toLowerCase().includes(s)
                  );
                })
                .sort((a, b) => {
                  const aActive = activeIds.has(a.id) ? 0 : 1;
                  const bActive = activeIds.has(b.id) ? 0 : 1;
                  if (aActive !== bActive) return aActive - bActive;
                  return a.nome.localeCompare(b.nome);
                });

              const activeCount = grupoProtocolos.filter((p) => activeIds.has(p.id)).length;

              if (isSearching && grupoProtocolos.length === 0) return null;

              return (
                <motion.div key={grupo.tipo} variants={fadeUp}>
                  {/* Clickable Banner */}
                  <button
                    onClick={() => toggleGroup(grupo.tipo)}
                    className="w-full text-left relative rounded-2xl overflow-hidden h-24 lg:h-28 transition-shadow duration-200 hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <img
                      src={heroImg}
                      alt={grupo.titulo}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />
                    <div className="relative z-10 flex items-center justify-between h-full px-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
                          <Icon size={22} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-white">
                            {grupo.titulo}
                          </h2>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                              {grupoProtocolos.length} protocolo{grupoProtocolos.length !== 1 ? "s" : ""}
                            </span>
                            {activeCount > 0 && (
                              <span className="text-[10px] bg-white/30 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-medium">
                                {activeCount} ativo{activeCount > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-1.5"
                      >
                        <ChevronDown size={18} className="text-white" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable Cards */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-3">
                          {/* CTA for Drenagem section - Dietas */}
                          {grupo.tipo === "drenagem_pos_operatorio" && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Button
                                onClick={() => setShowDietas(!showDietas)}
                                variant={showDietas ? "default" : "outline"}
                                className="w-full gap-2 rounded-xl h-12 text-sm font-semibold shadow-md"
                              >
                                <Apple size={18} />
                                {showDietas ? "Ocultar Dietas Personalizadas" : "Dietas Personalizadas"}
                                <ArrowRight size={16} className={showDietas ? "rotate-90" : ""} />
                              </Button>

                              <AnimatePresence>
                                {showDietas && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden mt-3"
                                  >
                                    <DietasSection />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          )}

                          {/* CTA for Alongamento section */}
                          {grupo.tipo === "alongamento" && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Button
                                onClick={() => navigate("/alongamento")}
                                className="w-full gap-2 bg-highlight/20 hover:bg-highlight/30 text-highlight border border-highlight/30 rounded-xl h-12 text-sm font-semibold shadow-md"
                              >
                                <Dumbbell size={18} />
                                Acessar Exercícios de Alongamento
                                <ArrowRight size={16} />
                              </Button>
                            </motion.div>
                          )}

                          {grupoProtocolos.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                              {grupoProtocolos.map((p, i) => (
                                <motion.div
                                  key={p.id}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.05, duration: 0.2 }}
                                >
                                  <ProtocoloCard
                                    protocolo={p}
                                    isAtivo={activeIds.has(p.id)}
                                    onSelect={() => navigate(`/protocolos/${p.id}`)}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 text-muted-foreground text-sm border border-dashed rounded-xl">
                              <p>Nenhum protocolo nesta categoria.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Empty state when search returns nothing */}
            {search &&
              gruposProtocolos.every(
                (g) =>
                  !protocolos.some(
                    (p) =>
                      p.tipo === g.tipo &&
                      (p.nome.toLowerCase().includes(search.toLowerCase()) ||
                        p.descricao?.toLowerCase().includes(search.toLowerCase()))
                  )
              ) && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  <Activity size={36} className="mx-auto mb-3 opacity-30" />
                  <p>Nenhum protocolo encontrado.</p>
                </div>
              )}

            {/* Seção geral de exames */}
            <motion.div variants={fadeUp} className="mt-2">
              <ExamesSection />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Protocolos;
