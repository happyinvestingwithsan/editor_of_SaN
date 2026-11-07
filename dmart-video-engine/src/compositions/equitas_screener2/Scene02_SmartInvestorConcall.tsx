import React from "react";
import { interpolate, spring } from "remotion";
import { FileText, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene02_SmartInvestorConcall: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "If you read the conference called Transcript": frame 353 - 409 (rel sceneFrame 113 - 169)
  // The document slides in cleanly as the word "conference called Transcript" is uttered.
  const docSpring = spring({
    frame: Math.max(0, sceneFrame - 115),
    fps: 30,
    config: { damping: 18, stiffness: 95 },
  });

  // "the reason was very specific": frame 424 - 472 (rel sceneFrame 184 - 232)
  // Teal highlighter sweeps across the key quote
  const highlightSpring = spring({
    frame: Math.max(0, sceneFrame - 175),
    fps: 30,
    config: { damping: 16, stiffness: 100 },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "44px 50px",
        boxSizing: "border-box",
        opacity: enterSpring,
        transform: `translateY(${interpolate(enterSpring, [0, 1], [30, 0])}px)`,
      }}
    >
      {/* Top Header Badge & Title (Zero Tracking / Slashes) */}
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            borderRadius: 999,
            backgroundColor: ESFB2_THEME.colors.tealSoftBg,
            border: `1.5px solid ${ESFB2_THEME.colors.cardBorderStrong}`,
            color: ESFB2_THEME.colors.deepTeal,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <Sparkles size={18} />
          <span>The Smart Investor Due Diligence</span>
        </div>

        <h1
          style={{
            fontSize: 50,
            fontWeight: 900,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.15,
            margin: "0 0 10px 0",
            letterSpacing: "-0.02em",
          }}
        >
          Look Beyond The Headline Numbers
        </h1>

        <p
          style={{
            fontSize: 22,
            color: ESFB2_THEME.colors.textSecondary,
            margin: 0,
            lineHeight: 1.45,
            maxWidth: 980,
          }}
        >
          Smart investors do something different: instead of reacting to panic headlines, they inspect the official Earnings Conference Call transcript.
        </p>
      </div>

      {/* Conference Call Document Card (Enlarged for Mobile) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `2px solid ${ESFB2_THEME.colors.cardBorderStrong}`,
          borderRadius: 24,
          padding: "36px 44px",
          boxShadow: ESFB2_THEME.shadows.elevated,
          margin: "14px 0",
          opacity: docSpring,
          transform: `translateY(${interpolate(docSpring, [0, 1], [25, 0])}px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Document Header Rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `2px solid ${ESFB2_THEME.colors.divider}`,
            paddingBottom: 20,
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: ESFB2_THEME.colors.tealSoftBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ESFB2_THEME.colors.primaryTeal,
              }}
            >
              <FileText size={26} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: ESFB2_THEME.colors.textPrimary,
                  letterSpacing: "0.02em",
                }}
              >
                EQUITAS SMALL FINANCE BANK LIMITED
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: ESFB2_THEME.colors.textSecondary,
                  marginTop: 2,
                }}
              >
                Q2 FY25 Official Earnings Conference Call Transcript
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "8px 18px",
              borderRadius: 10,
              backgroundColor: ESFB2_THEME.colors.canvasTealTint,
              color: ESFB2_THEME.colors.deepTeal,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Audited Corporate Filing
          </div>
        </div>

        {/* Highlighted Key Management Commentary */}
        <div
          style={{
            backgroundColor: ESFB2_THEME.colors.canvasSecondary,
            borderLeft: `6px solid ${ESFB2_THEME.colors.primaryTeal}`,
            borderRadius: "0 16px 16px 0",
            padding: "26px 32px",
            marginBottom: 22,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: ESFB2_THEME.colors.primaryTeal,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 8,
            }}
          >
            Management Disclosure on Profit Contraction
          </div>
          <div
            style={{
              fontSize: 25,
              fontWeight: 700,
              color: ESFB2_THEME.colors.textPrimary,
              lineHeight: 1.45,
            }}
          >
            &ldquo;The reason was very specific:{" "}
            <span
              style={{
                backgroundColor: `rgba(15, 143, 135, ${interpolate(highlightSpring, [0, 1], [0, 0.22])})`,
                padding: "4px 10px",
                borderRadius: 6,
                color: ESFB2_THEME.colors.darkTeal,
                fontWeight: 900,
              }}
            >
              the Indian Microfinance Crisis.
            </span>
            &rdquo;
          </div>
        </div>

        {/* Forensic Takeaway Bullet Points */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              fontWeight: 700,
              color: ESFB2_THEME.colors.textPrimary,
            }}
          >
            <CheckCircle2 size={24} color={ESFB2_THEME.colors.positive} strokeWidth={2.5} />
            <span>Not a deposit franchise run</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              fontWeight: 700,
              color: ESFB2_THEME.colors.textPrimary,
            }}
          >
            <CheckCircle2 size={24} color={ESFB2_THEME.colors.positive} strokeWidth={2.5} />
            <span>Not a secured loan collapse</span>
          </div>
        </div>
      </div>

      {/* Forensic Search Footnote (Mobile Legible 21px) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "18px 28px",
          borderRadius: 16,
          backgroundColor: ESFB2_THEME.colors.canvasTealTint,
          border: `1.5px solid ${ESFB2_THEME.colors.cardBorderStrong}`,
        }}
      >
        <Search size={26} color={ESFB2_THEME.colors.primaryTeal} />
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: ESFB2_THEME.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          Forensic Rule: Never judge a bank by headline numbers until you identify which exact segment caused the stress.
        </span>
      </div>
    </div>
  );
};
