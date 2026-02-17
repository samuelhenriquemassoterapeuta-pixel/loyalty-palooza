import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings2, Clock, Calendar, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PausaConfig, INTERVALOS_OPCOES } from "@/features/alongamento/hooks/usePausasPosturais";

const DIAS_SEMANA = [
  { value: 0, label: "Dom" },
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
];

interface PausaConfigCardProps {
  config: PausaConfig | null;
  onSave: (data: Partial<PausaConfig>) => void;
  isPending: boolean;
}

export const PausaConfigCard = ({ config, onSave, isPending }: PausaConfigCardProps) => {
  const [ativo, setAtivo] = useState(config?.ativo ?? true);
  const [intervalo, setIntervalo] = useState(config?.intervalo_minutos ?? 60);
  const [dias, setDias] = useState<number[]>(config?.dias_semana ?? [1, 2, 3, 4, 5]);
  const [horaInicio, setHoraInicio] = useState(config?.horario_inicio?.slice(0, 5) ?? "08:00");
  const [horaFim, setHoraFim] = useState(config?.horario_fim?.slice(0, 5) ?? "18:00");

  useEffect(() => {
    if (config) {
      setAtivo(config.ativo);
      setIntervalo(config.intervalo_minutos);
      setDias(config.dias_semana);
      setHoraInicio(config.horario_inicio.slice(0, 5));
      setHoraFim(config.horario_fim.slice(0, 5));
    }
  }, [config]);

  const toggleDia = (dia: number) => {
    setDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia].sort()
    );
  };

  const hasChanges =
    ativo !== (config?.ativo ?? true) ||
    intervalo !== (config?.intervalo_minutos ?? 60) ||
    JSON.stringify(dias) !== JSON.stringify(config?.dias_semana ?? [1, 2, 3, 4, 5]) ||
    horaInicio !== (config?.horario_inicio?.slice(0, 5) ?? "08:00") ||
    horaFim !== (config?.horario_fim?.slice(0, 5) ?? "18:00");

  const handleSave = () => {
    onSave({
      ativo,
      intervalo_minutos: intervalo,
      dias_semana: dias,
      horario_inicio: horaInicio + ":00",
      horario_fim: horaFim + ":00",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-card border border-border space-y-4"
    >
      {/* Header with toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Settings2 size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Configuração</h3>
            <p className="text-[11px] text-muted-foreground">Defina seus lembretes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Power size={14} className={ativo ? "text-primary" : "text-muted-foreground"} />
          <Switch checked={ativo} onCheckedChange={setAtivo} />
        </div>
      </div>

      {/* Interval selector */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Clock size={12} />
          Intervalo entre pausas
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {INTERVALOS_OPCOES.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setIntervalo(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                intervalo === opt.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Work schedule */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[11px] text-muted-foreground font-medium">Início</label>
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] text-muted-foreground font-medium">Fim</label>
          <input
            type="time"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground"
          />
        </div>
      </div>

      {/* Days of week */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Calendar size={12} />
          Dias ativos
        </div>
        <div className="flex gap-1.5">
          {DIAS_SEMANA.map((dia) => (
            <button
              key={dia.value}
              onClick={() => toggleDia(dia.value)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                dias.includes(dia.value)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {dia.label}
            </button>
          ))}
        </div>
      </div>

      {/* Save button */}
      {hasChanges && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
          <Button
            onClick={handleSave}
            disabled={isPending || dias.length === 0}
            size="sm"
            className="w-full"
          >
            {config ? "Atualizar Configuração" : "Ativar Lembretes"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
