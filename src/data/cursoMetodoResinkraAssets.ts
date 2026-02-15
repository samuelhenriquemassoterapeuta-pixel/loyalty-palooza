import type { CursoAssetPair } from "@/components/curso/CursoShell";

// Método Resinkra doesn't have per-lesson video/image assets yet.
// This empty map ensures CursoShell renders without errors.
// Assets can be added later as image/video pairs keyed by "moduloIndex-aulaIndex".
export const metodoResinkraAulaAssets: Record<string, CursoAssetPair> = {};
