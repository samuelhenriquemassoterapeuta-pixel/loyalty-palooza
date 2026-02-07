import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import type { Annotation, AnnotationTool, Point } from "./types";
import { AnnotationToolbar } from "./AnnotationToolbar";
import { renderAnnotation } from "./svgRenderers";

interface AnnotationCanvasProps {
  imageUrl: string;
  annotations: Annotation[];
  onSave: (annotations: Annotation[]) => void;
  isSaving: boolean;
  onClose: () => void;
}

const genId = () => Math.random().toString(36).slice(2, 10);

export const AnnotationCanvas = ({
  imageUrl,
  annotations: initialAnnotations,
  onSave,
  isSaving,
  onClose,
}: AnnotationCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Annotation[]>(initialAnnotations);
  const [history, setHistory] = useState<Annotation[][]>([initialAnnotations]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [tool, setTool] = useState<AnnotationTool>("arrow");
  const [color, setColor] = useState("#ef4444");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [tempAnnotation, setTempAnnotation] = useState<Annotation | null>(null);
  const [anglePoints, setAnglePoints] = useState<Point[]>([]);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const hasChanges = JSON.stringify(items) !== JSON.stringify(initialAnnotations);

  // Update dimensions on mount / resize
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

  const pushHistory = useCallback(
    (next: Annotation[]) => {
      const newHist = history.slice(0, historyIdx + 1);
      newHist.push(next);
      setHistory(newHist);
      setHistoryIdx(newHist.length - 1);
      setItems(next);
    },
    [history, historyIdx]
  );

  const undo = useCallback(() => {
    if (historyIdx <= 0) return;
    const prev = historyIdx - 1;
    setHistoryIdx(prev);
    setItems(history[prev]);
  }, [history, historyIdx]);

  const clear = useCallback(() => {
    pushHistory([]);
    setSelectedId(null);
  }, [pushHistory]);

  const getRelativePos = useCallback(
    (e: React.PointerEvent): Point => {
      const rect = containerRef.current!.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
      };
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (tool === "select") return;
      e.preventDefault();
      (e.target as Element).setPointerCapture?.(e.pointerId);
      const pos = getRelativePos(e);

      if (tool === "angle") {
        const next = [...anglePoints, pos];
        setAnglePoints(next);
        if (next.length === 3) {
          const ann: Annotation = {
            id: genId(),
            type: "angle",
            points: [next[0], next[1], next[2]],
            color,
            strokeWidth: 2,
          };
          pushHistory([...items, ann]);
          setAnglePoints([]);
          setTempAnnotation(null);
        }
        return;
      }

      if (tool === "text") {
        const text = prompt("Digite o texto da anotação:");
        if (!text) return;
        const ann: Annotation = {
          id: genId(),
          type: "text",
          position: pos,
          text,
          color,
          strokeWidth: 1,
          fontSize: 14,
        };
        pushHistory([...items, ann]);
        return;
      }

      setDrawing(true);
      setSelectedId(null);

      if (tool === "arrow") {
        setTempAnnotation({
          id: genId(),
          type: "arrow",
          start: pos,
          end: pos,
          color,
          strokeWidth: 2.5,
        });
      } else if (tool === "freehand") {
        setTempAnnotation({
          id: genId(),
          type: "freehand",
          points: [pos],
          color,
          strokeWidth: 2.5,
        });
      }
    },
    [tool, color, items, anglePoints, pushHistory, getRelativePos]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const pos = getRelativePos(e);

      // Preview for angle tool partial state
      if (tool === "angle" && anglePoints.length > 0) {
        if (anglePoints.length === 1) {
          setTempAnnotation({
            id: "temp-angle",
            type: "arrow",
            start: anglePoints[0],
            end: pos,
            color,
            strokeWidth: 2,
          });
        } else if (anglePoints.length === 2) {
          setTempAnnotation({
            id: "temp-angle",
            type: "angle",
            points: [anglePoints[0], anglePoints[1], pos],
            color,
            strokeWidth: 2,
          });
        }
        return;
      }

      if (!drawing || !tempAnnotation) return;

      if (tempAnnotation.type === "arrow") {
        setTempAnnotation({ ...tempAnnotation, end: pos });
      } else if (tempAnnotation.type === "freehand") {
        setTempAnnotation({
          ...tempAnnotation,
          points: [...tempAnnotation.points, pos],
        });
      }
    },
    [drawing, tempAnnotation, tool, anglePoints, color, getRelativePos]
  );

  const handlePointerUp = useCallback(() => {
    if (!drawing || !tempAnnotation) return;
    setDrawing(false);
    pushHistory([...items, tempAnnotation]);
    setTempAnnotation(null);
  }, [drawing, tempAnnotation, items, pushHistory]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    pushHistory(items.filter((a) => a.id !== selectedId));
    setSelectedId(null);
  }, [selectedId, items, pushHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") handleDelete();
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleDelete, undo]);

  const { w, h } = dimensions;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-center px-3 py-2 bg-black/60 backdrop-blur-sm overflow-x-auto">
        <AnnotationToolbar
          activeTool={tool}
          onToolChange={(t) => {
            setTool(t);
            setAnglePoints([]);
            setTempAnnotation(null);
          }}
          activeColor={color}
          onColorChange={setColor}
          canUndo={historyIdx > 0}
          onUndo={undo}
          onClear={clear}
          onSave={() => onSave(items)}
          onClose={onClose}
          isSaving={isSaving}
          hasChanges={hasChanges}
        />
      </div>

      {/* Hint for angle tool */}
      {tool === "angle" && (
        <div className="text-center py-1 bg-black/40">
          <span className="text-xs text-white/70">
            {anglePoints.length === 0 && "Toque no 1º ponto (início do segmento)"}
            {anglePoints.length === 1 && "Toque no 2º ponto (vértice do ângulo)"}
            {anglePoints.length === 2 && "Toque no 3º ponto (fim do segmento)"}
          </span>
        </div>
      )}

      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
        <div
          ref={containerRef}
          className="relative max-w-full max-h-full"
          style={{ touchAction: "none" }}
        >
          <img
            src={imageUrl}
            alt="Foto postural"
            className="max-w-full max-h-[calc(100vh-100px)] object-contain rounded-lg select-none"
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
              onClick={(e) => {
                if (tool === "select" && e.target === e.currentTarget) {
                  setSelectedId(null);
                }
              }}
            >
              {items.map((ann) =>
                renderAnnotation({
                  annotation: ann,
                  w,
                  h,
                  isSelected: selectedId === ann.id,
                  onSelect: tool === "select" ? () => setSelectedId(ann.id) : undefined,
                })
              )}
              {tempAnnotation &&
                renderAnnotation({
                  annotation: tempAnnotation,
                  w,
                  h,
                  isSelected: false,
                })}
              {/* Angle preview dots */}
              {tool === "angle" &&
                anglePoints.map((p, i) => (
                  <circle
                    key={`ap-${i}`}
                    cx={p.x * w}
                    cy={p.y * h}
                    r={4}
                    fill={color}
                    stroke="white"
                    strokeWidth={1.5}
                  />
                ))}
            </svg>
          )}
        </div>
      </div>

      {/* Selected item actions */}
      {selectedId && tool === "select" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-4 inset-x-0 flex justify-center"
        >
          <button
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            Excluir anotação selecionada
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
