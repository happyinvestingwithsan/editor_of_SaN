import React from "react";
import { interpolate, spring } from "remotion";
import { RELIANCE_THEME } from "./theme";

interface SceneIProps {
  relativeFrame: number; // 0 to 707 (absolute: 3669 to 4376)
}

export const SceneI_MarketPressure: React.FC<SceneIProps> = ({ relativeFrame }) => {
  const enterSpring = spring({
    frame: relativeFrame - 15,
    fps: 30,
    config: { damping: 18, stiffness: 85 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.94, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Progressive item reveals based on spoken cues
  const item1Spring = spring({
    frame: Math.max(0, relativeFrame - 60),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });
  const item2Spring = spring({
    frame: Math.max(0, relativeFrame - 220),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });
  const item3Spring = spring({
    frame: Math.max(0, relativeFrame - 380),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });
  const item4Spring = spring({
    frame: Math.max(0, relativeFrame - 510),
    fps: 30,
    config: { damping: 16, stiffness: 90 },
  });

  const items = [
    {
      title: "RETAIL PROFITABILITY",
      desc: "Margins & consumer spend slowdown questions",
      springVal: item1Spring,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
    },
    {
      title: "NEW ENERGY INVESTMENTS",
      desc: "Massive green hydrogen & solar capex gestation",
      springVal: item2Spring,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
        </svg>
      ),
    },
    {
      title: "OIL & GAS UNCERTAINTY",
      desc: "Geopolitical conflict & crude discount friction",
      springVal: item3Spring,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      ),
    },
    {
      title: "CAPITAL EXPENDITURE",
      desc: "Multi-billion dollar capital drag concerns",
      springVal: item4Spring,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: RELIANCE_THEME.layout.containerTop,
        left: RELIANCE_THEME.layout.leftContentLeft, // SaN on Right, Content on Left
        width: RELIANCE_THEME.layout.cardWidth,
        height: RELIANCE_THEME.layout.cardHeight,
        backgroundColor: RELIANCE_THEME.colors.cardBackground,
        borderRadius: RELIANCE_THEME.layout.borderRadius,
        border: `2px solid ${RELIANCE_THEME.colors.cardBorder}`,
        boxShadow: RELIANCE_THEME.shadows.elevated,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "50px 60px",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: 50,
        boxSizing: "border-box",
      }}
    >
      {/* Category Eyebrow */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: RELIANCE_THEME.colors.negativeBg,
          border: `1.5px solid ${RELIANCE_THEME.colors.negativeBorder}`,
          borderRadius: 8,
          padding: "6px 18px",
          width: "fit-content",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            color: RELIANCE_THEME.colors.negative,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          MARKET SENTIMENT: NEGATIVE
        </span>
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          color: RELIANCE_THEME.colors.darkText,
          lineHeight: 1.15,
          marginBottom: 32,
          letterSpacing: "-0.03em",
        }}
      >
        PRESSURE FROM MULTIPLE DIRECTIONS
      </div>

      {/* Progressive 4-Item Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {items.map((item, idx) => {
          const itemOpacity = interpolate(item.springVal, [0, 1], [0, 1]);
          const itemY = interpolate(item.springVal, [0, 1], [24, 0]);

          return (
            <div
              key={idx}
              style={{
                backgroundColor: RELIANCE_THEME.colors.lightTealSurface,
                border: `1.5px solid ${RELIANCE_THEME.colors.cardBorder}`,
                borderRadius: 16,
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    color: RELIANCE_THEME.colors.primaryTeal,
                    backgroundColor: RELIANCE_THEME.colors.white,
                    padding: 8,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: RELIANCE_THEME.colors.darkText,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </div>
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: RELIANCE_THEME.colors.secondaryText,
                  lineHeight: 1.3,
                }}
              >
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
