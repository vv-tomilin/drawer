import { Shape } from './types';

class Circle implements Shape {
  x: number;
  y: number;
  isEditing: boolean;
  isDrawing: boolean;

  radius: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isDrawing = false;
    this.isEditing = false;
    this.radius = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  setRadius(x: number, y: number) {
    const dx = x - this.x;
    const dy = y - this.y;
    this.radius = Math.sqrt(dx * dx + dy * dy);
  }

  isClicked(x: number, y: number): boolean {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance < this.radius;
  }
}
export default Circle;
