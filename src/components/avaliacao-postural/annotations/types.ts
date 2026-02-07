/** Annotation shape types for the postural drawing canvas */

export type AnnotationTool = "arrow" | "angle" | "freehand" | "text" | "select";

export interface Point {
  x: number; // 0–1 relative to image width
  y: number; // 0–1 relative to image height
}

interface BaseAnnotation {
  id: string;
  color: string;
  strokeWidth: number;
}

export interface ArrowAnnotation extends BaseAnnotation {
  type: "arrow";
  start: Point;
  end: Point;
}

export interface AngleAnnotation extends BaseAnnotation {
  type: "angle";
  /** 3 points: vertex is points[1] */
  points: [Point, Point, Point];
}

export interface FreehandAnnotation extends BaseAnnotation {
  type: "freehand";
  points: Point[];
}

export interface TextAnnotation extends BaseAnnotation {
  type: "text";
  position: Point;
  text: string;
  fontSize: number;
}

export type Annotation =
  | ArrowAnnotation
  | AngleAnnotation
  | FreehandAnnotation
  | TextAnnotation;
