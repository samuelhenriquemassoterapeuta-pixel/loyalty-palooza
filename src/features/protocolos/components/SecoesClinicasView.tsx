import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Circle, Hand, Wrench, Dumbbell, Sparkles, Zap, Layers } from "lucide-react";
import { useSecoesClinicas, useSecaoChecklist } from "@/features/protocolos/hooks/useSecoesClinicas";

const iconMap: Record<string, React.ElementType> = {
  hand: Hand,
  wrap: Wrench,
  dumbbell: Dumbbell,
  sparkles: Sparkles,
  zap: Zap,
  layers: Layers,
};

const corMap: Record<string, string> = {
  info: "bg-info/10 text-info border-info/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  highlight: "bg-highlight/10 text-highlight border-highlight/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  primary: "bg-primary/10 text-primary border-primary/20",
};

interface SecaoContentItem {
  tipo: string;
  titulo: string;
  conteudo?: string;
  itens?: string[];
}

const SecaoChecklist = ({ secaoId, itens }: { secaoId: string; itens: string[] }) => {
  const { completedItems, toggleItem } = useSecaoChecklist(secaoId);

  return (
    <div className="space-y-2">
      {itens.map((item, i) => {
        const key = `item_${i}`;
        const done = completedItems.has(key);
        return (
          <button
            key={i}
            onClick={() => toggleItem.mutate({ itemKey: key, concluido: !done })}
            className="w-full flex items-center gap-3 text-left p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
          >
            {done ? (
              <CheckCircle2 size={18} className="text-highlight shrink-0" />
            ) : (
              <Circle size={18} className="text-muted-foreground shrink-0" />
            )}
            <span className={`text-sm ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const SecaoContent = ({ item, secaoId }: { item: SecaoContentItem; secaoId: string }) => {
  if (item.tipo === "texto") {
    return (
      <div className="space-y-1">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">{item.titulo}</p>
        <p className="text-sm text-foreground leading-relaxed">{item.conteudo}</p>
      </div>
    );
  }
  if (item.tipo === "lista") {
    return (
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">{item.titulo}</p>
        <ul className="space-y-1 pl-1">
          {item.itens?.map((it, i) => (
            <li key={i} className="text-sm text-foreground flex items-start gap-2">
              <span className="text-primary mt-1.5 text-[6px]">●</span>
              {it}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (item.tipo === "checklist") {
    return (
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">{item.titulo}</p>
        <SecaoChecklist secaoId={secaoId} itens={item.itens ?? []} />
      </div>
    );
  }
  return null;
};

export const SecoesClinicasView = ({ protocoloId }: { protocoloId: string }) => {
  const { secoes, isLoading } = useSecoesClinicas(protocoloId);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  if (isLoading) return <div className="text-center py-8 text-muted-foreground text-sm">Carregando...</div>;
  if (secoes.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="section-label px-1">Componentes do Protocolo</p>
      {secoes.map((secao) => {
        const Icon = iconMap[secao.icone ?? "layers"] ?? Layers;
        const cor = corMap[secao.cor ?? "primary"] ?? corMap.primary;
        const isOpen = expanded.has(secao.id);
        const content = (secao.conteudo as unknown as SecaoContentItem[]) ?? [];

        return (
          <motion.div
            key={secao.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border overflow-hidden glass-card-strong"
          >
            <button
              onClick={() => toggle(secao.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className={`p-2 rounded-xl border ${cor}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{secao.titulo}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{secao.descricao}</p>
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-3">
                    {content.map((item, i) => (
                      <SecaoContent key={i} item={item} secaoId={secao.id} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
