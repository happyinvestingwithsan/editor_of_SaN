import subprocess
import os

folder = os.path.join("work", "mosidd_study", "03_vox_animated_charts")
url = "https://www.youtube.com/watch?v=dv3ADYu74DE"
out_template = os.path.join(folder, "video.mp4")

cmd = [
    "python", "-m", "yt_dlp",
    "-f", "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720]/best",
    "-o", out_template,
    url
]
print("Downloading video 3...")
subprocess.run(cmd, check=True)
print("Done video 3 download.")
