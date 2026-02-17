import { motion } from "framer-motion";
import { Lock, Unlock, Star, Trophy, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface NivelConfig {
  nivel: string;
  label: string;
  icon: React.ReactNode;
  sessoesNecessarias: number;
  color: string;
  bgColor: string;
}

const NIVEIS: NivelConfig[] = [
  {
    nivel: "iniciante",
    label: "Iniciante",
    icon: <Star size={16} />,
    sessoesNecessarias: 0,
    color: "text-highlight",
    bgColor: "bg-highlight/15",
  },
  {
    nivel: "intermediario",
    label: "Intermediário",
    icon: <Zap size={16} />,
    sessoesNecessarias: 10,
    color: "text-warning",
    bgColor: "bg-warning/15",
  },
  {
    nivel: "avancado",
    label: "Avançado",
    icon: <Trophy size={16} />,
    sessoesNecessarias: 25,
    color: "text-accent",
    bgColor: "bg-accent/15",
  },
];

interface NivelProgressaoProps {
  totalSessoes: number;
  className?: string;
}

export const NivelProgressao = ({ totalSessoes, className = "" }: NivelProgressaoProps) => {
  const nivelAtual = NIVEIS.reduce((acc, n) => (totalSessoes >= n.sessoesNecessarias ? n : acc), NIVEIS[0]);
  const proximoNivel = NIVEIS.find((n) => totalSessoes < n.sessoesNecessarias);

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Zap size={15} className="text-primary" />
        Progressão de Nível
      </h3>

      <div className="grid gap-2">
        {NIVEIS.map((nivel, i) => {
          const desbloqueado = totalSessoes >= nivel.sessoesNecessarias;
          const isAtual = nivel.nivel === nivelAtual.nivel;
          const progresso = desbloqueado
            ? 100
            : proximoNivel?.nivel === nivel.nivel
              ? Math.round((totalSessoes / nivel.sessoesNecessarias) * 100)
              : 0;

          return (
            <motion.div
              key={nivel.nivel}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`p-3 transition-all ${
                  isAtual
                    ? "ring-2 ring-primary/30 shadow-sm"
                    : desbloqueado
                      ? "opacity-80"
                      : "opacity-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${nivel.bgColor} ${nivel.color}`}
                  >
                    {desbloqueado ? nivel.icon : <Lock size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${desbloqueado ? "text-foreground" : "text-muted-foreground"}`}>
                        {nivel.label}
                      </span>
                      {isAtual && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-primary/30 text-primary">
                          Atual
                        </Badge>
                      )}
                      {desbloqueado && !isAtual && (
                        <Unlock size={12} className="text-muted-foreground" />
                      )}
                    </div>
                    {!desbloqueado ? (
                      <div className="mt-1">
                        <Progress value={progresso} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {totalSessoes}/{nivel.sessoesNecessarias} sessões
                        </p>
                      </div>
                    ) : (
                      <p className="text-[10px] text-muted-foreground">
                        {nivel.sessoesNecessarias === 0 ? "Sempre disponível" : `Desbloqueado com ${nivel.sessoesNecessarias} sessões`}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/** Returns which levels are unlocked based on session count */
export function getNiveisDesbloqueados(totalSessoes: number): string[] {
  return NIVEIS.filter((n) => totalSessoes >= n.sessoesNecessarias).map((n) => n.nivel);
}
