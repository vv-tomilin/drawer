import { Shape } from './types';

class Rectangle implements Shape {
  x: number;
  y: number;

  isEditing: boolean;
  isDrawing: boolean;

  width: number;
  height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.isEditing = false;
    this.isDrawing = false;
  }

  draw(context: CanvasRenderingContext2D, isEdit: boolean, isCurShape: Shape | null) {
    context.beginPath();
    context.setLineDash([0, 0]);
    context.lineWidth = 0;
    context.strokeStyle = 'transparent';

    context.rect(this.x, this.y, this.width, this.height);
    context.fill();

    if (isEdit && isCurShape === null) {
      context.setLineDash([5, 3]);
      context.lineWidth = 4;
      context.strokeStyle = 'rgb(255, 20, 147)';

      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();
      context.fill();
    } else {
      context.rect(this.x, this.y, this.width, this.height);
      context.fill();
    }
  }

  setDimensions(x: number, y: number) {
    this.width = x - this.x;
    this.height = y - this.y;
  }

  isClicked(curMouseX: number, curMouseY: number): boolean {
    console.log(curMouseX, curMouseY); //! ***********************************

    return (
      //curMouseX > this.x && curMouseX < this.x + this.width && curMouseY < this.y + this.height
      curMouseX > this.x &&
      curMouseX < this.x + this.width &&
      curMouseY > this.y &&
      curMouseY < this.y + this.height
    );
  }
}
export default Rectangle;
