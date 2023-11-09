import { TAU, Shape } from "./util";

function shiftTo(oldV: number, newV: number) {
  return 0.99 * oldV + 0.01 * newV;
}

export default class Particle {
  x: number;
  y: number;
  velX: [number, number]; // the next values
  velY: [number, number];
  rotationSpeed: [number, number];
  rotation: number;
  size: number;
  shape: Shape;
  color: string;

  constructor(
    x: number,
    y: number,
    velX: [number, number],
    velY: [number, number],
    rotationSpeed: [number, number],
    size: number,
    shape: Shape,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.rotationSpeed = rotationSpeed;
    this.rotation = 0;
    this.size = size;
    this.shape = shape;
    this.color = color;
  }

  move() {
    this.x += this.velX[0];
    this.y += this.velY[0];
    this.rotation += this.rotationSpeed[0];
    this.velX[0] = shiftTo(this.velX[0], this.velX[1]);
    this.velY[0] = shiftTo(this.velY[0], this.velY[1]);
    this.rotationSpeed[0] = shiftTo(
      this.rotationSpeed[0],
      this.rotationSpeed[1]
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    const radius = this.size / 2;
    ctx.fillStyle = this.color;

    switch (this.shape) {
      case "square":
        ctx.fillRect(-radius, -radius, this.size, this.size);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(0, -radius);
        ctx.lineTo(radius, radius);
        ctx.lineTo(-radius, radius);
        ctx.fill();
        break;
      case "circle":
      default:
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, TAU);
        ctx.fill();
        break;
    }

    // Reset the transformation
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
