import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { Reliance_Chapters2_3_Overlay_Master } from "./Reliance_Chapters2_3_Overlay_Master";

export const Reliance_Chapters2_3_AudioTest: React.FC<{
  bgColor?: string;
  showGuide?: boolean;
}> = ({ bgColor = "#EAEAEA", showGuide = true }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      {/* Synchronized Master Audio for Live Testing */}
      <Audio src={staticFile("audio/reliance_part2.mp3")} />

      {/* Subtle Presenter Safe Corridor Guide in Central Zone */}
      {showGuide && (
        <div
          style={{
            position: "absolute",
            left: 650,
            top: 0,
            width: 620,
            height: 1080,
            borderLeft: "2px dashed rgba(15, 143, 135, 0.3)",
            borderRight: "2px dashed rgba(15, 143, 135, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#08736D",
              backgroundColor: "rgba(232, 245, 243, 0.9)",
              padding: "10px 20px",
              borderRadius: 12,
              border: "1px solid rgba(15, 143, 135, 0.3)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            👤 SaN Facecam Safe Corridor (x=650–1270)
          </div>
        </div>
      )}

      {/* Full 11-Scene Motion Graphics Overlay */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 1920, height: 1080, zIndex: 10 }}>
        <Reliance_Chapters2_3_Overlay_Master isGreenScreen={false} />
      </div>
    </AbsoluteFill>
  );
};
