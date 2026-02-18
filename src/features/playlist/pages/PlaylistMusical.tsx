import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Music, Play, Pause, Volume2, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";

interface PlaylistCategory {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  tracks: { title: string; artist: string; youtubeId: string }[];
}

const playlists: PlaylistCategory[] = [
  {
    id: "frequencias",
    title: "Frequências em Hertz",
    subtitle: "Ondas sonoras terapêuticas",
    emoji: "🔊",
    color: "from-violet-500/20 to-purple-500/10",
    tracks: [
      { title: "432 Hz — Frequência do Universo", artist: "Healing Vibrations", youtubeId: "aJOTlE1K90k" },
      { title: "528 Hz — Frequência do Amor", artist: "Solfeggio Tones", youtubeId: "JuWP-sCHMEA" },
      { title: "396 Hz — Liberação do Medo", artist: "Deep Healing", youtubeId: "FcTFQqi4YHg" },
      { title: "741 Hz — Despertar Intuição", artist: "Frequency Healing", youtubeId: "eTUigJTMWbE" },
    ],
  },
  {
    id: "relaxante",
    title: "Relaxante",
    subtitle: "Sons para desacelerar a mente",
    emoji: "🧘",
    color: "from-blue-500/20 to-cyan-500/10",
    tracks: [
      { title: "Deep Relaxation — Piano & Nature", artist: "Calm Sounds", youtubeId: "lFcSrYw-ARY" },
      { title: "Stress Relief — Ocean Waves", artist: "Nature Therapy", youtubeId: "bn9F19Hi1Lk" },
      { title: "Sleeping Music — Soft Piano", artist: "Sleep Easy", youtubeId: "1ZYbU82GVz4" },
      { title: "Relaxing Rain — 3 Hours", artist: "Ambient Rain", youtubeId: "q76bMs-NwRk" },
    ],
  },
  {
    id: "instrumental",
    title: "Instrumental",
    subtitle: "Melodias sem vocal",
    emoji: "🎹",
    color: "from-amber-500/20 to-orange-500/10",
    tracks: [
      { title: "Beautiful Piano — Peaceful Music", artist: "Piano Relax", youtubeId: "9Q634rbsypE" },
      { title: "Acoustic Guitar — Soft Melodies", artist: "Guitar Dreams", youtubeId: "PYdm0rJXeRk" },
      { title: "Classical Cello — Deep Focus", artist: "Cello Suite", youtubeId: "GX1dVR97jB8" },
      { title: "Harp & Flute — Ethereal", artist: "Serene Sounds", youtubeId: "LIA9TLaGyRk" },
    ],
  },
  {
    id: "spa",
    title: "SPA",
    subtitle: "Ambiente de clínica e bem-estar",
    emoji: "💆",
    color: "from-teal-500/20 to-emerald-500/10",
    tracks: [
      { title: "Spa Music — Bamboo Water", artist: "Spa Relaxation", youtubeId: "IdoD2147Fik" },
      { title: "Healing Spa — Nature Sounds", artist: "Wellness Music", youtubeId: "x7gcPM_dxzI" },
      { title: "Massage Music — Calm River", artist: "Body & Mind", youtubeId: "oGFBq_eBnms" },
      { title: "Zen Garden — Tibetan Bowls", artist: "Spa Zen", youtubeId: "HyjB8HXf4KQ" },
    ],
  },
  {
    id: "oriental",
    title: "Oriental",
    subtitle: "Sonoridades do Oriente",
    emoji: "🏯",
    color: "from-red-500/20 to-rose-500/10",
    tracks: [
      { title: "Japanese Zen — Shakuhachi Flute", artist: "Zen Master", youtubeId: "smHXC6PdVR0" },
      { title: "Chinese Guzheng — Traditional", artist: "Oriental Dreams", youtubeId: "cwXJpuoTJZk" },
      { title: "Indian Sitar — Meditation Raga", artist: "Raga Flow", youtubeId: "dQw4w9WgXcQ" },
      { title: "Korean Gayageum — Healing", artist: "Asian Harmony", youtubeId: "5qap5aO4i9A" },
    ],
  },
  {
    id: "mantras",
    title: "Mantras",
    subtitle: "Cânticos sagrados e vibração",
    emoji: "🕉️",
    color: "from-pink-500/20 to-fuchsia-500/10",
    tracks: [
      { title: "Om Mani Padme Hum — 108x", artist: "Buddhist Chant", youtubeId: "bbgHZWwLFkU" },
      { title: "Gayatri Mantra — Deva Premal", artist: "Deva Premal", youtubeId: "iqalsifLPWY" },
      { title: "Om Namah Shivaya — 1 Hora", artist: "Sacred Chants", youtubeId: "JCN3jFYdI2k" },
      { title: "Lokah Samastah Sukhino Bhavantu", artist: "Mantra Music", youtubeId: "glHB-RKRX2g" },
    ],
  },
];

export default function PlaylistMusical() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const activePlaylist = playlists.find(p => p.id === activeCategory);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          <div className="max-w-lg mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Headphones size={24} />
                  Playlist Musical
                </h1>
                <p className="text-sm text-muted-foreground">
                  Músicas terapêuticas para ambiente e sessões
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
          {/* Category Cards */}
          {!activeCategory && (
            <div className="space-y-3">
              {playlists.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
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
                        <p className="text-sm text-muted-foreground">{cat.subtitle}</p>
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
          {activePlaylist && (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => { setActiveCategory(null); setPlayingTrack(null); }} className="gap-2">
                <ArrowLeft size={16} /> Voltar às categorias
              </Button>

              <div className={`rounded-2xl bg-gradient-to-br ${activePlaylist.color} p-6 text-center`}>
                <span className="text-4xl block mb-2">{activePlaylist.emoji}</span>
                <h2 className="text-lg font-bold text-foreground">{activePlaylist.title}</h2>
                <p className="text-sm text-muted-foreground">{activePlaylist.subtitle}</p>
              </div>

              <div className="space-y-2">
                {activePlaylist.tracks.map((track, i) => (
                  <motion.div
                    key={track.youtubeId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        playingTrack === track.youtubeId
                          ? "ring-2 ring-primary shadow-lg"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setPlayingTrack(playingTrack === track.youtubeId ? null : track.youtubeId)}
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
