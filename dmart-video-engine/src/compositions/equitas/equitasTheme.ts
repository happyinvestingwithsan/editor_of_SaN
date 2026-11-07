/**
 * Happy Investing Brand & Visual Identity Theme for Equitas CEO Resignation Investigation
 * Master Light Theme: Clean, high-contrast, editorial aesthetic optimized for mobile viewing.
 * Brand Identity: Authentic Equitas Teal (#005953) and Warm Orange (#F58220), deep slate typography (#0F172A),
 * crisp white elevated cards (#FFFFFF), and zero corner clutter.
 */

export const EQUITAS_THEME = {
  colors: {
    // Canvas & Surfaces (Clean Editorial Light Theme)
    canvasBg: "#F7F6F2",
    charcoal: "#F7F6F2", // Backward-compatible canvas alias
    darkBg: "#FFFFFF",
    cardBg: "#FFFFFF",
    cardElevated: "#FFFFFF",
    cardBorder: "rgba(15, 23, 42, 0.08)",
    cardBorderTeal: "rgba(0, 89, 83, 0.25)",
    cardBorderAmber: "rgba(217, 119, 6, 0.25)",
    glassBorder: "rgba(15, 23, 42, 0.06)",

    // Primary Brand Colors (Authentic Equitas SFB Palette)
    primaryTeal: "#005953",
    deepTeal: "#004843",
    softTeal: "#E6F4F2",
    tealMist: "#F0F9F8",
    tealGlow: "rgba(0, 89, 83, 0.15)",

    // Typography (High contrast for mobile screen readability)
    textPrimary: "#0F172A",
    textBlack: "#0F172A",
    textWhite: "#0F172A", // Remapped to dark slate for instant backward compatibility
    textSecondary: "#334155",
    textMuted: "#64748B",
    textPureWhite: "#FFFFFF", // Used strictly inside filled colored badges (e.g. solid teal pills)

    // Functional & Editorial Accents
    warningAmber: "#D97706",
    equitasOrange: "#F58220",
    softAmber: "#FEF3C7",
    warningGlow: "rgba(217, 119, 6, 0.15)",
    riskRed: "#DC2626",
    softRed: "#FEE2E2",
    riskGlow: "rgba(220, 38, 38, 0.15)",
    bezelGold: "rgba(217, 119, 6, 0.35)",
    bezelTeal: "rgba(0, 89, 83, 0.35)",
  },

  fonts: {
    display: "'Inter', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Roboto Mono', monospace",
  },

  shadows: {
    card: "0 20px 45px -10px rgba(15, 23, 42, 0.10), 0 0 1px rgba(15, 23, 42, 0.15)",
    cardElevated: "0 25px 60px -12px rgba(15, 23, 42, 0.18), 0 0 1px rgba(15, 23, 42, 0.20)",
    glowTeal: "0 10px 30px rgba(0, 89, 83, 0.18)",
    glowAmber: "0 10px 30px rgba(217, 119, 6, 0.18)",
    glowRed: "0 10px 30px rgba(220, 38, 38, 0.18)",
  },
};
