/**
 * Happy Investing Design System Tokens
 * Strict color palette and typography rules from the Happy Investing production specification.
 */

export const HI_THEME = {
  colors: {
    // Brand Teals & Navy
    primaryLightTeal: "#BFEDE8",
    secondaryTeal: "#75CFC6",
    deepTeal: "#087E78",
    darkNavy: "#102B3A",
    darkNavyElevated: "#16384C",
    bgWhite: "#F7FAFA",
    textDark: "#172B36",
    secondaryGrey: "#647780",
    
    // Financial Semantics
    negativeRed: "#FF3B30",
    negativeRedSubtle: "rgba(255, 59, 48, 0.15)",
    positiveGreen: "#00D09C",
    positiveGreenSubtle: "rgba(0, 208, 156, 0.15)",
    gold: "#FFD700",
    goldSubtle: "rgba(255, 215, 0, 0.18)",

    // Glass & Borders
    borderTeal: "rgba(117, 207, 198, 0.4)",
    borderTealGlow: "0 0 20px rgba(117, 207, 198, 0.3)",
    glassNavy: "rgba(16, 43, 58, 0.92)",
    cardSurfaceLight: "#FFFFFF",
    cardSurfaceDark: "#143040",
  },
  
  fonts: {
    primary: "'Inter', system-ui, -apple-system, sans-serif",
    display: "'Montserrat', 'Inter', sans-serif",
    numbers: "'JetBrains Mono', 'Roboto Mono', monospace",
  },

  layout: {
    width: 1080,
    height: 1920,
    fps: 30,
    totalFrames: 5220,
    
    // 50/50 Split Standard requested by SaN:
    // Upper 50%: 0px to 960px (graphics stage)
    // Lower 50%: 960px to 1920px (presenter window)
    seamY: 960,
    presenterHeight: 960,
    
    // Internal facecam translation:
    // Shifts raw video up by 580px to eliminate the top 30-35% blank wall/cupboard
    // and place SaN's head, face, and expressive hand gestures in full prominent view.
    presenterTranslateY: -580,
    
    // Kinetic Subtitles:
    // Split Screen: straddles the seam line at top: 910px
    // Full Screen: safe chest area at top: 1520px
    subtitleTopSplit: 910,
    subtitleTopFull: 1520,
  },

  springs: {
    snappy: { damping: 14, stiffness: 180, mass: 0.6 },
    smooth: { damping: 20, stiffness: 100, mass: 1.0 },
    pop: { damping: 12, stiffness: 240, mass: 0.5 },
    heavy: { damping: 26, stiffness: 80, mass: 1.4 },
  },
} as const;
