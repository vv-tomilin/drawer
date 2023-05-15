import { Shape } from './types';

class Rectangle implements Shape {
  x: number;
  y: number;

  isDrawing: boolean;
  isEditing: boolean;

  width: number;
  height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.isDrawing = false;
    this.isEditing = false;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  setDimensions(x: number, y: number) {
    this.width = x - this.x;
    this.height = y - this.y;
  }

  isClicked(curMouseX: number, curMouseY: number): boolean {
    return (
      curMouseX > this.x && curMouseX < this.x + this.width && curMouseY < this.y + this.height
    );
  }
}
export default Rectangle;
