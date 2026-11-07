import React from 'react';

interface Props {
  showGrain?: boolean;
  showScanlines?: boolean;
  showVignette?: boolean;
  grainOpacity?: number;
  scanlineOpacity?: number;
  vignetteOpacity?: number;
  style?: React.CSSProperties;
}

/**
 * MoSidd 3-Layer Film Texture Sandwich:
 * Adds film grain, scanlines, and vignette over digital renders to eliminate the sterile vector look
 * and create a cinematic documentary / magazine print aesthetic.
 */
export const FilmTextureSandwich: React.FC<Props> = ({
  showGrain = true,
  showScanlines = true,
  showVignette = true,
  grainOpacity = 0.08,
  scanlineOpacity = 0.14,
  vignetteOpacity = 0.45,
  style,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999,
        ...style,
      }}
    >
      {/* 1. Subtle CRT / Editorial Scanlines */}
      {showScanlines && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1.5px, transparent 1.5px, transparent 4px)',
            opacity: scanlineOpacity,
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* 2. Radial Vignette */}
      {showVignette && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, transparent 45%, rgba(15,10,5,0.7) 100%)',
            opacity: vignetteOpacity,
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* 3. Subtle Paper / Film Grain SVG noise */}
      {showGrain && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: grainOpacity,
            mixBlendMode: 'overlay',
          }}
        >
          <filter id="film-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#film-grain)" />
        </svg>
      )}
    </div>
  );
};
