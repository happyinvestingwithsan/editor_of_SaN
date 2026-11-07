import React from 'react';
import { useCurrentFrame } from 'remotion';

interface Props {
  filterId?: string;
  baseFrequency?: number;
  scale?: number;
  speed?: number;
}

/**
 * MoSidd Line Boil Filter:
 * Uses two crossfading SVG fractal noise fields to simulate authentic hand-drawn
 * cartoon / editorial newspaper linework breathing without harsh digital buzz.
 */
export const LineBoilFilter: React.FC<Props> = ({
  filterId = 'line-boil',
  baseFrequency = 0.04,
  scale = 2.5,
  speed = 0.15,
}) => {
  const frame = useCurrentFrame();
  const weight1 = (1 + Math.sin(frame * speed)) / 2;
  const weight2 = 1.0 - weight1;

  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={2}
            seed={42}
            result="noise1"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={2}
            seed={84}
            result="noise2"
          />
          <feComposite
            in="noise1"
            in2="noise2"
            operator="arithmetic"
            k1={0}
            k2={weight1}
            k3={weight2}
            k4={0}
            result="blendedNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blendedNoise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};
