import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Target, CheckCircle2, Circle, Trophy } from "lucide-react";
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
import { useMetas } from "@/features/protocolos/hooks/useProtocolos";

interface MetasSemanaisProps {
  protocoloUsuarioId: string;
}

export const MetasSemanais = ({ protocoloUsuarioId }: MetasSemanaisProps) => {
  const { metas, adicionar, concluir } = useMetas(protocoloUsuarioId);
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [metaValor, setMetaValor] = useState("");

  const nextWeek = metas.length > 0 ? Math.max(...metas.map((m) => m.semana_numero)) + 1 : 1;

  const handleSubmit = () => {
    adicionar.mutate(
      {
        protocolo_usuario_id: protocoloUsuarioId,
        semana_numero: nextWeek,
        descricao,
        meta_valor: metaValor || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setDescricao("");
          setMetaValor("");
        },
      }
    );
  };

  const concluidas = metas.filter((m) => m.concluida).length;
  const totalMetas = metas.length;
  const progresso = totalMetas > 0 ? Math.round((concluidas / totalMetas) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Metas Semanais</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus size={16} /> Nova Meta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Meta — Semana {nextWeek}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label className="text-xs">Descrição da meta</Label>
                <Input
                  placeholder="Ex: Reduzir 0.5kg esta semana"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Valor alvo (opcional)</Label>
                <Input
                  placeholder="Ex: 72kg, 80cm cintura"
                  value={metaValor}
                  onChange={(e) => setMetaValor(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!descricao || adicionar.isPending}
                className="w-full"
              >
                {adicionar.isPending ? "Salvando..." : "Adicionar Meta"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress bar */}
      {totalMetas > 0 && (
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Trophy size={15} className="text-warning" /> Progresso
            </span>
            <span className="text-sm font-bold text-primary">{progresso}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full gradient-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            {concluidas} de {totalMetas} metas concluídas
          </p>
        </div>
      )}

      {/* Metas list */}
      <div className="space-y-2">
        <AnimatePresence>
          {metas.map((meta) => (
            <motion.div
              key={meta.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                meta.concluida
                  ? "bg-highlight/5 border-highlight/20"
                  : "bg-card border-border"
              }`}
            >
              <button
                onClick={() => !meta.concluida && concluir.mutate(meta.id)}
                className="shrink-0"
                disabled={meta.concluida}
              >
                {meta.concluida ? (
                  <CheckCircle2 size={22} className="text-highlight" />
                ) : (
                  <Circle size={22} className="text-muted-foreground hover:text-primary transition-colors" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                    Sem. {meta.semana_numero}
                  </span>
                </div>
                <p
                  className={`text-sm mt-0.5 ${
                    meta.concluida ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {meta.descricao}
                </p>
                {meta.meta_valor && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    🎯 Alvo: {meta.meta_valor}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {metas.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <Target size={32} className="mx-auto mb-2 opacity-40" />
          <p>Nenhuma meta definida.</p>
          <p className="text-xs mt-1">Defina metas semanais para manter o foco!</p>
        </div>
      )}
    </div>
  );
};
