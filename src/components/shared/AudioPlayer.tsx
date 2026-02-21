import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioUrl?: string | null;
  spotifyUrl?: string | null;
  youtubeId?: string | null;
  titulo: string;
  artista?: string;
}

type SourceType = "audio" | "spotify" | "youtube" | "error";

export function AudioPlayer({
  audioUrl,
  spotifyUrl,
  youtubeId,
  titulo,
  artista,
}: AudioPlayerProps) {
  const [source, setSource] = useState<SourceType>("error");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioUrl) setSource("audio");
    else if (spotifyUrl) setSource("spotify");
    else if (youtubeId) setSource("youtube");
    else setSource("error");
  }, [audioUrl, spotifyUrl, youtubeId]);

  const handleAudioError = () => {
    if (source === "audio" && spotifyUrl) setSource("spotify");
    else if (source === "audio" && youtubeId) setSource("youtube");
    else if (source === "spotify" && youtubeId) setSource("youtube");
    else setSource("error");
  };

  if (source === "audio" && audioUrl) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
        <audio ref={audioRef} src={audioUrl} onError={handleAudioError} />
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => {
            if (isPlaying) audioRef.current?.pause();
            else audioRef.current?.play();
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{titulo}</p>
          {artista && <p className="text-xs text-muted-foreground">{artista}</p>}
        </div>
        <Volume2 className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  if (source === "spotify" && spotifyUrl) {
    return (
      <div className="rounded-lg overflow-hidden">
        <iframe
          src={spotifyUrl}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={titulo}
        />
      </div>
    );
  }

  if (source === "youtube" && youtubeId) {
    return (
      <div className="rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="80"
          src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0`}
          title={titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-muted-foreground">
      <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{titulo}</p>
        <p className="text-xs">Faixa temporariamente indisponível</p>
      </div>
    </div>
  );
}
