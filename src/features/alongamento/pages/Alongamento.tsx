import { useState } from "react";
import { ArrowLeft, Search, X, Dumbbell, BookOpen, TrendingUp, Play, Heart, ChevronDown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppLayout } from "@/components/AppLayout";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import {
  useExercicios,
  usePlanosAlongamento,
  useUsuarioPlanos,
  useSessoesAlongamento,
  usePlanoExercicios,
} from "@/features/alongamento/hooks/useAlongamento";
import { ExercicioCard } from "@/features/alongamento/components/ExercicioCard";
import { ExercicioDetail } from "@/features/alongamento/components/ExercicioDetail";
import { PlanoCard } from "@/features/alongamento/components/PlanoCard";
import { ProgressoSection } from "@/features/alongamento/components/ProgressoSection";
import { SessaoPlayer } from "@/features/alongamento/components/SessaoPlayer";
import { DicasSeguranca } from "@/features/alongamento/components/DicasSeguranca";
import { LembretesConfig } from "@/features/alongamento/components/LembretesConfig";
import { NivelProgressao, getNiveisDesbloqueados } from "@/features/alongamento/components/NivelProgressao";
import { ExercicioAlongamento } from "@/features/alongamento/hooks/useAlongamento";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Alongamento() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { exercicios, loading: loadingExercicios } = useExercicios();
  const { planos, loading: loadingPlanos } = usePlanosAlongamento();
  const { planos: meusPlanosAtivos, ativarPlano, pausarPlano } = useUsuarioPlanos();
  const { sessoes, totalSessoes, totalMinutos, totalExercicios, registrarSessao } = useSessoesAlongamento();

  const [activeTab, setActiveTab] = useState("exercicios");
  const [busca, setBusca] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState<string>("todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todos");
  const [exercicioSelecionado, setExercicioSelecionado] = useState<ExercicioAlongamento | null>(null);
  const [planoExercicios, setPlanoExercicios] = useState<string | null>(null);
  const [sessaoAtiva, setSessaoAtiva] = useState<ExercicioAlongamento[] | null>(null);
  const [sessaoPlanoId, setSessaoPlanoId] = useState<string | null>(null);

  // Derived data
  const planosAtivosIds = meusPlanosAtivos
    .filter((p) => p.status === "ativo")
    .map((p) => p.plano_id);

  const categoriasUnicas = [...new Set(exercicios.map((e) => e.categoria))];

  // Level-based unlock system
  const niveisDesbloqueados = getNiveisDesbloqueados(totalSessoes);

  const exerciciosFiltrados = exercicios
    .filter((e) => nivelFiltro === "todos" || e.nivel === nivelFiltro)
    .filter((e) => categoriaFiltro === "todos" || e.categoria === categoriaFiltro)
    .filter((e) => e.nome.toLowerCase().includes(busca.toLowerCase()));

  const handleAtivarPlano = async (planoId: string) => {
    const { error } = await ativarPlano(planoId);
    if (error) {
      toast({ title: "Erro", description: error, variant: "destructive" });
    } else {
      toast({ title: "Plano ativado! 🧘", description: "Seu plano de alongamento está pronto." });
    }
  };

  const handlePausarPlano = async (id: string) => {
    const { error } = await pausarPlano(id);
    if (error) {
      toast({ title: "Erro", description: error, variant: "destructive" });
    } else {
      toast({ title: "Plano pausado", description: "Você pode retomar quando quiser." });
    }
  };

  const handleIniciarSessaoLivre = () => {
    if (exerciciosFiltrados.length === 0) {
      toast({ title: "Sem exercícios", description: "Nenhum exercício encontrado.", variant: "destructive" });
      return;
    }
    setSessaoAtiva(exerciciosFiltrados.slice(0, 6));
    setSessaoPlanoId(null);
  };

  const handleSessaoComplete = async (duracaoSegundos: number, exerciciosCompletados: number) => {
    await registrarSessao(sessaoPlanoId, duracaoSegundos, exerciciosCompletados);
    setSessaoAtiva(null);
    toast({
      title: "Sessão concluída! 🎉",
      description: `${exerciciosCompletados} exercício(s) em ${Math.round(duracaoSegundos / 60)}min.`,
    });
    setActiveTab("progresso");
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-border px-4 py-4 safe-top">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
          <div className="max-w-lg lg:max-w-4xl mx-auto flex items-center gap-4 relative z-10">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-primary">Alongamento & Flexibilidade</h1>
              <p className="text-xs text-muted-foreground">Exercícios e planos personalizados</p>
            </div>
            {activeTab === "exercicios" && (
              <Button size="sm" onClick={handleIniciarSessaoLivre} className="gap-1">
                <Play size={14} />
                Treinar
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 py-4 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="exercicios" className="gap-1 text-xs">
                <Dumbbell size={14} />
                Exercícios
              </TabsTrigger>
              <TabsTrigger value="planos" className="gap-1 text-xs">
                <BookOpen size={14} />
                Planos
              </TabsTrigger>
              <TabsTrigger value="progresso" className="gap-1 text-xs">
                <TrendingUp size={14} />
                Progresso
              </TabsTrigger>
              <TabsTrigger value="dicas" className="gap-1 text-xs">
                <Heart size={14} />
                Dicas
              </TabsTrigger>
            </TabsList>

            {/* === EXERCÍCIOS === */}
            <TabsContent value="exercicios" className="mt-4 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Buscar exercícios..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 pr-10"
                />
                {busca && (
                  <button
                    onClick={() => setBusca("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="space-y-2">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {["todos", "iniciante", "intermediario", "avancado"].map((n) => (
                    <Button
                      key={n}
                      variant={nivelFiltro === n ? "default" : "outline"}
                      size="sm"
                      className="shrink-0 text-xs"
                      onClick={() => setNivelFiltro(n)}
                    >
                      {n === "todos" ? "Todos" : n.charAt(0).toUpperCase() + n.slice(1)}
                    </Button>
                  ))}
                </div>
                {categoriasUnicas.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    <Button
                      variant={categoriaFiltro === "todos" ? "default" : "outline"}
                      size="sm"
                      className="shrink-0 text-xs"
                      onClick={() => setCategoriaFiltro("todos")}
                    >
                      Todos
                    </Button>
                    {categoriasUnicas.map((cat) => (
                      <Button
                        key={cat}
                        variant={categoriaFiltro === cat ? "default" : "outline"}
                        size="sm"
                        className="shrink-0 text-xs capitalize"
                        onClick={() => setCategoriaFiltro(cat)}
                      >
                        {cat.replace("_", " ")}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Exercise list */}
              {loadingExercicios ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="w-12 h-12 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                          <Skeleton className="h-3 w-1/3" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : exerciciosFiltrados.length === 0 ? (
                <div className="text-center py-12">
                  <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum exercício encontrado</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {exerciciosFiltrados.map((ex, i) => {
                    const bloqueado = !niveisDesbloqueados.includes(ex.nivel);
                    return (
                      <ExercicioCard
                        key={ex.id}
                        exercicio={ex}
                        index={i}
                        bloqueado={bloqueado}
                        onClick={bloqueado ? undefined : () => setExercicioSelecionado(ex)}
                      />
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* === PLANOS === */}
            <TabsContent value="planos" className="mt-4 space-y-4">
              {loadingPlanos ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <Skeleton className="w-12 h-12 rounded-2xl" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="h-3 w-1/3" />
                        </div>
                      </div>
                      <Skeleton className="h-3 w-full mb-4" />
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <Skeleton className="h-12 rounded-lg" />
                        <Skeleton className="h-12 rounded-lg" />
                        <Skeleton className="h-12 rounded-lg" />
                      </div>
                      <Skeleton className="h-9 w-full rounded-lg" />
                    </Card>
                  ))}
                </div>
              ) : planos.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum plano disponível ainda</p>
                </div>
              ) : (() => {
                const planoCompleto = planos.find((p) => p.nome === "Plano Completo");
                const planosArea = planos.filter((p) => p.nome !== "Plano Completo");
                return (
                  <div className="space-y-4">
                    {/* Plano Completo em destaque */}
                    {planoCompleto && (() => {
                      const isAtivo = planosAtivosIds.includes(planoCompleto.id);
                      const userPlano = meusPlanosAtivos.find(
                        (p) => p.plano_id === planoCompleto.id && p.status === "ativo"
                      );
                      return (
                        <div className="relative">
                          <div className="absolute -top-1 -right-1 z-10">
                            <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                              <Star size={10} className="fill-current" />
                              Recomendado
                            </span>
                          </div>
                          <PlanoCard
                            plano={planoCompleto}
                            index={0}
                            ativo={isAtivo}
                            onAtivar={() => handleAtivarPlano(planoCompleto.id)}
                            onPausar={userPlano ? () => handlePausarPlano(userPlano.id) : undefined}
                            onVerExercicios={() => setPlanoExercicios(planoCompleto.id)}
                          />
                        </div>
                      );
                    })()}

                    {/* Planos por Área - colapsável */}
                    {planosArea.length > 0 && (
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-1 group">
                          <span className="text-sm font-semibold text-foreground">Planos por Área</span>
                          <ChevronDown size={16} className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="grid gap-4 sm:grid-cols-2 mt-2">
                            {planosArea.map((plano, i) => {
                              const isAtivo = planosAtivosIds.includes(plano.id);
                              const userPlano = meusPlanosAtivos.find(
                                (p) => p.plano_id === plano.id && p.status === "ativo"
                              );
                              return (
                                <PlanoCard
                                  key={plano.id}
                                  plano={plano}
                                  index={i + 1}
                                  ativo={isAtivo}
                                  onAtivar={() => handleAtivarPlano(plano.id)}
                                  onPausar={userPlano ? () => handlePausarPlano(userPlano.id) : undefined}
                                  onVerExercicios={() => setPlanoExercicios(plano.id)}
                                />
                              );
                            })}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                );
              })()}
            </TabsContent>

            {/* === PROGRESSO === */}
            <TabsContent value="progresso" className="mt-4 space-y-5">
              {/* Level Progression */}
              <NivelProgressao totalSessoes={totalSessoes} />

              <ProgressoSection
                sessoes={sessoes}
                totalSessoes={totalSessoes}
                totalMinutos={totalMinutos}
                totalExercicios={totalExercicios}
              />
            </TabsContent>

            {/* === DICAS === */}
            <TabsContent value="dicas" className="mt-4 space-y-4">
              <LembretesConfig />
              <DicasSeguranca />
            </TabsContent>
          </Tabs>
        </div>

        {/* Detail modal */}
        {exercicioSelecionado && (
          <ExercicioDetail
            exercicio={exercicioSelecionado}
            onClose={() => setExercicioSelecionado(null)}
          />
        )}

        {/* Session player */}
        {sessaoAtiva && (
          <SessaoPlayer
            exercicios={sessaoAtiva}
            planoId={sessaoPlanoId}
            onComplete={handleSessaoComplete}
            onClose={() => setSessaoAtiva(null)}
          />
        )}
      </div>
    </AppLayout>
  );
}
