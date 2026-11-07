import subprocess
import os
import shutil

raw_video = r"D:\AI Projects\Editor_of_SaN\work\Jio_Mega_IPO_Project\long_form_8min\raw\20261020_142819.mp4"
temp_dir = r"D:\AI Projects\Editor_of_SaN\dmart-video-engine\public\video\temp_take3"
os.makedirs(temp_dir, exist_ok=True)
out_video = r"D:\AI Projects\Editor_of_SaN\dmart-video-engine\public\video\facecam_take3_fast.mp4"

clips = [
    (5.095, 12.128),
    (45.985, 61.018),
    (61.030, 63.297),
    (71.065, 80.332),
    (122.405, 133.972),
    (166.825, 187.525),
    (210.635, 218.802),
    (259.385, 280.985),
]

part_files = []
concat_list = os.path.join(temp_dir, "concat.txt")

with open(concat_list, "w") as f_list:
    for i, (t0, t1) in enumerate(clips):
        dur = t1 - t0
        part_path = os.path.join(temp_dir, f"part_{i}.mp4")
        part_files.append(part_path)
        f_list.write(f"file '{part_path.replace(os.sep, '/')}'\n")
        cmd = [
            "ffmpeg", "-y",
            "-ss", str(t0),
            "-to", str(t1),
            "-i", raw_video,
            "-vf", "fps=30,scale=1920:1080",
            "-c:v", "h264_nvenc",
            "-preset", "p1",
            "-cq", "26",
            "-an",
            part_path
        ]
        print(f"Cutting part {i} ({dur:.2f}s)...")
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("Concatenating all parts...")
concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_list,
    "-c", "copy",
    out_video
]
subprocess.run(concat_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
print("SUCCESS: Rendered", out_video, "Size:", os.path.getsize(out_video))
