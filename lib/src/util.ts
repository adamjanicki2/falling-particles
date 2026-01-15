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

export const DEFAULT_CONFIG: ParticleConfig = {
  colors: ["#fff"],
  shapes: ["circle"],
  images: [],
  numParticles: 120,
  sizeRange: { min: 1, max: 6 },
  xSpeedRange: { min: -2.5, max: 2.5 },
  ySpeedRange: { min: 1.5, max: 3 },
  rotationRange: { min: 0, max: 0 },
};

export type Shape = "circle" | "square" | "triangle";

export type MovementStruct = {
  pos: number;
  vel: number;
  acc: number;
};

export type Range = {
  min: number;
  max: number;
};

export type ParticleConfig = Required<
  Omit<Props, "style" | "className" | "images">
> & {
  images?: HTMLImageElement[];
};

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

export const useElementSize = (ref: React.RefObject<HTMLElement | null>) => {
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

export const useParticles = (
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

export function clamp(value: number, range: Range) {
  return Math.min(Math.max(value, range.min), range.max);
}
