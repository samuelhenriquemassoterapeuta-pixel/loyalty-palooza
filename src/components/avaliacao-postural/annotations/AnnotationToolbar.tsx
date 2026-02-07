import { ArrowUpRight, Ruler, Pencil, Type, MousePointer2, Undo2, Trash2, Save, X, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { AnnotationTool } from "./types";

const COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ffffff", // white
];

const tools: { tool: AnnotationTool; icon: typeof ArrowUpRight; label: string }[] = [
  { tool: "select", icon: MousePointer2, label: "Selecionar" },
  { tool: "arrow", icon: ArrowUpRight, label: "Seta" },
  { tool: "angle", icon: Ruler, label: "Ângulo" },
  { tool: "freehand", icon: Pencil, label: "Desenho livre" },
  { tool: "text", icon: Type, label: "Texto" },
];

interface AnnotationToolbarProps {
  activeTool: AnnotationTool;
  onToolChange: (tool: AnnotationTool) => void;
  activeColor: string;
  onColorChange: (color: string) => void;
  canUndo: boolean;
  onUndo: () => void;
  onClear: () => void;
  onSave: () => void;
  onClose: () => void;
  isSaving: boolean;
  hasChanges: boolean;
}

export const AnnotationToolbar = ({
  activeTool,
  onToolChange,
  activeColor,
  onColorChange,
  canUndo,
  onUndo,
  onClear,
  onSave,
  onClose,
  isSaving,
  hasChanges,
}: AnnotationToolbarProps) => {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Tool buttons */}
      <div className="flex items-center bg-muted/60 rounded-lg p-0.5 gap-0.5">
        {tools.map(({ tool, icon: Icon, label }) => (
          <Button
            key={tool}
            variant={activeTool === tool ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onToolChange(tool)}
            title={label}
          >
            <Icon size={15} />
          </Button>
        ))}
      </div>

      {/* Color picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Cor">
            <div
              className="w-4 h-4 rounded-full border-2 border-foreground/30"
              style={{ backgroundColor: activeColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" side="bottom" align="start">
          <div className="flex gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  activeColor === c ? "border-primary scale-125" : "border-transparent hover:scale-110"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => onColorChange(c)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Actions */}
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onUndo} disabled={!canUndo} title="Desfazer">
        <Undo2 size={15} />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClear} title="Limpar tudo">
        <Trash2 size={15} />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        size="sm"
        className="h-8 gap-1 text-xs"
        onClick={onSave}
        disabled={isSaving || !hasChanges}
      >
        <Save size={13} />
        Salvar
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose} title="Fechar">
        <X size={15} />
      </Button>
    </div>
  );
};
