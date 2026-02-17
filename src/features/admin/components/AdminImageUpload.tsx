import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash2, Loader2 } from "lucide-react";

interface AdminImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  hint?: string;
  accept?: string;
}

export const AdminImageUpload = ({
  label,
  value,
  onChange,
  bucket = "admin-uploads",
  hint,
  accept = "image/jpeg,image/png,image/webp",
}: AdminImageUploadProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(urlData.publicUrl);
      toast.success("Arquivo enviado!");
    } catch (err: any) {
      toast.error(err.message);
    }
    setUploading(false);
    e.target.value = "";
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1">
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL ou faça upload"
          className="flex-1"
        />
        <Button variant="outline" size="sm" onClick={() => ref.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        </Button>
        {value && (
          <Button variant="ghost" size="sm" onClick={() => onChange("")}>
            <Trash2 size={14} />
          </Button>
        )}
      </div>
      {value && (
        <img src={value} alt="" className="mt-2 rounded-lg h-20 object-cover" />
      )}
      {hint && <p className="text-[10px] text-muted-foreground mt-1">{hint}</p>}
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handleUpload} />
    </div>
  );
};
