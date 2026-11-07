import React from "react";
import { spring, interpolate } from "remotion";
import { Clock, AlertTriangle, Gift, XCircle, DollarSign, TrendingDown } from "lucide-react";

export interface RetentionChallengeProps {
  frame: number;
  fps: number;
  mode: "challenge_90m" | "quick_cash_trap" | "end_bonus";
}

export const RetentionChallenge: React.FC<RetentionChallengeProps> = ({ frame, fps, mode }) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  if (mode === "challenge_90m") {
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
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.96), rgba(15, 23, 42, 0.98))",
            border: "2px solid rgba(245, 158, 11, 0.5)",
            borderRadius: "24px",
            padding: "36px 42px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.2)",
            width: "100%",
            maxWidth: "880px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#F87171",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            <Clock size={16} />
            The 90-Minute Focus Filter
          </div>

          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "40px",
              fontWeight: 900,
              letterSpacing: "-1px",
              margin: "0 0 16px 0",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Will You Complete 1.5 Hours?
          </h2>

          <div
            style={{
              fontSize: "20px",
              color: "#E2E8F0",
              lineHeight: 1.5,
              marginBottom: "24px",
            }}
          >
            Most casual viewers will exit in under 5 minutes. But serious wealth in the stock market
            is built through <span style={{ color: "#F59E0B", fontWeight: 700 }}>deep structural understanding</span>,
            not 60-second dopamine hits.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              padding: "16px 20px",
              borderRadius: "14px",
              color: "#FBBF24",
              fontWeight: 600,
              fontSize: "17px",
            }}
          >
            <AlertTriangle size={24} />
            <span>If your goal is sustainable compounding, this session is for you.</span>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "quick_cash_trap") {
    // Dynamic sequential slams synchronized strictly to spoken words:
    // f4055 (offset 0): "because everybody needs..." (Header container enters)
    // f4082 (offset 27): "quick cash" (Card 1 drops in)
    // f4114 (offset 59): "quick money" (Card 2 drops in)
    // f4136 (offset 81): "fast growth" (Card 3 drops in)
    // f4177 (offset 122): "That's not easily possible" (Card 4 reality slam)
    const drop1 = spring({ frame: Math.max(0, frame - 27), fps, config: { damping: 12, stiffness: 180 } });
    const drop2 = spring({ frame: Math.max(0, frame - 59), fps, config: { damping: 12, stiffness: 180 } });
    const drop3 = spring({ frame: Math.max(0, frame - 81), fps, config: { damping: 12, stiffness: 180 } });
    const drop4 = spring({ frame: Math.max(0, frame - 122), fps, config: { damping: 10, stiffness: 220 } });

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
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            color: "#EF4444",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            width: "fit-content",
            alignSelf: "center",
          }}
        >
          The Retail Psychology Trap
        </div>

        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "42px",
            fontWeight: 900,
            letterSpacing: "-1px",
            margin: "0 0 10px 0",
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
          }}
        >
          Why 90% of Investors Get Wiped Out:
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%", maxWidth: "880px" }}>
          {/* Card 1: Quick Cash (Enters at frame 4082 when he says "quick cash") */}
          {frame >= 27 && (
            <div
              style={{
                transform: `scale(${interpolate(drop1, [0, 1], [0.7, 1.0])})`,
                opacity: interpolate(drop1, [0, 1], [0, 1]),
                background: "rgba(239, 68, 68, 0.12)",
                border: "2px solid #EF4444",
                borderRadius: "16px",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                boxShadow: "0 0 25px rgba(239, 68, 68, 0.3)",
              }}
            >
              <DollarSign size={32} color="#EF4444" />
              <div>
                <div style={{ color: "#EF4444", fontSize: "24px", fontWeight: 900 }}>
                  1. Chasing "Quick Cash"
                </div>
                <div style={{ color: "#E2E8F0", fontSize: "15px" }}>
                  Expecting instant daily payouts instead of studying underlying business cash flows.
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Quick Money (Enters at frame 4114 when he says "quick money") */}
          {frame >= 59 && (
            <div
              style={{
                transform: `scale(${interpolate(drop2, [0, 1], [0.7, 1.0])})`,
                opacity: interpolate(drop2, [0, 1], [0, 1]),
                background: "rgba(245, 158, 11, 0.12)",
                border: "2px solid #F59E0B",
                borderRadius: "16px",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                boxShadow: "0 0 25px rgba(245, 158, 11, 0.3)",
              }}
            >
              <TrendingDown size={32} color="#F59E0B" />
              <div>
                <div style={{ color: "#FBBF24", fontSize: "24px", fontWeight: 900 }}>
                  2. Demanding "Quick Money"
                </div>
                <div style={{ color: "#E2E8F0", fontSize: "15px" }}>
                  Gambling on zero-day options expiries and unverified Telegram stock calls.
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Fast Growth Trap (Enters at frame 4136 when he says "and fast growth") */}
          {frame >= 81 && (
            <div
              style={{
                transform: `scale(${interpolate(drop3, [0, 1], [0.7, 1.0])})`,
                opacity: interpolate(drop3, [0, 1], [0, 1]),
                background: "rgba(239, 68, 68, 0.12)",
                border: "2px solid #EF4444",
                borderRadius: "16px",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <XCircle size={32} color="#EF4444" />
              <div>
                <div style={{ color: "#EF4444", fontSize: "24px", fontWeight: 900 }}>
                  3. The "Fast Growth" Mirage
                </div>
                <div style={{ color: "#E2E8F0", fontSize: "15px" }}>
                  Trying to turn ₹10,000 into ₹1 Crore overnight without any risk control.
                </div>
              </div>
            </div>
          )}

          {/* Card 4: Truth Alert (Enters at frame 4177 when he says "That's not easily possible") */}
          {frame >= 122 && (
            <div
              style={{
                transform: `scale(${interpolate(drop4, [0, 1], [1.3, 1.0])})`,
                opacity: interpolate(drop4, [0, 1], [0, 1]),
                background: "linear-gradient(135deg, #7F1D1D, #991B1B)",
                border: "3px solid #F87171",
                borderRadius: "18px",
                padding: "18px 24px",
                textAlign: "center",
                boxShadow: "0 10px 40px rgba(239, 68, 68, 0.6)",
              }}
            >
              <div style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: 900, textTransform: "uppercase" }}>
                🛑 THAT IS NOT EASILY POSSIBLE.
              </div>
              <div style={{ color: "#FECACA", fontSize: "16px", marginTop: "4px", fontWeight: 600 }}>
                Real investing is boring, patient, and grounded in audited balance sheets.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // End Bonus (Strictly positioned on the RIGHT side so SaN's face on the left is NOT covered!)
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
          background: "linear-gradient(135deg, rgba(30, 27, 75, 0.96), rgba(15, 23, 42, 0.98))",
          border: "3px solid #F59E0B",
          borderRadius: "28px",
          padding: "42px 48px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(245, 158, 11, 0.35)",
          width: "100%",
          maxWidth: "860px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(245, 158, 11, 0.5)",
            marginBottom: "20px",
          }}
        >
          <Gift size={36} color="#0B0F19" />
        </div>

        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "42px",
            fontWeight: 900,
            margin: "0 0 12px 0",
            letterSpacing: "-1px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Special Mastermind Bonus
        </h1>

        <div
          style={{
            color: "#FBBF24",
            fontSize: "22px",
            fontWeight: 700,
            marginBottom: "18px",
          }}
        >
          Exclusive Community Access For Those Who Watch Till the End
        </div>

        <div
          style={{
            color: "#94A3B8",
            fontSize: "17px",
            lineHeight: 1.5,
          }}
        >
          Stay with us through the entire 1.5-hour mastermind session to unlock the evaluation gift. <br />
          <span style={{ color: "#34D399", fontWeight: 800, fontSize: "19px" }}>
            Let us get directly into the video!
          </span>
        </div>
      </div>
    </div>
  );
};
