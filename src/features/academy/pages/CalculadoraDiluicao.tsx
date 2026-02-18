import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, FlaskConical, Calculator, History, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppLayout } from "@/components/AppLayout";

/* ─── Concentrações seguras por uso ─── */
const concentracoes: Record<string, { label: string; max: number; desc: string }> = {
  facial: { label: "Facial", max: 1, desc: "Máx 1% — pele sensível" },
  corporal: { label: "Corporal", max: 3, desc: "Máx 3% — uso geral" },
  pontual: { label: "Pontual", max: 5, desc: "Máx 5% — área localizada" },
  capilar: { label: "Capilar", max: 2, desc: "Máx 2% — couro cabeludo" },
  banho: { label: "Banho", max: 2, desc: "Máx 2% — imersão" },
  difusor: { label: "Difusor", max: 100, desc: "Gotas puras no aparelho" },
  inalacao: { label: "Inalação", max: 100, desc: "1-3 gotas em água quente" },
};

/* ─── Óleos essenciais populares ─── */
const oleosEssenciais = [
  "Lavanda", "Tea Tree", "Eucalipto", "Hortelã-pimenta", "Alecrim",
  "Limão", "Laranja doce", "Ylang Ylang", "Gerânio", "Camomila",
  "Cedro", "Sândalo", "Olíbano", "Rosa", "Bergamota",
  "Palmarosa", "Patchouli", "Copaíba", "Lemongrass", "Cipreste",
];

/* ─── Óleos vegetais carreadores ─── */
const oleosVegetais = [
  "Amêndoas doces", "Jojoba", "Coco fracionado", "Semente de uva",
  "Abacate", "Rosa Mosqueta", "Argan", "Girassol", "Gergelim",
  "Calêndula", "Prímula", "Macadâmia",
];

interface BlendItem {
  oleo: string;
  gotas: number;
}

interface HistoryEntry {
  date: string;
  uso: string;
  vegetal: string;
  volumeMl: number;
  concentracao: number;
  blend: BlendItem[];
  totalGotas: number;
}

const STORAGE_KEY = "resinkra_calc_diluicao_history";

function loadHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

