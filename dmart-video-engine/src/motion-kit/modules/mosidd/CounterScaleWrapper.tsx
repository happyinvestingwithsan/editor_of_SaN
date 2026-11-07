import React from 'react';

interface Props {
  cameraScale: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * MoSidd Counter-Scale Trick:
 * When the camera punches into scale S, text/elements become giant and blurry.
 * Wrapping child content in (1 / S) cancels camera magnification, keeping typography
 * and cutouts crisp and at exact 1.0 design size upon arrival.
 */
export const CounterScaleWrapper: React.FC<Props> = ({ cameraScale, children, style }) => {
  const counterScale = cameraScale > 0 ? 1 / cameraScale : 1;
  return (
    <div
      style={{
        transform: `scale(${counterScale})`,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
