import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface ImageSliderCompareProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  showGrid?: boolean;
}

export const ImageSliderCompare = ({
  beforeUrl,
  afterUrl,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  showGrid = false,
}: ImageSliderCompareProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  /* ── Pointer events (unified mouse + touch) ── */

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* ── Tap‑to‑position: if a quick tap (no drag), jump the slider ── */

  const pointerStartRef = useRef<{ x: number; time: number } | null>(null);

  const onPointerDownCapture = useCallback(
    (e: React.PointerEvent) => {
      pointerStartRef.current = { x: e.clientX, time: Date.now() };
      handlePointerDown(e);
    },
    [handlePointerDown]
  );

  const onPointerUpCapture = useCallback(
    (e: React.PointerEvent) => {
      handlePointerUp();
      const start = pointerStartRef.current;
      if (start) {
        const dx = Math.abs(e.clientX - start.x);
        const dt = Date.now() - start.time;
        // Quick tap with minimal movement → snap to position
        if (dx < 6 && dt < 250) {
          updatePosition(e.clientX);
        }
      }
      pointerStartRef.current = null;
    },
    [handlePointerUp, updatePosition]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      ref={containerRef}
      className="relative aspect-[3/4] w-full rounded-xl overflow-hidden select-none touch-none cursor-col-resize bg-muted/20"
      onPointerDown={onPointerDownCapture}
      onPointerMove={handlePointerMove}
      onPointerUp={onPointerUpCapture}
      onPointerCancel={handlePointerUp}
    >
      {/* After image (full background) */}
      <img
        src={afterUrl}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped by slider position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeUrl}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${(100 / position) * 100}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Grid overlay */}
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary/20" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary/20" />
          <div className="absolute top-1/4 left-0 right-0 h-px bg-primary/20" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/30" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-primary/20" />
        </div>
      )}

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)] z-10 transition-[left] duration-[16ms] ease-linear"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Slider handle — larger hit area on mobile */}
        <div
          className={[
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-10 h-10 sm:w-8 sm:h-8",
            "rounded-full bg-white/90 backdrop-blur-sm shadow-lg",
            "flex items-center justify-center",
            "border-2 border-primary/30",
            "transition-transform duration-150",
            isDragging ? "scale-110 ring-4 ring-primary/20" : "",
          ].join(" ")}
        >
          <div className="flex items-center gap-0.5">
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none" className="text-primary">
              <path d="M5 1L1 6L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none" className="text-primary">
              <path d="M1 1L5 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels — repositioned to avoid overlap with handle */}
      <div className="absolute bottom-2 left-2 z-20">
        <span className="text-[10px] font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute bottom-2 right-2 z-20">
        <span className="text-[10px] font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>

      {/* Drag hint (fades out after interaction) */}
      {!isDragging && position === 50 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="absolute inset-x-0 bottom-8 flex justify-center z-20 pointer-events-none"
        >
          <span className="text-[10px] text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            ← Arraste para comparar →
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
