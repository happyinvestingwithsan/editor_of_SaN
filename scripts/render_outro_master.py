import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.san_tools.render import render_tier3_master

engine_dir = "dmart-video-engine"
comp_id = "ESFB-Outro-Personal-Thesis"
out_mp4 = "equitas_personal_investment_thesis/FINAL_EQUITAS_PERSONAL_THESIS.mp4"

print(f">> Starting Tier 3 Master Render of '{comp_id}'...")
print(f"   Target: {out_mp4}")

render_tier3_master(
    engine_dir=engine_dir,
    composition_id=comp_id,
    output_mp4=out_mp4,
    crf=18
)

print("[OK] Production master render finished!")
