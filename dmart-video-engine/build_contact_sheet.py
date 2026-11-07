import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

frames = [
    (20, "Frame 20 (0.67s) - Fullscreen Intro"),
    (120, "Frame 120 (4.00s) - Left Dock & S1 Entry"),
    (350, "Frame 350 (11.67s) - S1: 5% Capital Ring"),
    (1000, "Frame 1000 (33.33s) - S2: 1% Scout & Reserve"),
    (1650, "Frame 1650 (55.00s) - S2: PE 70 to 62 Ladder"),
    (2200, "Frame 2200 (73.33s) - S3: Downside Pathways"),
    (2600, "Frame 2600 (86.67s) - S4: Risk Survival Basis"),
    (2900, "Frame 2900 (96.67s) - S4: Market-Cap 5%/3%/1.5%"),
    (3450, "Frame 3450 (115.00s) - S5: GTT Automation"),
    (3750, "Frame 3750 (125.00s) - S5: Emotion-Free Execution"),
]

os.makedirs("contact_frames", exist_ok=True)
rendered_paths = []

for f_num, label in frames:
    out_name = f"contact_frames/frame_{f_num:04d}.png"
    if not os.path.exists(out_name):
        print(f"Rendering {label}...")
        cmd = f"npx remotion still RiskManagement-Interval07 {out_name} --frame={f_num}"
        subprocess.run(cmd, shell=True, check=True)
    rendered_paths.append((out_name, label))

print("All frames ready. Building contact sheet...")

# Layout: 2 columns x 5 rows
cols = 2
rows = 5
thumb_w = 960
thumb_h = 540
header_h = 40
padding = 20

sheet_w = cols * thumb_w + (cols + 1) * padding
sheet_h = rows * (thumb_h + header_h) + (rows + 1) * padding + 80

sheet = Image.new("RGB", (sheet_w, sheet_h), "#18181B")
draw = ImageDraw.Draw(sheet)

# Main Title
draw.text((padding, 25), "HIFY MASTERCLASS — INTERVAL 07: RISK MANAGEMENT (CONTACT SHEET)", fill="#FAFAF8")
draw.text((padding + 900, 25), "DURATION: 126.80s (3804 FRAMES) • 1920x1080 @ 30 FPS", fill="#C8A951")

for idx, (path, label) in enumerate(rendered_paths):
    r = idx // cols
    c = idx % cols
    x = padding + c * (thumb_w + padding)
    y = 80 + padding + r * (thumb_h + header_h + padding)

    # Label Banner
    draw.rectangle([x, y, x + thumb_w, y + header_h], fill="#27272A")
    draw.text((x + 16, y + 12), label, fill="#E4E4E7")

    # Image
    img = Image.open(path)
    img_resized = img.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
    sheet.paste(img_resized, (x, y + header_h))

sheet.save("contact_sheet.png")
print("Saved contact_sheet.png successfully!")
