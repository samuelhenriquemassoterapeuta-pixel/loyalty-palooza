import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const evaConfig = [
  { min: 0, max: 0, label: "Sem dor", emoji: "😊", color: "text-highlight" },
  { min: 1, max: 3, label: "Dor leve", emoji: "🙂", color: "text-highlight" },
  { min: 4, max: 6, label: "Dor moderada", emoji: "😐", color: "text-warning" },
  { min: 7, max: 8, label: "Dor intensa", emoji: "😣", color: "text-accent" },
  { min: 9, max: 10, label: "Dor insuportável", emoji: "😫", color: "text-destructive" },
];

function getEvaInfo(value: number) {
  return evaConfig.find((e) => value >= e.min && value <= e.max) ?? evaConfig[0];
}

interface EvaScaleInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export const EvaScaleInput = ({ value, onChange }: EvaScaleInputProps) => {
  const currentValue = value ?? 0;
  const info = getEvaInfo(currentValue);

  return (
    <div className="space-y-2">
      <Label className="text-xs flex items-center justify-between">
        <span>Escala de Dor (EVA)</span>
        {value != null && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Limpar
          </button>
        )}
      </Label>
      <div className="space-y-3 p-3 rounded-xl bg-muted/30 border border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              key={info.emoji}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl"
            >
              {info.emoji}
            </motion.span>
            <div>
              <span className={`text-sm font-semibold ${info.color}`}>
                {currentValue}/10
              </span>
              <p className="text-[10px] text-muted-foreground">{info.label}</p>
            </div>
          </div>
        </div>
        <Slider
          value={[currentValue]}
          onValueChange={([v]) => onChange(v)}
          min={0}
          max={10}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground px-0.5">
          <span>0</span>
          <span>2</span>
          <span>4</span>
          <span>6</span>
          <span>8</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

interface EvaScaleDisplayProps {
  value: number;
}

export const EvaScaleDisplay = ({ value }: EvaScaleDisplayProps) => {
  const info = getEvaInfo(value);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-3 rounded-xl bg-card border border-border"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">{info.emoji}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
          Dor (EVA)
        </span>
      </div>
      <div className="flex items-end gap-1.5">
        <span className={`text-lg font-bold ${info.color}`}>
          {value}
          <span className="text-xs font-normal text-muted-foreground ml-0.5">/10</span>
        </span>
        <span className="text-[10px] text-muted-foreground mb-0.5">{info.label}</span>
      </div>
    </motion.div>
  );
};
