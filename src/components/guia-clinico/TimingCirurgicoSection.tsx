import { motion } from "framer-motion";
import { Clock, Calendar, Zap, Timer, AlertCircle, CheckCircle2, Scissors } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, parseISO, format, addDays, addWeeks } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useHistoricoCirurgico, type HistoricoCirurgico } from "@/hooks/useHistoricoCirurgico";

interface CirurgiaTimeline {
  nome: string;
  emoji: string;
  inicioRecomendado: string;
  inicioDias: number; // days after surgery to start
  frequenciaInicial: string;
  frequenciaManutencao: string;
  duracaoTotal: string;
  duracaoSemanas: number;
  observacoes: string;
  intensidade: "alta" | "media" | "leve";
}

const cirurgias: CirurgiaTimeline[] = [
  {
    nome: "Lipoaspiração",
    emoji: "💉",
    inicioRecomendado: "24-72h após cirurgia",
    inicioDias: 2,
    frequenciaInicial: "3x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "2x/semana (semanas 3-8)",
    duracaoTotal: "10-20 sessões (8-12 semanas)",
    duracaoSemanas: 12,
    observacoes: "Técnica suave no início. Evitar pressão excessiva nas áreas de equimoses. Foco na redução do edema e prevenção de fibrose.",
    intensidade: "alta",
  },
  {
    nome: "Abdominoplastia",
    emoji: "🏥",
    inicioRecomendado: "3-5 dias após cirurgia",
    inicioDias: 4,
    frequenciaInicial: "3x/semana (primeiras 3 semanas)",
    frequenciaManutencao: "2x/semana (semanas 4-10)",
    duracaoTotal: "15-25 sessões (10-14 semanas)",
    duracaoSemanas: 14,
    observacoes: "Atenção à sutura e drenos. Drenagem longe da cicatriz no início. Incluir membros inferiores para compensar edema gravitacional.",
    intensidade: "alta",
  },
  {
    nome: "Mamoplastia (aumento/redução)",
    emoji: "🩺",
    inicioRecomendado: "5-7 dias após cirurgia",
    inicioDias: 6,
    frequenciaInicial: "2x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "1-2x/semana (semanas 3-6)",
    duracaoTotal: "8-15 sessões (6-8 semanas)",
    duracaoSemanas: 8,
    observacoes: "Técnica extremamente suave na região mamária. Foco em axilas e braços para drenar linfonodos axilares. Sempre respeitar a dor da paciente.",
    intensidade: "leve",
  },
  {
    nome: "Rinoplastia",
    emoji: "👃",
    inicioRecomendado: "7-10 dias após (pós retirada do gesso)",
    inicioDias: 9,
    frequenciaInicial: "2x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "1x/semana (semanas 3-8)",
    duracaoTotal: "8-12 sessões (6-10 semanas)",
    duracaoSemanas: 10,
    observacoes: "Drenagem facial delicada. Manobras leves em face e pescoço. Não tocar diretamente no nariz sem liberação médica.",
    intensidade: "leve",
  },
  {
    nome: "Lifting facial",
    emoji: "✨",
    inicioRecomendado: "5-7 dias após cirurgia",
    inicioDias: 6,
    frequenciaInicial: "2-3x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "1x/semana (semanas 3-6)",
    duracaoTotal: "10-15 sessões (6-8 semanas)",
    duracaoSemanas: 8,
    observacoes: "Muito suave próximo às orelhas e pescoço. Priorizar drenagem cervical. Evitar manipulação direta de áreas com pontos.",
    intensidade: "media",
  },
  {
    nome: "Drenagem estética (não cirúrgica)",
    emoji: "🌿",
    inicioRecomendado: "Sem restrição",
    inicioDias: 0,
    frequenciaInicial: "1-2x/semana",
    frequenciaManutencao: "1x/semana ou quinzenal",
    duracaoTotal: "8-12 sessões (ciclo completo)",
    duracaoSemanas: 12,
    observacoes: "Foco em retenção hídrica, celulite e modelagem corporal. Pode associar com massagem modeladora e técnicas manuais mais firmes.",
    intensidade: "media",
  },
];

const intensidadeStyles = {
  alta: { label: "Intensidade alta", class: "bg-destructive/15 text-destructive" },
  media: { label: "Intensidade média", class: "bg-warning/15 text-warning" },
  leve: { label: "Intensidade leve", class: "bg-highlight/15 text-highlight" },
};

/** Match a surgical history record to a known timeline entry */
const matchTimeline = (tipo: string): CirurgiaTimeline | undefined => {
  return cirurgias.find((c) => tipo.toLowerCase().includes(c.nome.toLowerCase().split(" ")[0]));
};

interface PersonalizedCardProps {
  record: HistoricoCirurgico;
  timeline: CirurgiaTimeline;
  index: number;
}

