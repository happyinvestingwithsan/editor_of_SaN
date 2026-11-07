import re
from collections import Counter

with open(r'D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\Root.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

ids = re.findall(r'id=["\']([^"\']+)["\']', text)
counts = Counter(ids)
print("Composition counts:")
for cid, cnt in counts.items():
    if cnt > 1:
        print(f"DUPLICATE: {cid} ({cnt})")
    else:
        print(f"  OK: {cid}")
