import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ReadonlyableArray<T> = T[] | readonly T[];
type Shape = "circle" | "square" | "triangle";
type Range = {
  min: number;
  max: number;
};

type Props = {
  /**
   * Colors of the particles; must be valid CSS colors.
   * @default ["#ffffff"]
   */
  colors?: ReadonlyableArray<string>;
  /**
   * Shapes of the particles.
   * @default ["circle"]
   */
  shapes?: ReadonlyableArray<Shape>;
  /** Image srcs to use for the particles. (Takes precedence over colors and shapes) */
  images?: ReadonlyableArray<string>;
  /**
   * Number of particles to render.
   * @default 120
   */
  numParticles?: number;
  /**
   * Size of the particles in pixels. (diameter for a circle, side length for a square, etc.)
   * @example {min: 1, max: 5}
   */
  sizeRange?: Range;
  /**
   * Range of x-speed of the particles in pixels per frame.
   * @example {min: -1, max: 1}
   */
  xSpeedRange?: Range;
  /**
   * Range of y-speed of the particles in pixels per frame.
   * @example {min: -1, max: 1}
   */
  ySpeedRange?: Range;
  /**
   * Range of rotation speed of the particles in degrees per frame.
   * @example {min: 0, max: 10}
   */
  rotationRange?: Range;
  /**
   * Custom styles to apply to the container div.
   */
  style?: React.CSSProperties;
  /**
   * Custom class name to apply to the container div.
   */
  className?: string;
};

export default function FallingParticles({
  style,
  className,
  images: imgSrcs,
  ...props
}: Props) {
  const {
    colors = DEFAULT_CONFIG.colors,
    shapes = DEFAULT_CONFIG.shapes,
    numParticles = DEFAULT_CONFIG.numParticles,
    sizeRange = DEFAULT_CONFIG.sizeRange,
    xSpeedRange = DEFAULT_CONFIG.xSpeedRange,
    ySpeedRange = DEFAULT_CONFIG.ySpeedRange,
    rotationRange = DEFAULT_CONFIG.rotationRange,
  } = props;
  const images = useMemo(
    () =>
      imgSrcs?.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      }),
    [imgSrcs]
  );

  const config = useMemo<ParticleConfig>(
    () => ({
      colors,
      shapes,
      numParticles,
      sizeRange,
      xSpeedRange,
      ySpeedRange,
      rotationRange,
      images,
    }),
    [
      images,
      colors,
      shapes,
      numParticles,
      sizeRange,
      xSpeedRange,
      ySpeedRange,
      rotationRange,
    ]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, height] = useElementSize(containerRef);

  const particles = useParticles(width, height, config);
  const frameRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const shouldUpdateAcceleration =
          frameRef.current > 0 && (frameRef.current & (FRAME_UPDATE - 1)) === 0;
        for (const particle of particles) {
          if (shouldUpdateAcceleration) {
            particle.updateMovement(
              xSpeedRange,
              ySpeedRange,
              rotationRange,
              FRAME_UPDATE
            );
          }
          particle.clampBounds(width, height);
          particle.move(xSpeedRange, ySpeedRange, rotationRange);
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, width, height);

        for (const particle of particles) {
          particle.draw(ctx);
        }
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frameRef.current);
  }, [particles, width, height, xSpeedRange, ySpeedRange, rotationRange]);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        width: "100%",
        height: "50vh",
        pointerEvents: "none",
        ...style,
      }}
      className={className}
    >
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}

const TAU = 2 * Math.PI;
// must be power of 2 for bitwise operations
const FRAME_UPDATE = 256;

function uniform(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomElement<T>(arr: ReadonlyableArray<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getHTMLElementSize(element: HTMLElement | null): [number, number] {
  if (!element) return [0, 0];
  return [element.offsetWidth, element.offsetHeight];
}

const DEFAULT_CONFIG: ParticleConfig = {
  colors: ["#fff"],
  shapes: ["circle"],
  images: [],
  numParticles: 120,
  sizeRange: { min: 1, max: 6 },
  xSpeedRange: { min: -2.5, max: 2.5 },
  ySpeedRange: { min: 1.5, max: 3 },
  rotationRange: { min: 0, max: 0 },
};

type MovementStruct = {
  pos: number;
  vel: number;
  acc: number;
};

type ParticleConfig = Required<
  Omit<Props, "style" | "className" | "images">
> & {
  images?: HTMLImageElement[];
};

const useElementSize = (ref: React.RefObject<HTMLElement | null>) => {
  const [size, setSize] = useState(() => getHTMLElementSize(ref.current));

  const handleResize = useCallback(() => {
    const element = ref.current;
    if (element) {
      setSize(getHTMLElementSize(element));
    }
  }, [ref]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // ResizeObserver to detect changes in the element's size
    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(element);

    // Initial size set
    handleResize();

    return () => resizeObserver.disconnect();
  }, [handleResize, ref]);

  return size;
};

const useParticles = (
  width: number,
  height: number,
  config: ParticleConfig
) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!width || !height) return;
    setParticles((newParticles) => {
      if (newParticles.length > config.numParticles) {
        newParticles.splice(config.numParticles);
      }
      for (const particle of newParticles) {
        particle.state.color = randomElement(config.colors);
        particle.state.shape = randomElement(config.shapes);
        if (config.images) {
          particle.state.image = randomElement(config.images);
        }
        particle.state.size = clamp(particle.state.size, config.sizeRange);
        particle.updateMovement(
          config.xSpeedRange,
          config.ySpeedRange,
          config.rotationRange,
          FRAME_UPDATE
        );
      }
      while (newParticles.length < config.numParticles) {
        newParticles.push(Particle.make(width, height, config, FRAME_UPDATE));
      }
      return newParticles;
    });
  }, [width, height, config]);

  return particles;
};

function clamp(value: number, range: Range) {
  return Math.min(Math.max(value, range.min), range.max);
}

type ParticleState = {
  x: MovementStruct;
  y: MovementStruct;
  rotation: MovementStruct;
  size: number;
  shape: Shape;
  image?: HTMLImageElement;
  color: string;
};

class Particle {
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
    ctx.rotate(this.state.rotation.pos * (Math.PI / 180));
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
    const dx = uniform(xSpeedRange.min, xSpeedRange.max);
    this.state.x.acc = (dx - this.state.x.vel) / frameUpdate;
    const dy = uniform(ySpeedRange.min, ySpeedRange.max);
    this.state.y.acc = (dy - this.state.y.vel) / frameUpdate;
    const dr = uniform(rotationRange.min, rotationRange.max);
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
    const dx = uniform(config.xSpeedRange.min, config.xSpeedRange.max);
    const dy = uniform(config.ySpeedRange.min, config.ySpeedRange.max);
    const dr = uniform(config.rotationRange.min, config.rotationRange.max);

    const yOffset = uniform(0, height);
    const y = dy > 0 ? 0 - yOffset : height + yOffset;
    const x = uniform(0, width);

    const d2x =
      (uniform(config.xSpeedRange.min, config.xSpeedRange.max) - dx) /
      frameUpdate;
    const d2y =
      (uniform(config.ySpeedRange.min, config.ySpeedRange.max) - dy) /
      frameUpdate;
    const d2r =
      (uniform(config.rotationRange.min, config.rotationRange.max) - dr) /
      frameUpdate;
    const color = randomElement(config.colors);
    const shape = randomElement(config.shapes);
    const image = config.images ? randomElement(config.images) : undefined;
    const size = uniform(config.sizeRange.min, config.sizeRange.max);
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
