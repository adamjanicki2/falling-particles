import {
  TAU,
  getRandom,
  randomElement,
  ParticleConfig,
  Shape,
  MovementStruct,
  convertToRadians,
} from "./util";

export type ParticleState = {
  x: MovementStruct;
  y: MovementStruct;
  rotation: MovementStruct;
  size: number;
  shape: Shape;
  image?: string;
  color: string;
};

export default class Particle {
  private static imageCache: { [key: string]: HTMLImageElement } = {};
  state: ParticleState;

  constructor(params: ParticleState) {
    this.state = params;
  }

  public move() {
    this.state.x.pos += this.state.x.vel;
    this.state.y.pos += this.state.y.vel;
    this.state.rotation.pos += this.state.rotation.vel;
    this.state.x.vel += this.state.x.acc;
    this.state.y.vel += this.state.y.acc;
    this.state.rotation.vel += this.state.rotation.acc;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.state.x.pos, this.state.y.pos);
    ctx.rotate(convertToRadians(this.state.rotation.pos));
    if (this.state.image) {
      const size = Math.ceil(this.state.size);
      if (!Particle.imageCache[this.state.image]) {
        const image = new Image();
        image.src = this.state.image;
        Particle.imageCache[this.state.image] = image;
      }

      const image = Particle.imageCache[this.state.image];
      ctx.drawImage(image, 0, 0, size, size);

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
    vx: number,
    vy: number,
    omega: number,
    frameUpdate: number
  ) {
    this.state.x.acc = (vx - this.state.x.vel) / frameUpdate;
    this.state.y.acc = (vy - this.state.y.vel) / frameUpdate;
    this.state.rotation.acc = (omega - this.state.rotation.vel) / frameUpdate;
  }

  public checkOOB(width: number, height: number) {
    if (this.state.x.pos < 0 && this.state.x.vel < 0) {
      this.state.x.pos = width;
    } else if (this.state.x.pos > width && this.state.x.vel > 0) {
      this.state.x.pos = 0;
    }
    if (this.state.y.pos > height && this.state.y.vel > 0) {
      this.state.y.pos = 0;
    }
    if (this.state.y.pos < 0 && this.state.y.vel < 0) {
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
    const yOffset = getRandom(0, height);
    const y = dy > 0 ? 0 - yOffset : height + yOffset;
    const x = getRandom(0, width);
    const dr = getRandom(config.rotationRange.min, config.rotationRange.max);
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
    const image = randomElement(config.images);
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
