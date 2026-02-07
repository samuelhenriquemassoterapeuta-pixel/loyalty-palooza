import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Plus, Trash2, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFotos } from "@/hooks/useProtocolos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface GaleriaEvolucaoProps {
  protocoloUsuarioId: string;
}

const tipoLabels: Record<string, { label: string; class: string }> = {
  antes: { label: "Antes", class: "bg-warning/15 text-warning" },
  durante: { label: "Durante", class: "bg-info/15 text-info" },
  depois: { label: "Depois", class: "bg-highlight/15 text-highlight" },
};

export const GaleriaEvolucao = ({ protocoloUsuarioId }: GaleriaEvolucaoProps) => {
  const { fotos, upload, remover } = useFotos(protocoloUsuarioId);
  const [tipo, setTipo] = useState("durante");
  const [preview, setPreview] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("todas");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    upload.mutate({ file, tipo, protocoloUsuarioId });
    if (fileRef.current) fileRef.current.value = "";
  };

  const filteredFotos = filter === "todas" ? fotos : fotos.filter((f) => f.tipo === filter);

  const fotosBefore = fotos.filter((f) => f.tipo === "antes");
  const fotosAfter = fotos.filter((f) => f.tipo === "depois");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Galeria de Evolução</h3>
        <div className="flex items-center gap-2">
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger className="h-8 w-28 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="antes">Antes</SelectItem>
              <SelectItem value="durante">Durante</SelectItem>
              <SelectItem value="depois">Depois</SelectItem>
            </SelectContent>
          </Select>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => fileRef.current?.click()}
            disabled={upload.isPending}
          >
            <Camera size={16} />
            {upload.isPending ? "Enviando..." : "Foto"}
          </Button>
        </div>
      </div>

      {/* Before/After comparison */}
      {fotosBefore.length > 0 && fotosAfter.length > 0 && (
        <div className="rounded-2xl border border-border overflow-hidden">
          <p className="text-xs font-medium text-center py-2 bg-muted/50 text-muted-foreground">
            Comparação Antes & Depois
          </p>
          <div className="grid grid-cols-2 gap-px bg-border">
            <div className="relative bg-card">
              <img
                src={fotosBefore[0].signed_url || fotosBefore[0].foto_url}
                alt="Antes"
                className="w-full aspect-[3/4] object-cover"
              />
              <Badge className={`absolute top-2 left-2 ${tipoLabels.antes.class} border-0 text-[10px]`}>
                Antes
              </Badge>
            </div>
            <div className="relative bg-card">
              <img
                src={fotosAfter[fotosAfter.length - 1].signed_url || fotosAfter[fotosAfter.length - 1].foto_url}
                alt="Depois"
                className="w-full aspect-[3/4] object-cover"
              />
              <Badge className={`absolute top-2 left-2 ${tipoLabels.depois.class} border-0 text-[10px]`}>
                Depois
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-1.5">
        {["todas", "antes", "durante", "depois"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f === "todas" ? "Todas" : tipoLabels[f].label}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      {filteredFotos.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          <AnimatePresence>
            {filteredFotos.map((foto) => (
              <motion.div
                key={foto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group rounded-xl overflow-hidden border border-border cursor-pointer"
                onClick={() => setPreview(foto.id)}
              >
                <img
                  src={foto.signed_url || foto.foto_url}
                  alt={`Foto ${foto.tipo}`}
                  className="w-full aspect-square object-cover"
                />
                <Badge
                  className={`absolute top-1.5 left-1.5 ${tipoLabels[foto.tipo]?.class ?? ""} border-0 text-[9px]`}
                >
                  {tipoLabels[foto.tipo]?.label ?? foto.tipo}
                </Badge>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-1.5">
                  <span className="text-[9px] text-white/80">
                    {format(new Date(foto.data), "dd/MM/yy", { locale: ptBR })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
          <p>Nenhuma foto registrada.</p>
          <p className="text-xs mt-1">Tire fotos para acompanhar sua transformação!</p>
        </div>
      )}

      {/* Preview dialog */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          {preview && (() => {
            const foto = fotos.find((f) => f.id === preview);
            if (!foto) return null;
            return (
              <>
                <img src={foto.signed_url || foto.foto_url} alt="" className="w-full max-h-[70vh] object-contain" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <Badge className={`${tipoLabels[foto.tipo]?.class ?? ""} border-0`}>
                      {tipoLabels[foto.tipo]?.label ?? foto.tipo}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(foto.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      remover.mutate(foto.id);
                      setPreview(null);
                    }}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};
