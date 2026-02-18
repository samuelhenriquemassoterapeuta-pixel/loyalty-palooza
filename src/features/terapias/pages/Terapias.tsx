import { motion } from "framer-motion";
import { Leaf, Search } from "lucide-react";
import { useState } from "react";
import { useTerapias } from "@/features/terapias/hooks/useTerapias";
import { TerapiaCard } from "@/features/terapias/components/TerapiaCard";

const Terapias = () => {
  const { terapias, isLoading } = useTerapias();
  const [search, setSearch] = useState("");

  const filtered = terapias.filter(
    (t) =>
      t.nome.toLowerCase().includes(search.toLowerCase()) ||
      t.subtitulo?.toLowerCase().includes(search.toLowerCase()) ||
      t.descricao?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background gradient-hero">
      {/* Hero */}
      <div className="bg-card/50 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Leaf size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Nossas Terapias</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Conheça nossas{" "}
              <span className="font-serif italic text-gradient">terapias</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Descubra cada técnica em detalhes: benefícios, indicações, contraindicações e como funcionam.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-6 max-w-md mx-auto"
          >
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar terapia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-3 pb-28">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            className="space-y-3"
          >
            {filtered.map((terapia, i) => (
              <motion.div
                key={terapia.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
                }}
              >
                <TerapiaCard terapia={terapia} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Search size={40} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-medium text-foreground mb-1">Nenhuma terapia encontrada</p>
            <p className="text-sm text-muted-foreground">Tente outra palavra-chave</p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-3 text-sm text-primary hover:underline">
                Limpar busca
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Terapias;
