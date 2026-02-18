import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "resinkra_playlist_favorites";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoritos]));
  }, [favoritos]);

  const toggleFavorito = useCallback((youtubeId: string) => {
    setFavoritos(prev => {
      const next = new Set(prev);
      if (next.has(youtubeId)) {
        next.delete(youtubeId);
      } else {
        next.add(youtubeId);
      }
      return next;
    });
  }, []);

  const isFavorito = useCallback((youtubeId: string) => favoritos.has(youtubeId), [favoritos]);

  return { favoritos, toggleFavorito, isFavorito, totalFavoritos: favoritos.size };
}
