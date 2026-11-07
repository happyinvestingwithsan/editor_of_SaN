import React from 'react';
import { Img } from 'remotion';

interface Props {
  src: string;
  skewAngle?: number; // default -53deg
  blur?: number; // default 7px
  opacity?: number; // default 0.55
  scaleY?: number; // default 0.3
  translateY?: number; // default 24px
  style?: React.CSSProperties;
}

/**
 * MoSidd Skewed Volumetric Ground Shadow:
 * Duplicates a cutout image, blacks it out, blurs it, and projects it onto the floor plane
 * with perspective skewing to instantly ground floating characters and objects.
 */
export const SkewedGroundShadow: React.FC<Props> = ({
  src,
  skewAngle = -53,
  blur = 7,
  opacity = 0.55,
  scaleY = 0.3,
  translateY = 24,
  style,
}) => {
  return (
    <Img
      src={src}
      style={{
        position: 'absolute',
        filter: `brightness(0) blur(${blur}px)`,
        opacity,
        transform: `skewX(${skewAngle}deg) scaleY(${scaleY}) translateY(${translateY}px)`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
};
