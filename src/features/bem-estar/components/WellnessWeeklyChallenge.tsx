import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Challenge {
  titulo: string;
  descricao: string;
  icone: string;
  categoria: string;
  dificuldade: "fácil" | "moderado" | "avançado";
}

const challenges: Challenge[] = [
  { titulo: "Semana sem açúcar refinado", descricao: "Substitua doces por frutas e lanches naturais durante 7 dias.", icone: "🍎", categoria: "Nutrição", dificuldade: "moderado" },
  { titulo: "10 min de meditação diária", descricao: "Reserve 10 minutos toda manhã para meditar ou respirar com foco.", icone: "🧘", categoria: "Mental", dificuldade: "fácil" },
  { titulo: "Caminhe 8.000 passos/dia", descricao: "Movimente-se mais no dia a dia — escadas, caminhadas curtas.", icone: "🚶", categoria: "Movimento", dificuldade: "moderado" },
  { titulo: "Durma 7h+ por noite", descricao: "Estabeleça um horário fixo de dormir e evite telas 30 min antes.", icone: "🌙", categoria: "Sono", dificuldade: "fácil" },
  { titulo: "Gratidão diária", descricao: "Escreva 3 coisas pelas quais é grato antes de dormir.", icone: "🙏", categoria: "Mental", dificuldade: "fácil" },
  { titulo: "2L de água por dia", descricao: "Mantenha uma garrafa por perto e registre seu consumo.", icone: "💧", categoria: "Hidratação", dificuldade: "fácil" },
  { titulo: "Semana sem redes sociais à noite", descricao: "Evite redes sociais após as 20h — leia um livro ou converse.", icone: "📵", categoria: "Digital", dificuldade: "moderado" },
  { titulo: "Alongamento matinal de 5 min", descricao: "Comece cada dia com uma sequência curta de alongamento.", icone: "🤸", categoria: "Movimento", dificuldade: "fácil" },
  { titulo: "Cozinhe 5 refeições em casa", descricao: "Prepare pelo menos 5 refeições caseiras nesta semana.", icone: "🍳", categoria: "Nutrição", dificuldade: "moderado" },
  { titulo: "1 ato de gentileza por dia", descricao: "Faça algo gentil por alguém — um elogio, ajuda, mensagem.", icone: "💚", categoria: "Social", dificuldade: "fácil" },
  { titulo: "Treino de força 3x na semana", descricao: "Inclua exercícios de resistência pelo menos 3 vezes.", icone: "💪", categoria: "Movimento", dificuldade: "avançado" },
  { titulo: "Journaling noturno", descricao: "Escreva sobre seu dia em 5 min antes de dormir.", icone: "📝", categoria: "Mental", dificuldade: "fácil" },
  { titulo: "Coma um vegetal novo", descricao: "Experimente um vegetal ou legume que nunca comeu antes.", icone: "🥦", categoria: "Nutrição", dificuldade: "fácil" },
  { titulo: "Semana do banho frio", descricao: "Termine seu banho com 30s de água fria para ativar o corpo.", icone: "🧊", categoria: "Corpo", dificuldade: "avançado" },
  { titulo: "Desconecte 1h por dia", descricao: "Uma hora inteira sem celular — passeie, leia, cozinhe.", icone: "🔌", categoria: "Digital", dificuldade: "moderado" },
  { titulo: "Contato com a natureza", descricao: "Passe pelo menos 20 min ao ar livre todos os dias.", icone: "🌿", categoria: "Natureza", dificuldade: "fácil" },
];

function getWeeklyChallenge(): Challenge {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor((now.getTime() - startOfYear.getTime()) / (7 * 86400000));
  return challenges[weekNumber % challenges.length];
}

const difficultyColors: Record<string, string> = {
  "fácil": "bg-green-500/15 text-green-700 dark:text-green-400",
  "moderado": "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  "avançado": "bg-red-500/15 text-red-700 dark:text-red-400",
};

export default function WellnessWeeklyChallenge() {
  const weeklyChallenge = useMemo(() => getWeeklyChallenge(), []);
  const [accepted, setAccepted] = useState(false);
  const [shuffled, setShuffled] = useState<Challenge | null>(null);

  const current = shuffled || weeklyChallenge;

  const handleShuffle = () => {
    const other = challenges.filter((c) => c.titulo !== current.titulo);
    setShuffled(other[Math.floor(Math.random() * other.length)]);
    setAccepted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-accent/5 to-highlight/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-primary" />
            <p className="text-xs font-semibold text-foreground">Desafio da Semana</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColors[current.dificuldade]}`}>
              {current.dificuldade}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              onClick={handleShuffle}
            >
              <RefreshCw size={13} />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.titulo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{current.icone}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground leading-snug">{current.titulo}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{current.descricao}</p>
                <span className="inline-block text-[10px] text-muted-foreground/70 mt-1 bg-muted/30 px-2 py-0.5 rounded-full">
                  {current.categoria}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-3">
          {accepted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-xs text-primary font-medium"
            >
              <CheckCircle2 size={16} />
              <span>Desafio aceito! Boa sorte esta semana 💪</span>
            </motion.div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs gap-1.5 border-primary/20 text-primary hover:bg-primary/10"
              onClick={() => setAccepted(true)}
            >
              <Sparkles size={13} />
              Aceitar desafio
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
