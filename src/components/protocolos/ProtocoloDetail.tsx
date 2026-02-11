import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, CheckCircle, Zap, BarChart3, Camera, ClipboardList, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressDashboard } from "./ProgressDashboard";
import { MetasSemanais } from "./MetasSemanais";
import { PosturalAssessmentLink } from "./PosturalAssessmentLink";
import { PosturalReportButton } from "./PosturalReportButton";
import { FichaAcompanhamento } from "./FichaAcompanhamento";
import { GaleriaEvolucao } from "./GaleriaEvolucao";
import { GuiaResumoProtocolo } from "./GuiaResumoProtocolo";
import { SecoesClinicasView } from "./SecoesClinicasView";
import { useUsuarioProtocolos, useFichas, useFotos, useMetas } from "@/hooks/useProtocolos";
import { useProgressStats } from "@/hooks/useProgressStats";
import { useAvaliacoesPosturais } from "@/hooks/useAvaliacaoPostural";
import { useSecoesClinicas } from "@/hooks/useSecoesClinicas";
import { tipoLabels } from "./protocoloConstants";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProtocoloDetailProps {
  protocolo: {
    id: string;
    nome: string;
    descricao: string | null;
    tipo: string;
    duracao_semanas: number;
    sessoes_por_semana: number;
    beneficios: string | null;
  };
  onBack: () => void;
}

