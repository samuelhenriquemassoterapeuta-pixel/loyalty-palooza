import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, BookOpen, UtensilsCrossed, Droplets, Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDietasConteudo, usePlanosDieta, useDiarioAlimentar } from "@/hooks/useDietas";
import { toast } from "sonner";

interface ConteudoItem {
  titulo: string;
  tipo: string;
  conteudo?: string;
  itens?: string[];
}

interface Refeicao {
  refeicao: string;
  opcoes: string[];
}

// ============ Tab: Conteúdo Educativo ============
const EducativoTab = () => {
  const { conteudos, isLoading } = useDietasConteudo();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  if (isLoading) return <div className="text-center py-8 text-sm text-muted-foreground">Carregando...</div>;

  return (
    <div className="space-y-3">
      {conteudos.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-xl">
          <BookOpen size={32} className="mx-auto mb-2 opacity-30" />
          <p>Conteúdo educativo em breve.</p>
        </div>
      ) : (
        conteudos.map((c) => {
          const isOpen = expanded.has(c.id);
          const items = (c.conteudo as unknown as ConteudoItem[]) ?? [];
          return (
            <motion.div key={c.id} className="rounded-2xl border glass-card-strong overflow-hidden">
              <button
                onClick={() => toggle(c.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="p-2 rounded-xl bg-highlight/10 text-highlight">
                  <Apple size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{c.titulo}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{c.descricao}</p>
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
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                      {items.map((item, i) => (
                        <div key={i} className="space-y-1">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider">{item.titulo}</p>
                          {item.tipo === "lista" ? (
                            <ul className="space-y-1 pl-1">
                              {item.itens?.map((it, j) => (
                                <li key={j} className="text-sm text-foreground flex items-start gap-2">
                                  <span className="text-highlight mt-1.5 text-[6px]">●</span>
                                  {it}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-foreground leading-relaxed">{item.conteudo}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

// ============ Tab: Planos de Dieta ============
const PlanosTab = () => {
  const { planos, isLoading } = usePlanosDieta();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  if (isLoading) return <div className="text-center py-8 text-sm text-muted-foreground">Carregando...</div>;

  return (
    <div className="space-y-3">
      {planos.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-xl">
          <UtensilsCrossed size={32} className="mx-auto mb-2 opacity-30" />
          <p>Nenhum plano de dieta disponível.</p>
        </div>
      ) : (
        planos.map((p) => {
          const isOpen = expanded.has(p.id);
          const refeicoes = (p.refeicoes as unknown as Refeicao[]) ?? [];
          return (
            <motion.div key={p.id} className="rounded-2xl border glass-card-strong overflow-hidden">
              <button
                onClick={() => toggle(p.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="p-2 rounded-xl bg-info/10 text-info">
                  <UtensilsCrossed size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{p.nome}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] bg-info/10 text-info px-2 py-0.5 rounded-full capitalize">{p.fase}</span>
                    <span className="text-xs text-muted-foreground">{p.duracao_dias} dias</span>
                  </div>
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
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                      {p.orientacoes && (
                        <p className="text-sm text-muted-foreground italic">{p.orientacoes}</p>
                      )}
                      {refeicoes.map((r, i) => (
                        <div key={i} className="space-y-1">
                          <p className="text-xs font-semibold text-accent uppercase tracking-wider">{r.refeicao}</p>
                          <ul className="space-y-1 pl-1">
                            {r.opcoes.map((op, j) => (
                              <li key={j} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-accent mt-1.5 text-[6px]">●</span>
                                {op}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

// ============ Tab: Diário Alimentar ============
const DiarioTab = () => {
  const today = new Date().toISOString().split("T")[0];
  const { entries, isLoading, addEntry, deleteEntry } = useDiarioAlimentar(today);
  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState("cafe_manha");
  const [descricao, setDescricao] = useState("");
  const [aguaMl, setAguaMl] = useState("");

  const handleAdd = () => {
    if (!descricao.trim()) {
      toast.error("Descreva o que você comeu.");
      return;
    }
    addEntry.mutate(
      { tipo_refeicao: tipo, descricao: descricao.trim(), agua_ml: aguaMl ? parseInt(aguaMl) : 0 },
      {
        onSuccess: () => {
          setDescricao("");
          setAguaMl("");
          setShowForm(false);
          toast.success("Registro adicionado!");
        },
      }
    );
  };

  const tipoLabels: Record<string, string> = {
    cafe_manha: "☕ Café da manhã",
    lanche_manha: "🍎 Lanche manhã",
    almoco: "🍽️ Almoço",
    lanche_tarde: "🥤 Lanche tarde",
    jantar: "🌙 Jantar",
    ceia: "🍵 Ceia",
  };

  const totalAgua = entries.reduce((sum, e) => sum + (e.agua_ml ?? 0), 0);

  return (
    <div className="space-y-3">
      {/* Water tracker */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-info/5 border border-info/20">
        <Droplets size={20} className="text-info" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Água hoje</p>
          <p className="text-xs text-muted-foreground">{totalAgua} ml de 2.000 ml</p>
        </div>
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-info rounded-full transition-all"
            style={{ width: `${Math.min((totalAgua / 2000) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Add button */}
      <Button
        variant="outline"
        className="w-full gap-2 rounded-xl"
        onClick={() => setShowForm(!showForm)}
      >
        <Plus size={16} />
        Registrar refeição
      </Button>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 p-4 rounded-xl border bg-card">
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(tipoLabels).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="O que você comeu?"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="rounded-xl resize-none"
                rows={2}
              />
              <Input
                type="number"
                placeholder="Água (ml)"
                value={aguaMl}
                onChange={(e) => setAguaMl(e.target.value)}
                className="rounded-xl"
              />
              <Button onClick={handleAdd} disabled={addEntry.isPending} className="w-full rounded-xl">
                {addEntry.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries list */}
      {isLoading ? (
        <div className="text-center py-4 text-sm text-muted-foreground">Carregando...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-xl">
          <UtensilsCrossed size={32} className="mx-auto mb-2 opacity-30" />
          <p>Nenhum registro hoje.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((e) => (
            <div key={e.id} className="flex items-start gap-3 p-3 rounded-xl glass-card">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary">
                  {tipoLabels[e.tipo_refeicao] ?? e.tipo_refeicao}
                </p>
                <p className="text-sm text-foreground">{e.descricao}</p>
                {(e.agua_ml ?? 0) > 0 && (
                  <p className="text-xs text-info mt-0.5">💧 {e.agua_ml} ml</p>
                )}
              </div>
              <button
                onClick={() => deleteEntry.mutate(e.id)}
                className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============ Main Component ============
export const DietasSection = () => {
  return (
    <div className="space-y-3">
      <Tabs defaultValue="educativo" className="w-full">
        <TabsList className="w-full grid grid-cols-3 rounded-xl h-10">
          <TabsTrigger value="educativo" className="rounded-lg text-xs gap-1">
            <BookOpen size={14} />
            Educativo
          </TabsTrigger>
          <TabsTrigger value="planos" className="rounded-lg text-xs gap-1">
            <UtensilsCrossed size={14} />
            Planos
          </TabsTrigger>
          <TabsTrigger value="diario" className="rounded-lg text-xs gap-1">
            <Droplets size={14} />
            Diário
          </TabsTrigger>
        </TabsList>

        <TabsContent value="educativo" className="mt-3">
          <EducativoTab />
        </TabsContent>
        <TabsContent value="planos" className="mt-3">
          <PlanosTab />
        </TabsContent>
        <TabsContent value="diario" className="mt-3">
          <DiarioTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
