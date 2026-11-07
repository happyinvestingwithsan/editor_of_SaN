import React from "react";
import { AbsoluteFill, Video } from "remotion";
import { SAN_TOKENS } from "../theme/tokens";

export interface MobileSplitLayoutProps {
  /** Video proxy source URL or staticFile path */
  videoSrc?: string;
  /** Audio track component or elements */
  audioTrack?: React.ReactNode;
  /** Whether the graphic stage takes over the entire 1080x1920 canvas */
  isFullScreenTakeover?: boolean;
  /** Whether SaN's facecam punches into full-screen */
  isFacecamPunch?: boolean;
  /** Custom vertical translation for facecam (default: -600px for chest-up minimal headroom) */
  facecamTranslateY?: number;
  /** Top graphic stage content (rendered in 1080x718 or full screen) */
  children?: React.ReactNode;
  /** Caption block placed at the eye-level seam bridge (top: 660px) */
  captionSlot?: React.ReactNode;
  /** Optional header or brand bar placed at top: 30px */
  headerSlot?: React.ReactNode;
}

/**
 * MobileSplitLayout:
 * Canonical 9:16 layout for viral Instagram Reels & YouTube Shorts.
 * Enforces the Seam Line Invariant (Y = 718px) and Persistent Video Architecture.
 */
export const MobileSplitLayout: React.FC<MobileSplitLayoutProps> = ({
  videoSrc,
  audioTrack,
  isFullScreenTakeover = false,
  isFacecamPunch = false,
  facecamTranslateY = SAN_TOKENS.layout.reel9x16.presenterTranslateY,
  children,
  captionSlot,
  headerSlot,
}) => {
  const seamY = SAN_TOKENS.layout.reel9x16.seamY;

  // Facecam transform styles
  const facecamOpacity = isFullScreenTakeover ? 0 : 1;
  const facecamTop = isFacecamPunch ? 0 : seamY;
  const facecamHeight = isFacecamPunch ? 1920 : 1920 - seamY;
  const videoTransY = isFacecamPunch ? -40 : facecamTranslateY;
  const videoScale = isFacecamPunch ? 1.05 : 1.0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: SAN_TOKENS.colors.bgDark,
        width: SAN_TOKENS.layout.reel9x16.width,
        height: SAN_TOKENS.layout.reel9x16.height,
        overflow: "hidden",
        fontFamily: SAN_TOKENS.fonts.primary,
      }}
    >
      {/* 1. Master Audio */}
      {audioTrack}

      {/* 2. Top Motion Graphics Canvas (Y: 0 to 718px, or full screen during takeover) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: isFullScreenTakeover ? 1920 : seamY,
          zIndex: isFullScreenTakeover ? 30 : 10,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        {children}
      </div>

      {/* 3. Persistent Presenter Facecam (Bottom 62.6% @ Y: 718px - 1920px) */}
      <div
        style={{
          position: "absolute",
          top: facecamTop,
          left: 0,
          width: 1080,
          height: facecamHeight,
          overflow: "hidden",
          opacity: facecamOpacity,
          zIndex: 15,
          transition: "opacity 0.2s ease, top 0.3s ease, height 0.3s ease",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.6)",
        }}
      >
        {videoSrc && (
          <Video
            src={videoSrc}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1080,
              height: 1920,
              transform: `translateY(${videoTransY}px) scale(${videoScale})`,
              transformOrigin: "center center",
            }}
          />
        )}
      </div>

      {/* 4. Golden Seam Divider Line (Hidden during takeover/punch) */}
      {!isFullScreenTakeover && !isFacecamPunch && (
        <div
          style={{
            position: "absolute",
            top: seamY - 1,
            left: 0,
            width: 1080,
            height: 2,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.4) 30%, rgba(0,210,255,0.4) 70%, transparent 100%)",
            zIndex: 25,
            boxShadow: "0 0 10px rgba(255,215,0,0.3)",
          }}
        />
      )}

      {/* 5. Seam Bridge Kinetic Subtitles (Positioned at eye-level Y = 660px) */}
      {captionSlot && (
        <div
          style={{
            position: "absolute",
            top: SAN_TOKENS.layout.reel9x16.subtitleTop,
            left: 0,
            width: 1080,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          {captionSlot}
        </div>
      )}

      {/* 6. Optional Header / Branding Badge */}
      {headerSlot && (
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            width: 1080,
            display: "flex",
            justifyContent: "center",
            zIndex: 35,
            pointerEvents: "none",
          }}
        >
          {headerSlot}
        </div>
      )}
    </AbsoluteFill>
  );
};
