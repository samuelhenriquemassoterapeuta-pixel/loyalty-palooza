import { motion } from "framer-motion";
import { Activity, Clock, Flame, Trophy, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SessaoAlongamento } from "@/hooks/useAlongamento";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProgressoSectionProps {
  sessoes: SessaoAlongamento[];
  totalSessoes: number;
  totalMinutos: number;
  totalExercicios: number;
}

export const ProgressoSection = ({ sessoes, totalSessoes, totalMinutos, totalExercicios }: ProgressoSectionProps) => {
  // Streak: dias consecutivos com sessão
  const calcStreak = () => {
    if (sessoes.length === 0) return 0;
    const datas = [...new Set(sessoes.map(s => format(new Date(s.data), "yyyy-MM-dd")))].sort().reverse();
    let streak = 1;
    for (let i = 1; i < datas.length; i++) {
      const diff = new Date(datas[i - 1]).getTime() - new Date(datas[i]).getTime();
      if (diff <= 86400000 * 1.5) streak++;
      else break;
    }
    return streak;
  };

  const streak = calcStreak();

  const stats = [
    { icon: Activity, label: "Sessões", value: totalSessoes, color: "text-primary" },
    { icon: Clock, label: "Minutos", value: totalMinutos, color: "text-info" },
    { icon: TrendingUp, label: "Exercícios", value: totalExercicios, color: "text-accent" },
    { icon: Flame, label: "Streak", value: `${streak}d`, color: "text-warning" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 text-center">
              <stat.icon size={20} className={`mx-auto mb-1 ${stat.color}`} />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent sessions */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Sessões recentes</h3>
        {sessoes.length === 0 ? (
          <Card className="p-6 text-center">
            <Trophy size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nenhuma sessão registrada ainda</p>
            <p className="text-xs text-muted-foreground mt-1">Inicie um plano para começar!</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {sessoes.slice(0, 10).map((sessao, i) => (
              <motion.div
                key={sessao.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="p-3 flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {sessao.exercicios_completados} exercício{sessao.exercicios_completados !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(sessao.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-primary">
                      {Math.round(sessao.duracao_total_segundos / 60)}min
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
