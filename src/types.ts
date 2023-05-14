export interface Shape {
  x: number;
  y: number;
  isDrawing: boolean;
  draw(context: CanvasRenderingContext2D): void;
}
