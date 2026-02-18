import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MotivationQuote {
  frase: string;
  autor: string;
  tema: string;
}

const quotes: MotivationQuote[] = [
  { frase: "Cuide do seu corpo. É o único lugar que você tem para viver.", autor: "Jim Rohn", tema: "Corpo" },
  { frase: "A saúde é o maior presente, a contentamento a maior riqueza, a fidelidade o melhor relacionamento.", autor: "Buda", tema: "Saúde" },
  { frase: "Quase tudo funciona de novo se você desligar por alguns minutos... inclusive você.", autor: "Anne Lamott", tema: "Descanso" },
  { frase: "Você não precisa ser extremo, apenas consistente.", autor: "Anônimo", tema: "Hábitos" },
  { frase: "A calma é um superpoder.", autor: "Anônimo", tema: "Mental" },
  { frase: "Seu corpo escuta tudo que sua mente diz.", autor: "Naomi Judd", tema: "Mente-Corpo" },
  { frase: "O autocuidado não é egoísmo. Você não pode servir de um recipiente vazio.", autor: "Eleanor Brown", tema: "Autocuidado" },
  { frase: "Respire. Solte. Lembre-se de que este momento é o único que você tem certeza que existe.", autor: "Oprah Winfrey", tema: "Presença" },
  { frase: "Cada manhã traz novas possibilidades.", autor: "Anônimo", tema: "Renovação" },
  { frase: "Grandes mudanças vêm de pequenos hábitos diários.", autor: "James Clear", tema: "Hábitos" },
  { frase: "O corpo alcança o que a mente acredita.", autor: "Anônimo", tema: "Mentalidade" },
  { frase: "Não é sobre ter tempo, é sobre criar tempo.", autor: "Anônimo", tema: "Prioridade" },
  { frase: "Descansar é produtivo.", autor: "Anônimo", tema: "Descanso" },
  { frase: "A água é a força motriz de toda a natureza.", autor: "Leonardo da Vinci", tema: "Hidratação" },
  { frase: "Dormir é a melhor meditação.", autor: "Dalai Lama", tema: "Sono" },
  { frase: "Movimento é remédio.", autor: "Anônimo", tema: "Exercício" },
  { frase: "Gentileza consigo mesmo é o primeiro passo para a cura.", autor: "Anônimo", tema: "Autocuidado" },
  { frase: "Um dia de cada vez.", autor: "Anônimo", tema: "Paciência" },
  { frase: "A jornada de mil milhas começa com um único passo.", autor: "Lao Tzu", tema: "Começo" },
  { frase: "Progresso, não perfeição.", autor: "Anônimo", tema: "Crescimento" },
];

function getDailyIndex(): number {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  return dayOfYear % quotes.length;
}

export default function WellnessMotivation() {
  const baseIndex = useMemo(() => getDailyIndex(), []);
  const [offset, setOffset] = useState(0);
  const current = quotes[(baseIndex + offset + quotes.length) % quotes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/5 to-primary/5 p-4 relative overflow-hidden">
        {/* Decorative quote mark */}
        <Quote size={48} className="absolute -top-1 -left-1 text-accent/8 rotate-180" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Inspiração do dia
            </p>
            <span className="text-[10px] text-muted-foreground/60 bg-muted/30 px-2 py-0.5 rounded-full">
              {current.tema}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={offset}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-medium text-foreground leading-relaxed italic">
                "{current.frase}"
              </p>
              <p className="text-xs text-muted-foreground mt-2">— {current.autor}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-end gap-1 mt-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              onClick={() => setOffset((o) => o - 1)}
            >
              <ChevronLeft size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              onClick={() => setOffset((o) => o + 1)}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
