/**
 * Reliance Industries Phase 1 (Intro + Chapter 1) - Light Teal Design Tokens
 * Strictly adheres to Happy Investing identity and user's Mobile-First typography directives.
 */
export const RELIANCE_THEME = {
  colors: {
    // Canvas & Backgrounds
    bgCanvas: "#F7FAF9",
    white: "#FFFFFF",
    lightTealSurface: "#E8F5F3",
    cardBackground: "#FFFFFF",

    // Card Borders & Dividers
    cardBorder: "rgba(15, 143, 135, 0.16)",
    cardBorderStrong: "rgba(15, 143, 135, 0.32)",
    cardBorderMuted: "#E2E8F0",
    divider: "rgba(24, 38, 37, 0.08)",

    // Happy Investing & Reliance Teal Accents
    primaryTeal: "#0F8F87",
    deepTeal: "#08736D",
    darkTeal: "#064E4A",
    tealSoftBg: "rgba(15, 143, 135, 0.08)",
    tealGlow: "rgba(15, 143, 135, 0.22)",

    // Typography Colors
    darkText: "#182625",
    secondaryText: "#647371",
    textMuted: "#899A98",
    whiteText: "#FFFFFF",

    // Financial Indicators
    positive: "#10B981",          // Emerald green for rally / growth
    positiveBg: "rgba(16, 185, 129, 0.10)",
    positiveBorder: "rgba(16, 185, 129, 0.28)",

    negative: "#E15241",          // Coral red for drawdown / pressure
    negativeBg: "rgba(225, 82, 65, 0.10)",
    negativeBorder: "rgba(225, 82, 65, 0.28)",

    alert: "#F59E0B",             // Amber for caution / questions
    alertBg: "rgba(245, 158, 11, 0.10)",
    alertBorder: "rgba(245, 158, 11, 0.28)",
  },

  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serifEditorial: "'Playfair Display', 'Newsreader', 'Georgia', serif",
    monoData: "'JetBrains Mono', 'SF Mono', monospace",
  },

  // Mobile-First Typography Guidelines (strictly per prompt)
  typography: {
    importantNumber: 104, // 90px - 120px
    mainHeadline: 68,     // 64px - 88px
    supportingText: 42,   // 40px - 48px
    cardTitle: 36,
    smallLabel: 32,       // minimum 32px
    badge: 24,
  },

  shadows: {
    card: "0 16px 36px -6px rgba(15, 38, 37, 0.08), 0 4px 12px -2px rgba(15, 38, 37, 0.04)",
    elevated: "0 24px 52px -10px rgba(15, 38, 37, 0.12), 0 8px 20px -4px rgba(15, 38, 37, 0.06)",
    floating: "0 32px 72px -14px rgba(15, 143, 135, 0.18)",
    subtle: "0 2px 8px rgba(15, 38, 37, 0.04)",
  },

  layout: {
    // Standard SaN Split Geometry (matching Equitas personal thesis & screener)
    cardWidth: 1100,
    cardHeight: 980,
    facecamWidth: 680,
    facecamHeight: 980,
    containerTop: 50,
    leftFacecamLeft: 50,
    rightContentLeft: 770,
    rightFacecamLeft: 1190,
    leftContentLeft: 50,
    borderRadius: 24,
  },
};
