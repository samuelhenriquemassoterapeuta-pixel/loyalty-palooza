import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  Trophy,
  Lightbulb,
  Heart,
  Package,
  Target,
  MessageCircle,
  BarChart3,
  GraduationCap,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/AppLayout";
import { cursoVendasData, type ModuloContent } from "@/data/cursoVendasContent";
import { useCursoVendas } from "@/hooks/useCursoVendas";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NarracaoPlayer } from "@/components/curso/NarracaoPlayer";

const iconMap: Record<string, React.ElementType> = {
  Lightbulb,
  Heart,
  Package,
  Target,
  MessageCircle,
  BarChart3,
};

function AulaView({
  modulo,
  aulaIndex,
  onBack,
  isComplete,
  onToggle,
}: {
  modulo: ModuloContent;
  aulaIndex: number;
  onBack: () => void;
  isComplete: boolean;
  onToggle: () => void;
}) {
  const aula = modulo.aulas[aulaIndex];

  // Simple markdown-like renderer
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-bold text-primary mt-6 mb-3">{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold mt-5 mb-2">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-primary/30 pl-4 py-1 my-2 text-sm italic text-muted-foreground bg-primary/5 rounded-r-lg">{line.slice(2)}</blockquote>;
      if (line.startsWith("- [ ] ")) return <div key={i} className="flex items-center gap-2 text-sm my-1"><Circle size={14} className="text-muted-foreground" /><span>{line.slice(6)}</span></div>;
      if (line.startsWith("- ")) return <li key={i} className="text-sm ml-4 my-1 list-disc">{line.slice(2)}</li>;
      if (line.startsWith("| ") && line.includes("|")) {
        const cells = line.split("|").filter(Boolean).map(c => c.trim());
        if (cells.every(c => c.match(/^[-]+$/))) return null;
        return <div key={i} className="grid grid-cols-2 gap-2 text-xs my-0.5">{cells.map((c, j) => <span key={j} className="bg-muted/50 px-2 py-1 rounded">{c}</span>)}</div>;
      }
      if (line.startsWith("❌ ")) return <p key={i} className="text-sm my-1 text-destructive">{line}</p>;
      if (line.startsWith("✅ ")) return <p key={i} className="text-sm my-1 text-primary">{line}</p>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="text-sm font-bold my-1">{line.slice(2, -2)}</p>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm text-muted-foreground my-1">{line}</p>;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft size={20} /></Button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">{modulo.titulo}</p>
          <h2 className="text-base font-bold truncate">{aula.titulo}</h2>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">{aula.duracaoMinutos} min</span>
      </div>

      {/* Narração por IA */}
      <div className="mb-4">
        <NarracaoPlayer texto={aula.conteudo} titulo={aula.titulo} />
      </div>

      {aula.videoUrl && (
        <Card className="mb-4 overflow-hidden">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <Play size={48} className="text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Vídeo em breve</span>
          </div>
        </Card>
      )}

      <Card className="p-4 mb-4">{renderContent(aula.conteudo)}</Card>

      <div className="flex items-center gap-3">
        <Button
          onClick={onToggle}
          variant={isComplete ? "default" : "outline"}
          className="flex-1 gap-2"
        >
          {isComplete ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          {isComplete ? "Aula concluída ✓" : "Marcar como concluída"}
        </Button>

        {aulaIndex < modulo.aulas.length - 1 && (
          <Button variant="ghost" size="icon" onClick={() => {/* handled by parent */}}>
            <ChevronRight size={20} />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default function CursoVendas({ embedded = false }: { embedded?: boolean }) {
  const navigate = useNavigate();
  const { loading, toggleAula, isAulaConcluida, aulasFeitas, totalAulas: _totalAulas, percentual } = useCursoVendas();
  const [selectedModulo, setSelectedModulo] = useState<number | null>(null);
  const [selectedAula, setSelectedAula] = useState<number | null>(null);

  const totalAulas = cursoVendasData.reduce((acc, m) => acc + m.aulas.length, 0);

  // Build a flat aula id list using modulo+aula indices as keys
  const getAulaKey = (mi: number, ai: number) => `${mi}-${ai}`;

  // Persist progress to localStorage for reliability (DB tables may not be seeded)
  const STORAGE_KEY = "resinkra_curso_vendas_progress";
  const [localProgress, setLocalProgress] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  const isComplete = (mi: number, ai: number) => localProgress.has(getAulaKey(mi, ai));
  const toggleLocal = (mi: number, ai: number) => {
    setLocalProgress((prev) => {
      const next = new Set(prev);
      const key = getAulaKey(mi, ai);
      if (next.has(key)) next.delete(key); else next.add(key);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const completedCount = localProgress.size;
  const pct = totalAulas > 0 ? Math.round((completedCount / totalAulas) * 100) : 0;

  const moduloAulasCompleted = (mi: number) => {
    const m = cursoVendasData[mi];
    return m.aulas.filter((_, ai) => isComplete(mi, ai)).length;
  };

  const Wrapper = embedded ? ({ children }: { children: React.ReactNode }) => <>{children}</> : AppLayout;

  if (selectedModulo !== null && selectedAula !== null) {
    const modulo = cursoVendasData[selectedModulo];
    return (
      <Wrapper>
        <div className={`min-h-screen bg-background ${embedded ? '' : 'pb-32 lg:pb-8'}`}>
          <div className="max-w-lg mx-auto px-4 py-6">
            <AulaView
              modulo={modulo}
              aulaIndex={selectedAula}
              onBack={() => setSelectedAula(null)}
              isComplete={isComplete(selectedModulo, selectedAula)}
              onToggle={() => toggleLocal(selectedModulo, selectedAula)}
            />

            {/* Navigation between lessons */}
            <div className="flex gap-2 mt-4">
              {selectedAula > 0 && (
                <Button variant="outline" size="sm" onClick={() => setSelectedAula(selectedAula - 1)} className="flex-1">
                  ← Anterior
                </Button>
              )}
              {selectedAula < modulo.aulas.length - 1 && (
                <Button variant="outline" size="sm" onClick={() => setSelectedAula(selectedAula + 1)} className="flex-1">
                  Próxima →
                </Button>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (selectedModulo !== null) {
    const modulo = cursoVendasData[selectedModulo];
    const Icon = iconMap[modulo.icone] || BookOpen;
    return (
      <Wrapper>
        <div className={`min-h-screen bg-background ${embedded ? '' : 'pb-32 lg:pb-8'}`}>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <Button variant="ghost" size="icon" onClick={() => setSelectedModulo(null)}><ArrowLeft size={20} /></Button>
                <Icon size={24} className="text-primary" />
                <div className="flex-1">
                  <h1 className="text-lg font-bold">{modulo.titulo}</h1>
                  <p className="text-xs text-muted-foreground">{modulo.aulas.length} aulas · {moduloAulasCompleted(selectedModulo)}/{modulo.aulas.length} concluídas</p>
                </div>
              </div>
              <Progress value={(moduloAulasCompleted(selectedModulo) / modulo.aulas.length) * 100} className="h-2" />
            </div>
          </div>

          <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
            {modulo.aulas.map((aula, ai) => {
              const done = isComplete(selectedModulo, ai);
              return (
                <motion.div
                  key={ai}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ai * 0.05 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${done ? "border-primary/30 bg-primary/5" : ""}`}
                    onClick={() => setSelectedAula(ai)}
                  >
                    <div className="flex items-center gap-3">
                      {done ? (
                        <CheckCircle2 size={20} className="text-primary shrink-0" />
                      ) : (
                        <Circle size={20} className="text-muted-foreground shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">{aula.titulo}</h3>
                        <p className="text-xs text-muted-foreground truncate">{aula.descricao}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{aula.duracaoMinutos}min</span>
                      <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className={`min-h-screen bg-background ${embedded ? '' : 'pb-32 lg:pb-8'}`}>
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

          <div className="max-w-lg mx-auto relative z-10">
            {!embedded && (
              <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                  <ArrowLeft size={20} />
                </Button>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                    <GraduationCap size={24} />
                    Curso de Vendas
                  </h1>
                  <p className="text-sm text-muted-foreground">Vendas consultivas em massoterapia</p>
                </div>
              </div>
            )}

            {/* Progress card */}
            <Card className="p-4 bg-card/80 backdrop-blur">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Seu Progresso</span>
                <span className="text-sm font-bold text-primary">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2.5 mb-2" />
              <p className="text-xs text-muted-foreground">
                {completedCount} de {totalAulas} aulas concluídas
                {pct === 100 && " 🏆 Parabéns!"}
              </p>
            </Card>
          </div>
        </div>

        {/* Modules */}
        <div className="max-w-lg mx-auto px-4 py-6 space-y-3">
          {cursoVendasData.map((modulo, mi) => {
            const Icon = iconMap[modulo.icone] || BookOpen;
            const done = moduloAulasCompleted(mi);
            const total = modulo.aulas.length;
            const modPct = Math.round((done / total) * 100);

            return (
              <motion.div
                key={mi}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mi * 0.06 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg bg-gradient-to-br ${modulo.cor} border-border/50`}
                  onClick={() => setSelectedModulo(mi)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center shrink-0">
                      {modPct === 100 ? <Trophy size={20} className="text-primary" /> : <Icon size={20} className="text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold">{modulo.titulo}</h3>
                        <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{modulo.descricao}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={modPct} className="h-1.5 flex-1" />
                        <span className="text-[10px] text-muted-foreground">{done}/{total}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {pct === 100 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <Trophy size={48} className="text-primary mx-auto mb-3" />
                <h2 className="text-lg font-bold">Curso Completo! 🏆</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Parabéns! Você concluiu todas as aulas do curso de Vendas Consultivas em Massoterapia.
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
