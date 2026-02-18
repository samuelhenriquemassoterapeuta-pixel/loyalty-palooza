import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, Volume2, Headphones, Heart, Timer, Music, Search, QrCode, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/AppLayout";
import { playlists, type Track } from "../data/categorias";
import { useFavoritos } from "../hooks/useFavoritos";
import { TimerSessao } from "../components/TimerSessao";
import { SugestaoHorario } from "../components/SugestaoHorario";
import { QRCodeFaixa } from "../components/QRCodeFaixa";

export default function PlaylistMusical() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [showFavoritos, setShowFavoritos] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fluxoContinuo, setFluxoContinuo] = useState(false);
  const [qrTrack, setQrTrack] = useState<{ youtubeId: string; title: string } | null>(null);
  const { toggleFavorito, isFavorito, totalFavoritos } = useFavoritos();

  const activePlaylist = playlists.find(p => p.id === activeCategory);

  // Flatten all tracks for favorites view
  const allTracks = playlists.flatMap(p => p.tracks.map(t => ({ ...t, categoryId: p.id, categoryEmoji: p.emoji })));
  const favoriteTracks = allTracks.filter(t => isFavorito(t.youtubeId));

  // Search across all categories
  const searchResults = searchQuery.length >= 2
    ? allTracks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const totalFaixas = playlists.reduce((acc, p) => acc + p.tracks.length, 0);

  // Continuous flow: auto-play next track
  const handleTrackClick = useCallback((youtubeId: string) => {
    setPlayingTrack(prev => prev === youtubeId ? null : youtubeId);
  }, []);

  // Listen for YouTube iframe end event via postMessage (best-effort)
  useEffect(() => {
    if (!fluxoContinuo || !playingTrack || !activePlaylist) return;

    // Auto-advance after estimated duration (3.5 min average for therapeutic tracks)
    const timer = setTimeout(() => {
      const tracks = activePlaylist.tracks;
      const currentIndex = tracks.findIndex(t => t.youtubeId === playingTrack);
      if (currentIndex >= 0 && currentIndex < tracks.length - 1) {
        setPlayingTrack(tracks[currentIndex + 1].youtubeId);
      }
    }, 3.5 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [fluxoContinuo, playingTrack, activePlaylist]);

  const renderTrack = (track: Track & { categoryId?: string; categoryEmoji?: string }, index: number, showCategory = false) => (
    <motion.div
      key={`${track.youtubeId}-${index}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Card
        className={`cursor-pointer transition-all ${
          playingTrack === track.youtubeId
            ? "ring-2 ring-primary shadow-lg"
            : "hover:shadow-md"
        }`}
        onClick={() => handleTrackClick(track.youtubeId)}
      >
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            {playingTrack === track.youtubeId ? (
              <Pause size={14} className="text-primary" />
            ) : (
              <Play size={14} className="text-primary ml-0.5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
            <p className="text-xs text-muted-foreground">{track.artist}</p>
          </div>
          {showCategory && track.categoryEmoji && (
            <span className="text-lg shrink-0">{track.categoryEmoji}</span>
          )}
          {track.frequencia && activeCategory === "frequencias" && (
            <Badge variant="secondary" className="text-[10px] shrink-0">{track.frequencia} Hz</Badge>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setQrTrack({ youtubeId: track.youtubeId, title: track.title }); }}
            className="shrink-0 p-1"
            title="QR Code"
          >
            <QrCode size={14} className="text-muted-foreground hover:text-primary transition-colors" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorito(track.youtubeId); }}
            className="shrink-0 p-1"
          >
            <Heart
              size={16}
              className={isFavorito(track.youtubeId) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
            />
          </button>
          <Volume2 size={14} className="text-muted-foreground shrink-0" />
        </CardContent>
      </Card>

      {/* YouTube Embed */}
      {playingTrack === track.youtubeId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 rounded-xl overflow-hidden"
        >
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${track.youtubeId}?autoplay=1&rel=0`}
            title={track.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl"
          />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          <div className="max-w-lg mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
                <ArrowLeft size={20} />
              </Button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Headphones size={24} />
                  Playlist Terapêutica
                </h1>
                <p className="text-sm text-muted-foreground">
                  {totalFaixas} faixas em {playlists.length} categorias
                </p>
              </div>
            </div>

            {/* Action bar */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={showTimer ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTimer(!showTimer)}
                className="gap-1 text-xs"
              >
                <Timer size={14} /> Timer
              </Button>
              <Button
                variant={showFavoritos ? "default" : "outline"}
                size="sm"
                onClick={() => { setShowFavoritos(!showFavoritos); setActiveCategory(null); setSearchQuery(""); }}
                className="gap-1 text-xs"
              >
                <Heart size={14} /> Favoritos ({totalFavoritos})
              </Button>
              <Button
                variant={fluxoContinuo ? "default" : "outline"}
                size="sm"
                onClick={() => setFluxoContinuo(!fluxoContinuo)}
                className="gap-1 text-xs"
              >
                <Repeat size={14} /> Fluxo
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
          {/* Timer */}
          <AnimatePresence>
            {showTimer && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <TimerSessao onClose={() => setShowTimer(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continuous Flow indicator */}
          {fluxoContinuo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Badge variant="secondary" className="gap-1">
                <Repeat size={12} /> Fluxo contínuo ativado — próxima faixa automaticamente
              </Badge>
            </motion.div>
          )}

          {/* Search */}
          {!activeCategory && !showFavoritos && (
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar faixas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          )}

          {/* Time-based suggestion */}
          {!activeCategory && !showFavoritos && searchQuery.length < 2 && (
            <SugestaoHorario onSelect={setActiveCategory} />
          )}

          {/* Search Results */}
          {searchQuery.length >= 2 && !activeCategory && !showFavoritos && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">{searchResults.length} resultado(s)</p>
              {searchResults.slice(0, 20).map((track, i) => renderTrack(track, i, true))}
            </div>
          )}

          {/* Favorites View */}
          {showFavoritos && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Heart size={18} className="text-red-500" /> Minhas Favoritas
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowFavoritos(false)}>
                  Ver categorias
                </Button>
              </div>
              {favoriteTracks.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    <Heart size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Nenhuma faixa favoritada ainda</p>
                    <p className="text-xs mt-1">Toque no ❤️ ao lado de qualquer faixa</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {favoriteTracks.map((track, i) => renderTrack(track, i, true))}
                </div>
              )}
            </div>
          )}

          {/* Category Cards */}
          {!activeCategory && !showFavoritos && searchQuery.length < 2 && (
            <div className="space-y-3">
              {playlists.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all border-border/50"
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0 text-2xl`}>
                        {cat.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{cat.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{cat.subtitle}</p>
                        <Badge variant="secondary" className="text-[10px] mt-1">{cat.tracks.length} faixas</Badge>
                      </div>
                      <Music size={18} className="text-muted-foreground shrink-0" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Active Playlist */}
          {activePlaylist && !showFavoritos && (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => { setActiveCategory(null); setPlayingTrack(null); }} className="gap-2">
                <ArrowLeft size={16} /> Voltar às categorias
              </Button>

              <div className={`rounded-2xl bg-gradient-to-br ${activePlaylist.color} p-6 text-center`}>
                <span className="text-4xl block mb-2">{activePlaylist.emoji}</span>
                <h2 className="text-lg font-bold text-foreground">{activePlaylist.title}</h2>
                <p className="text-sm text-muted-foreground">{activePlaylist.subtitle}</p>
                <Badge variant="secondary" className="mt-2">{activePlaylist.tracks.length} faixas</Badge>
              </div>

              <div className="space-y-2">
                {activePlaylist.tracks.map((track, i) => renderTrack(track, i))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {qrTrack && (
          <QRCodeFaixa
            youtubeId={qrTrack.youtubeId}
            title={qrTrack.title}
            onClose={() => setQrTrack(null)}
          />
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
