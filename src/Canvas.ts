import Rectangle from './Rectangle';
import Circle from './Circle';
import { Shape } from './types';

enum MouseEventType {
  DOWN = 'mousedown',
  MOVE = 'mousemove',
  UP = 'mouseup',
}

enum ShapeType {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
}

class Canvas {
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private shapes!: Shape[];
  private currentShape!: Shape | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.shapes = [];
    this.currentShape = null;

    this.canvas.addEventListener(MouseEventType.DOWN, this.handleMouseDown.bind(this));
    this.canvas.addEventListener(MouseEventType.MOVE, this.handleMouseMove.bind(this));
    this.canvas.addEventListener(MouseEventType.UP, this.handleMouseUp.bind(this));
  }

  private handleMouseDown(event: MouseEvent) {
    const shapeType = (
      document.querySelector('input[name="shapeType"]:checked') as HTMLInputElement
    ).value;

    const x = event.offsetX;
    const y = event.offsetY;

    switch (shapeType) {
      case ShapeType.RECTANGLE:
        this.currentShape = new Rectangle(x, y);
        break;
      case ShapeType.CIRCLE:
        this.currentShape = new Circle(x, y);
        break;
      default:
        throw Error();
    }

    this.shapes.push(this.currentShape);
    this.currentShape.isDrawing = true;
  }

  private handleMouseMove(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!this.currentShape || !this.currentShape.isDrawing) {
      return;
    }

    if (this.currentShape instanceof Rectangle) {
      this.currentShape.setDimensions(x, y);
    }

    if (this.currentShape instanceof Circle) {
      this.currentShape.setRadius(x, y);
    }

    this.draw();
  }

  private handleMouseUp() {
    if (this.currentShape) {
      this.currentShape.isDrawing = false;
    }

    this.currentShape = null;
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => {
      shape.draw(this.context);
    });
  }
}
export default Canvas;
