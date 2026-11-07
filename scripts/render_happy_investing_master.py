import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.san_tools.render import render_tier3_master

engine_dir = "dmart-video-engine"
comp_id = "HappyInvesting-Documentary-Reel"
out_mp4 = r"D:\AI Projects\Editor_of_SaN\exports\Happy_Investing_Diwali_Market_Rally_Master.mp4"

print(f">> Starting Tier 3 Master Render of '{comp_id}'...")
print(f"   Target Output: {out_mp4}")

render_tier3_master(
    engine_dir=engine_dir,
    composition_id=comp_id,
    output_mp4=out_mp4,
    crf=18
)

print(f"[OK] Master Render complete: {out_mp4}")
