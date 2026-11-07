import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";

export const BenchmarkTest: React.FC<{ isGreenScreen?: boolean }> = ({ isGreenScreen }) => {
  const frame = useCurrentFrame();
  const enterSpring = spring({
    frame,
    fps: 30,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isGreenScreen ? "#00FF00" : "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 100,
          width: 500,
          height: 300,
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          padding: 32,
          boxShadow: isGreenScreen ? "none" : "0 20px 40px rgba(0,0,0,0.15)",
          transform: `scale(${interpolate(enterSpring, [0, 1], [0.8, 1])})`,
          opacity: interpolate(enterSpring, [0, 1], [0, 1]),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 900, color: "#0F8F87" }}>BENCHMARK TEST</div>
        <div style={{ fontSize: 24, color: "#182625", marginTop: 8 }}>Graphics-Only Alpha Overlay</div>
      </div>
    </AbsoluteFill>
  );
};
