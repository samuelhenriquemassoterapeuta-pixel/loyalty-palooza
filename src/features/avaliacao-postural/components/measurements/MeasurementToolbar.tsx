import { Ruler, Plus, Trash2, Save, X, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { MeasurementPreset, ReferenceLine } from "./types";
import { MEASUREMENT_PRESETS } from "./types";
import type { VistaPostural } from "@/features/avaliacao-postural/hooks/useAvaliacaoPostural";

interface MeasurementToolbarProps {
  vista: VistaPostural;
  lines: ReferenceLine[];
  onAddPreset: (preset: MeasurementPreset) => void;
  onToggleLock: (lineId: string) => void;
  onRemoveLine: (lineId: string) => void;
  onClear: () => void;
  onSave: () => void;
  onClose: () => void;
  isSaving: boolean;
  hasChanges: boolean;
}

export const MeasurementToolbar = ({
  vista,
  lines,
  onAddPreset,
  onToggleLock,
  onRemoveLine,
  onClear,
  onSave,
  onClose,
  isSaving,
  hasChanges,
}: MeasurementToolbarProps) => {
  const availablePresets = MEASUREMENT_PRESETS.filter((p) => p.vistas.includes(vista));
  const addedIds = new Set(lines.map((l) => l.id));

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Preset buttons row */}
      <ScrollArea className="w-full">
        <div className="flex items-center gap-1.5 px-1 pb-1">
          {availablePresets.map((preset) => {
            const isAdded = addedIds.has(preset.id);
            return (
              <button
                key={preset.id}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isAdded
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-transparent"
                }`}
                onClick={() => !isAdded && onAddPreset(preset)}
                disabled={isAdded}
                title={preset.description}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: preset.color }}
                />
                {preset.label}
                {isAdded && <Lock size={10} className="opacity-60" />}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Active lines + actions */}
      <div className="flex items-center gap-1 flex-wrap justify-between">
        <div className="flex items-center gap-1">
          {lines.map((line) => (
            <div
              key={line.id}
              className="flex items-center gap-1 bg-white/10 rounded-md px-1.5 py-0.5"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: line.color }}
              />
              <span className="text-[10px] text-white/80 font-medium">{line.label}</span>
              <button
                onClick={() => onToggleLock(line.id)}
                className="text-white/50 hover:text-white/80 p-0.5"
                title={line.locked ? "Desbloquear" : "Bloquear"}
              >
                {line.locked ? <Lock size={10} /> : <Unlock size={10} />}
              </button>
              <button
                onClick={() => onRemoveLine(line.id)}
                className="text-white/50 hover:text-red-400 p-0.5"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-white/70 hover:text-white hover:bg-white/10"
            onClick={onClear}
            disabled={lines.length === 0}
          >
            <Trash2 size={12} className="mr-1" />
            Limpar
          </Button>
          <Button
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={onSave}
            disabled={isSaving || !hasChanges}
          >
            <Save size={12} />
            Salvar
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};
