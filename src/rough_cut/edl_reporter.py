"""
Edit Decision List (EDL) Reporter.
Generates human-reviewable and machine-readable edit decision reports.
"""

import json
import os
from typing import Dict, Any


def format_tc(seconds: float) -> str:
    """Format seconds into MM:SS.ss timecode."""
    mins = int(seconds // 60)
    secs = seconds % 60
    return f"{mins:02d}:{secs:05.2f}"


def generate_edl_report(
    plan: Dict[str, Any],
    output_dir: str,
    project_name: str
) -> Dict[str, str]:
    """Generate both JSON and Markdown EDL reports."""
    os.makedirs(output_dir, exist_ok=True)
    json_path = os.path.join(output_dir, f"{project_name}_edl.json")
    md_path = os.path.join(output_dir, f"{project_name}_edl.md")

    # 1. Save JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(plan, f, indent=2, ensure_ascii=False)

    # 2. Generate Markdown
    raw_d = plan.get("raw_duration", 0.0)
    edit_d = plan.get("edited_duration", 0.0)
    rem_d = plan.get("removed_duration", 0.0)
    pct = plan.get("cut_percentage", 0.0)

    lines = [
        f"# Edit Decision List (EDL) — {project_name}",
        "",
        "## Summary Metrics",
        f"- **Original Raw Duration:** {format_tc(raw_d)} ({raw_d:.2f}s)",
        f"- **Edited Master Duration:** {format_tc(edit_d)} ({edit_d:.2f}s)",
        f"- **Removed Duration:** {format_tc(rem_d)} ({rem_d:.2f}s)",
        f"- **Trimming Efficiency:** {pct:.1f}% removed",
        f"- **Total Kept Clips:** {len(plan.get('kept_segments', []))}",
        f"- **Total Editorial Cuts:** {len(plan.get('cuts', []))}",
        "",
        "## 1. Kept Clips (CapCut Master Timeline)",
        "",
        "| Clip | Draft Playhead | Raw Source | Duration | Spoken Summary |",
        "| :--- | :------------- | :--------- | :------- | :------------- |"
    ]

    for c in plan.get("kept_segments", []):
        d_range = f"{format_tc(c['draft_start'])} - {format_tc(c['draft_end'])}"
        s_range = f"{format_tc(c['source_start'])} - {format_tc(c['source_end'])}"
        dur_str = f"{c['duration']:.2f}s"
        summary = c.get("text_summary", "").replace("|", "-")
        lines.append(f"| #{c['clip_index']:02d} | `{d_range}` | `{s_range}` | {dur_str} | {summary} |")

    lines.extend([
        "",
        "## 2. Removed Sections & Editorial Rationale",
        "",
        "| Cut | Raw Source | Duration | Action | Category | Reason |",
        "| :-- | :--------- | :------- | :----- | :------- | :----- |"
    ])

    for i, cut in enumerate(plan.get("cuts", [])):
        s_range = f"{format_tc(cut['source_start'])} - {format_tc(cut['source_end'])}"
        dur_str = f"{cut['duration']:.2f}s"
        action = cut.get("action", "REMOVE")
        cat = cut.get("category", "unspecified")
        reason = cut.get("reason", "").replace("|", "-")
        lines.append(f"| #{i+1:02d} | `{s_range}` | {dur_str} | `{action}` | {cat} | {reason} |")

    lines.append("")
    md_content = "\n".join(lines)

    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    return {
        "json_path": os.path.abspath(json_path),
        "md_path": os.path.abspath(md_path)
    }
