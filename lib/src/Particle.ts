import {
  TAU,
  getRandom,
  randomElement,
  ParticleConfig,
  Shape,
  MovementStruct,
  convertToRadians,
  Range,
  clamp,
} from "./util";

export type ParticleState = {
  x: MovementStruct;
  y: MovementStruct;
  rotation: MovementStruct;
  size: number;
  shape: Shape;
  image?: HTMLImageElement;
  color: string;
};

export default class Particle {
  public readonly state: ParticleState;

  private constructor(params: ParticleState) {
    this.state = params;
  }

  public move(xSpeedRange: Range, ySpeedRange: Range, rotationRange: Range) {
    this.state.x.pos += this.state.x.vel;
    this.state.y.pos += this.state.y.vel;
    this.state.rotation.pos += this.state.rotation.vel;

    this.state.x.vel = clamp(this.state.x.vel + this.state.x.acc, xSpeedRange);
    this.state.y.vel = clamp(this.state.y.vel + this.state.y.acc, ySpeedRange);
    this.state.rotation.vel = clamp(
      this.state.rotation.vel + this.state.rotation.acc,
      rotationRange
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.state.x.pos, this.state.y.pos);
    ctx.rotate(convertToRadians(this.state.rotation.pos));
    if (this.state.image) {
      const size = Math.ceil(this.state.size);
      ctx.drawImage(this.state.image, 0, 0, size, size);
      return ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    const radius = this.state.size / 2;
    ctx.fillStyle = this.state.color;

    switch (this.state.shape) {
      case "square":
        ctx.fillRect(-radius, -radius, this.state.size, this.state.size);
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

  public updateMovement(
    xSpeedRange: Range,
    ySpeedRange: Range,
    rotationRange: Range,
    frameUpdate: number
  ) {
    const dx = getRandom(xSpeedRange.min, xSpeedRange.max);
    this.state.x.acc = (dx - this.state.x.vel) / frameUpdate;
    const dy = getRandom(ySpeedRange.min, ySpeedRange.max);
    this.state.y.acc = (dy - this.state.y.vel) / frameUpdate;
    const dr = getRandom(rotationRange.min, rotationRange.max);
    this.state.rotation.acc = (dr - this.state.rotation.vel) / frameUpdate;
  }

  public clampBounds(width: number, height: number) {
    if (this.state.x.pos < -this.state.size && this.state.x.vel < 0) {
      this.state.x.pos = width;
    } else if (this.state.x.pos > width && this.state.x.vel > 0) {
      this.state.x.pos = -this.state.size;
    }
    if (this.state.y.pos > height && this.state.y.vel > 0) {
      this.state.y.pos = -this.state.size;
    }
    if (this.state.y.pos < -this.state.size && this.state.y.vel < 0) {
      this.state.y.pos = height;
    }
  }

  public static make(
    width: number,
    height: number,
    config: ParticleConfig,
    frameUpdate: number
  ): Particle {
    const dx = getRandom(config.xSpeedRange.min, config.xSpeedRange.max);
    const dy = getRandom(config.ySpeedRange.min, config.ySpeedRange.max);
    const dr = getRandom(config.rotationRange.min, config.rotationRange.max);

    const yOffset = getRandom(0, height);
    const y = dy > 0 ? 0 - yOffset : height + yOffset;
    const x = getRandom(0, width);

    const d2x =
      (getRandom(config.xSpeedRange.min, config.xSpeedRange.max) - dx) /
      frameUpdate;
    const d2y =
      (getRandom(config.ySpeedRange.min, config.ySpeedRange.max) - dy) /
      frameUpdate;
    const d2r =
      (getRandom(config.rotationRange.min, config.rotationRange.max) - dr) /
      frameUpdate;
    const color = randomElement(config.colors);
    const shape = randomElement(config.shapes);
    const image = config.images ? randomElement(config.images) : undefined;
    const size = getRandom(config.sizeRange.min, config.sizeRange.max);
    return new Particle({
      x: {
        pos: x,
        vel: dx,
        acc: d2x,
      },
      y: {
        pos: y,
        vel: dy,
        acc: d2y,
      },
      rotation: {
        pos: dr,
        vel: d2r,
        acc: d2r,
      },
      color,
      shape,
      size,
      image,
    });
  }
}
