import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, TrendingDown, TrendingUp, Minus, Scale, Ruler, Activity } from "lucide-react";
import { MedidasChart } from "./MedidasChart";
import { ExportPdfButton } from "./ExportPdfButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFichas, type FichaData } from "@/hooks/useProtocolos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FichaAcompanhamentoProps {
  protocoloUsuarioId: string;
}

export const FichaAcompanhamento = ({ protocoloUsuarioId }: FichaAcompanhamentoProps) => {
  const { fichas, adicionar } = useFichas(protocoloUsuarioId);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<FichaData>>({});
  const chartRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    adicionar.mutate(
      { protocolo_usuario_id: protocoloUsuarioId, ...form } as FichaData,
      { onSuccess: () => { setOpen(false); setForm({}); } }
    );
  };

  const ultima = fichas[fichas.length - 1];
  const penultima = fichas.length > 1 ? fichas[fichas.length - 2] : null;

  const diff = (key: string) => {
    if (!ultima || !penultima) return null;
    const a = (ultima as Record<string, unknown>)[key] as number | null;
    const b = (penultima as Record<string, unknown>)[key] as number | null;
    if (a == null || b == null) return null;
    return Number((a - b).toFixed(1));
  };

  const TrendIcon = ({ value }: { value: number | null }) => {
    if (value == null) return <Minus size={14} className="text-muted-foreground" />;
    if (value < 0) return <TrendingDown size={14} className="text-highlight" />;
    if (value > 0) return <TrendingUp size={14} className="text-destructive" />;
    return <Minus size={14} className="text-muted-foreground" />;
  };

  const fields = [
    { key: "peso", label: "Peso (kg)", icon: Scale, suffix: "kg" },
    { key: "medida_cintura", label: "Cintura (cm)", icon: Ruler, suffix: "cm" },
    { key: "medida_quadril", label: "Quadril (cm)", icon: Ruler, suffix: "cm" },
    { key: "medida_braco", label: "Braço (cm)", icon: Ruler, suffix: "cm" },
    { key: "medida_coxa", label: "Coxa (cm)", icon: Ruler, suffix: "cm" },
    { key: "medida_torax", label: "Tórax (cm)", icon: Ruler, suffix: "cm" },
    { key: "gordura_corporal", label: "Gordura (%)", icon: Activity, suffix: "%" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-foreground">Ficha de Acompanhamento</h3>
        <div className="flex items-center gap-2">
          {fichas.length > 0 && (
            <ExportPdfButton fichas={fichas} chartRef={chartRef} protocoloUsuarioId={protocoloUsuarioId} />
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus size={16} /> Nova Medição
              </Button>
            </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Medidas</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {fields.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={(form as Record<string, unknown>)[key]?.toString() ?? ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [key]: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                  />
                </div>
              ))}
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">IMC</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={form.imc?.toString() ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      imc: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">Observações</Label>
                <Input
                  placeholder="Notas adicionais..."
                  value={form.observacoes ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, observacoes: e.target.value }))
                  }
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={adicionar.isPending}
              className="w-full mt-3"
            >
              {adicionar.isPending ? "Salvando..." : "Salvar Medidas"}
            </Button>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Current stats cards */}
      {ultima && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {fields.map(({ key, label, icon: Icon, suffix }) => {
            const val = (ultima as Record<string, unknown>)[key] as number | null;
            if (val == null) return null;
            const d = diff(key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={13} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {label.split(" (")[0]}
                  </span>
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="text-lg font-bold text-foreground">
                    {val}
                    <span className="text-xs font-normal text-muted-foreground ml-0.5">{suffix}</span>
                  </span>
                  {d != null && (
                    <span className="flex items-center gap-0.5 text-xs mb-0.5">
                      <TrendIcon value={d} />
                      <span className={d < 0 ? "text-highlight" : d > 0 ? "text-destructive" : "text-muted-foreground"}>
                        {d > 0 ? "+" : ""}{d}
                      </span>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Evolution charts */}
      {fichas.length >= 2 && (
        <div ref={chartRef}>
          <MedidasChart fichas={fichas} protocoloUsuarioId={protocoloUsuarioId} />
        </div>
      )}

      {/* History list */}
      {fichas.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Histórico ({fichas.length} registros)</p>
          <AnimatePresence>
            {[...fichas].reverse().slice(0, 5).map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50 text-sm"
              >
                <span className="text-muted-foreground">
                  {format(new Date(f.data), "dd/MM/yyyy", { locale: ptBR })}
                </span>
                <div className="flex items-center gap-3">
                  {f.peso && <span className="font-medium">{f.peso}kg</span>}
                  {f.medida_cintura && <span className="text-muted-foreground">{f.medida_cintura}cm</span>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {fichas.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <Scale size={32} className="mx-auto mb-2 opacity-40" />
          <p>Nenhuma medição registrada ainda.</p>
          <p className="text-xs mt-1">Registre suas medidas para acompanhar a evolução!</p>
        </div>
      )}
    </div>
  );
};
