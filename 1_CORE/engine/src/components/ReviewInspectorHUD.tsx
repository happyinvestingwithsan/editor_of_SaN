import React from "react";
import { useCurrentFrame } from "remotion";
import { SAN_TOKENS } from "../motion-kit/theme/tokens";

export interface ReviewInspectorHUDProps {
  /** Reference ID, e.g. "#MOD-01" */
  refId: string;
  /** Name of the template / module */
  moduleName: string;
  /** Layout type: "9:16 Mobile Split" | "16:9 Longform Split" | "Full Takeover" */
  layoutType: string;
  /** Key properties being tested */
  propsSummary: string[];
  /** Start and end frame of this module on the timeline */
  startFrame: number;
  endFrame: number;
  /** Optional note or question for SaN's review */
  reviewPrompt?: string;
  /** Show mobile safe zone boundaries */
  showSafeZones?: boolean;
}

export const ReviewInspectorHUD: React.FC<ReviewInspectorHUDProps> = ({
  refId,
  moduleName,
  layoutType,
  propsSummary,
  startFrame,
  endFrame,
  reviewPrompt,
  showSafeZones = true,
}) => {
  const frame = useCurrentFrame();
  const relFrame = frame - startFrame;
  const totalModFrames = endFrame - startFrame;
  const progressPercent = Math.min(100, Math.max(0, (relFrame / totalModFrames) * 100));

  const timeSec = (frame / 30).toFixed(2);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 100,
        fontFamily: SAN_TOKENS.fonts.primary,
      }}
    >
      {/* =========================================================================
          1. TOP DIAGNOSTIC BANNER (REFERENCE ID & FRAME COUNTER)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(11, 15, 25, 0.92)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255, 215, 0, 0.4)",
          borderRadius: 14,
          padding: "10px 20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.2)",
        }}
      >
        {/* Left: Reference Tag & Name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              backgroundColor: SAN_TOKENS.colors.gold,
              color: "#0B0F19",
              fontWeight: 900,
              fontSize: 16,
              padding: "4px 12px",
              borderRadius: 6,
              letterSpacing: "0.06em",
              fontFamily: SAN_TOKENS.fonts.numbers,
            }}
          >
            {refId}
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "0.04em",
            }}
          >
            {moduleName}
          </span>
        </div>

        {/* Center: Layout Mode */}
        <div
          style={{
            backgroundColor: "rgba(0, 210, 255, 0.12)",
            border: "1px solid rgba(0, 210, 255, 0.4)",
            padding: "4px 14px",
            borderRadius: 8,
            color: SAN_TOKENS.colors.cyan,
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {layoutType}
        </div>

        {/* Right: Absolute Frame & Timecode */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: SAN_TOKENS.fonts.numbers,
            fontSize: 16,
            fontWeight: 800,
            color: "#E2E8F0",
          }}
        >
          <span>
            FRAME: <strong style={{ color: SAN_TOKENS.colors.gold }}>{frame}</strong> / {endFrame}
          </span>
          <span style={{ color: "#64748B" }}>|</span>
          <span>
            TIME: <strong style={{ color: SAN_TOKENS.colors.cyan }}>{timeSec}s</strong>
          </span>
        </div>
      </div>

      {/* Module Progress Micro-Bar */}
      <div
        style={{
          position: "absolute",
          top: 66,
          left: 20,
          right: 20,
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: SAN_TOKENS.colors.gold,
            boxShadow: "0 0 10px #FFD700",
          }}
        />
      </div>

      {/* =========================================================================
          2. BOTTOM TELEMETRY DRAWER (PROPS & CORRECTION CHEAT SHEET)
          ========================================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "rgba(11, 15, 25, 0.94)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 14,
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* Left: Live Parameter Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", maxWidth: "65%" }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase" }}>
            Props:
          </span>
          {propsSummary.map((p, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "3px 10px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "#E2E8F0",
                fontFamily: SAN_TOKENS.fonts.numbers,
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Right: How to Spot & Communicate Correction */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(255, 215, 0, 0.08)",
            border: "1px dashed rgba(255, 215, 0, 0.5)",
            padding: "6px 16px",
            borderRadius: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>🎯</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>
            To correct, tell SaN:{" "}
            <code style={{ color: SAN_TOKENS.colors.gold, fontWeight: 900 }}>
              "At {refId}, change..."
            </code>
          </span>
        </div>
      </div>

      {/* =========================================================================
          3. PLATFORM SAFE ZONE DANGER OVERLAYS (SUBTLE GUIDES)
          ========================================================================= */}
      {showSafeZones && (
        <>
          {/* Top Reels safe-zone line (Instagram sound pill & header) */}
          <div
            style={{
              position: "absolute",
              top: 130,
              left: 40,
              right: 40,
              borderTop: "1px dashed rgba(255, 82, 82, 0.35)",
              color: "rgba(255, 82, 82, 0.5)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.1em",
              paddingTop: 4,
              textAlign: "right",
            }}
          >
            TOP SAFE LIMIT (INSTA SOUND / SEARCH)
          </div>

          {/* Bottom Reels safe-zone line (Instagram caption / username area) */}
          <div
            style={{
              position: "absolute",
              bottom: 120,
              left: 40,
              right: 40,
              borderBottom: "1px dashed rgba(255, 82, 82, 0.35)",
              color: "rgba(255, 82, 82, 0.5)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.1em",
              paddingBottom: 4,
              textAlign: "right",
            }}
          >
            BOTTOM SAFE LIMIT (USERNAME / AUDIO TAG)
          </div>
        </>
      )}
    </div>
  );
};
