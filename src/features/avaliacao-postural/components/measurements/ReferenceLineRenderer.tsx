import type { ReferenceLine, MeasurePoint } from "./types";
import { calcLineAngle } from "./types";

interface RenderLineProps {
  line: ReferenceLine;
  w: number;
  h: number;
  draggingEndpoint: { lineId: string; point: "start" | "end" } | null;
}

const HANDLE_R = 8;
const HANDLE_R_ACTIVE = 10;

export const renderReferenceLine = ({ line, w, h, draggingEndpoint }: RenderLineProps) => {
  const x1 = line.start.x * w;
  const y1 = line.start.y * h;
  const x2 = line.end.x * w;
  const y2 = line.end.y * h;
  const angle = calcLineAngle(line.start, line.end, line.referenceAxis);

  // Midpoint for angle label
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Axis reference dashed line
  const axisLine =
    line.referenceAxis === "vertical" ? (
      <line
        x1={mx}
        y1={Math.min(y1, y2) - 15}
        x2={mx}
        y2={Math.max(y1, y2) + 15}
        stroke={line.color}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        opacity={0.35}
      />
    ) : (
      <line
        x1={Math.min(x1, x2) - 15}
        y1={my}
        x2={Math.max(x1, x2) + 15}
        y2={my}
        stroke={line.color}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        opacity={0.35}
      />
    );

  const isDraggingStart = draggingEndpoint?.lineId === line.id && draggingEndpoint.point === "start";
  const isDraggingEnd = draggingEndpoint?.lineId === line.id && draggingEndpoint.point === "end";

  // Determine label position (offset from midpoint, away from line)
  const perpDx = -(y2 - y1);
  const perpDy = x2 - x1;
  const perpLen = Math.hypot(perpDx, perpDy) || 1;
  const labelOffsetX = (perpDx / perpLen) * 24;
  const labelOffsetY = (perpDy / perpLen) * 24;

  // Severity color for angle
  const getSeverityColor = (a: number) => {
    if (a <= 2) return "#22c55e"; // green – normal
    if (a <= 5) return "#eab308"; // yellow – mild
    if (a <= 10) return "#f97316"; // orange – moderate
    return "#ef4444"; // red – significant
  };

  const severityColor = getSeverityColor(angle);

  return (
    <g key={line.id}>
      {/* Axis reference */}
      {axisLine}

      {/* Main line shadow */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={3.5}
        strokeLinecap="round"
      />

      {/* Main line */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={line.color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Angle arc at midpoint */}
      {angle > 0.5 && (() => {
        const arcR = 18;
        let refAngleRad: number;
        const lineAngleRad = Math.atan2(y2 - y1, x2 - x1);

        if (line.referenceAxis === "vertical") {
          refAngleRad = -Math.PI / 2; // straight up
        } else {
          refAngleRad = 0; // straight right
        }

        const arcStart = {
          x: mx + arcR * Math.cos(refAngleRad),
          y: my + arcR * Math.sin(refAngleRad),
        };
        const arcEnd = {
          x: mx + arcR * Math.cos(lineAngleRad),
          y: my + arcR * Math.sin(lineAngleRad),
        };

        return (
          <path
            d={`M ${arcStart.x} ${arcStart.y} A ${arcR} ${arcR} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
            fill="none"
            stroke={severityColor}
            strokeWidth={1.5}
            opacity={0.7}
          />
        );
      })()}

      {/* Angle label */}
      <g>
        <rect
          x={mx + labelOffsetX - 22}
          y={my + labelOffsetY - 10}
          width={44}
          height={20}
          rx={4}
          fill="rgba(0,0,0,0.75)"
          stroke={severityColor}
          strokeWidth={1}
        />
        <text
          x={mx + labelOffsetX}
          y={my + labelOffsetY + 4}
          fill={severityColor}
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {angle}°
        </text>
      </g>

      {/* Line label at start */}
      <text
        x={x1}
        y={y1 - 14}
        fill={line.color}
        fontSize={10}
        fontWeight="600"
        textAnchor="middle"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
      >
        {line.label}
      </text>

      {/* Endpoint handles */}
      {!line.locked && (
        <>
          {/* Start handle */}
          <circle
            cx={x1} cy={y1}
            r={isDraggingStart ? HANDLE_R_ACTIVE : HANDLE_R}
            fill={line.color}
            stroke="white"
            strokeWidth={2}
            opacity={0.9}
            data-line-id={line.id}
            data-point="start"
            style={{ cursor: "grab", filter: isDraggingStart ? "drop-shadow(0 0 6px rgba(255,255,255,0.5))" : "none" }}
          />
          {/* End handle */}
          <circle
            cx={x2} cy={y2}
            r={isDraggingEnd ? HANDLE_R_ACTIVE : HANDLE_R}
            fill={line.color}
            stroke="white"
            strokeWidth={2}
            opacity={0.9}
            data-line-id={line.id}
            data-point="end"
            style={{ cursor: "grab", filter: isDraggingEnd ? "drop-shadow(0 0 6px rgba(255,255,255,0.5))" : "none" }}
          />
        </>
      )}

      {/* Lock indicator */}
      {line.locked && (
        <circle
          cx={mx} cy={my}
          r={4}
          fill="white"
          opacity={0.5}
        />
      )}
    </g>
  );
};
