import fs from "fs";

const words = JSON.parse(fs.readFileSync("D:/AI Projects/Editor_of_SaN/pathfinder-oct22-engine/src/master_intro_words.json", "utf-8"));
const filtered = words.filter(w => w.startFrame >= 3950);
for (const w of filtered) {
  console.log(`${w.startFrame}-${w.endFrame}: ${w.word}`);
}
