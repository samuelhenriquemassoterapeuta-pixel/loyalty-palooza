interface TrendBadgeProps {
  points: { angle: number }[];
}

export function TrendBadge({ points }: TrendBadgeProps) {
  if (points.length < 2) return null;
  const first = points[0].angle;
  const last = points[points.length - 1].angle;
  const diff = Math.round((last - first) * 10) / 10;
  const improved = Math.abs(diff) <= 2;
  const worsened = diff > 5;

  return (
    <span
      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
        improved
          ? "bg-highlight/10 text-highlight"
          : worsened
          ? "bg-destructive/10 text-destructive"
          : "bg-warning/10 text-warning"
      }`}
    >
      {diff > 0 ? "+" : ""}
      {diff}°
    </span>
  );
}
