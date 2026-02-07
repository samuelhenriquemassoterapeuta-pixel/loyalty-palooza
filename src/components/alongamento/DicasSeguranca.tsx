import { motion } from "framer-motion";
import { Shield, Flame, Heart, AlertTriangle, Zap, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

const tips = [
  {
    icon: Flame,
    title: "Sempre aqueça antes",
    description:
      "Faça 5 minutos de caminhada leve ou movimentos articulares antes de alongar. Músculos frios são mais propensos a lesões.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Shield,
    title: "Nunca force além do limite",
    description:
      "Alongue até sentir uma leve tensão, nunca dor. Se doer, recue. A flexibilidade melhora com consistência, não com força.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: Wind,
    title: "Respire durante o alongamento",
    description:
      "Nunca prenda a respiração. Inspire ao preparar e expire ao aprofundar o alongamento. A respiração ajuda a relaxar os músculos.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Heart,
    title: "Mantenha cada posição",
    description:
      "Segure cada alongamento por pelo menos 15-30 segundos. Evite movimentos bruscos que podem causar microlesões.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: AlertTriangle,
    title: "Respeite lesões existentes",
    description:
      "Se você tem lesões ou dores crônicas, consulte um profissional antes de iniciar. Adapte os exercícios ao seu corpo.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Zap,
    title: "Consistência é a chave",
    description:
      "Alongar 10 minutos todo dia é mais eficaz do que 1 hora por semana. Crie o hábito e os resultados virão gradualmente.",
    color: "text-highlight",
    bg: "bg-highlight/10",
  },
];

const articles = [
  {
    emoji: "🧍",
    title: "Postura no dia a dia",
    description:
      "Mantenha os ombros relaxados, coluna alinhada e tela na altura dos olhos. Faça pausas a cada 45 minutos para se movimentar.",
  },
  {
    emoji: "🏃",
    title: "Alongamento pré vs pós-treino",
    description:
      "Antes do treino, prefira alongamentos dinâmicos (movimentos controlados). Após o treino, faça alongamentos estáticos para relaxar.",
  },
  {
    emoji: "💧",
    title: "Hidratação e flexibilidade",
    description:
      "Músculos desidratados são menos flexíveis e mais propensos a lesões. Beba água regularmente ao longo do dia.",
  },
  {
    emoji: "😴",
    title: "Sono e recuperação",
    description:
      "Durante o sono, seu corpo repara tecidos e consolida ganhos de flexibilidade. Priorize 7-9 horas de sono por noite.",
  },
];

export const DicasSeguranca = () => {
  return (
    <div className="space-y-6">
      {/* Safety Tips */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Dicas de segurança
          </h3>
        </div>
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl ${tip.bg} flex items-center justify-center`}
                  >
                    <tip.icon size={18} className={tip.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Educational Articles */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Heart size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            Saúde & bem-estar
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
            >
              <Card className="p-4 h-full">
                <span className="text-2xl mb-2 block">{article.emoji}</span>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