const PersonalizedTimingCard = ({ record, timeline, index }: PersonalizedCardProps) => {
  const diasDesde = differenceInDays(new Date(), parseISO(record.data_cirurgia));
  const dataInicio = addDays(parseISO(record.data_cirurgia), timeline.inicioDias);
  const dataFimEstimada = addWeeks(parseISO(record.data_cirurgia), timeline.duracaoSemanas);
  const semanaAtual = Math.floor(diasDesde / 7);
  const jaIniciou = diasDesde >= timeline.inicioDias;
  const jaFinalizou = diasDesde > timeline.duracaoSemanas * 7;
  const intStyle = intensidadeStyles[timeline.intensidade];

  const getStatusBadge = () => {
    if (jaFinalizou) {
      return (
        <Badge variant="outline" className="text-[10px] border-0 bg-highlight/15 text-highlight gap-1">
          <CheckCircle2 size={10} /> Ciclo completo
        </Badge>
      );
    }
    if (!jaIniciou) {
      return (
        <Badge variant="outline" className="text-[10px] border-0 bg-warning/15 text-warning gap-1">
          <Clock size={10} /> Aguardando início
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-[10px] border-0 bg-primary/15 text-primary gap-1">
        <Zap size={10} /> Semana {semanaAtual}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Card className="p-4 space-y-3 border-primary/20 bg-primary/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{timeline.emoji}</span>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {record.tipo_cirurgia}
              </h4>
              <p className="text-[10px] text-muted-foreground">
                Cirurgia em {format(parseISO(record.data_cirurgia), "dd/MM/yyyy", { locale: ptBR })}
                {record.medico_responsavel ? ` • ${record.medico_responsavel}` : ""}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Personalized timeline */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Clock size={10} /> Iniciar drenagem
            </div>
            <p className="text-xs font-semibold text-foreground">
              {format(dataInicio, "dd/MM/yyyy", { locale: ptBR })}
            </p>
            {!jaIniciou && (
              <p className="text-[10px] text-warning font-medium">
                em {timeline.inicioDias - diasDesde} dia(s)
              </p>
            )}
          </div>
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Timer size={10} /> Término estimado
            </div>
            <p className="text-xs font-semibold text-foreground">
              {format(dataFimEstimada, "dd/MM/yyyy", { locale: ptBR })}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Zap size={10} /> Fase intensiva
            </div>
            <p className="text-xs font-semibold text-foreground">
              {timeline.frequenciaInicial}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Calendar size={10} /> Manutenção
            </div>
            <p className="text-xs font-semibold text-foreground">
              {timeline.frequenciaManutencao}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {jaIniciou && !jaFinalizou && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Progresso do ciclo</span>
              <span>{Math.min(Math.round((diasDesde / (timeline.duracaoSemanas * 7)) * 100), 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((diasDesde / (timeline.duracaoSemanas * 7)) * 100, 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Badge variant="outline" className={`text-[10px] border-0 ${intStyle.class}`}>
            {intStyle.label}
          </Badge>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {timeline.observacoes}
        </p>
      </Card>
    </motion.div>
  );
};

const GenericTimingCard = ({ cir, index }: { cir: CirurgiaTimeline; index: number }) => {
  const intStyle = intensidadeStyles[cir.intensidade];
  return (
    <motion.div
      key={cir.nome}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{cir.emoji}</span>
            <h4 className="text-sm font-semibold text-foreground">
              {cir.nome}
            </h4>
          </div>
          <Badge variant="outline" className={`text-[10px] border-0 ${intStyle.class}`}>
            {intStyle.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Clock size={10} /> Início
            </div>
            <p className="text-xs font-semibold text-foreground">
              {cir.inicioRecomendado}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Timer size={10} /> Duração total
            </div>
            <p className="text-xs font-semibold text-foreground">
              {cir.duracaoTotal}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Zap size={10} /> Fase intensiva
            </div>
            <p className="text-xs font-semibold text-foreground">
              {cir.frequenciaInicial}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-muted/50 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
              <Calendar size={10} /> Manutenção
            </div>
            <p className="text-xs font-semibold text-foreground">
              {cir.frequenciaManutencao}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {cir.observacoes}
        </p>
      </Card>
    </motion.div>
  );
};

export const TimingCirurgicoSection = () => {
  const { historico, isLoading } = useHistoricoCirurgico();

  // Match patient's history to known timelines
  const personalizedItems = historico
    .map((record) => {
      const timeline = matchTimeline(record.tipo_cirurgia);
      return timeline ? { record, timeline } : null;
    })
    .filter(Boolean) as { record: HistoricoCirurgico; timeline: CirurgiaTimeline }[];

  return (
    <div className="space-y-6">
      {/* Personalized section */}
      {personalizedItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Scissors size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Seu pós-operatório personalizado
            </h3>
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            Timing calculado com base no seu histórico cirúrgico.
          </p>
          {personalizedItems.map((item, i) => (
            <PersonalizedTimingCard
              key={item.record.id}
              record={item.record}
              timeline={item.timeline}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Info banner when no history */}
      {!isLoading && personalizedItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-3 flex items-start gap-2 bg-primary/5 border-primary/15">
            <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Timing personalizado</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Cadastre seu histórico cirúrgico no Perfil → Histórico cirúrgico para ver datas e prazos calculados automaticamente.
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Generic reference */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Calendar size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Referência geral por procedimento
          </h3>
        </div>
        <p className="text-xs text-muted-foreground -mt-4">
          Referência rápida de quando iniciar, frequência e duração por procedimento.
        </p>

        <div className="space-y-3">
          {cirurgias.map((cir, i) => (
            <GenericTimingCard key={cir.nome} cir={cir} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
