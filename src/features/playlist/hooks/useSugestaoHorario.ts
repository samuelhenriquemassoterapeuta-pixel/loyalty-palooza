import { useMemo } from "react";
import { playlists } from "../data/categorias";

interface Sugestao {
  categoryId: string;
  mensagem: string;
  emoji: string;
}

export function useSugestaoHorario(): Sugestao {
  return useMemo(() => {
    const hora = new Date().getHours();

    if (hora >= 5 && hora < 9) {
      return { categoryId: "energetizante", mensagem: "Bom dia! Comece com energia", emoji: "🌅" };
    }
    if (hora >= 9 && hora < 12) {
      return { categoryId: "instrumental", mensagem: "Manhã produtiva com música instrumental", emoji: "☀️" };
    }
    if (hora >= 12 && hora < 14) {
      return { categoryId: "spa", mensagem: "Pausa do almoço — relaxe com sons de SPA", emoji: "🍃" };
    }
    if (hora >= 14 && hora < 17) {
      return { categoryId: "frequencias", mensagem: "Tarde focada com frequências terapêuticas", emoji: "🎯" };
    }
    if (hora >= 17 && hora < 20) {
      return { categoryId: "relaxante", mensagem: "Fim de tarde — hora de desacelerar", emoji: "🌇" };
    }
    if (hora >= 20 && hora < 23) {
      return { categoryId: "meditacao", mensagem: "Noite de meditação e paz interior", emoji: "🌙" };
    }
    // 23h - 5h
    return { categoryId: "mantras", mensagem: "Madrugada — mantras para o sono profundo", emoji: "✨" };
  }, []);
}
