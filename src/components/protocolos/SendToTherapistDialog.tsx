import { useState } from "react";
import { Send, MessageCircle, Mail, User, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTerapeutas } from "@/hooks/useTerapeutas";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FichaRow {
  id: string;
  data: string;
  peso?: number | null;
  imc?: number | null;
  gordura_corporal?: number | null;
  medida_cintura?: number | null;
  medida_quadril?: number | null;
  medida_braco?: number | null;
  medida_coxa?: number | null;
  medida_torax?: number | null;
  observacoes?: string | null;
}

interface SendToTherapistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fichas: FichaRow[];
  protocoloUsuarioId: string;
  protocoloNome?: string;
  generatePdf: () => Promise<{ blob: Blob; filename: string }>;
  buildShareText: () => string;
}

const FIELDS = [
  { key: "peso", label: "Peso", suffix: "kg" },
  { key: "medida_cintura", label: "Cintura", suffix: "cm" },
  { key: "medida_quadril", label: "Quadril", suffix: "cm" },
  { key: "gordura_corporal", label: "Gordura", suffix: "%" },
] as const;

export const SendToTherapistDialog = ({
  open,
  onOpenChange,
  fichas,
  protocoloUsuarioId,
  protocoloNome,
  generatePdf,
  buildShareText,
}: SendToTherapistDialogProps) => {
  const { terapeutas, loading } = useTerapeutas();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  const selected = terapeutas.find((t) => t.id === selectedId);

  const buildEvolutionSummary = () => {
    if (fichas.length < 2) return "";
    const first = fichas[0];
    const last = fichas[fichas.length - 1];
    const getVal = (f: FichaRow, key: string) =>
      (f as unknown as Record<string, unknown>)[key] as number | null | undefined;

    const lines: string[] = [];
    for (const field of FIELDS) {
      const firstVal = getVal(first, field.key);
      const lastVal = getVal(last, field.key);
      if (firstVal != null && lastVal != null) {
        const diff = Number((lastVal - firstVal).toFixed(1));
        const arrow = diff < 0 ? "↓" : diff > 0 ? "↑" : "→";
        lines.push(`${arrow} ${field.label}: ${firstVal} → ${lastVal}${field.suffix}`);
      }
    }
    return lines.join("\n");
  };

  const recordSend = async (terapeutaId: string, metodo: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("relatorios_enviados").insert({
      user_id: user.id,
      protocolo_usuario_id: protocoloUsuarioId,
      terapeuta_id: terapeutaId,
      metodo,
    });
  };

  const handleWhatsApp = async () => {
    if (!selected) return;
    setSending(true);
    try {
      const text = buildShareText();
      const header = `📋 *Relatório para ${selected.nome}*\n\n`;

      // Try native share with PDF
      const { blob, filename } = await generatePdf();
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ text: header + text, files: [file] });
        await recordSend(selected.id, "whatsapp");
        setSent(selected.id);
        toast.success(`Relatório enviado para ${selected.nome}!`);
      } else {
        // Fallback: open WhatsApp with text only
        const encoded = encodeURIComponent(header + text);
        window.open(`https://wa.me/?text=${encoded}`, "_blank");
        await recordSend(selected.id, "whatsapp");
        setSent(selected.id);
        toast.success("WhatsApp aberto com o relatório!");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Erro ao enviar por WhatsApp:", err);
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const handleEmail = async () => {
    if (!selected) return;
    setSending(true);
    try {
      const { blob, filename } = await generatePdf();
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Relatório de Evolução — ${protocoloNome || "Protocolo"}`,
          text: `Relatório de acompanhamento para ${selected.nome}`,
          files: [file],
        });
        await recordSend(selected.id, "email");
        setSent(selected.id);
        toast.success(`Relatório compartilhado com ${selected.nome}!`);
      } else {
        const text = buildShareText();
        const subject = encodeURIComponent(`Relatório de Evolução — ${protocoloNome || "Resinkra"}`);
        const body = encodeURIComponent(`Olá ${selected.nome},\n\nSegue meu relatório de evolução:\n\n${text}`);
        const emailTo = "";
        window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`, "_self");

        // Also download PDF for manual attachment
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);

        await recordSend(selected.id, "email");
        setSent(selected.id);
        toast.success("Email aberto! Anexe o PDF baixado.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Erro ao enviar por email:", err);
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      setSelectedId(null);
      setSent(null);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send size={18} />
            Enviar ao Terapeuta
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Select therapist */}
        {!selectedId && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Selecione o terapeuta para enviar seu relatório de evolução:
            </p>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-muted-foreground" />
              </div>
            ) : terapeutas.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Nenhum terapeuta disponível.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {terapeutas.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors text-left"
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={t.foto_url ?? undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {t.nome.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{t.nome}</p>
                      {t.especialidade && (
                        <p className="text-xs text-muted-foreground truncate">{t.especialidade}</p>
                      )}
                    </div>
                    {t.media_avaliacoes && (
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        ⭐ {t.media_avaliacoes.toFixed(1)}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Send method */}
        {selectedId && selected && (
          <div className="space-y-4">
            {/* Selected therapist card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={selected.foto_url ?? undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {selected.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{selected.nome}</p>
                {selected.especialidade && (
                  <p className="text-xs text-muted-foreground">{selected.especialidade}</p>
                )}
              </div>
              {sent === selected.id ? (
                <CheckCircle size={18} className="text-highlight shrink-0" />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs shrink-0"
                  onClick={() => { setSelectedId(null); setSent(null); }}
                >
                  Trocar
                </Button>
              )}
            </div>

            {/* Evolution preview */}
            {fichas.length >= 2 && (
              <div className="p-3 rounded-xl bg-muted/20 border border-border/50 space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                  Resumo da evolução
                </p>
                <p className="text-xs text-foreground whitespace-pre-line leading-relaxed">
                  {buildEvolutionSummary()}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  📅 {format(new Date(fichas[0].data), "dd/MM", { locale: ptBR })} → {format(new Date(fichas[fichas.length - 1].data), "dd/MM/yyyy", { locale: ptBR })} · {fichas.length} medições
                </p>
              </div>
            )}

            {/* Send buttons */}
            {sent === selected.id ? (
              <div className="text-center py-2">
                <p className="text-sm text-highlight font-medium">✅ Relatório enviado!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Enviado em {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleWhatsApp}
                  disabled={sending}
                  className="gap-1.5"
                  variant="outline"
                >
                  {sending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <MessageCircle size={14} />
                  )}
                  WhatsApp
                </Button>
                <Button
                  onClick={handleEmail}
                  disabled={sending}
                  className="gap-1.5"
                  variant="outline"
                >
                  {sending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Mail size={14} />
                  )}
                  Email
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
