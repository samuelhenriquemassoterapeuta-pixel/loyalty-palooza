import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Search, Droplets, Flame } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtocoloCard } from "@/components/protocolos/ProtocoloCard";
import { ProtocoloDetail } from "@/components/protocolos/ProtocoloDetail";
import { useProtocolos, useUsuarioProtocolos } from "@/hooks/useProtocolos";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const Protocolos = () => {
  const { protocolos, isLoading } = useProtocolos();
  const { meus } = useUsuarioProtocolos();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");

  const selected = protocolos.find((p) => p.id === selectedId);

  const filtered = protocolos.filter((p) => {
    const matchSearch =
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(search.toLowerCase());
    const matchTipo = tipoFilter === "todos" || p.tipo === tipoFilter;
    return matchSearch && matchTipo;
  });

  const meusAtivos = meus.filter(
    (m) => m.status === "ativo" || m.status === "pausado"
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

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <AnimatePresence mode="wait">
            {selected ? (
              <ProtocoloDetail
                key="detail"
                protocolo={selected}
                onBack={() => setSelectedId(null)}
              />
            ) : (
              <motion.div
                key="list"
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Header */}
                <motion.div variants={fadeUp}>
                  <div className="flex items-center gap-2 mb-1">
                    <Activity size={22} className="text-primary" />
                    <h1 className="text-xl font-bold text-foreground">
                      Protocolos
                    </h1>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Emagrecimento & Drenagem Pós-Operatório
                  </p>
                </motion.div>

                {/* My active protocols */}
                {meusAtivos.length > 0 && (
                  <motion.div variants={fadeUp} className="space-y-2.5">
                    <p className="section-label px-1">
                      Meus Protocolos Ativos
                    </p>
                    {meusAtivos.map((m) => {
                      const prot = protocolos.find(
                        (p) => p.id === m.protocolo_id
                      );
                      if (!prot) return null;
                      return (
                        <ProtocoloCard
                          key={m.id}
                          protocolo={prot}
                          isAtivo
                          onSelect={() => setSelectedId(prot.id)}
                        />
                      );
                    })}
                  </motion.div>
                )}

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
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="todos" className="text-xs gap-1">
                        <Activity size={13} /> Todos
                      </TabsTrigger>
                      <TabsTrigger
                        value="emagrecimento"
                        className="text-xs gap-1"
                      >
                        <Flame size={13} /> Emagrecimento
                      </TabsTrigger>
                      <TabsTrigger
                        value="drenagem_pos_operatorio"
                        className="text-xs gap-1"
                      >
                        <Droplets size={13} /> Drenagem
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </motion.div>

                {/* Protocol list */}
                <motion.div variants={fadeUp} className="space-y-3">
                  <p className="section-label px-1">Todos os protocolos</p>
                  {filtered.map((p) => {
                    const meuAtivo = meus.find(
                      (m) =>
                        m.protocolo_id === p.id &&
                        (m.status === "ativo" || m.status === "pausado")
                    );
                    return (
                      <ProtocoloCard
                        key={p.id}
                        protocolo={p}
                        isAtivo={!!meuAtivo}
                        onSelect={() => setSelectedId(p.id)}
                      />
                    );
                  })}
                  {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground text-sm">
                      <Activity
                        size={36}
                        className="mx-auto mb-3 opacity-30"
                      />
                      <p>Nenhum protocolo encontrado.</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
};

export default Protocolos;
