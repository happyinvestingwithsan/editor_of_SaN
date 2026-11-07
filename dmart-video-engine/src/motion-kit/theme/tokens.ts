/**
 * SaN Motion Kit - Canonical Design Tokens
 * Standard design tokens for all SaN financial video productions (Reels & Long-form).
 */

export const SAN_TOKENS = {
  colors: {
    // Canvas & Surface
    bgDark: "#070B12",
    bgNavy: "#0B0F19",
    surfaceCard: "#121926",
    surfaceElevated: "#162133",
    surfaceHighlight: "rgba(255, 255, 255, 0.04)",
    
    // Borders
    borderSubtle: "#1E293B",
    borderGlass: "rgba(255, 255, 255, 0.08)",
    borderGlow: "#2A3B57",
    
    // Signature Accents
    gold: "#FFD700",
    goldMuted: "#E5C07B",
    goldSubtle: "rgba(255, 215, 0, 0.15)",
    cyan: "#00D2FF",
    cyanSubtle: "rgba(0, 210, 255, 0.15)",
    
    // Financial Metrics
    positive: "#00E676",
    positiveSubtle: "rgba(0, 230, 118, 0.15)",
    negative: "#FF5252",
    negativeSubtle: "rgba(255, 82, 82, 0.15)",
    warning: "#F59E0B",
    
    // Typography
    textPrimary: "#FFFFFF",
    textSecondary: "#CBD5E1",
    textMuted: "#64748B",
    textDark: "#0B0F19",
  },

  fonts: {
    primary: "'Inter', system-ui, -apple-system, sans-serif",
    display: "'Montserrat', 'Inter', sans-serif",
    numbers: "'JetBrains Mono', 'Roboto Mono', monospace",
  },

  typography1080p: {
    heroStat: 104, // Rendered ~21px in mobile portrait feed, ~46px fullscreen
    heroTitle: 84, // Rendered ~17px in mobile portrait feed, ~37px fullscreen
    sectionHeader: 64, // Rendered ~13px in mobile portrait feed, ~28px fullscreen
    cardLabel: 52, // Rendered ~10.5px in mobile portrait feed, ~23px fullscreen
    legibilityFloor: 44, // Absolute minimum legibility floor for mobile screens
  },

  springs: {
    // Quick pop for badges, pills, stamps
    snappy: { damping: 14, stiffness: 180, mass: 0.6 },
    // Smooth cinematic slide for cards and layouts
    smooth: { damping: 20, stiffness: 100, mass: 1.0 },
    // Overshoot pop for icons, ticks, alert stamps
    pop: { damping: 12, stiffness: 240, mass: 0.5 },
    // Heavy mechanical slam for dossiers, podiums, padlocks
    heavy: { damping: 26, stiffness: 80, mass: 1.4 },
  },

  layout: {
    reel9x16: {
      width: 1080,
      height: 1920,
      fps: 30,
      seamY: 718, // Top 37.4% HUD, Bottom 62.6% Presenter
      presenterTranslateY: -600, // Minimal professional headroom
      subtitleTop: 660, // Sits directly on seam bridge
    },
    longform16x9: {
      width: 1920,
      height: 1080,
      fps: 30,
      presenterWidth: 580, // SaN 30-32% screen real estate
      presenterHeight: 980,
      presenterBorderRadius: 24,
      presenterBorder: "1.5px solid rgba(255, 215, 0, 0.35)",
      graphicsWidth: 1240,
      circlePipSize: 320,
    },
  },
} as const;

export type SanTokens = typeof SAN_TOKENS;
