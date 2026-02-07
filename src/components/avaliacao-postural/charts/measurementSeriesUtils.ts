import type { MeasurementDataPoint } from "@/hooks/useMeasurementHistory";

export interface MeasurementSeries {
  label: string;
  vista: string;
  referenceAxis: "vertical" | "horizontal";
  originalColor: string;
  points: { date: string; dateLabel: string; angle: number }[];
}

/**
 * Groups flat measurement data points into series keyed by vista + label,
 * suitable for rendering individual trend charts.
 */
export function buildMeasurementSeries(
  measurements: MeasurementDataPoint[]
): MeasurementSeries[] {
  const seriesMap = new Map<string, MeasurementSeries>();

  for (const m of measurements) {
    const key = `${m.vista}__${m.label}`;
    if (!seriesMap.has(key)) {
      seriesMap.set(key, {
        label: `${m.vista} — ${m.label}`,
        vista: m.vista,
        referenceAxis: m.referenceAxis,
        originalColor: m.color,
        points: [],
      });
    }
    seriesMap.get(key)!.points.push({
      date: m.date,
      dateLabel: m.dateLabel,
      angle: m.angle,
    });
  }

  // Sort points by date within each series
  for (const series of seriesMap.values()) {
    series.points.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  return Array.from(seriesMap.values());
}
