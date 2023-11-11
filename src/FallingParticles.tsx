import { useEffect, useRef } from "react";
import {
  DEFAULT_CONFIG as defaultConfig,
  useElementSize,
  useParticles,
  Props,
  ParticleConfig,
  FRAME_UPDATE,
  getRandom,
} from "./util";

const FallingParticles = ({ style, className, ...props }: Props) => {
  const config = {
    ...(defaultConfig as any),
  } as ParticleConfig;
  for (const key in props) {
    if (key in config) {
      config[key as keyof ParticleConfig] = (props as any)[key];
    }
  }
  const mergedStyle = { ...defaultConfig.style, ...(style ?? {}) };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useElementSize(canvasRef);
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
              getRandom(config.xSpeedRange.min, config.xSpeedRange.max),
              getRandom(config.ySpeedRange.min, config.ySpeedRange.max),
              getRandom(config.rotationRange.min, config.rotationRange.max),
              FRAME_UPDATE
            );
          }
          if (particle.isMovingOOB(width, height)) {
            particle.resetPosition(width, height);
          }
          particle.move();
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

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={mergedStyle}
      className={className}
    />
  );
};

export default FallingParticles;
