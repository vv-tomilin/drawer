import Rectangle from './Rectangle';
import Circle from './Circle';
import Pencil from './Pencil';

import { Shape } from './types';
import { MouseEventType, ShapeType } from './enums';

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
    this.canvas.addEventListener(MouseEventType.LEAVE, this.handleMouseLeave.bind(this));

    window.addEventListener('resize', this.resizeCanvas, false);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight - (window.innerHeight * 14.2) / 100;
  }

  private handleMouseDown(event: MouseEvent) {
    const shapeType = (
      document.querySelector('input[name="shapeType"]:checked') as HTMLInputElement
    ).value;

    const x = event.offsetX;
    const y = event.offsetY;

    this.findClickedShape(event.offsetX, event.offsetY);

    switch (shapeType) {
      case ShapeType.RECTANGLE:
        this.currentShape = new Rectangle(x, y);
        break;
      case ShapeType.CIRCLE:
        this.currentShape = new Circle(x, y);
        break;
      case ShapeType.PENCIL:
        this.currentShape = new Pencil(x, y, 'red', 1);
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

    if (this.currentShape instanceof Pencil) {
      this.currentShape.addPoint({ x, y });
    }

    this.draw();
  }

  private handleMouseUp(event: MouseEvent) {
    const lastShape = this.shapes[this.shapes.length - 1];

    this.clearEmptyShapes(lastShape);

    if (this.currentShape) {
      this.currentShape.isDrawing = false;
    }

    this.currentShape = null;

    this.draw();

    console.log(this.shapes); //! *************************************
    console.log(this.currentShape);//! *************************************
  }

  private handleMouseLeave() {
    if (this.currentShape instanceof Pencil) {
      this.currentShape.isDrawing = false;
      this.currentShape = null;
    }
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => {
      shape.draw(this.context, shape.isEditing, this.currentShape);
    });
  }

  private findClickedShape(x: number, y: number) {
    for (const shape of this.shapes) {
      shape.isEditing = false;

      if (shape.isClicked(x, y)) {
        shape.isEditing = true;
      } else {
        shape.isEditing = false;
      }
    }
  }

  private clearEmptyShapes(curShape: Shape): void {
    if (curShape instanceof Rectangle) {
      this.shapes = this.shapes.filter((shape) => {
        if (shape instanceof Rectangle) {
          if (shape.width > 0 && shape.height > 0) {
            return shape;
          }
        } else {
          return shape;
        }
      });
    }

    if (curShape instanceof Circle) {
      this.shapes = this.shapes.filter((shape) => {
        if (shape instanceof Circle) {
          if (shape.radius > 0) {
            return shape;
          }
        } else {
          return shape;
        }
      });
    }

    if (curShape instanceof Pencil) {
      this.shapes = this.shapes.filter((shape) => {
        if (shape instanceof Pencil) {
          if (shape.points.length > 1) {
            return shape;
          }
        } else {
          return shape;
        }
      });
    }
  }
}
export default Canvas;
