import os
import sys
import json
from datetime import datetime

# Enforce UTF-8 on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Add module root to sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from src.consolidator.weekend_longform import WeekendConsolidator

def load_json_config(rel_path: str):
    full_path = os.path.join(BASE_DIR, rel_path)
    with open(full_path, "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    print("=" * 70)
    print("  HAPPY INVESTING - WEEKEND LONG-FORM YOUTUBE CONSOLIDATOR")
    print("=" * 70)

    brand_cfg = load_json_config("config/brand_voice.json")
    daily_briefs_dir = os.path.join(BASE_DIR, "output", "daily_briefs")

    consolidator = WeekendConsolidator(daily_briefs_dir, brand_cfg)

    print("\n[1/2] Scanning week's daily briefs and dossiers...")
    recent_briefs = consolidator.collect_recent_briefs(max_days=7)
    print(f"  -> Found {len(recent_briefs)} daily radar files from this week")

    print("\n[2/2] Synthesizing comprehensive 10-14 minute YouTube long-form script...")
    longform_md = consolidator.synthesize_weekly_youtube_script(recent_briefs)

    week_code = datetime.now().strftime("%Y-W%W")
    output_dir = os.path.join(BASE_DIR, "output", "weekly_briefs")
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, f"{week_code}_weekend_longform.md")

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(longform_md)

    print(f"\n[SUCCESS] Weekend Long-Form script generated:")
    print(f"  -> {output_file}")
    print("\n" + "=" * 70)

if __name__ == "__main__":
    main()
