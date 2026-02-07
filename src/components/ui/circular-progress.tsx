import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CircularProgressProps {
  /** 0-100 */
  value: number;
  /** Outer size in px (default 80) */
  size?: number;
  /** Stroke width in px (default 6) */
  strokeWidth?: number;
  /** Track CSS color – accepts hsl(...) etc. */
  trackColor?: string;
  /** Progress CSS color */
  progressColor?: string;
  /** Optional label inside the ring */
  label?: React.ReactNode;
  className?: string;
}

/**
 * Animated circular progress ring.
 * Triggers when the element scrolls into view.
 */
export const CircularProgress = ({
  value,
  size = 80,
  strokeWidth = 6,
  trackColor = "hsl(var(--muted))",
  progressColor = "hsl(var(--primary))",
  label,
  className = "",
}: CircularProgressProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      {/* Center label */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
};
