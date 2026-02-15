import { useState } from "react";
import { Trophy, HelpCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface QuizQuestion {
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

interface QuizSectionProps {
  quiz: QuizQuestion[];
  onComplete?: () => void;
}

export function QuizSection({ quiz, onComplete }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [corrects, setCorrects] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quiz[currentQ];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.respostaCorreta) setCorrects((c) => c + 1);
  };

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      onComplete?.();
    }
  };

  if (finished) {
    const pct = Math.round((corrects / quiz.length) * 100);
    return (
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="text-center">
          <Trophy size={32} className="text-primary mx-auto mb-2" />
          <p className="font-bold">{pct}% de acertos</p>
          <p className="text-xs text-muted-foreground">
            {corrects}/{quiz.length} questões corretas
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle size={18} className="text-primary" />
        <span className="text-xs font-bold text-primary">
          Quiz {currentQ + 1}/{quiz.length}
        </span>
      </div>
      <p className="text-sm font-semibold mb-3">{q.pergunta}</p>
      <div className="space-y-2">
        {q.opcoes.map((opt, idx) => {
          const isCorrect = idx === q.respostaCorreta;
          const isSelected = idx === selected;
          let border = "border-border";
          if (answered && isCorrect) border = "border-primary bg-primary/10";
          else if (answered && isSelected && !isCorrect)
            border = "border-destructive bg-destructive/10";

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
              className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${border} ${
                !answered ? "hover:bg-muted cursor-pointer" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                {answered && isCorrect && <Check size={14} className="text-primary shrink-0" />}
                {answered && isSelected && !isCorrect && (
                  <X size={14} className="text-destructive shrink-0" />
                )}
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground italic mb-2">{q.explicacao}</p>
          <Button size="sm" onClick={handleNext}>
            {currentQ < quiz.length - 1 ? "Próxima →" : "Ver resultado"}
          </Button>
        </div>
      )}
    </Card>
  );
}
