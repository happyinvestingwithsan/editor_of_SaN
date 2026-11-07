import path from "path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "fs";

const entryPoint = path.resolve("D:/AI Projects/Editor_of_SaN/pathfinder-oct22-engine/src/index.ts");
const outDir = path.resolve("D:/AI Projects/Editor_of_SaN/work/feedback_stills");
fs.mkdirSync(outDir, { recursive: true });

const frames = [360, 1563, 1800, 2277, 2520, 2650, 3550];

console.log("Bundling Remotion project once...");
const bundleLocation = await bundle({
  entryPoint,
  webpackOverride: (config) => config,
});
console.log("Bundled successfully!");

const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: "PathfinderOct22-Intro-FullVideo",
});

console.log(`Composition selected: ${composition.id}. Rendering ${frames.length} frames...`);

for (const f of frames) {
  const outFile = path.join(outDir, `still_f${String(f).padStart(4, "0")}.png`);
  console.log(`Rendering frame ${f}...`);
  await renderStill({
    composition,
    serveUrl: bundleLocation,
    output: outFile,
    frame: f,
  });
  console.log(`+ Saved ${outFile}`);
}

console.log("Transition test stills rendered successfully!");
