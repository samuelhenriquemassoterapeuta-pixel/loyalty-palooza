import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressDashboard } from "./ProgressDashboard";
import { FichaAcompanhamento } from "./FichaAcompanhamento";
import { GaleriaEvolucao } from "./GaleriaEvolucao";
import { MetasSemanais } from "./MetasSemanais";
import { useUsuarioProtocolos } from "@/hooks/useProtocolos";
import { format, differenceInWeeks } from "date-fns";
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

const tipoLabels: Record<string, { label: string; class: string }> = {
  emagrecimento: { label: "Emagrecimento", class: "bg-highlight/15 text-highlight" },
  drenagem_pos_operatorio: { label: "Drenagem Pós-Op", class: "bg-info/15 text-info" },
};

export const ProtocoloDetail = ({ protocolo, onBack }: ProtocoloDetailProps) => {
  const { meus, ativar, atualizarStatus } = useUsuarioProtocolos();
  const [tab, setTab] = useState("resumo");

  const meuProtocolo = meus.find(
    (p) => p.protocolo_id === protocolo.id && (p.status === "ativo" || p.status === "pausado")
  );

  const isAtivo = meuProtocolo?.status === "ativo";
  const isPausado = meuProtocolo?.status === "pausado";

  const semanasDecorridas = meuProtocolo
    ? differenceInWeeks(new Date(), new Date(meuProtocolo.data_inicio))
    : 0;

  const progressoSemanas = Math.min(
    Math.round((semanasDecorridas / protocolo.duracao_semanas) * 100),
    100
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className={`text-[10px] border-0 ${tipoLabels[protocolo.tipo]?.class ?? ""}`}
            >
              {tipoLabels[protocolo.tipo]?.label ?? protocolo.tipo}
            </Badge>
          </div>
          <h2 className="text-lg font-bold text-foreground truncate">{protocolo.nome}</h2>
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

        {/* Timeline progress */}
        {meuProtocolo && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Semana {Math.min(semanasDecorridas + 1, protocolo.duracao_semanas)} de{" "}
                {protocolo.duracao_semanas}
              </span>
              <span className="font-medium text-primary">{progressoSemanas}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressoSemanas}%` }}
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
                onClick={() =>
                  atualizarStatus.mutate({ id: meuProtocolo.id, status: "pausado" })
                }
                className="flex-1 gap-1.5"
              >
                <Pause size={16} /> Pausar
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  atualizarStatus.mutate({ id: meuProtocolo.id, status: "concluido" })
                }
                className="gap-1.5"
              >
                <CheckCircle size={16} /> Concluir
              </Button>
            </>
          )}
          {isPausado && (
            <Button
              onClick={() =>
                atualizarStatus.mutate({ id: meuProtocolo.id, status: "ativo" })
              }
              className="flex-1 gap-1.5"
            >
              <Play size={16} /> Retomar
            </Button>
          )}
        </div>
      </div>

      {/* Tabs - only show if enrolled */}
      {meuProtocolo && (
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="resumo" className="text-xs">Resumo</TabsTrigger>
            <TabsTrigger value="ficha" className="text-xs">Medidas</TabsTrigger>
            <TabsTrigger value="metas" className="text-xs">Metas</TabsTrigger>
            <TabsTrigger value="galeria" className="text-xs">Fotos</TabsTrigger>
          </TabsList>
          <TabsContent value="resumo" className="mt-4">
            <ProgressDashboard
              protocoloUsuarioId={meuProtocolo.id}
              protocolo={protocolo}
              dataInicio={meuProtocolo.data_inicio}
            />
          </TabsContent>
          <TabsContent value="ficha" className="mt-4">
            <FichaAcompanhamento protocoloUsuarioId={meuProtocolo.id} />
          </TabsContent>
          <TabsContent value="metas" className="mt-4">
            <MetasSemanais protocoloUsuarioId={meuProtocolo.id} />
          </TabsContent>
          <TabsContent value="galeria" className="mt-4">
            <GaleriaEvolucao protocoloUsuarioId={meuProtocolo.id} />
          </TabsContent>
        </Tabs>
      )}
    </motion.div>
  );
};
