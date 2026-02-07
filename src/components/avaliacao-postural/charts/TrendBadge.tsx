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
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : worsened
          ? "bg-red-500/10 text-red-600 dark:text-red-400"
          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      }`}
    >
      {diff > 0 ? "+" : ""}
      {diff}°
    </span>
  );
}
