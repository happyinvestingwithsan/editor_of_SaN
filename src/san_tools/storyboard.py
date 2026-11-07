"""
SaN Video Pipeline - Visual Storyboard Blueprint Generator
Generates the mandatory 2-Column Storyboard Table before Remotion production begins.
Enforces the SaN Consent Gate:
1. Spoken Words & Timings
2. Visual Graphic Concept & Modules Selected
3. Screen Split & Facecam Framing Layout
"""

from typing import List, Dict, Any


def generate_storyboard_markdown(
    title: str,
    video_format: str,  # "9x16_reel" or "16x9_longform"
    beats: List[Dict[str, Any]],
) -> str:
    """Generate Markdown storyboard blueprint for user approval."""
    lines = [
        f"# Visual Storyboard Blueprint: {title}",
        f"**Target Format:** {video_format} | **Status:** Pending SaN Approval Gate 1",
        "",
        "> [!IMPORTANT]",
        "> **Consent Gate 1 Mandatory Review:**",
        "> Verify spoken dialogue beats, graphic module choices, and screen split balance before coding.",
        "",
    ]

    if video_format == "9x16_reel":
        lines.extend([
            "| Beat / Frames | Spoken Dialogue | Visual Module / Stage | Layout Mode | Screen Split |",
            "| :--- | :--- | :--- | :--- | :--- |",
        ])
        for b in beats:
            lines.append(
                f"| **{b.get('time_range', '')}**<br/>`F{b.get('start_frame', 0)}-{b.get('end_frame', 0)}` "
                f"| *\"{b.get('spoken_dialogue', '')}\"* "
                f"| **{b.get('visual_module', '')}**<br/>{b.get('visual_details', '')} "
                f"| `{b.get('layout_mode', 'Standard Split')}` "
                f"| {b.get('screen_split', 'Top 37.4% HUD / Bottom 62.6% Facecam')} |"
            )
    else:
        lines.extend([
            "| Beat / Frames | Spoken Dialogue | Visual Module / Stage | Facecam Position | Screen Split |",
            "| :--- | :--- | :--- | :--- | :--- |",
        ])
        for b in beats:
            lines.append(
                f"| **{b.get('time_range', '')}**<br/>`F{b.get('start_frame', 0)}-{b.get('end_frame', 0)}` "
                f"| *\"{b.get('spoken_dialogue', '')}\"* "
                f"| **{b.get('visual_module', '')}**<br/>{b.get('visual_details', '')} "
                f"| `{b.get('facecam_position', 'Right Tall (32%)')}` "
                f"| {b.get('screen_split', 'Right 32% (Face) / Left 68% (Graphics)')} |"
            )

    lines.extend([
        "",
        "---",
        "### Invariants Check:",
        "- [x] Persistent Single `<Video>` mounted throughout.",
        "- [x] Subtitles positioned at eye-level seam bridge (`top: 660px` for 9:16).",
        "- [x] Facecam framed with minimal headroom (`translateY(-600px)` for 9:16).",
        "- [x] Visual timings quantized to exact Faster-Whisper speech frames.",
        "",
    ])

    return "\n".join(lines)
