class RectangleDrawer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private startX: number;
  private startY: number;
  private currentX: number;
  private currentY: number;
  private isDrawing: boolean;
  private rectangles: { x: number; y: number; width: number; height: number }[];

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDrawing = false;
    this.rectangles = [];

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private onMouseDown(event: MouseEvent) {
    this.startX = event.offsetX;
    this.startY = event.offsetY;
    this.isDrawing = true;
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.isDrawing) {
      return;
    }

    this.currentX = event.offsetX;
    this.currentY = event.offsetY;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.rectangles.forEach((rectangle) => {
      this.context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    });

    const width = this.currentX - this.startX;
    const height = this.currentY - this.startY;

    this.context.fillRect(this.startX, this.startY, width, height);
  }

  private onMouseUp() {
    this.isDrawing = false;

    const width = this.currentX - this.startX;
    const height = this.currentY - this.startY;

    this.rectangles.push({
      x: this.startX,
      y: this.startY,
      width: width,
      height: height,
    });
  }
}

export default RectangleDrawer;
