import os
from PIL import Image

stills_dir = "reliance_phase1/stills"
output_path = "reliance_phase1/contact_sheet.png"

files = sorted([f for f in os.listdir(stills_dir) if f.endswith(".png")])
print(f"Found {len(files)} stills: {files}")

if not files:
    print("No stills found.")
    exit(0)

# Target thumbnail dimensions (640x360)
thumb_w, thumb_h = 640, 360
cols = 3
rows = (len(files) + cols - 1) // cols

sheet = Image.new("RGB", (cols * thumb_w, rows * thumb_h), (247, 250, 249))

for i, fname in enumerate(files):
    img_path = os.path.join(stills_dir, fname)
    im = Image.open(img_path)
    im.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
    
    r = i // cols
    c = i % cols
    
    # Center within slot
    x = c * thumb_w + (thumb_w - im.size[0]) // 2
    y = r * thumb_h + (thumb_h - im.size[1]) // 2
    
    sheet.paste(im, (x, y))

sheet.save(output_path, "PNG")
print(f"Saved contact sheet to {output_path} ({sheet.size[0]}x{sheet.size[1]})")
