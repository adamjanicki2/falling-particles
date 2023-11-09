export const TAU = 2 * Math.PI;

export type Shape = "circle" | "square" | "triangle";

export function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getHTMLElementSize(
  element: HTMLElement | null
): [number, number] {
  if (!element) return [0, 0];
  return [element.offsetWidth, element.offsetHeight];
}

export function convertToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
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
  particles: 120,
  sizeRange: [1, 6],
  xSpeedRange: [-2.5, 2.5],
  ySpeedRange: [1.5, 3],
  rotationRange: [0, 0],
} as const;
