import { useRef } from "react";
import { Upload, Trash2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useHeadSpaImagens,
  ETAPA_KEYS,
  ETAPA_LABELS,
  type EtapaKey,
} from "@/hooks/useHeadSpaImagens";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const HeadSpaImagensTab = () => {
  const { imagemMap, isLoading, uploadImage, deleteImage, isUploading } =
    useHeadSpaImagens();

  const handleFileChange = async (etapaKey: EtapaKey, file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return alert("Formato inválido. Use JPG, PNG ou WebP.");
    }
    if (file.size > MAX_SIZE) {
      return alert("Arquivo muito grande. Máximo 5MB.");
    }
    await uploadImage({ etapaKey, file });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-muted-foreground text-sm">
        Carregando imagens…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        Faça upload de fotos reais para cada etapa do Head SPA. Elas
        substituirão as imagens padrão na página pública.
      </div>

      {ETAPA_KEYS.map((key) => (
        <EtapaRow
          key={key}
          etapaKey={key}
          label={ETAPA_LABELS[key]}
          currentUrl={imagemMap.get(key)}
          isUploading={isUploading}
          onUpload={(file) => handleFileChange(key, file)}
          onDelete={() => deleteImage(key)}
        />
      ))}
    </div>
  );
};

function EtapaRow({
  etapaKey,
  label,
  currentUrl,
  isUploading,
  onUpload,
  onDelete,
}: {
  etapaKey: string;
  label: string;
  currentUrl?: string;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
      <div className="w-20 h-14 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0">
        {currentUrl ? (
          <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <Image size={20} className="text-muted-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{label}</p>
        <p className="text-[11px] text-muted-foreground">
          {currentUrl ? "Imagem personalizada ativa" : "Usando imagem padrão"}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(f);
            e.target.value = "";
          }}
        />
        <Button
          size="sm"
          variant="outline"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={14} className="mr-1" />
          Upload
        </Button>
        {currentUrl && (
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive"
            onClick={onDelete}
          >
            <Trash2 size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}
