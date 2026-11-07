import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  ChapterBumper,
  ScreenerCard,
  DataTableRowHighlighter,
  SplitScreenLayout,
  CapitalFlowDiagram,
  KineticHeadlineCard,
} from "./components/BroadcastFinanceGraphics";

export const SahilMasterclassTemplate: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#080C14",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', 'Montserrat', sans-serif",
      }}
    >
      {/* Subtle broadcast background ambient glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 800,
          height: 800,
          background: "radial-gradient(circle, rgba(255, 153, 51, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          right: -200,
          width: 800,
          height: 800,
          background: "radial-gradient(circle, rgba(0, 229, 153, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* =======================================================================
          SCENE 1: CHAPTER BUMPER (Frames 0 - 180 | 0s - 6s)
          Horizontal warm parchment card with mask reveal & 3-frame chromatic glitch
          ======================================================================= */}
      <ChapterBumper
        startFrame={15}
        durationFrames={150}
        subtitle="SECTION 01"
        title="REASON BEHIND UNDERPERFORMANCE"
        accentColor="#FF9933"
      />

      {/* =======================================================================
          SCENE 2: KINETIC HEADLINE CARD (Frames 150 - 360 | 5s - 12s)
          Moneycontrol / Bloomberg article styling with line-by-line highlight sweep
          ======================================================================= */}
      <KineticHeadlineCard
        startFrame={150}
        durationFrames={190}
        source="BLOOMBERG FINANCIAL WIRE"
        date="OCTOBER 2026 • OFFICIAL FILING"
        badge={{ label: "EXCLUSIVE", color: "#EF4444" }}
        headlineLines={[
          "RELIANCE JIO PLATFORMS FILES ₹30,213 CR DRHP",
          "PROMOTERS AND STRATEGIC TECH GIANTS",
          "CONFIRM ZERO OFFER FOR SALE EXITS",
        ]}
        highlightLineIndexes={[1, 2]}
        x={140}
        y={200}
        width={1050}
      />

      {/* =======================================================================
          SCENE 3: SCREENER CARD (Frames 360 - 620 | 12s - 20.6s)
          Native SVG Line/Area chart + concentric radar pulse + snappy yellow callout pill
          ======================================================================= */}
      <ScreenerCard
        startFrame={360}
        durationFrames={240}
        title="Average Revenue Per User (ARPU) Expansion"
        subtitle="SCREENER.IN TELECOM PEER BENCHMARK"
        lineColor="#00E599"
        dataPoints={[
          { label: "FY21", value: 138 },
          { label: "FY22", value: 152 },
          { label: "FY23", value: 178 },
          { label: "FY24", value: 181 },
          { label: "FY25", value: 195 },
          { label: "FY26E", value: 218 },
        ]}
        metricCallout={{
          pointIndex: 4,
          badgeText: "CURRENT RUN-RATE",
          valueText: "₹195 / SUB",
        }}
        x={120}
        y={140}
        width={1020}
        height={560}
      />

      {/* =======================================================================
          SCENE 4: DATA TABLE ROW HIGHLIGHTER (Frames 600 - 840 | 20s - 28s)
          Dynamic translucent canary yellow highlight bar (scaleX: 0 -> 1)
          ======================================================================= */}
      <DataTableRowHighlighter
        startFrame={600}
        durationFrames={220}
        title="Telecom Duopoly: Operating Fundamentals"
        subtitle="AUDITED FINANCIAL RATIO SCREENER"
        headers={["Company", "ARPU (₹)", "EBITDA Margin", "ROCE (%)", "Net Debt / EBITDA"]}
        rows={[
          {
            id: "jio",
            cells: ["Reliance Jio Platforms", "₹195", "52.4%", "14.2%", "0.45x (Post-IPO)"],
          },
          {
            id: "airtel",
            cells: ["Bharti Airtel Ltd", "₹209", "54.1%", "15.8%", "1.82x"],
          },
          {
            id: "vi",
            cells: ["Vodafone Idea Ltd", "₹146", "38.9%", "Negative", "12.40x"],
          },
        ]}
        highlightTarget={{
          rowIdx: 0,
          startFrame: 640,
          durationFrames: 170,
        }}
        x={120}
        y={140}
        width={1120}
      />

      {/* =======================================================================
          SCENE 5: CAPITAL FLOW DIAGRAM (Frames 840 - 1080 | 28s - 36s)
          Central node -> Animated SVG Bezier curves + continuous floating particles
          ======================================================================= */}
      <CapitalFlowDiagram
        startFrame={840}
        durationFrames={230}
        centralNode={{
          label: "Jio Fresh Issue",
          sublabel: "100% PRIMARY CAPITAL",
          value: "₹30,213 CR",
          color: "#00E599",
        }}
        targets={[
          {
            label: "RJIL Debt Prepayment",
            sublabel: "BORROWING ELIMINATION",
            value: "₹27,500 CR",
            percentage: "91.0%",
            color: "#3B82F6",
          },
          {
            label: "5G Infrastructure & Capex",
            sublabel: "GENERAL CORPORATE",
            value: "₹2,713 CR",
            percentage: "9.0%",
            color: "#FACC15",
          },
        ]}
        x={100}
        y={140}
        width={1720}
        height={760}
      />

      {/* =======================================================================
          SCENE 6: SPLIT SCREEN BROADCAST VIEWPORT (Frames 1080 - 1200 | 36s - 40s)
          60% Left (Chart/Data) vs 40% Right (Speaker Video stream)
          ======================================================================= */}
      {frame >= 1080 && (
        <SplitScreenLayout
          startFrame={1080}
          durationFrames={120}
          splitRatio={0.62}
          dividerColor="#FF9933"
          leftPane={
            <div style={{ padding: 40, width: "100%", color: "#FFFFFF" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#FF9933", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                CAPITAL RE-ALLOCATION SUMMARY
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, marginTop: 8, letterSpacing: "-0.02em" }}>
                De-leveraging = Immediate PAT Expansion
              </div>
              <p style={{ fontSize: 18, color: "#94A3B8", lineHeight: 1.6, marginTop: 16 }}>
                Retiring ₹27,500 Cr high-interest debt directly adds over <strong style={{ color: "#00E599" }}>₹2,200 Cr</strong> annually straight down to net profit without requiring a single price hike.
              </p>
            </div>
          }
          rightPane={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)",
                border: "2px dashed rgba(255, 153, 51, 0.4)",
              }}
            >
              <div style={{ fontSize: 44 }}>🎙️</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#E2E8F0", marginTop: 12 }}>
                Speaker Viewport (40%)
              </div>
              <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>
                Synchronized Opposing-Axis Motion
              </div>
            </div>
          }
        />
      )}
    </AbsoluteFill>
  );
};