export const ProtocoloDetail = ({ protocolo, onBack }: ProtocoloDetailProps) => {
  const { meus, ativar, atualizarStatus } = useUsuarioProtocolos();
  const [tab, setTab] = useState("progresso");
  const isPostural = protocolo.tipo === "postural";
  const chartRef = useRef<HTMLDivElement>(null);
  const { secoes } = useSecoesClinicas(protocolo.id);
  const hasSecoes = secoes.length > 0;

  const meuProtocolo = meus.find(
    (p) => p.protocolo_id === protocolo.id && (p.status === "ativo" || p.status === "pausado")
  );

  const { fichas } = useFichas(meuProtocolo?.id || "");
  const { fotos } = useFotos(meuProtocolo?.id || "");
  const { metas } = useMetas(meuProtocolo?.id || "");
  const { avaliacoes } = useAvaliacoesPosturais();

  // Use shared progress stats instead of duplicating calculation
  const stats = useProgressStats(
    fichas,
    metas,
    fotos,
    meuProtocolo?.data_inicio || new Date().toISOString(),
    protocolo
  );

  const isAtivo = meuProtocolo?.status === "ativo";
  const isPausado = meuProtocolo?.status === "pausado";

  const tipoConfig = tipoLabels[protocolo.tipo] ?? { label: protocolo.tipo, class: "" };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      {/* Sticky header with progress */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl -mx-4 px-4 lg:-mx-8 lg:px-8 pb-3 pt-1 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Badge
                variant="outline"
                className={`text-[10px] border-0 ${tipoConfig.class}`}
              >
                {tipoConfig.label}
              </Badge>
              {meuProtocolo && (
                <span className="text-[10px] text-muted-foreground">
                  Sem. {stats.semanaAtual}/{protocolo.duracao_semanas}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-foreground truncate">{protocolo.nome}</h2>
          </div>
          {meuProtocolo && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <p className="text-xs font-bold text-primary">{stats.progressoTempo}%</p>
              </div>
              <div className="w-10 h-10 relative">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15" fill="none"
                    stroke="hsl(var(--primary))" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${stats.progressoTempo * 0.942} 94.2`}
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Protocol info */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        {protocolo.descricao && (
          <p className="text-sm text-muted-foreground">{protocolo.descricao}</p>
        )}
        {protocolo.beneficios && (
          <div className="flex flex-wrap gap-1.5">
            {protocolo.beneficios.split(",").map((b, i) => (
              <Badge key={i} variant="outline" className="text-[10px]">
                <Zap size={10} className="mr-1" />
                {b.trim()}
              </Badge>
            ))}
          </div>
        )}

        {/* Timeline progress (only when enrolled) */}
        {meuProtocolo && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Semana {stats.semanaAtual} de {protocolo.duracao_semanas}
              </span>
              <span className="font-medium text-primary">{stats.progressoTempo}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.progressoTempo}%` }}
                className="h-full rounded-full gradient-primary"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">
              Início: {format(new Date(meuProtocolo.data_inicio), "dd/MM/yyyy", { locale: ptBR })}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          {!meuProtocolo && (
            <Button
              onClick={() => ativar.mutate(protocolo.id)}
              disabled={ativar.isPending}
              className="flex-1 gap-1.5"
            >
              <Play size={16} /> Iniciar Protocolo
            </Button>
          )}
          {isAtivo && (
            <>
              <Button
                variant="outline"
                onClick={() => atualizarStatus.mutate({ id: meuProtocolo.id, status: "pausado" })}
                className="flex-1 gap-1.5"
              >
                <Pause size={16} /> Pausar
              </Button>
              <Button
                variant="outline"
                onClick={() => atualizarStatus.mutate({ id: meuProtocolo.id, status: "concluido" })}
                className="gap-1.5"
              >
                <CheckCircle size={16} /> Concluir
              </Button>
            </>
          )}
          {isPausado && (
            <Button
              onClick={() => atualizarStatus.mutate({ id: meuProtocolo.id, status: "ativo" })}
              className="flex-1 gap-1.5"
            >
              <Play size={16} /> Retomar
            </Button>
          )}
        </div>
      </div>

      {/* Tabs with compact summary badges */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className={`w-full grid ${
          meuProtocolo 
            ? hasSecoes ? "grid-cols-4" : "grid-cols-3"
            : hasSecoes ? "grid-cols-2" : "grid-cols-1"
        }`}>
          {meuProtocolo && (
            <>
              <TabsTrigger value="progresso" className="text-xs gap-1">
                <ClipboardList size={13} />
                <span className="hidden sm:inline">Progresso</span>
                {stats.metasTotal > 0 && (
                  <span className="text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">
                    {stats.metasConcluidas}/{stats.metasTotal}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="medidas" className="text-xs gap-1">
                <BarChart3 size={13} />
                <span className="hidden sm:inline">Medidas</span>
                {stats.totalFichas > 0 && (
                  <span className="text-[9px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                    {stats.totalFichas}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="evolucao" className="text-xs gap-1">
                <Camera size={13} />
                <span className="hidden sm:inline">Evolução</span>
                {stats.totalFotos > 0 && (
                  <span className="text-[9px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                    {stats.totalFotos}
                  </span>
                )}
              </TabsTrigger>
            </>
          )}
          {!meuProtocolo && (
            <TabsTrigger value="guia" className="text-xs gap-1">
              📋 Guia
            </TabsTrigger>
          )}
          {hasSecoes && (
            <TabsTrigger value="clinico" className="text-xs gap-1">
              <BookOpen size={13} />
              <span className="hidden sm:inline">Clínico</span>
            </TabsTrigger>
          )}
        </TabsList>

        {meuProtocolo && (
          <>
            <TabsContent value="progresso" className="mt-4 space-y-6">
              <ProgressDashboard
                protocoloUsuarioId={meuProtocolo.id}
                protocolo={protocolo}
                dataInicio={meuProtocolo.data_inicio}
                onNavigateToPhotos={() => setTab("evolucao")}
              />

              {isPostural && (
                <div className="space-y-3">
                  <PosturalAssessmentLink />
                  <div className="flex justify-end">
                    <PosturalReportButton
                      fichas={fichas}
                      avaliacoes={avaliacoes}
                      chartRef={chartRef}
                      protocoloNome={protocolo.nome}
                      protocoloUsuarioId={meuProtocolo.id}
                    />
                  </div>
                </div>
              )}

              <MetasSemanais protocoloUsuarioId={meuProtocolo.id} />
            </TabsContent>

            <TabsContent value="medidas" className="mt-4">
              <FichaAcompanhamento
                protocoloUsuarioId={meuProtocolo.id}
                externalChartRef={isPostural ? chartRef : undefined}
              />
            </TabsContent>

            <TabsContent value="evolucao" className="mt-4 space-y-6">
              <GaleriaEvolucao protocoloUsuarioId={meuProtocolo.id} />
              <GuiaResumoProtocolo tipoProtocolo={protocolo.tipo} />
            </TabsContent>
          </>
        )}

        {!meuProtocolo && (
          <TabsContent value="guia" className="mt-4">
            <GuiaResumoProtocolo tipoProtocolo={protocolo.tipo} />
          </TabsContent>
        )}

        {hasSecoes && (
          <TabsContent value="clinico" className="mt-4">
            <SecoesClinicasView protocoloId={protocolo.id} />
          </TabsContent>
        )}
      </Tabs>
    </motion.div>
  );
};
