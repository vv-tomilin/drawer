export interface Shape {
  x: number;
  y: number;
  isDrawing: boolean;
  isEditing: boolean;
  draw(context: CanvasRenderingContext2D, isEdit: boolean, isCurShape: Shape | null): void;
  isClicked(x: number, y: number): boolean;
}
