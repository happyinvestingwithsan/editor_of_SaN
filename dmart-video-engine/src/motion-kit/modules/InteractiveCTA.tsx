import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface InteractiveCTAProps {
  /** Search text to animate typing in the YouTube search box */
  searchQuery?: string;
  /** Related video card title */
  videoTitle?: string;
  /** Video thumbnail runtime string (e.g. "18:24") */
  videoDuration?: string;
  /** Comment callout word (e.g. "JIO", "STOCKS", "CHECKLIST") */
  commentKeyword?: string;
  /** Channel signature brand name */
  channelName?: string;
}

export const InteractiveCTA: React.FC<InteractiveCTAProps> = ({
  searchQuery = "Happy Investing with SaN",
  videoTitle = "The Complete Audited DRHP Deep-Dive",
  videoDuration = "14:28",
  commentKeyword = "JIO",
  channelName = "Happy Investing with SaN",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Search bar typing (Frames 0 - 35)
  const charCount = Math.min(
    searchQuery.length,
    Math.floor(interpolate(frame, [5, 35], [0, searchQuery.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  );
  const typedText = searchQuery.substring(0, charCount);
  const showCursor = frame % 16 < 8;

  // Phase 2: Video card drop down (Frame 30+)
  const videoEntrance = spring({
    frame: frame - 30,
    fps,
    config: SAN_TOKENS.springs.smooth,
  });
  const videoCardY = interpolate(videoEntrance, [0, 1], [-40, 0]);
  const videoCardOpacity = interpolate(videoEntrance, [0, 1], [0, 1]);

  // Phase 3: Comment prompt entrance (Frame 55+)
  const commentEntrance = spring({
    frame: frame - 55,
    fps,
    config: SAN_TOKENS.springs.snappy,
  });
  const commentScale = interpolate(commentEntrance, [0, 1], [0.85, 1]);
  const commentOpacity = interpolate(commentEntrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "20px 32px",
        fontFamily: SAN_TOKENS.fonts.primary,
      }}
    >
      {/* 1. YouTube Search Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          backgroundColor: "#1F2937",
          border: `1.5px solid ${SAN_TOKENS.colors.borderGlow}`,
          borderRadius: 999,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          marginBottom: 20,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: SAN_TOKENS.colors.textPrimary,
            letterSpacing: "0.02em",
          }}
        >
          {typedText}
          {showCursor && <span style={{ color: SAN_TOKENS.colors.cyan }}>|</span>}
        </span>
      </div>

      {/* 2. Video Preview Teaser Card */}
      {frame >= 30 && (
        <div
          style={{
            width: "100%",
            maxWidth: 720,
            backgroundColor: SAN_TOKENS.colors.surfaceCard,
            border: `1.5px solid ${SAN_TOKENS.colors.borderSubtle}`,
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            transform: `translateY(${videoCardY}px)`,
            opacity: videoCardOpacity,
            boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
            marginBottom: 20,
          }}
        >
          {/* Thumbnail box */}
          <div
            style={{
              width: 140,
              height: 80,
              backgroundColor: "#0B0F19",
              borderRadius: 10,
              border: `1px solid ${SAN_TOKENS.colors.borderSubtle}`,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 6,
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF0000">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#FFFFFF", backgroundColor: "rgba(0,0,0,0.8)", padding: "2px 6px", borderRadius: 4, fontFamily: SAN_TOKENS.fonts.numbers }}>
              {videoDuration}
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: SAN_TOKENS.colors.textPrimary, lineHeight: 1.3, marginBottom: 4 }}>
              {videoTitle}
            </div>
            <div style={{ fontSize: 15, color: SAN_TOKENS.colors.textMuted }}>
              {channelName} • Full Episode
            </div>
          </div>
        </div>
      )}

      {/* 3. Comment Callout Box */}
      {commentKeyword && frame >= 55 && (
        <div
          style={{
            width: "100%",
            maxWidth: 720,
            backgroundColor: "rgba(255, 215, 0, 0.08)",
            border: `2px dashed ${SAN_TOKENS.colors.gold}`,
            borderRadius: 16,
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `scale(${commentScale})`,
            opacity: commentOpacity,
            boxShadow: "0 0 25px rgba(255, 215, 0, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>💬</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: SAN_TOKENS.colors.textPrimary }}>
              Comment <strong style={{ color: SAN_TOKENS.colors.gold }}>"{commentKeyword}"</strong> below
            </span>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: SAN_TOKENS.colors.bgDark,
              backgroundColor: SAN_TOKENS.colors.gold,
              padding: "6px 14px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Auto Send Link
          </span>
        </div>
      )}
    </div>
  );
};
