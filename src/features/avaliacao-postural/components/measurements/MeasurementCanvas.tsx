import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { ReferenceLine, MeasurementPreset, MeasurePoint } from "./types";
import { calcLineAngle, calcAngleBetweenLines } from "./types";
import { MeasurementToolbar } from "./MeasurementToolbar";
import { renderReferenceLine } from "./ReferenceLineRenderer";
import type { VistaPostural } from "@/hooks/useAvaliacaoPostural";

interface MeasurementCanvasProps {
  imageUrl: string;
  vista: VistaPostural;
  lines: ReferenceLine[];
  onSave: (lines: ReferenceLine[]) => void;
  isSaving: boolean;
  onClose: () => void;
}

export const MeasurementCanvas = ({
  imageUrl,
  vista,
  lines: initialLines,
  onSave,
  isSaving,
  onClose,
}: MeasurementCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<ReferenceLine[]>(initialLines);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [dragging, setDragging] = useState<{ lineId: string; point: "start" | "end" } | null>(null);

  const hasChanges = JSON.stringify(lines) !== JSON.stringify(initialLines);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ w: rect.width, h: rect.height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getRelativePos = useCallback(
    (e: React.PointerEvent): MeasurePoint => {
      const rect = containerRef.current!.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
      };
    },
    []
  );

  const handleAddPreset = useCallback(
    (preset: MeasurementPreset) => {
      const newLine: ReferenceLine = {
        id: preset.id,
        label: preset.label,
        color: preset.color,
        start: { ...preset.defaultStart },
        end: { ...preset.defaultEnd },
        referenceAxis: preset.referenceAxis,
        locked: false,
      };
      setLines((prev) => [...prev, newLine]);
    },
    []
  );

  const handleToggleLock = useCallback((lineId: string) => {
    setLines((prev) =>
      prev.map((l) => (l.id === lineId ? { ...l, locked: !l.locked } : l))
    );
  }, []);

  const handleRemoveLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const handleClear = useCallback(() => setLines([]), []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const target = e.target as SVGElement;
      const lineId = target.getAttribute("data-line-id");
      const point = target.getAttribute("data-point") as "start" | "end" | null;

      if (lineId && point) {
        const line = lines.find((l) => l.id === lineId);
        if (line && !line.locked) {
          e.preventDefault();
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setDragging({ lineId, point });
        }
      }
    },
    [lines]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const pos = getRelativePos(e);
      setLines((prev) =>
        prev.map((l) => {
          if (l.id !== dragging.lineId) return l;
          return {
            ...l,
            [dragging.point]: pos,
          };
        })
      );
    },
    [dragging, getRelativePos]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const { w, h } = dimensions;

  // Calculate inter-line angles for the summary
  const angleSummary: { label: string; value: number; color: string }[] = [];
  for (const line of lines) {
    const a = calcLineAngle(line.start, line.end, line.referenceAxis);
    angleSummary.push({
      label: `${line.label} vs ${line.referenceAxis === "vertical" ? "Vertical" : "Horizontal"}`,
      value: a,
      color: line.color,
    });
  }

  // Inter-line angles (e.g., shoulders vs hips)
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[i].referenceAxis === lines[j].referenceAxis) {
        const angle = calcAngleBetweenLines(lines[i], lines[j]);
        if (angle !== null) {
          angleSummary.push({
            label: `${lines[i].label} ↔ ${lines[j].label}`,
            value: angle,
            color: "#ffffff",
          });
        }
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
    >
      {/* Toolbar */}
      <div className="px-3 py-2 bg-black/60 backdrop-blur-sm">
        <MeasurementToolbar
          vista={vista}
          lines={lines}
          onAddPreset={handleAddPreset}
          onToggleLock={handleToggleLock}
          onRemoveLine={handleRemoveLine}
          onClear={handleClear}
          onSave={() => onSave(lines)}
          onClose={onClose}
          isSaving={isSaving}
          hasChanges={hasChanges}
        />
      </div>

      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
        <div ref={containerRef} className="relative max-w-full max-h-full" style={{ touchAction: "none" }}>
          <img
            src={imageUrl}
            alt="Foto postural"
            className="max-w-full max-h-[calc(100vh-160px)] object-contain rounded-lg select-none"
            draggable={false}
            onLoad={() => {
              if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({ w: rect.width, h: rect.height });
              }
            }}
          />

          {/* SVG overlay */}
          {w > 0 && h > 0 && (
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${w} ${h}`}
              style={{ touchAction: "none" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {lines.map((line) =>
                renderReferenceLine({ line, w, h, draggingEndpoint: dragging })
              )}
            </svg>
          )}
        </div>
      </div>

      {/* Angle summary panel */}
      {angleSummary.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-3 py-2 bg-black/60 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium shrink-0">
              Ângulos
            </span>
            {angleSummary.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-white/10 rounded-md px-2 py-1 shrink-0"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-white/70">{item.label}:</span>
                <span
                  className="text-xs font-bold"
                  style={{
                    color:
                      item.value <= 2
                        ? "#22c55e"
                        : item.value <= 5
                          ? "#eab308"
                          : item.value <= 10
                            ? "#f97316"
                            : "#ef4444",
                  }}
                >
                  {item.value}°
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Help hint */}
      {lines.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center bg-black/60 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-xs">
            <p className="text-white/80 text-sm font-medium mb-1">Adicione linhas de referência</p>
            <p className="text-white/50 text-xs">
              Selecione um preset acima (Prumo, Ombros, Quadril…) e arraste os pontos para alinhar com a anatomia
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
