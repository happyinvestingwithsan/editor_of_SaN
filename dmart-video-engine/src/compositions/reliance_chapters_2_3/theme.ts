/**
 * Reliance Industries Chapters 2 & 3 - Graphics Overlay Design System
 * Light Teal Happy Investing Identity with Mobile-First typography.
 */
export const RELIANCE_CH2_3_THEME = {
  colors: {
    // Brand & Surfaces
    primaryTeal: "#0F8F87",
    deepTeal: "#08736D",
    lightTeal: "#E8F5F3",
    bgCanvas: "#F7FAF9",
    white: "#FFFFFF",
    cardBorder: "rgba(15, 143, 135, 0.16)",
    cardBorderStrong: "rgba(15, 143, 135, 0.32)",
    divider: "rgba(24, 38, 37, 0.08)",

    // Typography
    darkText: "#182625",
    secondaryText: "#647371",
    textMuted: "#899A98",
    whiteText: "#FFFFFF",

    // Financial Indicators
    positive: "#10B981",          // Emerald for growth / surge
    positiveBg: "rgba(16, 185, 129, 0.10)",
    positiveBorder: "rgba(16, 185, 129, 0.28)",

    negative: "#E15241",          // Crimson/coral for retail decline
    negativeBg: "rgba(225, 82, 65, 0.10)",
    negativeBorder: "rgba(225, 82, 65, 0.28)",

    jioBlue: "#0066CC",           // Jio theme
    jioBlueBg: "rgba(0, 102, 204, 0.10)",
    jioBlueBorder: "rgba(0, 102, 204, 0.28)",

    gold: "#D97706",              // Highlight gold
    goldBg: "rgba(217, 119, 6, 0.10)",
    goldBorder: "rgba(217, 119, 6, 0.30)",
  },

  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    monoData: "'JetBrains Mono', 'SF Mono', monospace",
  },

  typography: {
    heroNumber: 104, // 90px - 120px
    mainHeadline: 64, // 64px - 88px
    cardTitle: 38,
    supportingText: 42, // 40px - 48px
    smallLabel: 32, // minimum 32px
    badge: 24,
  },

  shadows: {
    card: "0 16px 36px -6px rgba(15, 38, 37, 0.10), 0 4px 12px -2px rgba(15, 38, 37, 0.05)",
    floating: "0 28px 64px -12px rgba(15, 143, 135, 0.20)",
    elevated: "0 24px 52px -10px rgba(15, 38, 37, 0.14)",
  },

  // Spatial Layout Zones (1920x1080)
  layout: {
    leftZone: {
      left: 60,
      top: 120,
      width: 580,
      height: 840,
    },
    centralProtectionZone: {
      left: 650,
      width: 620, // SaN protected corridor
    },
    rightZone: {
      left: 1280,
      top: 120,
      width: 580,
      height: 840,
    },
    borderRadius: 24,
  },
};
