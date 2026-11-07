import React from "react";
import { interpolate, spring, staticFile, useVideoConfig } from "remotion";
import { theme } from "../../theme";

export const Scene13_WebsiteBroll: React.FC<{ localFrame: number }> = ({
  localFrame,
}) => {
  const { fps } = useVideoConfig();

  // Snaps in as SaN says "Just sign up for Happy Investing website"
  const containerSpring = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // CINEMATIC ZOOM STATE MACHINE (SaN's Custom Request):
  // 1. localFrame 0-85: Overview (scale 1.0)
  // 2. localFrame 85-135: Zoom IN to Member Section ("You will see member section" @ Frame 2606)
  // 3. localFrame 135-155: Zoom OUT back to mid-scale (scale 1.1)
  // 4. localFrame 155-210: Zoom IN to WhatsApp button ("connect with Santosh in WhatsApp" @ Frame 2680-2714)
  let zoomScale = 1.0;
  let zoomOrigin = "center center";

  if (localFrame < 85) {
    zoomScale = 1.0;
    zoomOrigin = "center center";
  } else if (localFrame < 135) {
    // Zoom IN to Member Section
    zoomScale = interpolate(localFrame, [85, 105], [1.0, 1.48], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    zoomOrigin = "28% 45%";
  } else if (localFrame < 155) {
    // Zoom OUT
    zoomScale = interpolate(localFrame, [135, 155], [1.48, 1.12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    zoomOrigin = "50% 50%";
  } else {
    // Zoom IN to WhatsApp Arrow
    zoomScale = interpolate(localFrame, [155, 178], [1.12, 1.55], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    zoomOrigin = "76% 50%";
  }

  // Highlights
  const memberHighlight = localFrame >= 85 && localFrame < 140;
  const whatsappHighlight = localFrame >= 155;

  const opacity = interpolate(localFrame, [195, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 760,
        top: 80,
        width: 1080,
        height: 920,
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
      }}
    >
      {/* Top Website & QR Code Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(11, 15, 25, 0.94)",
          border: `2px solid ${theme.colors.goldPrimary}`,
          borderRadius: 24,
          padding: "16px 28px",
          boxShadow: theme.shadows.goldCard,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={staticFile("images/qr_happy_investing.png")}
            alt="Elite QR Code"
            style={{
              width: 80,
              height: 80,
              borderRadius: 14,
              border: "1.5px solid rgba(245, 158, 11, 0.5)",
            }}
          />
          <div>
            <div
              style={{
                color: theme.colors.goldNeon,
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              OFFICIAL COMMUNITY PORTAL
            </div>
            <div
              style={{
                color: "#FFF",
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                marginTop: 2,
              }}
            >
              www.happy-investing.in
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "10px 20px",
            borderRadius: 14,
            background: "rgba(16, 185, 129, 0.2)",
            border: `1.5px solid ${theme.colors.emeraldNeon}`,
            color: theme.colors.emeraldNeon,
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          ● STEP 1 & 2 ROUTE
        </div>
      </div>

      {/* SaN's Custom Member & WhatsApp Image Container with Dynamic Camera Zoom */}
      <div
        style={{
          transform: `scale(${containerSpring})`,
          opacity: containerSpring,
          width: 1080,
          height: 620,
          borderRadius: 28,
          overflow: "hidden",
          border: "2.5px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
          position: "relative",
          backgroundColor: "#FFF",
        }}
      >
        {/* Animated Inner Viewport */}
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${zoomScale})`,
            transformOrigin: zoomOrigin,
            transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1.0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={staticFile("images/whatsap_image.png")}
            alt="Member Section & WhatsApp Click Route"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          {/* Member Section Dynamic Glow (Active when zoomed to member section) */}
          {memberHighlight && (
            <div
              style={{
                position: "absolute",
                left: "15%",
                top: "20%",
                width: "35%",
                height: "60%",
                border: "4px solid #10B981",
                borderRadius: 20,
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* WhatsApp Button Dynamic Glow (Active when zoomed to WhatsApp) */}
          {whatsappHighlight && (
            <div
              style={{
                position: "absolute",
                right: "12%",
                top: "25%",
                width: "30%",
                height: "55%",
                border: "4px solid #25D366",
                borderRadius: 20,
                backgroundColor: "rgba(37, 211, 102, 0.2)",
                boxShadow: "0 0 35px rgba(37, 211, 102, 0.5)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Dynamic Context Overlay Banner */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 20,
            right: 20,
            padding: "12px 24px",
            borderRadius: 16,
            background: "rgba(11, 15, 25, 0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#FFF", fontSize: 20, fontWeight: 800 }}>
            {whatsappHighlight
              ? "👉 Step 2: Tap Connect with Santosh on WhatsApp"
              : "👉 Step 1: Click Member Section from anywhere on the site"}
          </span>
          <span
            style={{
              color: whatsappHighlight ? theme.colors.emeraldNeon : theme.colors.goldNeon,
              fontSize: 16,
              fontWeight: 900,
            }}
          >
            {whatsappHighlight ? "WHATSAPP DIRECT" : "MEMBER PORTAL"}
          </span>
        </div>
      </div>
    </div>
  );
};
