import { motion } from "framer-motion";
import { Clock, Calendar, Zap, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CirurgiaTimeline {
  nome: string;
  emoji: string;
  inicioRecomendado: string;
  frequenciaInicial: string;
  frequenciaManutencao: string;
  duracaoTotal: string;
  observacoes: string;
  intensidade: "alta" | "media" | "leve";
}

const cirurgias: CirurgiaTimeline[] = [
  {
    nome: "Lipoaspiração",
    emoji: "💉",
    inicioRecomendado: "24-72h após cirurgia",
    frequenciaInicial: "3x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "2x/semana (semanas 3-8)",
    duracaoTotal: "10-20 sessões (8-12 semanas)",
    observacoes: "Técnica suave no início. Evitar pressão excessiva nas áreas de equimoses. Foco na redução do edema e prevenção de fibrose.",
    intensidade: "alta",
  },
  {
    nome: "Abdominoplastia",
    emoji: "🏥",
    inicioRecomendado: "3-5 dias após cirurgia",
    frequenciaInicial: "3x/semana (primeiras 3 semanas)",
    frequenciaManutencao: "2x/semana (semanas 4-10)",
    duracaoTotal: "15-25 sessões (10-14 semanas)",
    observacoes: "Atenção à sutura e drenos. Drenagem longe da cicatriz no início. Incluir membros inferiores para compensar edema gravitacional.",
    intensidade: "alta",
  },
  {
    nome: "Mamoplastia (aumento/redução)",
    emoji: "🩺",
    inicioRecomendado: "5-7 dias após cirurgia",
    frequenciaInicial: "2x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "1-2x/semana (semanas 3-6)",
    duracaoTotal: "8-15 sessões (6-8 semanas)",
    observacoes: "Técnica extremamente suave na região mamária. Foco em axilas e braços para drenar linfonodos axilares. Sempre respeitar a dor da paciente.",
    intensidade: "leve",
  },
  {
    nome: "Rinoplastia",
    emoji: "👃",
    inicioRecomendado: "7-10 dias após (pós retirada do gesso)",
    frequenciaInicial: "2x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "1x/semana (semanas 3-8)",
    duracaoTotal: "8-12 sessões (6-10 semanas)",
    observacoes: "Drenagem facial delicada. Manobras leves em face e pescoço. Não tocar diretamente no nariz sem liberação médica.",
    intensidade: "leve",
  },
  {
    nome: "Lifting facial",
    emoji: "✨",
    inicioRecomendado: "5-7 dias após cirurgia",
    frequenciaInicial: "2-3x/semana (primeiras 2 semanas)",
    frequenciaManutencao: "1x/semana (semanas 3-6)",
    duracaoTotal: "10-15 sessões (6-8 semanas)",
    observacoes: "Muito suave próximo às orelhas e pescoço. Priorizar drenagem cervical. Evitar manipulação direta de áreas com pontos.",
    intensidade: "media",
  },
  {
    nome: "Drenagem estética (não cirúrgica)",
    emoji: "🌿",
    inicioRecomendado: "Sem restrição",
    frequenciaInicial: "1-2x/semana",
    frequenciaManutencao: "1x/semana ou quinzenal",
    duracaoTotal: "8-12 sessões (ciclo completo)",
    observacoes: "Foco em retenção hídrica, celulite e modelagem corporal. Pode associar com massagem modeladora e técnicas manuais mais firmes.",
    intensidade: "media",
  },
];

const intensidadeStyles = {
  alta: { label: "Intensidade alta", class: "bg-destructive/15 text-destructive" },
  media: { label: "Intensidade média", class: "bg-warning/15 text-warning" },
  leve: { label: "Intensidade leve", class: "bg-highlight/15 text-highlight" },
};

export const TimingCirurgicoSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <Calendar size={16} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">
          Timing por tipo de cirurgia
        </h3>
      </div>
      <p className="text-xs text-muted-foreground -mt-4">
        Referência rápida de quando iniciar, frequência e duração por procedimento.
      </p>

      <div className="space-y-3">
        {cirurgias.map((cir, i) => {
          const intStyle = intensidadeStyles[cir.intensidade];
          return (
            <motion.div
              key={cir.nome}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
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
        })}
      </div>
    </div>
  );
};
