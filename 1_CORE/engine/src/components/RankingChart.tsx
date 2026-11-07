import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const SNAPPY_SPRING = {
  damping: 15,
  mass: 0.8,
  stiffness: 140,
};

const FLUID_SLIDE = {
  damping: 18,
  mass: 0.9,
  stiffness: 120,
};

export interface HorizontalRankingPodiumProps {
  absoluteFrame?: number;
}

/**
 * Beat 4: Natural Editorial Vertical Bar Chart Stage
 * Clean, matte, publication-grade bar chart comparison.
 * Zero neon lasers or robotic UI bars.
 * Dimensions: Right 980px, Top 100px, Width 860px, Height 880px
 */
export const HorizontalRankingPodium: React.FC<HorizontalRankingPodiumProps> = ({
  absoluteFrame,
}) => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame = absoluteFrame !== undefined ? absoluteFrame : localFrame + 376;
  const relFrame = Math.max(0, frame - 376);

  // Entrance slide from right
  const containerSpring = spring({
    frame: relFrame,
    fps,
    config: FLUID_SLIDE,
  });
  const containerX = interpolate(containerSpring, [0, 1], [40, 0]);
  const containerOpacity = interpolate(relFrame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Vertical Bar Heights (Max height = 460px)
  // 1. LIC (2022) — ₹21,008 Cr (69.5% -> 320px)
  const licHeight = interpolate(frame, [420, 460], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const licLabelOpacity = interpolate(frame, [435, 445], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Hyundai Motor India (2024) — ₹27,870 Cr (92.2% -> 424px)
  const hyundaiHeight = interpolate(frame, [502, 540], [0, 424], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const hyundaiLabelOpacity = interpolate(frame, [515, 525], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Reliance Jio Platforms (2026) — ₹30,213 Cr (100% -> 460px)
  const jioHeight = interpolate(frame, [551, 582], [0, 460], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.1)),
  });

  // Crown Badge Pop (Frames 565 - 600)
  const badgeSpring = spring({
    frame: Math.max(0, frame - 565),
    fps,
    config: SNAPPY_SPRING,
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.4, 1.0]);
  const badgeOpacity = interpolate(frame, [565, 572], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* Right Stage Container (860px x 880px at Top 100px)            */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 980,
          width: 860,
          height: 880,
          opacity: containerOpacity,
          transform: `translateX(${containerX}px)`,
          borderRadius: 12,
          overflow: "hidden",
          background: "#0D1117",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 70px rgba(0, 0, 0, 0.75)",
          padding: "44px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header */}
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#38BDF8",
              textTransform: "uppercase",
              borderLeft: "3px solid #38BDF8",
              paddingLeft: 10,
              marginBottom: 8,
            }}
          >
            HISTORICAL PRIMARY MARKET BENCHMARK
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            India's Largest Public Offerings
          </h2>
          <span style={{ fontSize: 13, color: "#94A3B8", marginTop: 4, display: "block" }}>
            Total Issue Size in INR Crores (₹ Cr) • Primary Market Records
          </span>
        </div>

        {/* Vertical Bar Chart Podium Stage */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 560,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            paddingBottom: 64, // space for bottom labels
            boxSizing: "border-box",
          }}
        >
          {/* Solid Baseline */}
          <div
            style={{
              position: "absolute",
              bottom: 64,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
            }}
          />

          {/* --------------------------------------------------------- */}
          {/* COLUMN 1: LIC (2022) — ₹21,008 Cr                         */}
          {/* --------------------------------------------------------- */}
          <div
            style={{
              width: 190,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Value on Top */}
            <div
              style={{
                opacity: licLabelOpacity,
                marginBottom: 10,
                fontSize: 22,
                fontWeight: 800,
                color: "#F59E0B",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}
            >
              ₹21,008 Cr
            </div>

            {/* Vertical Matte Column */}
            <div
              style={{
                width: 150,
                height: licHeight,
                background: "linear-gradient(180deg, #D97706 0%, #78350F 100%)",
                borderRadius: "8px 8px 0 0",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
              }}
            />

            {/* Bottom Label below baseline */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: "#E2E8F0" }}>LIC</div>
              <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>May 2022</div>
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* COLUMN 2: Hyundai Motor India (2024) — ₹27,870 Cr         */}
          {/* --------------------------------------------------------- */}
          <div
            style={{
              width: 190,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Value on Top */}
            <div
              style={{
                opacity: hyundaiLabelOpacity,
                marginBottom: 10,
                fontSize: 22,
                fontWeight: 800,
                color: "#38BDF8",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}
            >
              ₹27,870 Cr
            </div>

            {/* Vertical Matte Column */}
            <div
              style={{
                width: 150,
                height: hyundaiHeight,
                background: "linear-gradient(180deg, #0284C7 0%, #0C4A6E 100%)",
                borderRadius: "8px 8px 0 0",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
              }}
            />

            {/* Bottom Label below baseline */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: "#E2E8F0" }}>Hyundai</div>
              <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>Oct 2024</div>
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* COLUMN 3: Reliance Jio Platforms (2026) — ₹30,213 Cr       */}
          {/* --------------------------------------------------------- */}
          <div
            style={{
              width: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Clean Gold Record Tag on Top */}
            {frame >= 565 && (
              <div
                style={{
                  transform: `scale(${badgeScale})`,
                  opacity: badgeOpacity,
                  marginBottom: 6,
                  padding: "4px 12px",
                  background: "#F59E0B",
                  borderRadius: 4,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    color: "#0F172A",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ★ #1 RECORD
                </span>
              </div>
            )}

            {/* Value on Top */}
            <div
              style={{
                marginBottom: 10,
                fontSize: 26,
                fontWeight: 900,
                color: "#F59E0B",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}
            >
              ₹30,213 Cr
            </div>

            {/* Vertical Matte Column */}
            <div
              style={{
                width: 170,
                height: jioHeight,
                background: "linear-gradient(180deg, #2563EB 0%, #1E3A8A 100%)",
                borderRadius: "8px 8px 0 0",
                boxShadow: "0 15px 35px rgba(37, 99, 235, 0.4)",
                borderTop: "3px solid #F59E0B",
              }}
            />

            {/* Bottom Label below baseline */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF" }}>Jio Platforms</div>
              <div style={{ fontSize: 13, color: "#F59E0B", fontWeight: 700 }}>2026 Target</div>
            </div>
          </div>
        </div>

        {/* Clean Ledger Footnote */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#64748B",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 12,
            textAlign: "center",
          }}
        >
          OFFICIAL SEBI FILING DATA // HISTORIC ISSUE SIZE BENCHMARKS
        </div>
      </div>
    </div>
  );
};

export const RankingChart = HorizontalRankingPodium;
