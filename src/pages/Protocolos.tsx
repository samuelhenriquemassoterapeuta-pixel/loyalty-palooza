import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, Search, Droplets, Flame, Accessibility } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtocoloCard } from "@/components/protocolos/ProtocoloCard";
import { useProtocolos, useUsuarioProtocolos } from "@/hooks/useProtocolos";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { stagger, fadeUp } from "@/components/protocolos/protocoloConstants";

const Protocolos = () => {
  const navigate = useNavigate();
  const { protocolos, isLoading } = useProtocolos();
  const { meus } = useUsuarioProtocolos();
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");

  const filtered = protocolos.filter((p) => {
    const matchSearch =
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(search.toLowerCase());
    const matchTipo = tipoFilter === "todos" || p.tipo === tipoFilter;
    return matchSearch && matchTipo;
  });

  const activeIds = new Set(
    meus
      .filter((m) => m.status === "ativo" || m.status === "pausado")
      .map((m) => m.protocolo_id)
  );

  const sorted = [...filtered].sort((a, b) => {
    const aActive = activeIds.has(a.id) ? 0 : 1;
    const bActive = activeIds.has(b.id) ? 0 : 1;
    if (aActive !== bActive) return aActive - bActive;
    return a.nome.localeCompare(b.nome);
  });

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
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
                Emagrecimento, Drenagem & Alinhamento Postural
              </p>
            </motion.div>

            {/* Search & filter */}
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

            <motion.div variants={fadeUp}>
              <Tabs value={tipoFilter} onValueChange={setTipoFilter}>
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="todos" className="text-xs gap-1">
                    <Activity size={13} /> Todos
                  </TabsTrigger>
                  <TabsTrigger value="emagrecimento" className="text-xs gap-1">
                    <Flame size={13} /> Emagrecer
                  </TabsTrigger>
                  <TabsTrigger value="drenagem_pos_operatorio" className="text-xs gap-1">
                    <Droplets size={13} /> Drenagem
                  </TabsTrigger>
                  <TabsTrigger value="postural" className="text-xs gap-1">
                    <Accessibility size={13} /> Postural
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            {/* Protocol grid — responsive: 1 col mobile, 2 col desktop */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3"
            >
              {sorted.map((p) => (
                <ProtocoloCard
                  key={p.id}
                  protocolo={p}
                  isAtivo={activeIds.has(p.id)}
                  onSelect={() => navigate(`/protocolos/${p.id}`)}
                />
              ))}
            </motion.div>

            {sorted.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                <Activity size={36} className="mx-auto mb-3 opacity-30" />
                <p>Nenhum protocolo encontrado.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Protocolos;
