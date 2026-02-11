// Shared constants for the Protocolos module

export const tipoLabels: Record<string, { label: string; class: string }> = {
  emagrecimento: {
    label: "Emagrecimento",
    class: "bg-highlight/15 text-highlight border-highlight/30",
  },
  drenagem_pos_operatorio: {
    label: "Drenagem Pós-Op",
    class: "bg-info/15 text-info border-info/30",
  },
  postural: {
    label: "Postural",
    class: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/30",
  },
};

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
