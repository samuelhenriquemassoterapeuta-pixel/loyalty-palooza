import { motion } from "framer-motion";
import { AlertTriangle, XCircle, ShieldAlert, ThermometerSun, Activity, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

const contraindicacoes = [
  {
    icon: XCircle,
    title: "Trombose venosa profunda (TVP)",
    description: "Suspender drenagem imediatamente se houver dor intensa em panturrilha, inchaço assimétrico ou vermelhidão localizada. Encaminhar ao cirurgião.",
    severity: "critical" as const,
  },
  {
    icon: ShieldAlert,
    title: "Infecção ativa no local",
    description: "Não realizar drenagem em áreas com sinais de infecção: calor excessivo, secreção purulenta, febre acima de 38°C ou odor fétido na ferida.",
    severity: "critical" as const,
  },
  {
    icon: ThermometerSun,
    title: "Febre persistente",
    description: "Febre acima de 38.5°C por mais de 24h requer avaliação médica antes de prosseguir. Pode indicar complicação sistêmica.",
    severity: "high" as const,
  },
  {
    icon: Activity,
    title: "Seroma não avaliado",
    description: "Coleções líquidas significativas devem ser avaliadas e, se necessário, puncionadas pelo cirurgião antes de retomar as sessões de drenagem.",
    severity: "high" as const,
  },
  {
    icon: AlertTriangle,
    title: "Hematomas extensos",
    description: "Hematomas grandes ou em expansão são contraindicação relativa. Aguardar reabsorção parcial e liberar drenagem com técnica gentil.",
    severity: "medium" as const,
  },
];

const sinaisAlerta = [
  {
    emoji: "🚨",
    title: "Procure o cirurgião imediatamente",
    items: [
      "Dor que piora progressivamente ao invés de melhorar",
      "Febre acima de 38.5°C com calafrios",
      "Secreção com odor fétido ou coloração esverdeada",
      "Inchaço assimétrico súbito (uma perna muito maior que a outra)",
      "Falta de ar ou dor no peito",
      "Abertura de pontos com exposição de tecido",
    ],
  },
  {
    emoji: "⚠️",
    title: "Comunique na próxima consulta",
    items: [
      "Dormência persistente após 2 semanas",
      "Endurecimento excessivo (fibrose precoce)",
      "Assimetria visível entre os lados operados",
      "Coceira intensa ou erupções cutâneas na região",
      "Dificuldade para urinar ou evacuar (pós-abdominoplastia)",
    ],
  },
];

const severityStyles = {
  critical: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" },
  high: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
  medium: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
};

export const ContraindicacoesSection = () => {
  return (
    <div className="space-y-6">
      {/* Contraindications */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert size={16} className="text-destructive" />
          <h3 className="text-sm font-semibold text-foreground">
            Contraindicações absolutas e relativas
          </h3>
        </div>
        <div className="space-y-3">
          {contraindicacoes.map((item, i) => {
            const style = severityStyles[item.severity];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={`p-4 border ${style.border}`}>
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center`}>
                      <item.icon size={18} className={style.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Alert Signs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Phone size={16} className="text-info" />
          <h3 className="text-sm font-semibold text-foreground">
            Sinais de alerta — quando agir
          </h3>
        </div>
        <div className="space-y-3">
          {sinaisAlerta.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{group.emoji}</span>
                  <h4 className="text-sm font-semibold text-foreground">
                    {group.title}
                  </h4>
                </div>
                <ul className="space-y-1.5 ml-7">
                  {group.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground leading-relaxed list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
