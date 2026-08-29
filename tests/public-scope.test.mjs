import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirectories = new Set([".git", ".next", "node_modules", "coverage", "out"]);
const textExtensions = new Set([".css", ".json", ".md", ".mjs", ".ts", ".tsx", ".txt"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolute));
    if (entry.isFile()) files.push(path.relative(root, absolute));
  }
  return files;
}

const files = await collectFiles(root);

test("public tree excludes private capability and deployment paths", () => {
  const normalized = files.map((file) => file.split(path.sep).join("/"));
  const forbiddenPathPatterns = [
    /(^|\/)\.env(?:\.|$)/,
    /(^|\/)(auth|database|db|engine|integration|integrations|migration|migrations|prompt|prompts)(\/|$)/,
    /(^|\/)proxy\.(?:ts|js)$/,
    /(^|\/)(Dockerfile|docker-compose|railway|vercel|dokploy)(?:\.|\/|$)/i,
    /(^|\/)(AGENTS|CLAUDE)\.md$/,
  ];
  for (const file of normalized) {
    for (const pattern of forbiddenPathPatterns) assert.doesNotMatch(file, pattern);
  }
});
test("public text contains no credential-shaped values or private connection strings", async () => {
  const secretPatterns = [
    /AKIA[0-9A-Z]{16}/,
    /(?:ghp_|gho_)[A-Za-z0-9]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/,
    /xox[baprs]-[A-Za-z0-9-]{10,}/,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s/:]+:[^\s/@]+@/i,
  ];

  for (const file of files) {
    if (file === "tests/public-scope.test.mjs") continue;
    if (!textExtensions.has(path.extname(file)) && !["LICENSE", ".gitignore"].includes(file)) continue;
    const content = await readFile(path.join(root, file), "utf8");
    for (const pattern of secretPatterns) assert.doesNotMatch(content, pattern, `${file} matched ${pattern}`);
  }
});

test("the only route handler is the read-only public health endpoint", () => {
  const routes = files.filter((file) => file.endsWith(`${path.sep}route.ts`) || file.endsWith("/route.ts"));
  assert.deepEqual(routes.map((file) => file.split(path.sep).join("/")), ["src/app/api/health/route.ts"]);
});

test("health endpoint declares public showcase mock mode", async () => {
  const source = await readFile(path.join(root, "src/app/api/health/route.ts"), "utf8");
  assert.match(source, /mode:\s*"public-showcase"/);
  assert.match(source, /mock:\s*true/);
  assert.doesNotMatch(source, /process\.env|fetch\(|cookies\(|headers\(/);
});
