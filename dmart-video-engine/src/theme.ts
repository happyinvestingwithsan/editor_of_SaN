// =============================================================================
// OFFICIAL HIFY LIGHT THEME DESIGN SYSTEM (CANONICAL TOKENS)
// =============================================================================

export const HIFY_LIGHT_TOKENS = {
  // Canvas and Card Surfaces
  canvasBg: "#FAFAF8", // Warm luxury off-white canvas
  surfaceCard: "#FFFFFF", // Pure white primary card
  surfaceCardSubtle: "#F9F9F8", // Subtle secondary card / table surface
  borderHairline: "#E4E4E7", // Hairline border for primary containers
  borderSubtle: "#EEEEF0", // Subtle internal grid and separator lines

  // Typography Palette
  textPrimary: "#18181B", // Dark slate / near-black high-contrast text
  textSecondary: "#52525B", // Muted charcoal for supporting explanations
  textMuted: "#71717A", // Soft zinc for labels, timestamps, metadata

  // Brand Accents (Strict Budget <= 3-4% surface area)
  brandGold: "#C8A951", // Signature warm gold accent
  brandGoldMuted: "#8E6C20", // Deep gold for high-contrast text on light cards
  brandGoldSubtle: "rgba(200, 169, 81, 0.12)", // Soft gold pill fill

  // Semantic Metric Colours
  metricPositive: "#10B981", // Emerald green for conservative capital preservation & favorable comparisons
  metricNegative: "#F43F5E", // Rose red for downside drawdowns and downside risk
  metricWarning: "#F59E0B", // Amber for caution / conditional triggers

  // Typography Declarations
  fonts: {
    ui: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    metrics: "'JetBrains Mono', monospace",
  },
} as const;

export type HifyTheme = typeof HIFY_LIGHT_TOKENS;
