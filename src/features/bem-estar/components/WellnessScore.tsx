import { motion } from "framer-motion";

interface Props {
  humor: number;
  energia: number;
  sonoHoras: number | null;
  aguaLitros: number | null;
  estresse: number | null;
  exercicioMin: number | null;
  dor: number | null;
}

function calculateScore({
  humor,
  energia,
  sonoHoras,
  aguaLitros,
  estresse,
  exercicioMin,
  dor,
}: Props): { score: number; label: string; color: string } {
  // Normalize each metric to 0-100
  const humorScore = (humor / 5) * 100;
  const energiaScore = (energia / 5) * 100;
  const sonoScore = sonoHoras ? Math.min((sonoHoras / 8) * 100, 100) : 50;
  const aguaScore = aguaLitros ? Math.min((aguaLitros / 2.5) * 100, 100) : 50;
  const stressScore = estresse ? ((5 - estresse) / 5) * 100 : 50; // inverted
  const exercicioScore = exercicioMin ? Math.min((exercicioMin / 30) * 100, 100) : 40;
  const dorScore = dor != null ? ((5 - dor) / 5) * 100 : 80; // inverted

  // Weighted average
  const score = Math.round(
    humorScore * 0.25 +
    energiaScore * 0.2 +
    sonoScore * 0.2 +
    aguaScore * 0.1 +
    stressScore * 0.1 +
    exercicioScore * 0.1 +
    dorScore * 0.05
  );

  let label: string;
  let color: string;
  if (score >= 85) {
    label = "Excelente";
    color = "text-green-500";
  } else if (score >= 70) {
    label = "Bom";
    color = "text-primary";
  } else if (score >= 50) {
    label = "Regular";
    color = "text-amber-500";
  } else {
    label = "Atenção";
    color = "text-destructive";
  }

  return { score, label, color };
}

const WellnessScore = (props: Props) => {
  const { score, label, color } = calculateScore(props);
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-4"
    >
      <div className="relative w-[88px] h-[88px] flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <motion.circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-foreground">{score}</span>
          <span className="text-[9px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div>
        <p className={`text-sm font-bold ${color}`}>{label}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">Score de bem-estar de hoje</p>
      </div>
    </motion.div>
  );
};

export default WellnessScore;
