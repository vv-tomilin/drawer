export interface Shape {
  x: number;
  y: number;
  isDrawing: boolean;
  isEditing: boolean
  draw(context: CanvasRenderingContext2D): void;
  isClicked(x: number, y: number): boolean;
}
