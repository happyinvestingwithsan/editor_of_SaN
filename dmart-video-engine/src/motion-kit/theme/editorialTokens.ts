/**
 * SaN Motion Kit - Editorial Documentary Design Tokens
 * 
 * Modeled on the signature visual forensics of Think School, Rahul Jain, and Sahil Bhadviya.
 * Replaces dark neon web mockups with a physical, tactile analytical desk environment.
 */

export const EDITORIAL_TOKENS = {
  colors: {
    // Canvas & Desk Surfaces
    paperCanvas: "#F8F7F3",       // Primary warm ivory editorial canvas
    paperWarm: "#F3EFE6",         // Warm bone archival drafting paper
    paperCard: "#FFFFFF",         // Crisp bond paper card surface
    paperNewsprint: "#FBF9F4",    // Authentic newsprint clipping surface
    paperMuted: "#EDE8DD",        // Muted archival folder / tab tone

    // Editorial Micro-Grid & Rulers
    gridLine: "rgba(15, 23, 42, 0.042)",       // Faint 36px checked lines
    gridMajor: "rgba(15, 23, 42, 0.085)",      // Major 180px coordinate lines
    crosshair: "rgba(15, 23, 42, 0.18)",       // Technical "+" docket registration ticks

    // Restrained Typography & Ink (Zero Neon)
    inkCharcoal: "#0F172A",       // Deep obsidian charcoal for headers
    inkSlate: "#1E293B",          // Institutional slate for body copy
    inkMuted: "#64748B",          // Archival caption / docket lead gray
    inkSubtle: "#94A3B8",         // Muted secondary data / timestamps

    // Borders & Rules
    borderSubtle: "rgba(15, 23, 42, 0.08)",    // Delicate paper border
    borderMedium: "rgba(15, 23, 42, 0.14)",    // Card boundary rule
    borderDossier: "#CBD5E1",                  // Institutional dossier frame
    dividerRule: "rgba(15, 23, 42, 0.10)",     // Horizontal hairline divider

    // Institutional Editorial Accents
    // Crimson / Crisis (Rubber stamp ink, drawdowns, red flags)
    crimson: "#B91C1C",
    crimsonInk: "#991B1B",
    crimsonTint: "rgba(185, 28, 28, 0.07)",
    crimsonBorder: "rgba(185, 28, 28, 0.22)",

    // Emerald / Framework (Value creation, audited profit, green lights)
    emerald: "#15803D",
    emeraldInk: "#166534",
    emeraldTint: "rgba(21, 128, 61, 0.07)",
    emeraldBorder: "rgba(21, 128, 61, 0.22)",

    // Antique Brass / Attention (Golden ratios, warnings, spotlight)
    brass: "#B45309",
    brassInk: "#92400E",
    brassTint: "rgba(180, 83, 9, 0.07)",
    brassBorder: "rgba(180, 83, 9, 0.22)",

    // Authentic Highlighters (Stabilo Boss semi-transparent wash)
    highlighterYellow: "rgba(254, 240, 138, 0.78)",
    highlighterGreen: "rgba(187, 247, 208, 0.78)",
    highlighterOrange: "rgba(254, 215, 170, 0.78)",
    highlighterPink: "rgba(251, 207, 232, 0.78)",
  },

  fonts: {
    editorialSerif: "'Playfair Display', 'Newsreader', 'Georgia', serif",
    editorialSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    monoData: "'JetBrains Mono', 'SF Mono', 'Roboto Mono', Menlo, monospace",
  },

  typography1080p: {
    heroMetric: 88,          // Prominent financial number (e.g. -34%, ₹30,213 Cr)
    heroHeadline: 54,        // Main narrative headline / newspaper title
    sectionHeader: 36,       // Section card title
    cardSubheading: 26,      // Subheaders and indicators
    bodyText: 20,            // Readable body / snippet text
    docketLabel: 14,         // Uppercase metadata / timestamp / docket badge
  },

  // Physical Cast Shadows (Simulates desk lighting and paper elevation)
  shadows: {
    paperFlat: "0 1px 3px rgba(15, 23, 42, 0.04), 0 3px 6px rgba(15, 23, 42, 0.03)",
    paperElevated: "0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 12px 28px -4px rgba(15, 23, 42, 0.09), 0 1px 2px rgba(15, 23, 42, 0.04)",
    paperFloating: "0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 24px 48px -8px rgba(15, 23, 42, 0.12), 0 2px 4px rgba(15, 23, 42, 0.04)",
    stampPress: "0 1px 2px rgba(185, 28, 28, 0.15)",
  },

  // Organic Physical Springs (Damped, heavier mass, zero juvenile flutter)
  springs: {
    // Physical document sliding onto desk
    documentSlide: { damping: 22, stiffness: 95, mass: 1.1 },
    // Rubber ink stamp hitting paper (snappy slam with single crisp lock)
    stampSlam: { damping: 18, stiffness: 210, mass: 0.8 },
    // Heavy dossier / binder landing
    heavyDossier: { damping: 26, stiffness: 85, mass: 1.4 },
    // Smooth camera drift / push-in
    cinematicDrift: { damping: 30, stiffness: 45, mass: 2.0 },
    // Clean metric count-up easing
    metricPop: { damping: 16, stiffness: 140, mass: 0.9 },
  },

  // 16:9 Long-Form Stage Dimensions & Safe Bounds (Guaranteed Zero Clipping)
  stageBounds: {
    totalCanvasWidth: 1920,
    totalCanvasHeight: 1080,
    
    // Graphics Stage Box inside LongformSplitLayout
    stageWidth: 1140,
    stageHeight: 980,
    stageTop: 50,
    
    // Internal Safe Margin
    margin: 40,
    safeWidth: 1060,         // stageWidth - 2 * margin
    safeHeight: 860,         // stageHeight - 2 * margin (max vertical budget!)
    
    // Height Budgeting Guidelines per Scene (Sum <= 860px)
    budget: {
      headerZone: 110,       // HeadlineBadge / Docket tag
      metricZone: 140,       // Stat / Odometer row
      contentZone: 480,      // Newspaper clipping, Chart, or Comparison table
      gapSpacing: 24,        // Vertical gap between elements
    },
  },
} as const;

export type EditorialTokens = typeof EDITORIAL_TOKENS;
