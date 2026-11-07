import React from "react";
import { spring, interpolate } from "remotion";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";

export interface OdometerCounterProps {
  frame: number;
  fps: number;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext: string;
  isGrandReveal?: boolean;
  accentColor?: string;
  delayFrames?: number;
  layout?: "canvas" | "flank_left" | "flank_right" | "minimal_stat";
}

export const OdometerCounter: React.FC<OdometerCounterProps> = ({
  frame,
  fps,
  targetValue,
  prefix = "₹",
  suffix = "",
  label,
  subtext,
  isGrandReveal = false,
  accentColor = "#F59E0B",
  delayFrames = 0,
  layout = "canvas",
}) => {
  if (frame < delayFrames) {
    return null;
  }

  const enterSpring = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const countProgress = spring({
    frame: Math.max(0, frame - delayFrames - 4),
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  // Accurate number calculation (strictly clamped to avoid 54 instead of 55)
  const rawInterpolated = interpolate(countProgress, [0, 1], [0, targetValue]);
  const currentValue =
    countProgress >= 0.95
      ? targetValue
      : Math.min(targetValue, Math.round(rawInterpolated));

  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Format currency with Indian Comma System
  const formatIndianNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  // MINIMALIST MASSIVE STAT MODE (SaN Request: 55 Members - No box, massive counting number, clean & impactful)
  if (layout === "minimal_stat") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
          opacity,
          pointerEvents: "none",
        }}
      >
        {/* Massive Glowing Number */}
        <div
          style={{
            fontSize: "210px",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-6px",
            fontFamily: "Inter, sans-serif",
            color: accentColor,
            textShadow: `0 0 70px ${accentColor}80, 0 0 140px ${accentColor}40`,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {prefix && <span style={{ fontSize: "100px" }}>{prefix}</span>}
          <span>{currentValue}</span>
        </div>

        {/* Minimalist Label */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "38px",
            fontWeight: 900,
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontFamily: "Inter, sans-serif",
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <Users size={34} color={accentColor} />
          {label}
        </div>

        {/* Minimalist Sub-pill */}
        {subtext && (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: `1.5px solid ${accentColor}45`,
              borderRadius: "30px",
              padding: "10px 28px",
              color: "#94A3B8",
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            }}
          >
            {subtext}
          </div>
        )}
      </div>
    );
  }

  // FLANKED FULL CAM MODES (SaN Request #5: Left & Right of Full Facecam)
  if (layout === "flank_left" || layout === "flank_right") {
    const isLeft = layout === "flank_left";
    const translateX = interpolate(
      enterSpring,
      [0, 1],
      [isLeft ? -80 : 80, 0]
    );

    return (
      <div
        style={{
          position: "absolute",
          top: "280px",
          ...(isLeft ? { left: "70px" } : { right: "70px" }),
          width: "540px",
          transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
          opacity,
          zIndex: 35,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: isGrandReveal
              ? "linear-gradient(135deg, rgba(25, 20, 50, 0.96), rgba(10, 15, 30, 0.98))"
              : "linear-gradient(135deg, rgba(10, 25, 20, 0.96), rgba(10, 15, 30, 0.98))",
            border: `2.5px solid ${accentColor}`,
            borderRadius: "26px",
            padding: "32px 36px",
            boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px ${accentColor}40`,
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Top Label Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                backgroundColor: `${accentColor}25`,
                color: accentColor,
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                border: `1px solid ${accentColor}60`,
              }}
            >
              {label}
            </div>
            {isGrandReveal ? (
              <div
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.2)",
                  color: "#FBBF24",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <TrendingUp size={15} />
                Family & Self
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#34D399",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={15} />
                Skin in the Game
              </div>
            )}
          </div>

          {/* Large Big Number */}
          <div
            style={{
              color: "#FFFFFF",
              fontSize: isGrandReveal ? "54px" : "48px",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.1,
              margin: "8px 0 14px 0",
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
            }}
          >
            {prefix && <span style={{ color: accentColor }}>{prefix}</span>}
            <span>{formatIndianNumber(currentValue)}</span>
            {suffix && (
              <span
                style={{
                  fontSize: "26px",
                  color: accentColor,
                  fontWeight: 800,
                }}
              >
                {suffix}
              </span>
            )}
          </div>

          {/* Subtext description */}
          <div
            style={{
              color: "#CBD5E1",
              fontSize: "16px",
              lineHeight: 1.4,
              fontWeight: 500,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "14px",
            }}
          >
            {subtext}
          </div>
        </div>
      </div>
    );
  }

  // STANDARD CANVAS MODE (Centered in Y-zone)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          background: isGrandReveal
            ? "linear-gradient(135deg, rgba(30, 27, 75, 0.97), rgba(15, 23, 42, 0.98))"
            : "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.94))",
          border: isGrandReveal
            ? "3px solid #F59E0B"
            : `2px solid ${accentColor}90`,
          borderRadius: "28px",
          padding: isGrandReveal ? "46px 48px" : "36px 40px",
          boxShadow: isGrandReveal
            ? "0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(245, 158, 11, 0.35)"
            : "0 20px 50px rgba(0, 0, 0, 0.6)",
          width: "100%",
          maxWidth: "880px",
        }}
      >
        {/* Top Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: `${accentColor}25`,
              color: accentColor,
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              border: `1px solid ${accentColor}60`,
            }}
          >
            {label}
          </div>
          {suffix === "Members" && (
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                color: "#34D399",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Users size={16} />
              Active High-Conviction Circle
            </div>
          )}
        </div>

        {/* Animated Big Number */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: isGrandReveal ? "68px" : "56px",
            fontWeight: 900,
            letterSpacing: "-2px",
            fontFamily: "Inter, sans-serif",
            lineHeight: 1.1,
            margin: "10px 0 16px 0",
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
          }}
        >
          {prefix && <span style={{ color: accentColor }}>{prefix}</span>}
          <span>{formatIndianNumber(currentValue)}</span>
          {suffix && (
            <span
              style={{
                fontSize: isGrandReveal ? "36px" : "30px",
                color: accentColor,
                fontWeight: 800,
              }}
            >
              {suffix}
            </span>
          )}
        </div>

        {/* Subtext description */}
        <div
          style={{
            color: "#94A3B8",
            fontSize: "18px",
            lineHeight: 1.5,
            fontWeight: 500,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "16px",
          }}
        >
          {subtext}
        </div>
      </div>
    </div>
  );
};
