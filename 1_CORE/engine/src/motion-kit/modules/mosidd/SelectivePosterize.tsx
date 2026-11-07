import React from 'react';
import { useCurrentFrame } from 'remotion';

interface Props {
  step?: number; // e.g. 2.5 gives 12fps in a 30fps comp
  children: (posterizedFrame: number) => React.ReactNode;
}

/**
 * MoSidd Selective Posterized Time:
 * Quantizes frame time only for specific subject layers (e.g. cutouts, paper props)
 * while the background, waves, and camera retain smooth 30fps/60fps playback.
 */
export const SelectivePosterize: React.FC<Props> = ({ step = 2.5, children }) => {
  const frame = useCurrentFrame();
  const posterizedFrame = Math.floor(frame / step) * step;
  return <>{children(posterizedFrame)}</>;
};
