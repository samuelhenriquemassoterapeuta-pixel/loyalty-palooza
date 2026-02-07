import type { Annotation, Point } from "./types";

/** Calculate angle in degrees between three points (vertex is p2) */
function calcAngle(p1: Point, p2: Point, p3: Point): number {
  const a = Math.atan2(p1.y - p2.y, p1.x - p2.x);
  const b = Math.atan2(p3.y - p2.y, p3.x - p2.x);
  let angle = ((b - a) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  if (angle > 180) angle = 360 - angle;
  return Math.round(angle);
}

interface RenderProps {
  annotation: Annotation;
  w: number;
  h: number;
  isSelected: boolean;
  onSelect?: () => void;
}

export const renderAnnotation = ({ annotation, w, h, isSelected, onSelect }: RenderProps) => {
  const s = annotation.strokeWidth;
  const c = annotation.color;
  const selectedStroke = isSelected ? "rgba(59,130,246,0.6)" : "transparent";

  switch (annotation.type) {
    case "arrow": {
      const x1 = annotation.start.x * w;
      const y1 = annotation.start.y * h;
      const x2 = annotation.end.x * w;
      const y2 = annotation.end.y * h;
      const markerId = `arrowhead-${annotation.id}`;
      return (
        <g key={annotation.id} onClick={onSelect} style={{ cursor: "pointer" }}>
          <defs>
            <marker id={markerId} markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0 0, 10 4, 0 8" fill={c} />
            </marker>
          </defs>
          {/* Hit area */}
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth={s + 12} />
          {/* Selection */}
          {isSelected && (
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={selectedStroke} strokeWidth={s + 6} strokeLinecap="round" />
          )}
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={s} strokeLinecap="round" markerEnd={`url(#${markerId})`} />
        </g>
      );
    }

    case "angle": {
      const [p1, p2, p3] = annotation.points;
      const x1 = p1.x * w, y1 = p1.y * h;
      const x2 = p2.x * w, y2 = p2.y * h;
      const x3 = p3.x * w, y3 = p3.y * h;
      const angle = calcAngle(p1, p2, p3);

      // Arc
      const radius = Math.min(30, Math.hypot(x1 - x2, y1 - y2) * 0.4, Math.hypot(x3 - x2, y3 - y2) * 0.4);
      const a1 = Math.atan2(y1 - y2, x1 - x2);
      const a2 = Math.atan2(y3 - y2, x3 - x2);
      const arcX1 = x2 + radius * Math.cos(a1);
      const arcY1 = y2 + radius * Math.sin(a1);
      const arcX2 = x2 + radius * Math.cos(a2);
      const arcY2 = y2 + radius * Math.sin(a2);
      const largeArc = Math.abs(a2 - a1) > Math.PI ? 1 : 0;

      return (
        <g key={annotation.id} onClick={onSelect} style={{ cursor: "pointer" }}>
          {isSelected && (
            <>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={selectedStroke} strokeWidth={s + 6} />
              <line x1={x2} y1={y2} x2={x3} y2={y3} stroke={selectedStroke} strokeWidth={s + 6} />
            </>
          )}
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={s} strokeLinecap="round" />
          <line x1={x2} y1={y2} x2={x3} y2={y3} stroke={c} strokeWidth={s} strokeLinecap="round" />
          <path
            d={`M ${arcX1} ${arcY1} A ${radius} ${radius} 0 ${largeArc} 0 ${arcX2} ${arcY2}`}
            fill="none"
            stroke={c}
            strokeWidth={s * 0.7}
          />
          {/* Angle label */}
          <text
            x={x2 + radius * 1.6 * Math.cos((a1 + a2) / 2)}
            y={y2 + radius * 1.6 * Math.sin((a1 + a2) / 2)}
            fill={c}
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
          >
            {angle}°
          </text>
          {/* Vertex dots */}
          {[{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill={c} />
          ))}
        </g>
      );
    }

    case "freehand": {
      if (annotation.points.length < 2) return null;
      const d = annotation.points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * w} ${p.y * h}`)
        .join(" ");
      return (
        <g key={annotation.id} onClick={onSelect} style={{ cursor: "pointer" }}>
          <path d={d} stroke="transparent" strokeWidth={s + 12} fill="none" />
          {isSelected && <path d={d} stroke={selectedStroke} strokeWidth={s + 6} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <path d={d} stroke={c} strokeWidth={s} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    }

    case "text": {
      const tx = annotation.position.x * w;
      const ty = annotation.position.y * h;
      return (
        <g key={annotation.id} onClick={onSelect} style={{ cursor: "pointer" }}>
          {isSelected && (
            <rect
              x={tx - 4}
              y={ty - annotation.fontSize}
              width={annotation.text.length * annotation.fontSize * 0.6 + 8}
              height={annotation.fontSize + 8}
              fill="rgba(59,130,246,0.15)"
              stroke={selectedStroke}
              strokeWidth={1.5}
              rx={3}
            />
          )}
          <text
            x={tx}
            y={ty}
            fill={c}
            fontSize={annotation.fontSize}
            fontWeight="600"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
          >
            {annotation.text}
          </text>
        </g>
      );
    }

    default:
      return null;
  }
};
