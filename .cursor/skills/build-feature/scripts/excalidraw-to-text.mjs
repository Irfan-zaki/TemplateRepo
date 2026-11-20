#!/usr/bin/env node
// Prints an .excalidraw board as plain text: one section per frame (screen), text in reading
// order, then the arrows between frames (the user flow).
// Usage: node excalidraw-to-text.mjs "<path>.excalidraw" [frame-name-filter]
import fs from "node:fs";

const [file, filter] = process.argv.slice(2);
if (!file) {
  console.error('Usage: node excalidraw-to-text.mjs "<path>.excalidraw" [frame-name-filter]');
  process.exit(1);
}

const elements = JSON.parse(fs.readFileSync(file, "utf8")).elements.filter((e) => !e.isDeleted);
const frames = elements.filter((e) => e.type === "frame");
const frameById = new Map(frames.map((f) => [f.id, f]));
const matches = (name) => !filter || name.toLowerCase().includes(filter.toLowerCase());

function frameAt(x, y) {
  return frames.find((f) => x >= f.x && x <= f.x + f.width && y >= f.y && y <= f.y + f.height);
}

const readingOrder = (a, b) => Math.round(a.y / 12) - Math.round(b.y / 12) || a.x - b.x;
const texts = elements.filter((e) => e.type === "text" && e.text?.trim());

const byFrame = new Map();
const loose = [];
for (const t of texts) {
  const frame = frameById.get(t.frameId) ?? frameAt(t.x, t.y);
  if (frame) byFrame.set(frame.id, [...(byFrame.get(frame.id) ?? []), t]);
  else loose.push(t);
}

const clean = (s) => s.replace(/\s*\n\s*/g, " / ").trim();

for (const frame of frames) {
  if (!matches(frame.name ?? "")) continue;
  console.log(`\n## ${frame.name}`);
  for (const t of (byFrame.get(frame.id) ?? []).sort(readingOrder)) console.log(`- ${clean(t.text)}`);
}

if (!filter) {
  console.log("\n## Board-level notes (outside any frame)");
  for (const t of loose.sort(readingOrder)) console.log(`- ${clean(t.text)}`);
}

console.log("\n## Flow (arrows between frames)");
for (const a of elements.filter((e) => e.type === "arrow" && e.points?.length)) {
  const end = a.points[a.points.length - 1];
  const from = frameAt(a.x, a.y);
  const to = frameAt(a.x + end[0], a.y + end[1]);
  if (from && to && from.id !== to.id && (matches(from.name) || matches(to.name))) {
    console.log(`- ${from.name} -> ${to.name}`);
  }
}
