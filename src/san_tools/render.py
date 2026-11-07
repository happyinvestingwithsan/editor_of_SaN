"""
SaN Video Pipeline - Tiered Rendering Strategy
Executes fast, deterministic Remotion CLI renders:
- Tier 1: 1-Frame Stills (2 seconds) for rapid visual layout verification.
- Tier 2: 20-Second Validation MP4 (~90 seconds) to verify lip-sync and audio balance in VLC.
- Tier 3: Master full-length production render (Only after user consent).
"""

import os
import subprocess
from typing import Optional


def render_tier1_still(
    engine_dir: str,
    composition_id: str,
    frame: int,
    output_png: str,
) -> str:
    """Render a single frame still preview in ~2 seconds."""
    os.makedirs(os.path.dirname(os.path.abspath(output_png)), exist_ok=True)
    # Output path must be relative to engine_dir or absolute
    abs_output = os.path.abspath(output_png)
    cmd = [
        "npx.cmd", "remotion", "still",
        "src/index.ts",
        composition_id,
        f"--frame={frame}",
        abs_output,
        "--log=warn",
    ]
    print(f">> [Tier 1] Rendering still frame {frame} of '{composition_id}'...")
    res = subprocess.run(cmd, cwd=engine_dir, capture_output=True, text=True, shell=True)
    if res.returncode != 0:
        raise RuntimeError(f"Remotion still render failed:\n{res.stderr}\n{res.stdout}")
    print(f"[OK] Still saved: {abs_output}")
    return abs_output


def render_tier2_validation(
    engine_dir: str,
    composition_id: str,
    output_mp4: str,
    start_frame: int = 0,
    end_frame: int = 599,  # 20 seconds @ 30fps
) -> str:
    """Render a lightweight 20-second validation MP4 to verify lip-sync in VLC."""
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
    abs_output = os.path.abspath(output_mp4)
    cmd = [
        "npx.cmd", "remotion", "render",
        "src/index.ts",
        composition_id,
        abs_output,
        f"--frames={start_frame}-{end_frame}",
        "--codec=h264",
        "--crf=22",
        "--log=info",
    ]
    print(f">> [Tier 2] Rendering validation MP4 (frames {start_frame}-{end_frame}) of '{composition_id}'...")
    res = subprocess.run(cmd, cwd=engine_dir, capture_output=True, text=True, shell=True)
    if res.returncode != 0:
        raise RuntimeError(f"Remotion validation render failed:\n{res.stderr}\n{res.stdout}")
    print(f"[OK] Validation video ready: {abs_output}")
    return abs_output


def render_tier3_master(
    engine_dir: str,
    composition_id: str,
    output_mp4: str,
    crf: int = 18,
) -> str:
    """Render the full production master video."""
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
    abs_output = os.path.abspath(output_mp4)
    cmd = [
        "npx.cmd", "remotion", "render",
        "src/index.ts",
        composition_id,
        abs_output,
        "--codec=h264",
        f"--crf={crf}",
        "--log=info",
    ]
    print(f">> [Tier 3] Rendering MASTER video of '{composition_id}'...")
    res = subprocess.run(cmd, cwd=engine_dir, capture_output=True, text=True, shell=True)
    if res.returncode != 0:
        raise RuntimeError(f"Remotion master render failed:\n{res.stderr}\n{res.stdout}")
    print(f"[OK] Production master export ready: {abs_output}")
    return abs_output
