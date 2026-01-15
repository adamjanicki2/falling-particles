import { useEffect, useMemo, useRef } from "react";

import {
  DEFAULT_CONFIG,
  FRAME_UPDATE,
  ParticleConfig,
  Props,
  useElementSize,
  useParticles,
} from "./util";

const FallingParticles = ({
  style,
  className,
  images: imgSrcs,
  ...props
}: Props) => {
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
};

export default FallingParticles;
