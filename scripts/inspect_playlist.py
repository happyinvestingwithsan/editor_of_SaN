import json

for enc in ['utf-16', 'utf-8', 'utf-8-sig', 'latin-1']:
    try:
        with open('temp_playlist.json', 'r', encoding=enc) as f:
            data = json.load(f)
        print(f"Successfully loaded with {enc}")
        break
    except Exception as e:
        continue

print(f"Playlist Title: {data.get('title')}")
entries = data.get('entries', [])
print(f"Total Videos: {len(entries)}")

for idx, e in enumerate(entries):
    vid_id = e.get('id')
    title = e.get('title')
    duration = e.get('duration')
    print(f"[{idx+1}] ID: {vid_id} | Duration: {duration}s | Title: {title}")
