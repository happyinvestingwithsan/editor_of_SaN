import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.san_tools.render import render_tier1_still

engine_dir = "dmart-video-engine"
comp_id = "ESFB-Outro-Personal-Thesis"
out_dir = "equitas_personal_investment_thesis/stills"

stills = [
    (80, "scene01_frame80_thesis_heading.png"),
    (550, "scene02_frame550_valuation_discount.png"),
    (880, "scene03_frame880_profit_runrate.png"),
    (1150, "scene04_frame1150_3pillar_thesis.png"),
    (1600, "scene05_frame1600_personal_position.png"),
    (2350, "scene07_frame2350_staged_entry.png"),
    (2580, "scene08_frame2580_do_not_copy.png"),
    (3120, "scene09_frame3120_portfolio_limits.png"),
    (3350, "scene10_frame3350_concentration_risk.png"),
    (3980, "scene11_frame3980_investor_responsibility.png"),
    (4450, "scene12_frame4450_community_cta.png"),
    (4830, "scene13_frame4830_happy_investing_outro.png"),
]

for frame, filename in stills:
    out_path = os.path.join(out_dir, filename)
    print(f"Rendering frame {frame} -> {filename}...")
    try:
        render_tier1_still(
            engine_dir=engine_dir,
            composition_id=comp_id,
            frame=frame,
            output_png=out_path
        )
    except Exception as e:
        print(f"Error on frame {frame}: {e}")

print("All stills rendered!")
