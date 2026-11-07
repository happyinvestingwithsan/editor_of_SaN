import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { CinematicTitle } from "./CinematicTitle";

interface ElephantRevealProps {
  startFrame?: number;
}

export const ElephantReveal: React.FC<ElephantRevealProps> = ({
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - startFrame);

  // Spotlight & silhouette reveal timed with "with an elephant in the room" (frame 40 - 80)
  const revealProgress = spring({
    frame: Math.max(0, relFrame - 10),
    fps: 30,
    config: { damping: 26, stiffness: 80 },
  });

  // Smooth camera zoom
  const cameraScale = interpolate(relFrame, [0, 100], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0A0F1D",
        overflow: "hidden",
      }}
    >
      {/* Background Elephant Artwork with Cinematic Dark Integration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          opacity: revealProgress,
        }}
      >
        <Img
          src={staticFile("assets/equitas/generated_images/elephant_in_the_room.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) contrast(1.1)",
          }}
        />

        {/* Deep Cinematic Radial Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(10, 15, 29, 0.05) 30%, rgba(10, 15, 29, 0.75) 75%, #0A0F1D 100%)",
          }}
        />
      </div>

      {/* Kinetic Typography Overlay - reveals exactly on "elephant in the room" (frame 45) */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <CinematicTitle
          category="FORENSIC INVESTIGATION"
          line1="THE ELEPHANT"
          line2="IN THE ROOM."
          startFrame={40}
          variant="dark"
        />
      </div>
    </div>
  );
};
