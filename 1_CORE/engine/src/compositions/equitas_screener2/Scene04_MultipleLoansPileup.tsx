import React from "react";
import { interpolate, spring } from "remotion";
import { Layers, AlertTriangle, CreditCard } from "lucide-react";
import { ESFB2_THEME } from "./theme";

export const Scene04_MultipleLoansPileup: React.FC<{
  sceneFrame: number;
}> = ({ sceneFrame }) => {
  const enterSpring = spring({
    frame: sceneFrame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  // Kinetic Snapping:
  // "taking four to five different loans": frame 799 - 845 (rel sceneFrame 59 - 105)
  // Cards cascade dynamically as SaN speaks four to five loans
  const loans = [
    { name: "MFI Institution A", type: "Joint Liability Group", amount: "₹40,000", emi: "₹3,800/mo", delay: 20 },
    { name: "NBFC Lender B", type: "Unsecured Personal", amount: "₹35,000", emi: "₹3,300/mo", delay: 40 },
    { name: "Small Finance Bank C", type: "Micro Enterprise Loan", amount: "₹50,000", emi: "₹4,600/mo", delay: 60 },
    { name: "Fintech App D", type: "Instant Digital Credit", amount: "₹25,000", emi: "₹2,400/mo", delay: 75 },
    { name: "Local NBFC Lender E", type: "Short Term Working Capital", amount: "₹30,000", emi: "₹3,000/mo", delay: 90 },
  ];

  // "simultaneously": frame 845 - 868 (rel sceneFrame 105) -> Debt trap overload box slams in
  const totalSpring = spring({
    frame: Math.max(0, sceneFrame - 105),
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
            backgroundColor: ESFB2_THEME.colors.negativeBg,
            border: `1.5px solid ${ESFB2_THEME.colors.negativeBorder}`,
            color: ESFB2_THEME.colors.negative,
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <Layers size={18} />
          <span>Over-Leverage Systemic Risk</span>
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
          1 Borrower. 4 to 5 Loans Simultaneously.
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
          Lenders failed to cross-check total credit exposure. A single rural household was handed multiple active loans at the exact same time.
        </p>
      </div>

      {/* The 5 Loan Cards Stack (Enlarged for Mobile Legibility) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          margin: "10px 0",
        }}
      >
        {loans.map((loan, idx) => {
          const cardSpring = spring({
            frame: Math.max(0, sceneFrame - loan.delay),
            fps: 30,
            config: { damping: 18, stiffness: 110 },
          });

          return (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr",
                alignItems: "center",
                padding: "16px 26px",
                borderRadius: 16,
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${ESFB2_THEME.colors.cardBorderMuted}`,
                boxShadow: ESFB2_THEME.shadows.subtle,
                opacity: cardSpring,
                transform: `translateX(${interpolate(cardSpring, [0, 1], [-30, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <CreditCard size={22} color={ESFB2_THEME.colors.primaryTeal} />
                <span style={{ fontSize: 19, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
                  {loan.name}
                </span>
              </div>

              <span style={{ fontSize: 16, color: ESFB2_THEME.colors.textSecondary, fontWeight: 600 }}>
                {loan.type}
              </span>

              <span style={{ fontSize: 19, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary }}>
                {loan.amount}
              </span>

              <span style={{ fontSize: 18, fontWeight: 800, color: ESFB2_THEME.colors.negative, textAlign: "right" }}>
                {loan.emi}
              </span>
            </div>
          );
        })}
      </div>

      {/* Debt Trap Calculation Box (Mobile Legible) */}
      <div
        style={{
          backgroundColor: "#FFF9F8",
          border: `2px solid ${ESFB2_THEME.colors.negativeBorder}`,
          borderRadius: 20,
          padding: "22px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: totalSpring,
          transform: `scale(${interpolate(totalSpring, [0, 1], [0.96, 1])})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: ESFB2_THEME.colors.negativeBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ESFB2_THEME.colors.negative,
            }}
          >
            <AlertTriangle size={30} />
          </div>

          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: ESFB2_THEME.colors.negative, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Total Monthly EMI Burden: ₹17,100 / month
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: ESFB2_THEME.colors.textPrimary, marginTop: 4 }}>
              Household Income: ₹15,000 / month → 114% Debt-to-Income Overload!
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "10px 22px",
            borderRadius: 12,
            backgroundColor: ESFB2_THEME.colors.negative,
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Default Imminent
        </div>
      </div>
    </div>
  );
};
