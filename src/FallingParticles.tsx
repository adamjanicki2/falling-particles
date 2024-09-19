import { useEffect, useMemo, useRef } from "react";
import {
  DEFAULT_CONFIG,
  useElementSize,
  useParticles,
  Props,
  ParticleConfig,
  FRAME_UPDATE,
} from "./util";

const FallingParticles = ({
  style,
  className,
  images: imgSrcs,
  ...props
}: Props) => {
  const images = useMemo(
    () =>
      imgSrcs?.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      }),
    [imgSrcs]
  );

  const config: ParticleConfig = {
    ...DEFAULT_CONFIG,
    ...props,
    images,
  };

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
              config.xSpeedRange,
              config.ySpeedRange,
              config.rotationRange,
              FRAME_UPDATE
            );
          }
          particle.clampBounds(width, height);
          particle.move(
            config.xSpeedRange,
            config.ySpeedRange,
            config.rotationRange
          );
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
  }, [
    particles,
    width,
    height,
    config.xSpeedRange.min,
    config.xSpeedRange.max,
    config.ySpeedRange.min,
    config.ySpeedRange.max,
    config.rotationRange.min,
    config.rotationRange.max,
  ]);

  console.log("RERENDER");

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
