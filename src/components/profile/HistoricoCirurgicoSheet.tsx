import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, differenceInDays, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Scissors,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  User,
  Building2,
  FileText,
  Loader2,
  Clock,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useHistoricoCirurgico, type HistoricoCirurgico } from "@/hooks/useHistoricoCirurgico";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const TIPOS_CIRURGIA = [
  "Lipoaspiração",
  "Abdominoplastia",
  "Mamoplastia (aumento/redução)",
  "Rinoplastia",
  "Lifting facial",
  "Blefaroplastia",
  "Braquioplastia",
  "Cruroplastia",
  "Gluteoplastia",
  "Outro",
] as const;

interface HistoricoCirurgicoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HistoricoCirurgicoSheet = ({
  open,
  onOpenChange,
}: HistoricoCirurgicoSheetProps) => {
  const { historico, isLoading, add, update, remove, isAdding, isUpdating, isDeleting } =
    useHistoricoCirurgico();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // form state
  const [tipoCirurgia, setTipoCirurgia] = useState("");
  const [dataCirurgia, setDataCirurgia] = useState("");
  const [medicoResponsavel, setMedicoResponsavel] = useState("");
  const [hospitalClinica, setHospitalClinica] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const resetForm = () => {
    setTipoCirurgia("");
    setDataCirurgia("");
    setMedicoResponsavel("");
    setHospitalClinica("");
    setObservacoes("");
    setEditingId(null);
    setShowForm(false);
  };

  const openEditForm = (item: HistoricoCirurgico) => {
    setTipoCirurgia(item.tipo_cirurgia);
    setDataCirurgia(item.data_cirurgia);
    setMedicoResponsavel(item.medico_responsavel || "");
    setHospitalClinica(item.hospital_clinica || "");
    setObservacoes(item.observacoes || "");
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!tipoCirurgia || !dataCirurgia) {
      toast.error("Preencha tipo e data da cirurgia");
      return;
    }

    try {
      const payload = {
        tipo_cirurgia: tipoCirurgia,
        data_cirurgia: dataCirurgia,
        medico_responsavel: medicoResponsavel || null,
        hospital_clinica: hospitalClinica || null,
        observacoes: observacoes || null,
      };

      if (editingId) {
        await update({ id: editingId, ...payload });
        toast.success("Registro atualizado!");
      } else {
        await add(payload);
        toast.success("Cirurgia registrada!");
      }
      resetForm();
    } catch {
      toast.error("Erro ao salvar registro");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget);
      toast.success("Registro removido");
      setDeleteTarget(null);
    } catch {
      toast.error("Erro ao remover");
    }
  };

  const getDiasDesde = (data: string) => {
    return differenceInDays(new Date(), parseISO(data));
  };

  const saving = isAdding || isUpdating;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Scissors size={20} className="text-primary" />
              Histórico Cirúrgico
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            {/* Add button */}
            {!showForm && (
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => { resetForm(); setShowForm(true); }}
              >
                <Plus size={16} />
                Adicionar cirurgia
              </Button>
            )}

            {/* Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="p-4 space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Tipo de cirurgia *</Label>
                      <Select value={tipoCirurgia} onValueChange={setTipoCirurgia}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPOS_CIRURGIA.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Data da cirurgia *</Label>
                      <Input
                        type="date"
                        value={dataCirurgia}
                        onChange={(e) => setDataCirurgia(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Médico responsável</Label>
                      <Input
                        value={medicoResponsavel}
                        onChange={(e) => setMedicoResponsavel(e.target.value)}
                        placeholder="Dr(a). Nome"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Hospital / Clínica</Label>
                      <Input
                        value={hospitalClinica}
                        onChange={(e) => setHospitalClinica(e.target.value)}
                        placeholder="Nome do local"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Observações</Label>
                      <Textarea
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        placeholder="Detalhes adicionais..."
                        rows={2}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={resetForm}
                        disabled={saving}
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="flex-1 gap-1"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                        {editingId ? "Atualizar" : "Salvar"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 size={24} className="animate-spin text-muted-foreground" />
              </div>
            ) : historico.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <Scissors size={32} className="mx-auto mb-2 opacity-40" />
                <p>Nenhuma cirurgia registrada</p>
                <p className="text-xs mt-1">Adicione para integrar com o timing pós-cirúrgico</p>
              </div>
            ) : (
              <div className="space-y-3">
                {historico.map((item, i) => {
                  const dias = getDiasDesde(item.data_cirurgia);
                  const semanas = Math.floor(dias / 7);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="p-4 space-y-2.5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground">
                              {item.tipo_cirurgia}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <Calendar size={11} />
                              {format(parseISO(item.data_cirurgia), "dd/MM/yyyy", { locale: ptBR })}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[10px] gap-1 bg-primary/10 text-primary border-0">
                            <Clock size={10} />
                            {semanas > 0
                              ? `${semanas} sem${semanas > 1 ? "." : ""}`
                              : `${dias} dia${dias !== 1 ? "s" : ""}`} atrás
                          </Badge>
                        </div>

                        {item.medico_responsavel && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <User size={11} />
                            {item.medico_responsavel}
                          </div>
                        )}

                        {item.hospital_clinica && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Building2 size={11} />
                            {item.hospital_clinica}
                          </div>
                        )}

                        {item.observacoes && (
                          <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <FileText size={11} className="mt-0.5 shrink-0" />
                            {item.observacoes}
                          </div>
                        )}

                        <div className="flex gap-2 pt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs gap-1"
                            onClick={() => openEditForm(item)}
                          >
                            <Edit3 size={12} /> Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs gap-1 text-destructive hover:text-destructive"
                            onClick={() => setDeleteTarget(item.id)}
                          >
                            <Trash2 size={12} /> Remover
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Remover registro?"
        description="Este registro de cirurgia será excluído permanentemente."
        onConfirm={handleDelete}
        confirmLabel="Remover"
      />
    </>
  );
};