export default function CalculadoraDiluicao() {
  const navigate = useNavigate();
  const [uso, setUso] = useState("corporal");
  const [vegetal, setVegetal] = useState("Amêndoas doces");
  const [volumeMl, setVolumeMl] = useState(30);
  const [concentracao, setConcatracao] = useState(2);
  const [blend, setBlend] = useState<BlendItem[]>([{ oleo: "Lavanda", gotas: 0 }]);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

  const config = concentracoes[uso];

  // 1 gota ≈ 0.05 ml; gotas totais = (volume * concentração%) / 0.05
  const totalGotasRecomendadas = useMemo(() => {
    if (uso === "difusor" || uso === "inalacao") return 0;
    return Math.round((volumeMl * (concentracao / 100)) / 0.05);
  }, [volumeMl, concentracao, uso]);

  const totalGotasBlend = blend.reduce((a, b) => a + b.gotas, 0);
  const isDifusor = uso === "difusor" || uso === "inalacao";

  const addOleo = () => {
    setBlend((prev) => [...prev, { oleo: oleosEssenciais[prev.length % oleosEssenciais.length], gotas: 0 }]);
  };

  const removeOleo = (idx: number) => {
    setBlend((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateBlend = (idx: number, field: keyof BlendItem, value: any) => {
    setBlend((prev) => prev.map((b, i) => (i === idx ? { ...b, [field]: value } : b)));
  };

  const autoDistribute = () => {
    if (blend.length === 0 || totalGotasRecomendadas === 0) return;
    const perOleo = Math.floor(totalGotasRecomendadas / blend.length);
    const remainder = totalGotasRecomendadas % blend.length;
    setBlend((prev) =>
      prev.map((b, i) => ({ ...b, gotas: perOleo + (i < remainder ? 1 : 0) }))
    );
  };

  const saveToHistory = () => {
    const entry: HistoryEntry = {
      date: new Date().toLocaleDateString("pt-BR"),
      uso,
      vegetal,
      volumeMl,
      concentracao,
      blend: [...blend],
      totalGotas: totalGotasBlend,
    };
    const updated = [entry, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} />
              </Button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                  <FlaskConical size={22} />
                  Calculadora de Diluição
                </h1>
                <p className="text-sm text-muted-foreground">Óleos essenciais + veículo carreador</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowHistory(!showHistory)}
                className="relative"
              >
                <History size={18} />
                {history.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                    {history.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
          {showHistory ? (
            /* ─── History View ─── */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <History size={18} /> Histórico de Blends
              </h2>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum blend salvo ainda</p>
              ) : (
                history.map((h, i) => (
                  <Card key={i} className="p-4 border-border/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {concentracoes[h.uso]?.label} · {h.concentracao}% · {h.volumeMl}ml
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {h.vegetal} · {h.totalGotas} gotas · {h.date}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {h.blend.map((b, bi) => (
                        <span key={bi} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {b.oleo} ({b.gotas}g)
                        </span>
                      ))}
                    </div>
                  </Card>
                ))
              )}
            </motion.div>
          ) : (
            /* ─── Calculator View ─── */
            <>
              {/* Tipo de uso */}
              <Card className="p-4 border-border/50 space-y-3">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Calculator size={16} className="text-primary" /> Tipo de Uso
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(concentracoes).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setUso(key);
                        if (val.max < concentracao) setConcatracao(val.max);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        uso === key
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{config.desc}</p>
              </Card>

              {!isDifusor && (
                <>
                  {/* Óleo vegetal + Volume */}
                  <Card className="p-4 border-border/50 space-y-4">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Droplets size={16} className="text-accent" /> Óleo Vegetal (Carreador)
                    </label>
                    <Select value={vegetal} onValueChange={setVegetal}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {oleosVegetais.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-muted-foreground">Volume (ml)</label>
                        <Input
                          type="number"
                          min={1}
                          max={500}
                          value={volumeMl}
                          onChange={(e) => setVolumeMl(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Concentração (%)</label>
                        <Input
                          type="number"
                          min={0.5}
                          max={config.max}
                          step={0.5}
                          value={concentracao}
                          onChange={(e) => setConcatracao(Math.min(Number(e.target.value), config.max))}
                        />
                      </div>
                    </div>

                    {/* Result */}
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
                      <p className="text-xs text-muted-foreground">Total de gotas recomendadas</p>
                      <p className="text-3xl font-bold text-primary">{totalGotasRecomendadas}</p>
                      <p className="text-xs text-muted-foreground">
                        {volumeMl}ml × {concentracao}% = {(volumeMl * concentracao / 100).toFixed(2)}ml de OE
                      </p>
                    </div>
                  </Card>
                </>
              )}

              {/* Blend Builder */}
              <Card className="p-4 border-border/50 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <FlaskConical size={16} className="text-highlight" /> Seu Blend
                  </label>
                  {!isDifusor && (
                    <Button variant="outline" size="sm" onClick={autoDistribute}>
                      Distribuir igual
                    </Button>
                  )}
                </div>

                {blend.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Select value={b.oleo} onValueChange={(v) => updateBlend(i, "oleo", v)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {oleosEssenciais.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="w-20"
                      value={b.gotas}
                      onChange={(e) => updateBlend(i, "gotas", Number(e.target.value))}
                      placeholder="Gotas"
                    />
                    {blend.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => removeOleo(i)} className="shrink-0">
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    )}
                  </motion.div>
                ))}

                <Button variant="outline" size="sm" onClick={addOleo} className="w-full">
                  <Plus size={14} /> Adicionar óleo
                </Button>

                {/* Summary */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <span className="text-sm text-foreground font-medium">Total no blend</span>
                  <span className={`text-lg font-bold ${
                    !isDifusor && totalGotasBlend > totalGotasRecomendadas
                      ? "text-destructive"
                      : "text-primary"
                  }`}>
                    {totalGotasBlend} gotas
                  </span>
                </div>

                {!isDifusor && totalGotasBlend > totalGotasRecomendadas && (
                  <p className="text-xs text-destructive">
                    ⚠️ Acima do recomendado ({totalGotasRecomendadas} gotas para {concentracao}%)
                  </p>
                )}

                <Button onClick={saveToHistory} className="w-full">
                  Salvar no histórico
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
