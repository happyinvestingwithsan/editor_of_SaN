with open("dmart-video-engine/src/Root.tsx", "r", encoding="utf-8") as f:
    content = f.read()

import_stmt = 'import { EquitasSFB_Masterclass_Intro } from "./compositions/EquitasSFB_Masterclass_Intro";\n'
comp_stmt = """      {/* =========================================================================
          EQUITAS SMALL FINANCE BANK MASTERCLASS INTRO (CANONICAL 16:9 DRAFT)
          ========================================================================= */}
      <Composition
        id="Equitas-SFB-Masterclass-Intro"
        component={EquitasSFB_Masterclass_Intro}
        durationInFrames={4800} // 160.00s @ 30fps
        fps={30}
        width={1920}
        height={1080}
      />
"""

if import_stmt.strip() not in content:
    content = import_stmt + content

if 'id="Equitas-SFB-Masterclass-Intro"' not in content:
    if "return (\r\n    <>" in content:
        content = content.replace("return (\r\n    <>", "return (\r\n    <>\r\n" + comp_stmt)
    elif "return (\n    <>" in content:
        content = content.replace("return (\n    <>", "return (\n    <>\n" + comp_stmt)

with open("dmart-video-engine/src/Root.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated Root.tsx successfully!")
