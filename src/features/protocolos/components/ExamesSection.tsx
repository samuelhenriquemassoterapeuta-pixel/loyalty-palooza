import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileUp, Trash2, Eye, FileText, Image, File, Download, Plus, X, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useExames, TIPOS_EXAME, type Exame } from "@/features/protocolos/hooks/useExames";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ExamesSectionProps {
  protocoloUsuarioId?: string;
  showTitle?: boolean;
}

const ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx,.xls,.xlsx";
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const fileIcon = (tipo: string) => {
  if (tipo.startsWith("image/")) return <Image size={18} className="text-info" />;
  if (tipo.includes("pdf")) return <FileText size={18} className="text-destructive" />;
  return <File size={18} className="text-muted-foreground" />;
};

const tipoLabel = (tipo: string) =>
  TIPOS_EXAME.find((t) => t.value === tipo)?.label || tipo;

const formatSize = (bytes: number | null) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const ExamesSection = ({ protocoloUsuarioId, showTitle = true }: ExamesSectionProps) => {
  const { exames, isLoading, upload, remove, getSignedUrl } = useExames(protocoloUsuarioId);
  const [showForm, setShowForm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [tipoExame, setTipoExame] = useState("outro");
  const [observacoes, setObservacoes] = useState("");
  const [dataExame, setDataExame] = useState(new Date().toISOString().split("T")[0]);

  const resetForm = () => {
    setFile(null);
    setNome("");
    setTipoExame("outro");
    setObservacoes("");
    setDataExame(new Date().toISOString().split("T")[0]);
    setShowForm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > MAX_SIZE) {
      alert("Arquivo muito grande (máx 10MB)");
      return;
    }
    setFile(f);
    if (!nome) setNome(f.name.replace(/\.[^/.]+$/, ""));
  };

  const handleSubmit = () => {
    if (!file || !nome.trim()) return;
    upload.mutate(
      {
        file,
        nome: nome.trim(),
        tipo_exame: tipoExame,
        observacoes,
        data_exame: dataExame,
        protocolo_usuario_id: protocoloUsuarioId,
      },
      { onSuccess: resetForm }
    );
  };

  const handlePreview = async (exame: Exame) => {
    const url = await getSignedUrl(exame.arquivo_url);
    if (exame.arquivo_tipo.startsWith("image/") || exame.arquivo_tipo.includes("pdf")) {
      setPreviewType(exame.arquivo_tipo);
      setPreviewUrl(url);
    } else {
      window.open(url, "_blank");
    }
  };

  const handleDownload = async (exame: Exame) => {
    const url = await getSignedUrl(exame.arquivo_url);
    const a = document.createElement("a");
    a.href = url;
    a.download = exame.nome;
    a.click();
  };

  return (
    <div className="space-y-4">
      {showTitle && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileUp size={18} className="text-primary" />
            <h3 className="font-semibold text-foreground">Meus Exames</h3>
            {exames.length > 0 && (
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {exames.length}
              </span>
            )}
          </div>
          <Button size="sm" onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"} className="gap-1.5 rounded-xl text-xs">
            {showForm ? <X size={14} /> : <Plus size={14} />}
            {showForm ? "Cancelar" : "Anexar"}
          </Button>
        </div>
      )}

      {/* Upload Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
              {/* File picker */}
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-primary/30 rounded-xl p-4 text-center cursor-pointer hover:bg-primary/5 transition-colors"
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept={ACCEPT}
                  onChange={handleFileChange}
                  className="hidden"
                />
                {file ? (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    {fileIcon(file.type)}
                    <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                    <span className="text-muted-foreground text-xs">({formatSize(file.size)})</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <FileUp size={24} className="mx-auto text-primary/60" />
                    <p className="text-sm text-muted-foreground">Toque para selecionar arquivo</p>
                    <p className="text-[10px] text-muted-foreground">PDF, imagens, Word, Excel (máx 10MB)</p>
                  </div>
                )}
              </div>

              <Input
                placeholder="Nome do exame *"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="rounded-xl"
              />

              <div className="grid grid-cols-2 gap-3">
                <Select value={tipoExame} onValueChange={setTipoExame}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_EXAME.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={dataExame}
                  onChange={(e) => setDataExame(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <Textarea
                placeholder="Observações (opcional)"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={2}
                className="rounded-xl resize-none"
              />

              <Button
                onClick={handleSubmit}
                disabled={!file || !nome.trim() || upload.isPending}
                className="w-full gap-2 rounded-xl"
              >
                <FileUp size={16} />
                {upload.isPending ? "Enviando..." : "Enviar Exame"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exames List */}
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Carregando...</div>
      ) : exames.length === 0 && !showForm ? (
        <div className="text-center py-8 border border-dashed rounded-2xl text-muted-foreground">
          <FileText size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Nenhum exame anexado</p>
          <p className="text-xs mt-1">Anexe exames de sangue, laudos, receitas e mais</p>
        </div>
      ) : (
        <div className="space-y-2">
          {exames.map((exame, i) => (
            <motion.div
              key={exame.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                {fileIcon(exame.arquivo_tipo)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{exame.nome}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="text-[9px] gap-0.5 py-0">
                    <Tag size={8} />
                    {tipoLabel(exame.tipo_exame)}
                  </Badge>
                  {exame.data_exame && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Calendar size={9} />
                      {format(new Date(exame.data_exame), "dd/MM/yy", { locale: ptBR })}
                    </span>
                  )}
                  {exame.tamanho_bytes && (
                    <span className="text-[10px] text-muted-foreground">
                      {formatSize(exame.tamanho_bytes)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handlePreview(exame)}>
                  <Eye size={14} />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDownload(exame)}>
                  <Download size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => {
                    if (confirm("Remover este exame?")) remove.mutate(exame);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
        <DialogContent className="max-w-lg max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Visualizar Exame</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            previewType.startsWith("image/") ? (
              <img src={previewUrl} alt="Exame" className="w-full rounded-xl" />
            ) : (
              <iframe src={previewUrl} className="w-full h-[60vh] rounded-xl" />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
