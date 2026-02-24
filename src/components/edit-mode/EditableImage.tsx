import { useState, useRef } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditableImageProps {
  src: string;
  alt: string;
  storageKey: string;
  table?: "platform_media" | "landing_config";
  section?: string;
  field?: string;
  className?: string;
  bucket?: string;
}

export const EditableImage = ({
  src,
  alt,
  storageKey,
  table = "platform_media",
  section = "geral",
  field,
  className = "",
  bucket = "landing-media",
}: EditableImageProps) => {
  const { isEditMode, addChange } = useEditMode();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isEditMode) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setIsUploading(true);

    try {
      const ext = file.name.split(".").pop();
      const filePath = `edit-mode/${storageKey}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const url = publicUrl.publicUrl;
      setPreviewUrl(url);

      addChange(`${table}:${storageKey}`, {
        table,
        key: storageKey,
        field: field || storageKey,
        value: url,
        section,
      });

      toast.success("Imagem carregada! Clique em Salvar para aplicar.");
    } catch (err: any) {
      toast.error("Erro no upload: " + err.message);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const displaySrc = previewUrl || src;

  return (
    <div className={`relative ${isEditMode ? "cursor-pointer group/editimg" : ""} ${className}`} onClick={handleClick}>
      <img src={displaySrc} alt={alt} className="w-full h-full object-cover" loading="lazy" />

      {isEditMode && (
        <>
          <div className="absolute inset-0 bg-foreground/0 group-hover/editimg:bg-foreground/30 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover/editimg:opacity-100 transition-opacity flex flex-col items-center gap-1">
              {isUploading ? (
                <Loader2 size={24} className="text-primary-foreground animate-spin" />
              ) : (
                <>
                  <Camera size={24} className="text-primary-foreground drop-shadow-lg" />
                  <span className="text-[10px] font-bold text-primary-foreground drop-shadow-lg">Trocar imagem</span>
                </>
              )}
            </div>
          </div>
          <span className="absolute inset-0 rounded border-2 border-dashed border-accent/40 opacity-0 group-hover/editimg:opacity-100 transition-opacity pointer-events-none" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
};
