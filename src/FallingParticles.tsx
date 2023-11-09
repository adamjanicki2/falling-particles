import { useEffect, useRef } from "react";
import { Shape, DEFAULT_CONFIG as config, convertToRadians } from "./util";
import { useElementSize } from "./hooks";
import System from "./System";

type Props = {
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
   * Number of particles to render.
   * @default 100
   */
  particles?: number;
  /**
   * Size of the particles in pixels. (diameter for a circle, side length for a square, etc.)
   * @example [1, 5]
   */
  sizeRange?: [number, number];
  /**
   * Range of x-speed of the particles in pixels per frame.
   * @example [-1, 1]
   */
  xSpeedRange?: [number, number];
  /**
   * Range of y-speed of the particles in pixels per frame.
   * @example [1, 5]
   */
  ySpeedRange?: [number, number];
  /**
   * Range of rotation speed of the particles in degrees per frame.
   * @example [0, 360]
   */
  rotationRange?: [number, number];
  /**
   * Custom styles to override the default styles.
   * @example { position: "fixed", width: "100vw", height: "100vh"}
   */
  style?: React.CSSProperties;
  /**
   * Custom class name
   */
  className?: string;
};

const FallingParticles = (props: Props) => {
  const {
    colors = config.colors,
    shapes = config.shapes,
    particles = config.particles,
    sizeRange = config.sizeRange,
    xSpeedRange = config.xSpeedRange,
    ySpeedRange = config.ySpeedRange,
    rotationRange = config.rotationRange,
    className,
  } = props;
  const style = { ...config.style, ...(props.style ?? {}) };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useElementSize(canvasRef);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const particleSystem = new System(
      ctx,
      width,
      height,
      [...colors],
      [...shapes],
      particles,
      [...sizeRange],
      [...xSpeedRange],
      [...ySpeedRange],
      [...rotationRange.map(convertToRadians)] as [number, number]
    );
    particleSystem.start();
    return () => particleSystem.stop();
  }, [
    width,
    height,
    colors,
    particles,
    sizeRange,
    xSpeedRange,
    ySpeedRange,
    shapes,
    rotationRange,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={style}
      className={className}
    />
  );
};

export default FallingParticles;
