import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, MapPin, Filter, SlidersHorizontal, Star, Users, ArrowLeft, Heart, BadgeCheck, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useMarketplaceTerapeutas, useMarketplaceFavoritos } from "../hooks/useMarketplace";
import { TerapeutaCard } from "../components/TerapeutaCard";
import { CollapsibleDashboardSection } from "@/components/home/CollapsibleDashboardSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

export default function Marketplace() {
  const navigate = useNavigate();
  const { terapeutas, loading } = useMarketplaceTerapeutas();
  const { favoritos, toggleFavorito } = useMarketplaceFavoritos();

  const [busca, setBusca] = useState("");
  const [cidadeFiltro, setCidadeFiltro] = useState("");
  const [especialidadeFiltro, setEspecialidadeFiltro] = useState("");
  const [activeTab, setActiveTab] = useState("explorar");
  const [ordenacao, setOrdenacao] = useState<"rating" | "preco" | "atendimentos">("rating");

  // Derive available filters
  const cidades = useMemo(() => 
    [...new Set(terapeutas.map(t => `${t.cidade}, ${t.estado}`))].sort(),
    [terapeutas]
  );

  const especialidades = useMemo(() => 
    [...new Set(terapeutas.flatMap(t => t.especialidades))].sort(),
    [terapeutas]
  );

  // Filter & sort
  const filtrados = useMemo(() => {
    let result = terapeutas.filter(t => {
      const matchBusca = !busca || 
        t.nome.toLowerCase().includes(busca.toLowerCase()) ||
        t.especialidades.some(e => e.toLowerCase().includes(busca.toLowerCase())) ||
        t.cidade.toLowerCase().includes(busca.toLowerCase());
      const matchCidade = !cidadeFiltro || `${t.cidade}, ${t.estado}` === cidadeFiltro;
      const matchEsp = !especialidadeFiltro || t.especialidades.includes(especialidadeFiltro);
      return matchBusca && matchCidade && matchEsp;
    });

    switch (ordenacao) {
      case "rating":
        result.sort((a, b) => b.media_avaliacoes - a.media_avaliacoes);
        break;
      case "preco":
        result.sort((a, b) => a.preco_minimo - b.preco_minimo);
        break;
      case "atendimentos":
        result.sort((a, b) => b.total_atendimentos - a.total_atendimentos);
        break;
    }

    return result;
  }, [terapeutas, busca, cidadeFiltro, especialidadeFiltro, ordenacao]);

  const favoritosTerapeutas = terapeutas.filter(t => favoritos.includes(t.id));

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Header */}
        <div className="px-4 py-4 safe-top">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Marketplace</h1>
              <p className="text-xs text-muted-foreground">Encontre terapeutas certificados</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl gap-1"
              onClick={() => navigate("/marketplace/candidatura")}
            >
              <Plus size={14} />
              Seja terapeuta
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 lg:px-8 space-y-5">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
            {/* Hero stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
              <div className="glass-card rounded-2xl p-3 text-center">
                <Users size={20} className="mx-auto text-primary mb-1" />
                <p className="text-lg font-bold text-foreground">{terapeutas.length}</p>
                <p className="text-[10px] text-muted-foreground">Terapeutas</p>
              </div>
              <div className="glass-card rounded-2xl p-3 text-center">
                <BadgeCheck size={20} className="mx-auto text-highlight mb-1" />
                <p className="text-lg font-bold text-foreground">
                  {terapeutas.filter(t => t.verificado).length}
                </p>
                <p className="text-[10px] text-muted-foreground">Verificados</p>
              </div>
              <div className="glass-card rounded-2xl p-3 text-center">
                <Star size={20} className="mx-auto text-warning mb-1" />
                <p className="text-lg font-bold text-foreground">
                  {terapeutas.length > 0 ? (terapeutas.reduce((a, t) => a + t.media_avaliacoes, 0) / terapeutas.length).toFixed(1) : "0"}
                </p>
                <p className="text-[10px] text-muted-foreground">Média geral</p>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fadeUp}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="explorar">Explorar</TabsTrigger>
                  <TabsTrigger value="favoritos">
                    Favoritos {favoritosTerapeutas.length > 0 && `(${favoritosTerapeutas.length})`}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="explorar" className="mt-4 space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder="Buscar por nome, especialidade ou cidade..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="pl-10 pr-10 rounded-xl"
                    />
                    {busca && (
                      <button onClick={() => setBusca("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        <X size={18} />
                      </button>
                    )}
                  </div>

                  {/* Filters */}
                  <CollapsibleDashboardSection
                    title="Filtros avançados"
                    icon={<SlidersHorizontal size={14} />}
                    defaultOpen={false}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={cidadeFiltro}
                          onChange={(e) => setCidadeFiltro(e.target.value)}
                          className="text-xs px-3 py-1.5 rounded-xl border border-border bg-background text-foreground"
                        >
                          <option value="">Todas as cidades</option>
                          {cidades.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        <select
                          value={especialidadeFiltro}
                          onChange={(e) => setEspecialidadeFiltro(e.target.value)}
                          className="text-xs px-3 py-1.5 rounded-xl border border-border bg-background text-foreground"
                        >
                          <option value="">Todas especialidades</option>
                          {especialidades.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>

                        <select
                          value={ordenacao}
                          onChange={(e) => setOrdenacao(e.target.value as any)}
                          className="text-xs px-3 py-1.5 rounded-xl border border-border bg-background text-foreground"
                        >
                          <option value="rating">Melhor avaliados</option>
                          <option value="preco">Menor preço</option>
                          <option value="atendimentos">Mais atendimentos</option>
                        </select>
                      </div>

                      {(cidadeFiltro || especialidadeFiltro) && (
                        <Button variant="ghost" size="sm" onClick={() => { setCidadeFiltro(""); setEspecialidadeFiltro(""); }} className="text-xs">
                          Limpar filtros
                        </Button>
                      )}
                    </div>
                  </CollapsibleDashboardSection>

                  {/* Results */}
                  {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                          <div className="aspect-[4/3] bg-muted/30" />
                          <div className="p-3 space-y-2">
                            <div className="h-4 bg-muted/30 rounded w-3/4" />
                            <div className="h-3 bg-muted/30 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filtrados.length === 0 ? (
                    <div className="text-center py-12 glass-card rounded-2xl">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum terapeuta encontrado</p>
                      <p className="text-xs text-muted-foreground mt-1">Tente ajustar os filtros</p>
                    </div>
                  ) : (
                    <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {filtrados.map((terapeuta, index) => (
                        <TerapeutaCard
                          key={terapeuta.id}
                          terapeuta={terapeuta}
                          index={index}
                          isFavorito={favoritos.includes(terapeuta.id)}
                          onToggleFavorito={() => toggleFavorito(terapeuta.id)}
                        />
                      ))}
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="favoritos" className="mt-4">
                  {favoritosTerapeutas.length === 0 ? (
                    <div className="text-center py-12 glass-card rounded-2xl">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum favorito ainda</p>
                      <Button variant="link" onClick={() => setActiveTab("explorar")} className="mt-2">
                        Explorar terapeutas
                      </Button>
                    </div>
                  ) : (
                    <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {favoritosTerapeutas.map((terapeuta, index) => (
                        <TerapeutaCard
                          key={terapeuta.id}
                          terapeuta={terapeuta}
                          index={index}
                          isFavorito={true}
                          onToggleFavorito={() => toggleFavorito(terapeuta.id)}
                        />
                      ))}
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
