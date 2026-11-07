import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import {
  ThumbsUp,
  Bell,
  MessageSquare,
  Repeat,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { BRIDGE_THEME } from "./theme";

interface EngagementCTAProps {
  // Option to pass custom timings if needed
  startFrame?: number;
}

/**
 * Scene 1 & 2: Presenter-Led Engagement & Community Discussion CTA
 * - Introduces LIKE, SUBSCRIBE, and COMMENT sequentially with spring physics.
 * - Sits in non-intrusive lower-right / right quadrant (never covering presenter face).
 * - Exactly at "because I might not be always right" (frame 415-430), smoothly clears all overlays!
 * - Displays subtle "Continuous Learning Loop" pill during mutual learning discussion (frames 460 - 720).
 * - Brings back Contradicting Opinion / Comment card (frames 750 - 920), then cleanly exits.
 */
export const EngagementCTA: React.FC<EngagementCTAProps> = () => {
  const frame = useCurrentFrame();

  // Active window for Scene 1 & 2
  if (frame > 940) return null;

  // ---------------------------------------------------------------------------
  // 1. SPRINGS & TIMINGS
  // ---------------------------------------------------------------------------

  // Phase 1A: Value banner / Like button entrance (frame 180 - 415)
  // Transcription: "please smash the like button" -> frames 194 - 217
  const likeSpring = spring({
    frame: Math.max(0, frame - 185),
    fps: 30,
    config: { damping: 14, stiffness: 140, mass: 0.7 },
  });

  // Phase 1B: Subscribe card entrance (frame 214 - 415)
  // Transcription: "and subscribe to the channel" -> frames 214 - 251
  const subSpring = spring({
    frame: Math.max(0, frame - 220),
    fps: 30,
    config: { damping: 14, stiffness: 140, mass: 0.7 },
  });

  // Phase 1C: Comment question bubble entrance (frame 290 - 415)
  // Transcription: "post your questions if you have anything" -> frames 308 - 376
  const questionSpring = spring({
    frame: Math.max(0, frame - 290),
    fps: 30,
    config: { damping: 14, stiffness: 130, mass: 0.8 },
  });

  // Phase 1 Exit: EXACTLY at "because I might not be always right" (frame 415 - 440)
  // All Phase 1 CTA elements cleanly retreat!
  const phase1ExitSpring = spring({
    frame: Math.max(0, frame - 415),
    fps: 30,
    config: { damping: 16, stiffness: 120 },
  });

  // Phase 2: Mutual Learning Pill (frames 460 - 720)
  // Transcription: "whatever I learn... share it... becomes a learning for me and learning for viewers"
  const learningPillEnter = spring({
    frame: Math.max(0, frame - 470),
    fps: 30,
    config: { damping: 18, stiffness: 110 },
  });

  const learningPillExit = spring({
    frame: Math.max(0, frame - 710),
    fps: 30,
    config: { damping: 16, stiffness: 130 },
  });

  // Phase 3: Contradicting Opinion & Comment Section Callout (frames 745 - 930)
  // Transcription: "if you have any questions or comment or contradicting opinion... put out in comment section"
  const commentReturnSpring = spring({
    frame: Math.max(0, frame - 745),
    fps: 30,
    config: { damping: 14, stiffness: 130, mass: 0.8 },
  });

  const commentReturnExit = spring({
    frame: Math.max(0, frame - 915),
    fps: 30,
    config: { damping: 16, stiffness: 140 },
  });

  // ---------------------------------------------------------------------------
  // INTERPOLATED STYLES
  // ---------------------------------------------------------------------------

  // Phase 1 Exit factor (1 = visible, 0 = retracted)
  const phase1Visibility = interpolate(phase1ExitSpring, [0, 1], [1, 0]);

  // Bell wiggle at subscription
  const bellWiggle =
    frame >= 225 && frame < 275
      ? Math.sin((frame - 225) * 0.7) * 14 * Math.max(0, 1 - (frame - 225) / 50)
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: BRIDGE_THEME.fonts.heading,
        zIndex: 20,
      }}
    >
      {/* =====================================================================
          PHASE 1: LIKE + SUBSCRIBE + COMMENT STACK (FRAMES 180 - 445)
          Positioned neatly in the bottom-right quadrant: Width enlarged by 28% for mobile
          ===================================================================== */}
      {frame >= 180 && frame <= 445 && phase1Visibility > 0.01 && (
        <div
          style={{
            position: "absolute",
            right: 70,
            bottom: 70,
            width: 660,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            opacity: phase1Visibility,
            transform: `translateY(${interpolate(phase1ExitSpring, [0, 1], [0, 40])}px) scale(${interpolate(phase1ExitSpring, [0, 1], [1, 0.95])})`,
          }}
        >
          {/* Top Pill Header */}
          <div
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              background: BRIDGE_THEME.colors.bgSoft,
              borderRadius: 30,
              border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
              boxShadow: "0 4px 14px rgba(15, 143, 135, 0.08)",
              opacity: interpolate(likeSpring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(likeSpring, [0, 1], [15, 0])}px)`,
            }}
          >
            <Sparkles size={20} color={BRIDGE_THEME.colors.primaryTeal} />
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: BRIDGE_THEME.colors.deepTeal,
              }}
            >
              Supporting The Masterclass
            </span>
          </div>

          {/* Combined CTA Action Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.96)",
              backdropFilter: "blur(18px)",
              borderRadius: 24,
              padding: 26,
              border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
              boxShadow: BRIDGE_THEME.colors.shadowCard,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              transform: `scale(${interpolate(likeSpring, [0, 1], [0.92, 1])})`,
              opacity: interpolate(likeSpring, [0, 1], [0, 1]),
            }}
          >
            {/* Action 1: Like Button Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 22px",
                background: BRIDGE_THEME.colors.bgSoft,
                borderRadius: 18,
                border: "1.5px solid rgba(15, 143, 135, 0.18)",
                transform: `translateX(${interpolate(likeSpring, [0, 1], [30, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: BRIDGE_THEME.colors.primaryTeal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(15, 143, 135, 0.35)",
                    transform: `scale(${frame >= 195 && frame < 225 ? 1.15 : 1.0})`,
                    transition: "transform 0.15s ease",
                  }}
                >
                  <ThumbsUp size={28} color="#FFFFFF" strokeWidth={2.4} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: BRIDGE_THEME.colors.textPrimary,
                    }}
                  >
                    Smash The Like Button
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: BRIDGE_THEME.colors.textSecondary,
                    }}
                  >
                    If you are getting actionable value
                  </div>
                </div>
              </div>

              {/* Status pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  background: "rgba(15, 143, 135, 0.12)",
                  borderRadius: 20,
                  color: BRIDGE_THEME.colors.deepTeal,
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                <CheckCircle2 size={18} color={BRIDGE_THEME.colors.primaryTeal} />
                <span>VALUED</span>
              </div>
            </div>

            {/* Action 2: Subscribe Button Row */}
            {frame >= 210 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 22px",
                  background: "rgba(255, 255, 255, 0.92)",
                  borderRadius: 18,
                  border: `1.5px solid ${BRIDGE_THEME.colors.primaryTeal}`,
                  boxShadow: "0 6px 18px rgba(15, 143, 135, 0.14)",
                  opacity: interpolate(subSpring, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(subSpring, [0, 1], [40, 0])}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: BRIDGE_THEME.colors.deepTeal,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 14px rgba(8, 115, 109, 0.35)",
                      transform: `rotate(${bellWiggle}deg)`,
                    }}
                  >
                    <Bell size={28} color="#FFFFFF" strokeWidth={2.4} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 800,
                        color: BRIDGE_THEME.colors.textPrimary,
                      }}
                    >
                      Subscribe To Channel
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: BRIDGE_THEME.colors.textSecondary,
                      }}
                    >
                      Never miss in-depth forensic breakdowns
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px 20px",
                    background: BRIDGE_THEME.colors.primaryTeal,
                    borderRadius: 22,
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    boxShadow: "0 4px 14px rgba(15, 143, 135, 0.35)",
                  }}
                >
                  JOIN 50K+
                </div>
              </div>
            )}

            {/* Action 3: Questions Callout Bubble */}
            {frame >= 285 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 20px",
                  background: BRIDGE_THEME.colors.bgSoftTint,
                  borderRadius: 16,
                  border: "1.5px dashed rgba(15, 143, 135, 0.35)",
                  opacity: interpolate(questionSpring, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(questionSpring, [0, 1], [15, 0])}px)`,
                }}
              >
                <MessageSquare size={24} color={BRIDGE_THEME.colors.primaryTeal} />
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: BRIDGE_THEME.colors.textPrimary,
                  }}
                >
                  Have questions? Post them in the comments!
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          PHASE 2: CONTINUOUS LEARNING LOOP (FRAMES 460 - 720)
          SaN speaks on mutual learning ("whatever I learn... I share... learning for me & viewers")
          100% Facecam Breathing Focus. Just an elegant compact corner pill.
          ===================================================================== */}
      {frame >= 460 && frame <= 730 && (
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 70,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 26px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(16px)",
            borderRadius: 36,
            border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
            boxShadow: "0 8px 24px rgba(15, 143, 135, 0.14)",
            opacity:
              interpolate(learningPillEnter, [0, 1], [0, 1]) *
              interpolate(learningPillExit, [0, 1], [1, 0]),
            transform: `translateY(${interpolate(learningPillEnter, [0, 1], [-20, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: BRIDGE_THEME.colors.bgSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
            }}
          >
            <Repeat
              size={26}
              color={BRIDGE_THEME.colors.primaryTeal}
              style={{
                transform: `rotate(${(frame - 460) * 1.5}deg)`,
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: BRIDGE_THEME.colors.textPrimary,
                letterSpacing: "0.02em",
              }}
            >
              Continuous Learning Loop
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: BRIDGE_THEME.colors.deepTeal,
              }}
            >
              Market Insights ⇄ Community Growth
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          PHASE 3: CONTRADICTING OPINION / COMMENT SECTION (FRAMES 745 - 930)
          SaN: "if you have any questions or comment or contradicting opinion, please put out in comment section"
          Smooth floating card in bottom-right quadrant.
          ===================================================================== */}
      {frame >= 745 && frame <= 938 && (
        <div
          style={{
            position: "absolute",
            right: 70,
            bottom: 70,
            width: 650,
            background: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(18px)",
            borderRadius: 24,
            padding: 26,
            border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
            boxShadow: BRIDGE_THEME.colors.shadowCard,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity:
              interpolate(commentReturnSpring, [0, 1], [0, 1]) *
              interpolate(commentReturnExit, [0, 1], [1, 0]),
            transform: `translateY(${
              interpolate(commentReturnSpring, [0, 1], [30, 0]) +
              interpolate(commentReturnExit, [0, 1], [0, 30])
            }px) scale(${interpolate(commentReturnExit, [0, 1], [1, 0.95])})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: BRIDGE_THEME.colors.bgSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1.5px solid ${BRIDGE_THEME.colors.borderTeal}`,
              }}
            >
              <HelpCircle size={28} color={BRIDGE_THEME.colors.primaryTeal} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: BRIDGE_THEME.colors.deepTeal,
                }}
              >
                Open Transparent Discourse
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: BRIDGE_THEME.colors.textPrimary,
                }}
              >
                Contradicting Opinions Welcome!
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "14px 18px",
              background: BRIDGE_THEME.colors.bgSoft,
              borderRadius: 16,
              border: "1px solid rgba(15, 143, 135, 0.15)",
              fontSize: 20,
              fontWeight: 500,
              color: BRIDGE_THEME.colors.textSecondary,
              lineHeight: 1.45,
            }}
          >
            Have a different perspective or counter-thesis? Share it in the comments below — every perspective sharpens our collective analysis!
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 18,
                fontWeight: 700,
                color: BRIDGE_THEME.colors.deepTeal,
              }}
            >
              <MessageSquare size={20} />
              <span>Drop your thoughts below</span>
            </div>
            <div
              style={{
                padding: "8px 18px",
                background: BRIDGE_THEME.colors.primaryTeal,
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 800,
                borderRadius: 22,
                letterSpacing: "0.05em",
                boxShadow: "0 4px 12px rgba(15, 143, 135, 0.25)",
              }}
            >
              JOIN THE DEBATE
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
