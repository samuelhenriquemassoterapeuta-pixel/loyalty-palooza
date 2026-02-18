import { motion } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";

const tips = [
  { text: "Beba um copo de água ao acordar. Seu corpo ficou horas sem hidratação.", icon: "💧", category: "Hidratação" },
  { text: "5 minutos de alongamento podem melhorar seu humor e postura para o dia todo.", icon: "🧘", category: "Movimento" },
  { text: "Respirar fundo por 1 minuto ativa o sistema nervoso parassimpático e reduz o estresse.", icon: "🌬️", category: "Respiração" },
  { text: "Dormir e acordar no mesmo horário regula seu relógio biológico naturalmente.", icon: "🌙", category: "Sono" },
  { text: "Uma caminhada de 10 minutos após as refeições melhora a digestão e o humor.", icon: "🚶", category: "Movimento" },
  { text: "Desconectar das telas 30 minutos antes de dormir melhora a qualidade do sono.", icon: "📵", category: "Sono" },
  { text: "Gratidão diária reduz ansiedade. Pense em 3 coisas boas que aconteceram hoje.", icon: "🙏", category: "Mental" },
  { text: "Exposição ao sol pela manhã ajuda a regular melatonina e vitamina D.", icon: "☀️", category: "Energia" },
  { text: "Mastigar devagar melhora a digestão e ajuda na saciedade.", icon: "🍽️", category: "Nutrição" },
  { text: "Pausas de 5 minutos a cada hora de trabalho previnem fadiga mental.", icon: "⏸️", category: "Produtividade" },
  { text: "Rir ativa músculos faciais e libera endorfinas naturais.", icon: "😄", category: "Mental" },
  { text: "Frutas e vegetais coloridos fornecem antioxidantes essenciais.", icon: "🥗", category: "Nutrição" },
  { text: "O contato com a natureza reduz cortisol em até 20% em apenas 20 minutos.", icon: "🌿", category: "Bem-estar" },
  { text: "Exercícios de força protegem articulações e melhoram a densidade óssea.", icon: "💪", category: "Movimento" },
  { text: "Manter conexões sociais é tão importante para a saúde quanto exercícios.", icon: "🤝", category: "Social" },
  { text: "Reduzir açúcar refinado melhora energia, pele e qualidade do sono.", icon: "🍬", category: "Nutrição" },
  { text: "Meditação de 5 minutos por dia já traz benefícios mensuráveis ao cérebro.", icon: "🧠", category: "Mental" },
  { text: "Postura correta ao sentar previne dores e melhora a respiração.", icon: "🪑", category: "Postura" },
  { text: "Chás naturais como camomila e erva-cidreira ajudam no relaxamento.", icon: "🍵", category: "Bem-estar" },
  { text: "Definir intenções pela manhã aumenta foco e sensação de propósito.", icon: "🎯", category: "Mental" },
  { text: "Banhos mornos antes de dormir ajudam o corpo a entrar em modo de descanso.", icon: "🛁", category: "Sono" },
  { text: "Cada passo conta. 7.000 passos diários já reduzem riscos cardiovasculares.", icon: "👟", category: "Movimento" },
  { text: "Evite cafeína após as 14h para não prejudicar seu ciclo de sono.", icon: "☕", category: "Sono" },
  { text: "Praticar auto-compaixão reduz estresse crônico e melhora resiliência.", icon: "💜", category: "Mental" },
  { text: "Alimentos ricos em magnésio (banana, castanhas) ajudam no relaxamento muscular.", icon: "🥜", category: "Nutrição" },
  { text: "Escrever seus pensamentos ajuda a processar emoções e reduzir ansiedade.", icon: "📝", category: "Mental" },
  { text: "Ouvir música que você gosta libera dopamina e melhora o humor.", icon: "🎵", category: "Bem-estar" },
  { text: "Abraços de mais de 20 segundos liberam ocitocina, o hormônio do bem-estar.", icon: "🤗", category: "Social" },
  { text: "Manter um ambiente organizado reduz estresse e melhora o foco.", icon: "✨", category: "Produtividade" },
  { text: "Pequenos atos de gentileza aumentam felicidade de quem dá e de quem recebe.", icon: "💛", category: "Social" },
];

const WellnessDailyTip = () => {
  const dayIndex = useMemo(() => {
    const now = new Date();
    return (now.getFullYear() * 366 + now.getMonth() * 31 + now.getDate()) % tips.length;
  }, []);

  const [index, setIndex] = useState(dayIndex);
  const tip = tips[index];

  const shuffle = () => {
    let next = index;
    while (next === index) {
      next = Math.floor(Math.random() * tips.length);
    }
    setIndex(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Lightbulb size={12} /> Dica do dia
        </p>
        <button
          onClick={shuffle}
          className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors"
        >
          <RefreshCw size={10} /> Outra
        </button>
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-4"
      >
        <div className="flex gap-3">
          <span className="text-2xl flex-shrink-0">{tip.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground leading-relaxed">{tip.text}</p>
            <span className="inline-block mt-2 text-[9px] font-medium text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
              {tip.category}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WellnessDailyTip;
