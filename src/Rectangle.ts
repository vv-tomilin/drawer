type RectangleOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

class Rectangle {
  private startX!: number;
  private startY!: number;

  private currentX!: number;
  private currentY!: number;

  rectangles!: RectangleOptions[];

  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.context = context;
    this.canvas = canvas;
    this.rectangles = [];
  }

  setStartPosition(event: MouseEvent) {
    this.startX = event.offsetX;
    this.startY = event.offsetY;
  }

  currentDrawRectangle(event: MouseEvent, isDrawing: boolean) {
    if (!isDrawing) {
      return;
    }

    this.currentX = event.offsetX;
    this.currentY = event.offsetY;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.rectangles.forEach((rectangle) => {
      //* Во время отрисовки текущего прямоугольника рисуем остальные уже отрисованные
      this.context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    });

    const width = this.currentX - this.startX;
    const height = this.currentY - this.startY;

    this.context.fillRect(this.startX, this.startY, width, height);
  }

  //* Записываем отрисованный прямоугольгик в массив
  setRectangleToArray() {
    const width = this.currentX - this.startX;
    const height = this.currentY - this.startY;

    this.rectangles.push({
      x: this.startX,
      y: this.startY,
      width,
      height,
    });
  }
}
export default Rectangle;
