import { useCallback, useEffect, useState } from "react";
import Particle from "./Particle";

export const TAU = 2 * Math.PI;
// must be power of 2 for bitwise operations
export const FRAME_UPDATE = 256;

export function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getHTMLElementSize(element: HTMLElement | null): [number, number] {
  if (!element) return [0, 0];
  return [element.offsetWidth, element.offsetHeight];
}

export function convertToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export const DEFAULT_CONFIG = {
  style: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
  },
  colors: ["#fff"],
  shapes: ["circle"],
  images: [],
  numParticles: 120,
  sizeRange: { min: 1, max: 6 },
  xSpeedRange: { min: -2.5, max: 2.5 },
  ySpeedRange: { min: 1.5, max: 3 },
  rotationRange: { min: 0, max: 0 },
} as const;

export type Shape = "circle" | "square" | "triangle";

export type MovementStruct = {
  pos: number;
  vel: number;
  acc: number;
};

type Range = {
  min: number;
  max: number;
};

export type ParticleConfig = Required<Omit<Props, "style" | "className">>;

export type Props = {
  /**
   * Colors of the particles; must be valid CSS colors.
   * @default ["#ffffff"]
   * @example ["#ffffff", "#ff0000", "#00ff00", "#0000ff"]
   */
  colors?: string[];
  /**
   * Shapes of the particles.
   * @default ["circle"]
   * @example ["circle", "square", "triangle"]
   */
  shapes?: Shape[];
  /**
   * Image srcs to use for the particles. (Takes precedence over colors and shapes.)
   * @default []
   */
  images?: string[];
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
   * @default
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
   * Custom styles to override the default styles.
   * @example {position: "fixed", width: "100vw", height: "100vh"}
   */
  style?: React.CSSProperties;
  /**
   * Custom class name
   */
  className?: string;
};

export const useElementSize = (ref: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState(getHTMLElementSize(ref.current));

  const handleResize = useCallback(() => {
    const element = ref.current;
    if (element) {
      setSize(getHTMLElementSize(element));
    }
  }, [ref, setSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return size;
};

export const useParticles = (
  width: number,
  height: number,
  config: ParticleConfig
) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const serializedConfig = JSON.stringify(config);

  useEffect(() => {
    if (width === 0 || height === 0) return;
    setParticles((prev) => {
      const newParticles = [...prev];
      if (newParticles.length > config.numParticles) {
        newParticles.splice(config.numParticles);
      }
      for (const particle of newParticles) {
        if (!config.colors.includes(particle.state.color)) {
          particle.state.color = randomElement(config.colors);
        }
        if (!config.shapes.includes(particle.state.shape)) {
          particle.state.shape = randomElement(config.shapes);
        }
        if (!config.images.includes(particle.state.image as string)) {
          particle.state.image = randomElement(config.images);
        }
        if (
          particle.state.size < config.sizeRange.min ||
          particle.state.size > config.sizeRange.max
        ) {
          particle.state.size = getRandom(
            config.sizeRange.min,
            config.sizeRange.max
          );
        }
        particle.updateMovement(
          getRandom(config.xSpeedRange.min, config.xSpeedRange.max),
          getRandom(config.ySpeedRange.min, config.ySpeedRange.max),
          getRandom(config.rotationRange.min, config.rotationRange.max),
          FRAME_UPDATE
        );
      }
      while (newParticles.length < config.numParticles) {
        newParticles.push(Particle.make(width, height, config, FRAME_UPDATE));
      }
      return newParticles;
    });
    // Have to disable this rule because we want to compare the serialized config
    // Or else it won't deep compare nested config objects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, serializedConfig]);

  return particles;
};
