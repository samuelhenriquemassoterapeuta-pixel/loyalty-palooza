import type { Annotation, Point } from "./types";

/**
 * Renders annotations as SVG markup to overlay on images.
 * Used by the PDF exporter to composite annotations onto photos.
 */

function calcAngle(p1: Point, p2: Point, p3: Point): number {
  const a = Math.atan2(p1.y - p2.y, p1.x - p2.x);
  const b = Math.atan2(p3.y - p2.y, p3.x - p2.x);
  let angle = ((b - a) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  if (angle > 180) angle = 360 - angle;
  return Math.round(angle);
}

function buildAnnotationSvgMarkup(annotations: Annotation[], w: number, h: number): string {
  const parts: string[] = [];

  for (const ann of annotations) {
    const c = ann.color;
    const s = ann.strokeWidth;

    switch (ann.type) {
      case "arrow": {
        const x1 = ann.start.x * w;
        const y1 = ann.start.y * h;
        const x2 = ann.end.x * w;
        const y2 = ann.end.y * h;
        const mid = `arrowhead-${ann.id}`;
        parts.push(`
          <defs>
            <marker id="${mid}" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0 0, 10 4, 0 8" fill="${c}" />
            </marker>
          </defs>
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                stroke="${c}" stroke-width="${s}" stroke-linecap="round"
                marker-end="url(#${mid})" />
        `);
        break;
      }

      case "angle": {
        const [p1, p2, p3] = ann.points;
        const x1 = p1.x * w, y1 = p1.y * h;
        const x2 = p2.x * w, y2 = p2.y * h;
        const x3 = p3.x * w, y3 = p3.y * h;
        const angle = calcAngle(p1, p2, p3);

        const radius = Math.min(30, Math.hypot(x1 - x2, y1 - y2) * 0.4, Math.hypot(x3 - x2, y3 - y2) * 0.4);
        const a1 = Math.atan2(y1 - y2, x1 - x2);
        const a2 = Math.atan2(y3 - y2, x3 - x2);
        const arcX1 = x2 + radius * Math.cos(a1);
        const arcY1 = y2 + radius * Math.sin(a1);
        const arcX2 = x2 + radius * Math.cos(a2);
        const arcY2 = y2 + radius * Math.sin(a2);
        const largeArc = Math.abs(a2 - a1) > Math.PI ? 1 : 0;

        parts.push(`
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${s}" stroke-linecap="round" />
          <line x1="${x2}" y1="${y2}" x2="${x3}" y2="${y3}" stroke="${c}" stroke-width="${s}" stroke-linecap="round" />
          <path d="M ${arcX1} ${arcY1} A ${radius} ${radius} 0 ${largeArc} 0 ${arcX2} ${arcY2}"
                fill="none" stroke="${c}" stroke-width="${s * 0.7}" />
          <text x="${x2 + radius * 1.6 * Math.cos((a1 + a2) / 2)}"
                y="${y2 + radius * 1.6 * Math.sin((a1 + a2) / 2)}"
                fill="${c}" font-size="14" font-weight="bold"
                text-anchor="middle" dominant-baseline="central"
                style="text-shadow: 0 1px 3px rgba(0,0,0,0.7)">
            ${angle}°
          </text>
          ${[{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }]
            .map((p) => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${c}" />`)
            .join("")}
        `);
        break;
      }

      case "freehand": {
        if (ann.points.length < 2) break;
        const d = ann.points
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * w} ${p.y * h}`)
          .join(" ");
        parts.push(`
          <path d="${d}" stroke="${c}" stroke-width="${s}" fill="none"
                stroke-linecap="round" stroke-linejoin="round" />
        `);
        break;
      }

      case "text": {
        const tx = ann.position.x * w;
        const ty = ann.position.y * h;
        parts.push(`
          <text x="${tx}" y="${ty}" fill="${c}" font-size="${ann.fontSize}"
                font-weight="600" style="text-shadow: 0 1px 4px rgba(0,0,0,0.8)">
            ${escapeXml(ann.text)}
          </text>
        `);
        break;
      }
    }
  }

  return parts.join("\n");
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Composites an image with its annotations into a single data URL.
 * Draws the base image on a canvas, then overlays SVG annotations.
 */
export async function compositeImageWithAnnotations(
  imageDataUrl: string,
  annotations: Annotation[],
  targetWidth = 600
): Promise<string> {
  if (!annotations.length) return imageDataUrl;

  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const aspect = img.naturalHeight / img.naturalWidth;
      const w = targetWidth;
      const h = Math.round(w * aspect);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));

      // Draw base photo
      ctx.drawImage(img, 0, 0, w, h);

      // Build SVG overlay
      const svgMarkup = buildAnnotationSvgMarkup(annotations, w, h);
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${svgMarkup}</svg>`;
      const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);

      const svgImg = new Image();
      svgImg.onload = () => {
        ctx.drawImage(svgImg, 0, 0, w, h);
        URL.revokeObjectURL(svgUrl);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      svgImg.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        // Fall back to image without annotations
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      svgImg.src = svgUrl;
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageDataUrl;
  });
}
