with open(r'D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\Root.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if 'id="ThinkSchool-Take04-FullVideo"' in line:
        # Check if we already saw it
        found_before = any('id="ThinkSchool-Take04-FullVideo"' in l for l in new_lines)
        if found_before:
            print("Found duplicate Take04, skipping...")
            # We skip this composition
    new_lines.append(line)

# Let's count how many times ThinkSchool-Take04-FullVideo appears
count = sum(1 for l in lines if 'id="ThinkSchool-Take04-FullVideo"' in l)
print(f"Total Take04 FullVideo count: {count}")

# Let's remove lines from 101 to 126
with open(r'D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\Root.tsx', 'r', encoding='utf-8') as f:
    text = f.read().replace('\r\n', '\n')

import re
pattern = r'\{\s*/\*\s*={10,}\s*={10,}\s*\*/\s*\}\s*<Composition\s+id="ThinkSchool-Take04-FullVideo"[\s\S]*?/>\s*<Composition\s+id="ThinkSchool-Take04-Overlay"[\s\S]*?/>'
cleaned = re.sub(pattern, '', text, count=1)

with open(r'D:\AI Projects\Editor_of_SaN\dmart-video-engine\src\Root.tsx', 'w', encoding='utf-8') as f:
    f.write(cleaned)

print("Root.tsx cleaned successfully!")
