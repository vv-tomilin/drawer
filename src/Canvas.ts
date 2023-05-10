//WARNING: высокая связанность с классом Rectangle

import Rectangle from './Rectangle';

enum MouseEventType {
  DOWN = 'mousedown',
  MOVE = 'mousemove',
  UP = 'mouseup',
}

class Canvas {
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private rectangle!: Rectangle;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.rectangle = new Rectangle(this.canvas, this.context);

    this.canvas.addEventListener(MouseEventType.DOWN, this.handleMouseDown.bind(this));
    this.canvas.addEventListener(MouseEventType.MOVE, this.handleMouseMove.bind(this));
    this.canvas.addEventListener(MouseEventType.UP, this.handleMouseUp.bind(this));
  }

  private handleMouseDown(event: MouseEvent) {
    this.isDrawing = true;
    this.rectangle.setStartPosition(event);
  }

  private handleMouseMove(event: MouseEvent) {
    this.rectangle.currentDrawRectangle(event, this.isDrawing);
  }

  private handleMouseUp() {
    this.isDrawing = false;
    this.rectangle.setRectangleToArray();
  }
}
export default Canvas;
