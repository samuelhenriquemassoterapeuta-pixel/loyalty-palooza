export interface LevelReward {
  icon: string;
  title: string;
  description: string;
  /** The minimum level required to unlock this reward */
  requiredLevel: number;
  /** Visual tag for the reward type */
  tag: "desconto" | "cashback" | "exclusivo" | "prioridade";
}

export const LEVEL_REWARDS: LevelReward[] = [
  // Level 1 — Curiosa
  {
    icon: "🎁",
    title: "Boas-vindas",
    description: "Acesso ao programa de fidelidade e conquistas",
    requiredLevel: 1,
    tag: "exclusivo",
  },
  // Level 2 — Iniciante
  {
    icon: "💸",
    title: "Cashback +5%",
    description: "Bônus de 5% extra em todo cashback de serviços",
    requiredLevel: 2,
    tag: "cashback",
  },
  {
    icon: "🏷️",
    title: "5% off na Loja",
    description: "Desconto de 5% em todos os produtos da loja",
    requiredLevel: 2,
    tag: "desconto",
  },
  // Level 3 — Praticante
  {
    icon: "🌿",
    title: "Cashback +10%",
    description: "Bônus de 10% extra em todo cashback acumulado",
    requiredLevel: 3,
    tag: "cashback",
  },
  {
    icon: "📅",
    title: "Agendamento prioritário",
    description: "Prioridade na reserva de horários disputados",
    requiredLevel: 3,
    tag: "prioridade",
  },
  // Level 4 — Experiente
  {
    icon: "🎯",
    title: "10% off na Loja",
    description: "Desconto de 10% em todos os produtos da loja",
    requiredLevel: 4,
    tag: "desconto",
  },
  {
    icon: "💆",
    title: "Sessão bônus",
    description: "1 sessão de cortesia a cada 10 agendamentos",
    requiredLevel: 4,
    tag: "exclusivo",
  },
  // Level 5 — Especialista
  {
    icon: "✨",
    title: "Cashback +20%",
    description: "Bônus de 20% extra em todo cashback acumulado",
    requiredLevel: 5,
    tag: "cashback",
  },
  {
    icon: "🎀",
    title: "Acesso antecipado",
    description: "Veja novos produtos e serviços antes de todos",
    requiredLevel: 5,
    tag: "exclusivo",
  },
  // Level 6 — Mestra
  {
    icon: "👑",
    title: "15% off em tudo",
    description: "Desconto exclusivo de 15% em produtos e serviços",
    requiredLevel: 6,
    tag: "desconto",
  },
  {
    icon: "💎",
    title: "Cashback +30%",
    description: "Bônus de 30% extra em todo cashback — o máximo!",
    requiredLevel: 6,
    tag: "cashback",
  },
  // Level 7 — Lendária
  {
    icon: "🏆",
    title: "Clube VIP Lendário",
    description: "Benefícios exclusivos, brindes surpresa e convites para eventos",
    requiredLevel: 7,
    tag: "exclusivo",
  },
];

export const TAG_STYLES: Record<LevelReward["tag"], { label: string; className: string }> = {
  desconto: {
    label: "Desconto",
    className: "bg-highlight/15 text-highlight",
  },
  cashback: {
    label: "Cashback",
    className: "bg-warning/15 text-warning",
  },
  exclusivo: {
    label: "Exclusivo",
    className: "bg-accent/15 text-accent",
  },
  prioridade: {
    label: "Prioridade",
    className: "bg-info/15 text-info",
  },
};
