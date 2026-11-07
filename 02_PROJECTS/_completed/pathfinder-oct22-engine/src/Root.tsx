import React from "react";
import { Composition } from "remotion";
import { PathfinderIntroMaster } from "./PathfinderIntroMaster";
import { PathfinderOct22Outro } from "./compositions/PathfinderOct22Outro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* =========================================================================
          PATHFINDER OCT 22 OUTRO MASTER (141.94s @ 30fps = 4,258 frames)
          Syncs with CapCut Draft 'OCt22nd Path_edit' & Timeline 'Pathfinder'
          ========================================================================= */}
      <Composition
        id="PathfinderOct22Outro"
        component={PathfinderOct22Outro}
        durationInFrames={4258}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          showHUD: false,
        }}
      />

      {/* =========================================================================
          PATHFINDER OCT 22 INTRO: FULL COMPOSITED VIDEO (1920x1080 @ 30FPS)
          Total: 145.34 seconds = 4,360 frames
          ========================================================================= */}
      <Composition
        id="PathfinderOct22-Intro-FullVideo"
        component={PathfinderIntroMaster}
        durationInFrames={4360}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "full_video",
        }}
      />

      {/* =========================================================================
          PATHFINDER OCT 22 INTRO: TRANSPARENT OVERLAY (For NLE / CapCut Integration)
          ========================================================================= */}
      <Composition
        id="PathfinderOct22-Intro-Overlay"
        component={PathfinderIntroMaster}
        durationInFrames={4360}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          mode: "overlay_only",
        }}
      />
    </>
  );
};
