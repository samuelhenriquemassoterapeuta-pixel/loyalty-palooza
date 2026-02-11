import { motion } from "framer-motion";

interface ExercicioAnimadoProps {
  tipo: "cervical" | "lombar" | "ombros" | "quadril" | "coluna" | "membros_superiores" | "membros_inferiores" | "geral";
  size?: number;
  className?: string;
}

// Animated stick-figure SVG illustrations for each exercise category
const animacoes: Record<string, React.FC<{ size: number }>> = {
  cervical: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Head */}
      <motion.circle
        cx="40" cy="18" r="8"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        animate={{ cy: [18, 14, 18, 22, 18] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Neck */}
      <motion.line
        x1="40" y1="26" x2="40" y2="35"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [40, 36, 40, 44, 40] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Body */}
      <line x1="40" y1="35" x2="40" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms */}
      <line x1="40" y1="40" x2="25" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="40" x2="55" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <line x1="40" y1="55" x2="30" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="55" x2="50" y2="72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  ombros: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="40" y1="24" x2="40" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Animated arms - shoulder rotation */}
      <motion.line
        x1="40" y1="34" x2="20" y2="44"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [20, 18, 20, 30, 20], y2: [44, 28, 20, 28, 44] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="34" x2="60" y2="44"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [60, 62, 60, 50, 60], y2: [44, 28, 20, 28, 44] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <line x1="40" y1="52" x2="30" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="52" x2="50" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  lombar: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <motion.g animate={{ rotate: [0, -15, 0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "40px 50px" }}>
        <circle cx="40" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="40" y1="24" x2="40" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="34" x2="26" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="34" x2="54" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      <line x1="40" y1="50" x2="30" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="50" x2="50" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  quadril: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="14" r="7" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="40" y1="21" x2="40" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="30" x2="26" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="30" x2="54" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Animated legs - hip stretch */}
      <motion.line
        x1="40" y1="46" x2="28" y2="68"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [28, 22, 28], y2: [68, 64, 68] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="46" x2="52" y2="68"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [52, 58, 52], y2: [68, 64, 68] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  ),
  coluna: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="14" r="7" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Animated spine curve */}
      <motion.path
        d="M40 21 Q40 35 40 50"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
        animate={{ d: ["M40 21 Q40 35 40 50", "M40 21 Q34 35 40 50", "M40 21 Q40 35 40 50", "M40 21 Q46 35 40 50", "M40 21 Q40 35 40 50"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="30" x2="24" y2="38"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={{ x1: [40, 36, 40, 44, 40] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="30" x2="56" y2="38"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={{ x1: [40, 36, 40, 44, 40] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <line x1="40" y1="50" x2="30" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="50" x2="50" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  membros_superiores: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="40" y1="24" x2="40" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms stretching up and down */}
      <motion.line
        x1="40" y1="34" x2="18" y2="46"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [18, 16, 22, 18], y2: [46, 24, 16, 46] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="34" x2="62" y2="46"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [62, 64, 58, 62], y2: [46, 24, 16, 46] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <line x1="40" y1="52" x2="30" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="52" x2="50" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  membros_inferiores: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="14" r="7" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="40" y1="21" x2="40" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="30" x2="26" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="30" x2="54" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Animated stretching legs */}
      <motion.line
        x1="40" y1="46" x2="25" y2="68"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [25, 20, 25], y2: [68, 58, 68] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="46" x2="55" y2="68"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [55, 60, 55], y2: [68, 58, 68] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
      />
    </svg>
  ),
  geral: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <motion.circle
        cx="40" cy="16" r="8"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <line x1="40" y1="24" x2="40" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <motion.line
        x1="40" y1="32" x2="22" y2="42"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ y2: [42, 26, 42], x2: [22, 20, 22] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="32" x2="58" y2="42"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ y2: [42, 26, 42], x2: [58, 60, 58] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="40" y1="50" x2="28" y2="70"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [28, 24, 28] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.line
        x1="40" y1="50" x2="52" y2="70"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        animate={{ x2: [52, 56, 52] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  ),
};

export const ExercicioAnimado = ({ tipo, size = 64, className = "" }: ExercicioAnimadoProps) => {
  const Animacao = animacoes[tipo] || animacoes.geral;
  return (
    <div className={`text-primary ${className}`}>
      <Animacao size={size} />
    </div>
  );
};
