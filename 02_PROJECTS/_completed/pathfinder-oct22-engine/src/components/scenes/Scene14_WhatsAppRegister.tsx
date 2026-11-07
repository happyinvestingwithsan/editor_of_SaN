import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene14_WhatsAppRegister: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Word Snap: "directly ping me" -> Frame 2759 (localFrame 28)
  const chatSpring = spring({
    frame: localFrame - 28,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Word Snap: "actually add you to the group" -> Frame 2869 (localFrame 138)
  const confirmSpring = spring({
    frame: localFrame - 138,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const opacity = interpolate(localFrame, [255, 274], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 780,
        top: 100,
        width: 1040,
        height: 880,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 32,
      }}
    >
      {/* Title */}
      <div
        style={{
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: 22,
            backgroundColor: "rgba(16, 185, 129, 0.22)",
            border: `2px solid ${theme.colors.emeraldNeon}`,
            color: theme.colors.emeraldNeon,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          STEP 03: WHATSAPP DIRECT
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 54,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: "-0.02em",
          }}
        >
          Message Santosh Directly
        </h1>
      </div>

      {/* WhatsApp Message Preview (Snaps on "ping me" @ Frame 2759) */}
      <div
        style={{
          transform: `scale(${chatSpring})`,
          opacity: chatSpring,
          background: "#111B21",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 28,
          padding: "36px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          boxShadow: "0 25px 50px rgba(0,0,0,0.75)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            💬
          </div>
          <div>
            <div style={{ color: "#FFF", fontSize: 26, fontWeight: 900 }}>
              Santosh (Happy Investing)
            </div>
            <div style={{ color: "#8696A0", fontSize: 18, fontWeight: 600 }}>
              Official Community WhatsApp
            </div>
          </div>
        </div>

        {/* User Outgoing Bubble */}
        <div
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#005C4B",
            borderRadius: "20px 20px 4px 20px",
            padding: "20px 28px",
            color: "#E9EDEF",
            fontSize: 24,
            fontWeight: 700,
            maxWidth: "85%",
            boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
            lineHeight: 1.35,
          }}
        >
          “Hi Santosh, I want to attend the November 1st Live Masterclass!”
        </div>
      </div>

      {/* Confirmation Badge (Snaps on "add you to the group" @ Frame 2869) */}
      <div
        style={{
          transform: `scale(${confirmSpring})`,
          opacity: confirmSpring,
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(17, 24, 39, 0.98) 100%)",
          border: `2.5px solid ${theme.colors.emeraldNeon}`,
          borderRadius: 24,
          padding: "26px 40px",
          display: "flex",
          alignItems: "center",
          gap: 22,
          width: "fit-content",
          boxShadow: theme.shadows.glowBox(theme.colors.emeraldGlow),
        }}
      >
        <span style={{ fontSize: 44 }}>✅</span>
        <div>
          <div
            style={{
              color: "#FFF",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            Added to Private Cohort Group
          </div>
          <div
            style={{
              color: theme.colors.emeraldNeon,
              fontSize: 20,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            Live stream invite & preparation dossier sent directly.
          </div>
        </div>
      </div>
    </div>
  );
};
