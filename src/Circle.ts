import { Shape } from './types';

class Circle implements Shape {
  x: number;
  y: number;

  isDrawing: boolean;

  private radius: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isDrawing = false;
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

    console.log('RADIUS', this.radius);
  }
}
export default Circle;
