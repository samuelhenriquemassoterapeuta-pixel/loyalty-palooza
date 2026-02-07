import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Wraps an image with tap-to-open fullscreen zoom that supports:
 * - Pinch-to-zoom on touch devices
 * - Scroll-wheel zoom on desktop
 * - Pan by dragging when zoomed in
 * - Double-tap to toggle zoom
 */
export const ZoomableImage = ({ src, alt, className = "", children }: ZoomableImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail with zoom indicator */}
      <div className={`relative cursor-zoom-in group ${className}`} onClick={() => setIsOpen(true)}>
        <img src={src} alt={alt} className="w-full h-full object-cover" draggable={false} />
        {children}
        <div className="absolute bottom-1.5 right-1.5 bg-black/40 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn size={12} className="text-white" />
        </div>
      </div>

      {/* Fullscreen zoom overlay */}
      {isOpen && <ZoomOverlay src={src} alt={alt} onClose={() => setIsOpen(false)} />}
    </>
  );
};

/* ─── Fullscreen zoom overlay ─────────────────────────── */

interface ZoomOverlayProps {
  src: string;
  alt: string;
  onClose: () => void;
}

function ZoomOverlay({ src, alt, onClose }: ZoomOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  // Refs for gesture tracking
  const panStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });
  const pinchStartDist = useRef(0);
  const pinchStartScale = useRef(1);
  const lastTap = useRef(0);

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  const clampTranslate = useCallback(
    (tx: number, ty: number, s: number) => {
      if (s <= 1) return { x: 0, y: 0 };
      const container = containerRef.current;
      if (!container) return { x: tx, y: ty };
      const rect = container.getBoundingClientRect();
      const maxX = ((s - 1) * rect.width) / 2;
      const maxY = ((s - 1) * rect.height) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, tx)),
        y: Math.max(-maxY, Math.min(maxY, ty)),
      };
    },
    []
  );

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  /* ── Touch events (pinch + pan + double-tap) ── */

  const getTouchDist = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch start
        pinchStartDist.current = getTouchDist(e.touches);
        pinchStartScale.current = scale;
      } else if (e.touches.length === 1) {
        // Check double-tap
        const now = Date.now();
        if (now - lastTap.current < 300) {
          // Double-tap toggle
          if (scale > 1.2) {
            resetZoom();
          } else {
            setScale(2.5);
            // Center zoom on tap point
            const container = containerRef.current;
            if (container) {
              const rect = container.getBoundingClientRect();
              const cx = e.touches[0].clientX - rect.left - rect.width / 2;
              const cy = e.touches[0].clientY - rect.top - rect.height / 2;
              setTranslate(clampTranslate(-cx, -cy, 2.5));
            }
          }
          lastTap.current = 0;
          return;
        }
        lastTap.current = now;

        // Pan start (only when zoomed)
        if (scale > 1) {
          setIsPanning(true);
          panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          translateStart.current = { ...translate };
        }
      }
    },
    [scale, translate, clampTranslate, resetZoom]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        // Pinch zoom
        const dist = getTouchDist(e.touches);
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, pinchStartScale.current * (dist / pinchStartDist.current)));
        setScale(newScale);
        setTranslate((prev) => clampTranslate(prev.x, prev.y, newScale));
      } else if (e.touches.length === 1 && isPanning && scale > 1) {
        // Pan
        const dx = e.touches[0].clientX - panStart.current.x;
        const dy = e.touches[0].clientY - panStart.current.y;
        setTranslate(clampTranslate(translateStart.current.x + dx, translateStart.current.y + dy, scale));
      }
    },
    [isPanning, scale, clampTranslate]
  );

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false);
    if (scale < 1.05) resetZoom();
  }, [scale, resetZoom]);

  /* ── Mouse events (wheel zoom + drag pan) ── */

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.stopPropagation();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * delta));
      setScale(newScale);
      if (newScale <= 1) {
        resetZoom();
      } else {
        setTranslate((prev) => clampTranslate(prev.x, prev.y, newScale));
      }
    },
    [scale, clampTranslate, resetZoom]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
    },
    [scale, translate]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning || scale <= 1) return;
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setTranslate(clampTranslate(translateStart.current.x + dx, translateStart.current.y + dy, scale));
    },
    [isPanning, scale, clampTranslate]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (scale > 1.2) {
        resetZoom();
      } else {
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const cx = e.clientX - rect.left - rect.width / 2;
          const cy = e.clientY - rect.top - rect.height / 2;
          setScale(2.5);
          setTranslate(clampTranslate(-cx, -cy, 2.5));
        }
      }
    },
    [scale, clampTranslate, resetZoom]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && scale <= 1) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Zoom indicator */}
      {scale > 1 && (
        <div className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Reset hint */}
      {scale <= 1 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 inset-x-0 flex justify-center z-50 pointer-events-none"
        >
          <span className="text-xs text-white/60 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            Pinch ou scroll para zoom • Toque duplo 2x
          </span>
        </motion.div>
      )}

      {/* Zoomable image container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
        style={{ cursor: scale > 1 ? (isPanning ? "grabbing" : "grab") : "zoom-in" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain select-none transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
          }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
