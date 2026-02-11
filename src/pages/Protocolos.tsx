import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, Search, Droplets, Accessibility, TreePine } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { ProtocoloCard } from "@/components/protocolos/ProtocoloCard";
import { useProtocolos, useUsuarioProtocolos } from "@/hooks/useProtocolos";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { stagger, fadeUp, gruposProtocolos } from "@/components/protocolos/protocoloConstants";

const iconMap = {
  Droplets,
  Accessibility,
  Stretch: TreePine,
} as const;

const Protocolos = () => {
  const navigate = useNavigate();
  const { protocolos, isLoading } = useProtocolos();
  const { meus } = useUsuarioProtocolos();
  const [search, setSearch] = useState("");

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

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-6"
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

              if (search && grupoProtocolos.length === 0) return null;

              return (
                <motion.div key={grupo.tipo} variants={fadeUp} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className={grupo.colorClass} />
                    <h2 className="text-base font-semibold text-foreground">
                      {grupo.titulo}
                    </h2>
                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      {grupoProtocolos.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground -mt-1">
                    {grupo.descricao}
                  </p>

                  {grupoProtocolos.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                      {grupoProtocolos.map((p) => (
                        <ProtocoloCard
                          key={p.id}
                          protocolo={p}
                          isAtivo={activeIds.has(p.id)}
                          onSelect={() => navigate(`/protocolos/${p.id}`)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground text-sm border border-dashed rounded-xl">
                      <p>Nenhum protocolo nesta categoria.</p>
                    </div>
                  )}
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
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Protocolos;
