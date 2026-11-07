/**
 * Equitas SFB Screener Part 2 - Light Theme Design Tokens
 * Strictly adheres to the mandatory Light Theme specification.
 */
export const ESFB2_THEME = {
  colors: {
    // Canvas & Backgrounds
    canvasPrimary: "#FFFFFF",
    canvasSecondary: "#F2FAF9",
    canvasTealTint: "#E8F5F3",
    cardBackground: "#FFFFFF",
    
    // Card borders & dividers
    cardBorder: "rgba(15, 143, 135, 0.15)",
    cardBorderMuted: "#E2E8F0",
    cardBorderStrong: "rgba(15, 143, 135, 0.35)",
    divider: "rgba(24, 37, 43, 0.08)",
    
    // Equitas Brand Colors
    primaryTeal: "#0F8F87",
    deepTeal: "#08736D",
    darkTeal: "#064E4A",
    tealSoftBg: "rgba(15, 143, 135, 0.08)",
    tealGlow: "rgba(15, 143, 135, 0.25)",
    
    // Typography Colors
    textPrimary: "#18252B",       // Charcoal / rich dark slate
    textSecondary: "#687780",     // Muted slate
    textMuted: "#8C9BA5",         // Subtle caption
    textLight: "#FFFFFF",
    
    // Financial Semantic Indicators
    positive: "#249B79",          // Emerald / Disciplined
    positiveBg: "rgba(36, 155, 121, 0.10)",
    positiveBorder: "rgba(36, 155, 121, 0.25)",
    
    negative: "#D97869",          // Coral/rose / Stress
    negativeBg: "rgba(217, 120, 105, 0.10)",
    negativeBorder: "rgba(217, 120, 105, 0.28)",
    
    alert: "#E9AD58",             // Warm amber / Caution
    alertBg: "rgba(233, 173, 88, 0.12)",
    alertBorder: "rgba(233, 173, 88, 0.30)",
  },

  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serifEditorial: "'Playfair Display', 'Newsreader', 'Georgia', serif",
    monoData: "'JetBrains Mono', 'SF Mono', monospace",
  },

  typography: {
    heroStat: 84,        // 72px - 100px
    heroHeading: 46,     // 36px - 52px
    subHeading: 28,
    cardTitle: 24,
    body: 20,            // 18px - 24px
    badge: 14,
    caption: 16,
  },

  shadows: {
    card: "0 12px 32px -4px rgba(15, 37, 43, 0.07), 0 4px 12px -2px rgba(15, 37, 43, 0.04)",
    elevated: "0 20px 48px -8px rgba(15, 37, 43, 0.12), 0 6px 16px -3px rgba(15, 37, 43, 0.06)",
    floating: "0 28px 64px -12px rgba(15, 143, 135, 0.16)",
    subtle: "0 2px 8px rgba(15, 37, 43, 0.04)",
  },

  layout: {
    cardWidth: 1180,
    cardHeight: 980,
    facecamWidth: 580,
    facecamHeight: 980,
    top: 50,
    leftPos: 60,
    rightPos: 1280,
    screenerLeftPos: 680,
    screenerRightPos: 60,
  }
};
