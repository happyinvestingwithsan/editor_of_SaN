import React from 'react';
import { useCurrentFrame } from 'remotion';

interface Props {
  startFrame?: number;
  initialAmplitude?: number; // e.g. 28 degrees
  frequency?: number; // e.g. 0.52
  decayRate?: number; // e.g. 0.042
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * MoSidd Damped Pendulum Gesture:
 * Mathematical decaying swing for kinetic appendages (e.g. finger wag, pendulum, ticking sign).
 * Formula: angle = initialAmplitude * cos(t * frequency) * exp(-decayRate * t)
 */
export const PendulumGesture: React.FC<Props> = ({
  startFrame = 0,
  initialAmplitude = 28,
  frequency = 0.52,
  decayRate = 0.042,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - startFrame);
  const angle = t > 0 ? initialAmplitude * Math.cos(t * frequency) * Math.exp(-decayRate * t) : 0;

  return (
    <div
      style={{
        display: 'inline-block',
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'bottom center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
