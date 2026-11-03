import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, "../apps/web/src");
const patterns = [/mockData/i, /dummyData/i, /fakeData/i, /sampleData/i, /TODO-MOCK/i];

let hasViolations = false;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip mocks directory completely
    if (entry.isDirectory()) {
      if (entry.name === "mocks" || entry.name === "node_modules") {
        continue;
      }
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?|vue|svelte)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        for (const pattern of patterns) {
          if (pattern.test(line)) {
            console.error(
              `⚠️ Suspicious mock leakage found in ${path.relative(process.cwd(), fullPath)}:${index + 1}`
            );
            console.error(`   > ${line.trim()}\n`);
            hasViolations = true;
          }
        }
      });
    }
  }
}

console.log("🔍 Scanning apps/web/src for mock leakage (ignoring apps/web/src/mocks)...");
scanDir(targetDir);

if (hasViolations) {
  console.error("❌ Mock leakage detected! Please remove fabricated business data from components/pages.");
  process.exit(1);
} else {
  console.log("✅ No mock leakage detected outside src/mocks. Good job!");
}

