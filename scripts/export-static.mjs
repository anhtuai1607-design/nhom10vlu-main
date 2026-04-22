import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const clientDir = resolve(rootDir, "dist/client");
const serverEntry = resolve(rootDir, "dist/server/index.js");
const outputDir = resolve(rootDir, "dist-static");

const routes = ["/", "/crisis", "/solutions", "/action"];

const { default: app } = await import(pathToFileURL(serverEntry).href);

if (!app || typeof app.fetch !== "function") {
  throw new Error("Không tìm thấy server handler để export static.");
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(resolve(clientDir, "assets"), resolve(outputDir, "assets"), { recursive: true });

try {
  await cp(resolve(clientDir, ".assetsignore"), resolve(outputDir, ".assetsignore"));
} catch {
  // file optional
}

async function renderRoute(routePath) {
  const response = await app.fetch(new Request(`https://nhom10vlu.local${routePath}`), {});
  const html = await response.text();

  if (!html.toLowerCase().includes("<!doctype html>")) {
    throw new Error(`Không render được HTML cho route ${routePath}`);
  }

  const normalizedHtml = html.replaceAll("/<undefined>", "/");
  const targetDir = routePath === "/" ? outputDir : resolve(outputDir, routePath.slice(1));
  await mkdir(targetDir, { recursive: true });
  await writeFile(resolve(targetDir, "index.html"), normalizedHtml, "utf8");
}

for (const routePath of routes) {
  await renderRoute(routePath);
}

const notFoundResponse = await app.fetch(new Request("https://nhom10vlu.local/__not_found__"), {});
const notFoundHtml = await notFoundResponse.text();

if (notFoundHtml.toLowerCase().includes("<!doctype html>")) {
  await writeFile(resolve(outputDir, "404.html"), notFoundHtml.replaceAll("/<undefined>", "/"), "utf8");
}

const rootHtml = await readFile(resolve(outputDir, "index.html"), "utf8");
if (!rootHtml.includes("/assets/")) {
  throw new Error("Bản export thiếu liên kết assets.");
}

console.log(`Static export hoàn tất tại ${outputDir}`);