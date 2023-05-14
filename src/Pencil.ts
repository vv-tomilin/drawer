import { Shape } from './types';

interface Point {
  x: number;
  y: number;
}

class Pencil implements Shape {
  x: number;
  y: number;

  isDrawing: boolean;

  private color: string;
  private lineWidth: number;

  private points: Point[];

  constructor(x: number, y: number, color: string, lineWidth: number) {
    this.x = x;
    this.y = y;

    this.isDrawing = false;

    this.color = color;
    this.lineWidth = lineWidth;

    this.points = [{ x, y }];
  }

  draw(context: CanvasRenderingContext2D): void {
    try {
      context.strokeStyle = this.color;
      context.lineWidth = this.lineWidth;
      context.beginPath();
      context.moveTo(this.points[0].x, this.points[0].y);

      for (let i = 1; i < this.points.length; i++) {
        context.lineTo(this.points[i].x, this.points[i].y);
      }

      context.stroke();
    } catch (err) {
      console.error(err);
    }
  }

  addPoint(point: Point): void {
    this.points.push(point);
  }
}

export default Pencil;
