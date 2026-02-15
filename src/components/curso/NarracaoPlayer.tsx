import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Loader2, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import avatarInstrutora from "@/assets/avatar-instrutora.png";
import { toast } from "@/hooks/use-toast";

interface NarracaoPlayerProps {
  texto: string;
  titulo: string;
}

/**
 * Strip markdown-like formatting from text for cleaner TTS narration.
 */
function cleanTextForTTS(raw: string): string {
  return raw
    .replace(/^#{1,4}\s+/gm, "") // remove heading markers
    .replace(/\*\*/g, "")         // remove bold
    .replace(/^>\s+/gm, "")      // remove blockquote markers
    .replace(/^- \[ \] /gm, "")  // remove checklist
    .replace(/^- /gm, "• ")      // bullet points
    .replace(/\|[^\n]+\|/g, "")  // remove tables
    .replace(/❌\s*/g, "Evite: ")
    .replace(/✅\s*/g, "Correto: ")
    .replace(/\n{3,}/g, "\n\n")  // collapse blank lines
    .trim();
}

export function NarracaoPlayer({ texto, titulo }: NarracaoPlayerProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Cleanup on unmount or text change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [texto]);

  const generateAndPlay = useCallback(async () => {
    // If we already have audio cached, just play/pause
    if (audioRef.current && blobUrlRef.current) {
      if (status === "paused") {
        audioRef.current.play();
        setStatus("playing");
      }
      return;
    }

    setStatus("loading");

    try {
      const cleanText = cleanTextForTTS(texto);
      // Prepend a natural intro
      const fullText = `${titulo}. ${cleanText}`;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/curso-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: fullText }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Erro ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      blobUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => setStatus("idle");
      audio.onerror = () => {
        setStatus("idle");
        toast({ title: "Erro ao reproduzir áudio", variant: "destructive" });
      };

      await audio.play();
      setStatus("playing");
    } catch (error) {
      console.error("TTS error:", error);
      setStatus("idle");
      toast({
        title: "Erro na narração",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      });
    }
  }, [texto, titulo, status]);

  const togglePlayPause = useCallback(() => {
    if (status === "playing" && audioRef.current) {
      audioRef.current.pause();
      setStatus("paused");
    } else if (status === "paused") {
      generateAndPlay();
    } else if (status === "idle") {
      generateAndPlay();
    }
  }, [status, generateAndPlay]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus("idle");
  }, []);

  const isActive = status === "playing" || status === "paused";

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/15">
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={avatarInstrutora}
          alt="Instrutora"
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
        />
        <AnimatePresence>
          {status === "playing" && (
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Volume2 size={10} className="text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info + controls */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground">Instrutora Resinkra</p>
        <p className="text-[10px] text-muted-foreground">
          {status === "loading"
            ? "Gerando narração..."
            : status === "playing"
            ? "Narrando aula..."
            : status === "paused"
            ? "Pausado"
            : "Ouça esta aula"}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-1.5">
        {isActive && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={stop}>
            <VolumeX size={16} />
          </Button>
        )}

        <Button
          variant={isActive ? "default" : "outline"}
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={togglePlayPause}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : status === "playing" ? (
            <Pause size={16} />
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </Button>
      </div>
    </div>
  );
}
