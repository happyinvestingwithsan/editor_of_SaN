import os
import subprocess
import sys
from PIL import Image, ImageDraw, ImageFont

VIDEO_PATH = "equitas_microfinance_crisis/FINAL_EQUITAS_MICROFINANCE.mp4"
OUTPUT_DIR = "equitas_microfinance_crisis/frames_temp"
CONTACT_SHEET = "equitas_microfinance_crisis/contact_sheet.png"

# 12 representative scenes with their frame numbers and descriptive titles
SCENES = [
    (180, "Scene 01: Profit Collapse & Panic"),
    (360, "Scene 02: Concall Due Diligence"),
    (600, "Scene 03: Microfinance Flood Map"),
    (820, "Scene 04: 1 Borrower, 5 Loans (Debt Trap)"),
    (1000, "Scene 05: Karnataka Stress & Heatwaves"),
    (1300, "Scene 06: Credit Cost 5x Shock (11.37%)"),
    (1550, "Scene 07: ₹630 Cr Profit Wipeout"),
    (2050, "Scene 09: Action 1: Cleaned in One Go"),
    (2450, "Scene 10: Action 2: Stricter Credit Gate"),
    (2700, "Scene 11: 50% Risky Loans Rejected"),
    (2950, "Scene 12: 15% vs 85% Portfolio Reality"),
    (3480, "Scene 15: Forensic Verdict Outro"),
]

def main():
    if not os.path.exists(VIDEO_PATH):
        print(f"Error: {VIDEO_PATH} does not exist yet.")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    thumb_w, thumb_h = 600, 338  # 16:9 ratio
    cols, rows = 4, 3
    padding = 24
    header_h = 100
    sheet_w = cols * thumb_w + (cols + 1) * padding
    sheet_h = rows * thumb_h + (rows + 1) * padding + header_h

    montage = Image.new("RGB", (sheet_w, sheet_h), color=(255, 255, 255))
    draw = ImageDraw.Draw(montage)

    # Header banner
    draw.rectangle([0, 0, sheet_w, header_h], fill=(15, 143, 135))
    draw.text((padding, 24), "EQUITAS SMALL FINANCE BANK — SCREENER PART 2: FORENSIC MASTERCLASS", fill=(255, 255, 255))
    draw.text((padding, 58), "VISUAL CONTACT SHEET // 15-SCENE KINETIC EDITORIAL TIMELINE (118.13s @ 30 FPS)", fill=(232, 245, 243))

    for idx, (frame_num, title) in enumerate(SCENES):
        sec = frame_num / 30.0
        frame_img_path = os.path.join(OUTPUT_DIR, f"frame_{frame_num:04d}.png")
        
        # Extract frame using ffmpeg
        cmd = [
            "ffmpeg", "-y", "-ss", f"{sec:.3f}",
            "-i", VIDEO_PATH,
            "-vframes", "1",
            "-q:v", "2",
            frame_img_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

        if os.path.exists(frame_img_path):
            img = Image.open(frame_img_path).resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            
            c = idx % cols
            r = idx // cols
            x = padding + c * (thumb_w + padding)
            y = header_h + padding + r * (thumb_h + padding)

            montage.paste(img, (x, y))

            # Border around thumbnail
            draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(15, 143, 135), width=2)

            # Label banner at bottom of thumbnail
            banner_h = 36
            draw.rectangle([x, y + thumb_h - banner_h, x + thumb_w, y + thumb_h], fill=(24, 37, 43))
            draw.text((x + 12, y + thumb_h - banner_h + 8), f"{title} [{sec:.1f}s]", fill=(255, 255, 255))

    montage.save(CONTACT_SHEET, quality=95)
    print(f"[OK] Generated Contact Sheet at: {CONTACT_SHEET}")

if __name__ == "__main__":
    main()
