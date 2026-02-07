export interface LevelInfo {
  level: number;
  name: string;
  icon: string;
  minXp: number;
  maxXp: number;
}

// XP config: regular badges = 100 XP, secret badges = 250 XP
export const XP_PER_BADGE = 100;
export const XP_PER_SECRET = 250;

export const LEVELS: LevelInfo[] = [
  { level: 1, name: "Curiosa", icon: "🌱", minXp: 0, maxXp: 100 },
  { level: 2, name: "Iniciante", icon: "🌿", minXp: 100, maxXp: 300 },
  { level: 3, name: "Praticante", icon: "🍃", minXp: 300, maxXp: 600 },
  { level: 4, name: "Experiente", icon: "🌳", minXp: 600, maxXp: 1000 },
  { level: 5, name: "Especialista", icon: "🌟", minXp: 1000, maxXp: 1500 },
  { level: 6, name: "Mestra", icon: "👑", minXp: 1500, maxXp: 2100 },
  { level: 7, name: "Lendária", icon: "💎", minXp: 2100, maxXp: Infinity },
];

export interface LevelWithProgress extends LevelInfo {
  progressPercent: number;
  xpInLevel: number;
  xpNeeded: number;
}

export function calculateXpFromAchievements(achievements: { unlocked: boolean; secret?: boolean; progress: number }[]) {
  let totalXp = 0;
  achievements.forEach((a) => {
    if (a.unlocked) {
      totalXp += a.secret ? XP_PER_SECRET : XP_PER_BADGE;
    } else {
      if (!a.secret) {
        totalXp += Math.floor((a.progress / 100) * XP_PER_BADGE * 0.25);
      }
    }
  });
  return totalXp;
}

export function getLevelFromXp(xp: number): LevelWithProgress {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) current = lvl;
  }

  const xpInLevel = xp - current.minXp;
  const xpNeeded = current.maxXp === Infinity ? 1 : current.maxXp - current.minXp;
  const progressPercent = current.maxXp === Infinity ? 100 : Math.min((xpInLevel / xpNeeded) * 100, 100);

  return { ...current, progressPercent, xpInLevel, xpNeeded };
}
