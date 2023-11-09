import Particle from "./Particle";
import { getRandom, randomElement, Shape } from "./util";

function generateNewParams(
  width: number,
  height: number,
  xRange: [number, number],
  yRange: [number, number],
  rotationRange: [number, number]
): {
  x: number;
  y: number;
  velX: [number, number];
  velY: [number, number];
  rotation: [number, number];
} {
  const velX = getRandom(...xRange);
  const velY = getRandom(...yRange);
  const xOffset = getRandom(0, width);
  const yOffset = getRandom(0, height);
  const y = velY > 0 ? 0 - yOffset : height + yOffset;
  const x = xOffset;
  return {
    x,
    y,
    velX: [velX, getRandom(...rotationRange)],
    velY: [velY, getRandom(...yRange)],
    rotation: [getRandom(...rotationRange), getRandom(...rotationRange)],
  };
}

function resetParticle(
  particle: Particle,
  width: number,
  height: number,
  xRange: [number, number],
  yRange: [number, number],
  rotationRange: [number, number]
) {
  const { x, y, velX, velY, rotation } = generateNewParams(
    width,
    height,
    xRange,
    yRange,
    rotationRange
  );
  particle.x = x;
  particle.y = y;
  particle.velX = velX;
  particle.velY = velY;
  particle.rotationSpeed = rotation;
}

function updateVelos(
  particle: Particle,
  xRange: [number, number],
  yRange: [number, number],
  rotationRange: [number, number]
) {
  particle.velX[1] = getRandom(...xRange);
  particle.velY[1] = getRandom(...yRange);
  particle.rotationSpeed[1] = getRandom(...rotationRange);
}

function isMovingOOB(particle: Particle, width: number, height: number) {
  return (
    (particle.x < 0 && particle.velX[0] < 0) ||
    (particle.x > width && particle.velX[0] > 0) ||
    (particle.y > height && particle.velY[0] > 0) ||
    (particle.y < 0 && particle.velY[0] < 0)
  );
}

const FRAME_UPDATE = 222;

export default class System {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  colors: string[];
  shapes: Shape[];
  numParticles: number;
  size: [number, number];
  velXRange: [number, number];
  velYRange: [number, number];
  rotationRange: [number, number];
  particles: Particle[];
  animationFrame: number;
  currentFrame: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    colors: string[],
    shapes: Shape[],
    numParticles: number,
    size: [number, number],
    velXRange: [number, number],
    velYRange: [number, number],
    rotationRange: [number, number]
  ) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.colors = colors;
    this.shapes = shapes;
    this.numParticles = numParticles;
    this.size = size;
    this.velXRange = velXRange;
    this.velYRange = velYRange;
    this.rotationRange = rotationRange;
    this.particles = [];
    this.animationFrame = 0;
    this.currentFrame = 0;

    for (let i = 0; i < numParticles; i++) {
      const { x, y, velX, velY, rotation } = generateNewParams(
        canvasWidth,
        canvasHeight,
        velXRange,
        velYRange,
        rotationRange
      );
      this.particles.push(
        new Particle(
          x,
          y,
          velX,
          velY,
          rotation,
          getRandom(...size),
          randomElement(shapes),
          randomElement(colors)
        )
      );
    }
  }

  start() {
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.animationFrame);
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    let updateFrame = false;
    if (this.currentFrame >= FRAME_UPDATE) {
      this.currentFrame = 0;
      updateFrame = true;
    }

    for (const particle of this.particles) {
      particle.move();
      particle.draw(this.ctx);

      if (isMovingOOB(particle, this.canvasWidth, this.canvasHeight)) {
        resetParticle(
          particle,
          this.canvasWidth,
          this.canvasHeight,
          this.velXRange,
          this.velYRange,
          this.rotationRange
        );
      } else if (updateFrame) {
        updateVelos(
          particle,
          this.velXRange,
          this.velYRange,
          this.rotationRange
        );
      }
    }

    this.animationFrame = requestAnimationFrame(this.update.bind(this));
    this.currentFrame++;
  }
}
