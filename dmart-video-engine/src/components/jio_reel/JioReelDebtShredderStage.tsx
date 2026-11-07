import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const JioReelDebtShredderStage: React.FC<{ startFrame?: number; durationFrames?: number }> = ({
  startFrame = 990,
  durationFrames = 488, // 990 to 1478
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const localFrame = frame - startFrame;

  const isPhase1 = localFrame < 180;
  const isPhase2 = localFrame >= 180 && localFrame < 345;
  const isPhase3 = localFrame >= 345;

  const spring1 = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 110 } });
  const spring2 = spring({ frame: localFrame - 180, fps, config: { damping: 14, stiffness: 110 } });
  const spring3 = spring({ frame: localFrame - 345, fps, config: { damping: 14, stiffness: 110 } });

  const debtCounter = Math.round(
    interpolate(localFrame, [200, 310], [27500, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const savingsCounter = Math.round(
    interpolate(localFrame, [355, 430], [0, 8600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const exitProgress = interpolate(
    localFrame,
    [durationFrames - 15, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 720,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 40px 20px",
        opacity: (1 - exitProgress) * Math.min(1, localFrame / 10),
        transform: `translateY(${-exitProgress * 40}px)`,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {isPhase1 && (
        <div
          style={{
            transform: `scale(${spring1})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 208, 156, 0.15)",
              border: "1.5px solid rgba(0, 208, 156, 0.4)",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                color: "#00D09C",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Capital Allocation
            </span>
          </div>

          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            100% <span style={{ color: "#00D09C" }}>FRESH ISSUE</span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "2px solid #00D09C",
              borderRadius: 20,
              padding: "20px 36px",
              width: 900,
              textAlign: "center",
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                color: "#00D09C",
                marginBottom: 4,
              }}
            >
              ₹30,000 CR
            </div>
            <p style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700, margin: 0 }}>
              All money enters company balance sheet for debt elimination.
            </p>
          </div>
        </div>
      )}

      {isPhase2 && (
        <div
          style={{
            transform: `scale(${spring2})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 59, 48, 0.15)",
              border: "1.5px solid rgba(255, 59, 48, 0.4)",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                color: "#FF3B30",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Prepaying Bank Borrowings
            </span>
          </div>

          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            EXTERNAL DEBT <span style={{ color: "#00D09C" }}>SHREDDED</span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "2px solid rgba(255, 176, 32, 0.4)",
              borderRadius: 20,
              padding: "20px 36px",
              width: 900,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
            }}
          >
            <span
              style={{
                color: "#94A3B8",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Outstanding Bank Debt
            </span>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                fontVariantNumeric: "tabular-nums",
                color: debtCounter === 0 ? "#00D09C" : "#FFB020",
                marginBottom: 6,
              }}
            >
              ₹{debtCounter.toLocaleString("en-IN")} CR
            </div>
            {debtCounter === 0 && (
              <div
                style={{
                  backgroundColor: "rgba(0, 208, 156, 0.2)",
                  color: "#00D09C",
                  fontWeight: 900,
                  fontSize: 16,
                  borderRadius: 12,
                  padding: "4px 16px",
                  letterSpacing: 1.5,
                }}
              >
                ✓ ZERO EXTERNAL DEBT
              </div>
            )}
          </div>
        </div>
      )}

      {isPhase3 && (
        <div
          style={{
            transform: `scale(${spring3})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 208, 156, 0.15)",
              border: "1.5px solid rgba(0, 208, 156, 0.4)",
              borderRadius: 24,
              padding: "6px 20px",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                color: "#00D09C",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              P&L Profit Expansion
            </span>
          </div>

          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            THOUSANDS OF CRORES <span style={{ color: "#00D09C" }}>SAVED</span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(19, 25, 36, 0.95)",
              border: "2px solid #00D09C",
              borderRadius: 20,
              padding: "20px 36px",
              width: 900,
              textAlign: "center",
              boxShadow: "0 16px 40px rgba(0, 208, 156, 0.25)",
            }}
          >
            <span
              style={{
                color: "#94A3B8",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 4,
                display: "block",
              }}
            >
              Annual Interest Elimination
            </span>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                fontFamily: "'JetBrains Mono', monospace",
                fontVariantNumeric: "tabular-nums",
                color: "#00D09C",
                marginBottom: 4,
              }}
            >
              +₹{savingsCounter.toLocaleString("en-IN")} CR / YR
            </div>
            <p style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700, margin: 0 }}>
              Directly expands bottom-line net profit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
