import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send } from "lucide-react";

interface SugerirPlaylistModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CATEGORIAS = [
  { value: "relaxante", label: "🌿 Relaxante" },
  { value: "frequencias", label: "🎵 Frequências (Hz)" },
  { value: "instrumental", label: "🎹 Instrumental" },
  { value: "spa", label: "💧 SPA" },
  { value: "oriental", label: "🎋 Oriental" },
  { value: "mantras", label: "🕉️ Mantras" },
  { value: "meditacao", label: "🧘 Meditação" },
  { value: "energizante", label: "⚡ Energizante" },
  { value: "xamanico", label: "🥁 Xamânico" },
  { value: "classico", label: "🎻 Clássico" },
  { value: "jazz", label: "🎷 Jazz" },
];

export function SugerirPlaylistModal({ open, onClose, onSuccess }: SugerirPlaylistModalProps) {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [categoria, setCategoria] = useState("relaxante");
  const [justificativa, setJustificativa] = useState("");
  const [loading, setLoading] = useState(false);

  const validateLink = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const spotifyRegex = /^(https?:\/\/)?(open\.spotify\.com)\/.+$/;
    return youtubeRegex.test(url) || spotifyRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !link.trim() || !justificativa.trim()) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }

    if (!validateLink(link)) {
      toast({ title: "Link inválido. Use YouTube ou Spotify.", variant: "destructive" });
      return;
    }

    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from("sugestoes_playlist").insert({
      nome: nome.trim(),
      descricao: descricao.trim() || null,
      link: link.trim(),
      categoria,
      justificativa: justificativa.trim(),
      usuario_id: user.id,
      status: "pendente",
    });

    setLoading(false);

    if (error) {
      toast({ title: "Erro ao enviar sugestão", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sugestão enviada! 🎶", description: "Agradecemos sua contribuição." });
      setNome("");
      setDescricao("");
      setLink("");
      setJustificativa("");
      onSuccess?.();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">💡 Sugerir nova playlist</DialogTitle>
          <DialogDescription>Compartilhe uma playlist que combina com sessões terapêuticas.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da playlist *</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={100}
              placeholder="Ex: Sons de Floresta Tropical"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={2}
              placeholder="Breve descrição da playlist..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link (YouTube ou Spotify) *</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa">Por que essa playlist? *</Label>
            <Textarea
              id="justificativa"
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={2}
              placeholder="Explique por que ela seria boa para sessões..."
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
