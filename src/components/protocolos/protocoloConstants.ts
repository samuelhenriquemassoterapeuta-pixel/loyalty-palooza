// Shared constants for the Protocolos module

export const tipoLabels: Record<string, { label: string; class: string }> = {
  drenagem_pos_operatorio: {
    label: "Drenagem",
    class: "bg-info/15 text-info border-info/30",
  },
  postural: {
    label: "Postural",
    class: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/30",
  },
  alongamento: {
    label: "Alongamento",
    class: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/30",
  },
};

export const gruposProtocolos = [
  {
    tipo: "drenagem_pos_operatorio",
    titulo: "Drenagem",
    descricao: "Protocolos de drenagem linfática e pós-operatório",
    icon: "Droplets" as const,
    colorClass: "text-info",
  },
  {
    tipo: "postural",
    titulo: "Alinhamento Postural",
    descricao: "Protocolos de correção e alinhamento postural",
    icon: "Accessibility" as const,
    colorClass: "text-purple-600 dark:text-purple-400",
  },
  {
    tipo: "alongamento",
    titulo: "Alongamento & Flexibilidade",
    descricao: "Protocolos de exercícios de alongamento e ganho de flexibilidade",
    icon: "Stretch" as const,
    colorClass: "text-emerald-600 dark:text-emerald-400",
  },
] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};
