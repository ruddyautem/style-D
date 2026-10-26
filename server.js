import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApiHandler } from "./server/checkout.js";
const handleApi = createApiHandler();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, "dist");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  if (await handleApi(req, res)) return;

  const parsedUrl = new URL(req.url, "http://localhost");
  const pathname = parsedUrl.pathname;

  // Static Files + SPA Fallback
  if (req.method === "GET" || req.method === "HEAD") {
    let safePath = path.normalize(pathname).replace(/^(\.\.[\\/])+/, "");
    if (safePath.startsWith("/")) safePath = safePath.slice(1);
    let filePath = path.join(DIST_DIR, safePath);

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        const headers = { "Content-Type": contentType };
        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          headers["Cache-Control"] = "public, max-age=31536000, immutable";
        } else {
          headers["Cache-Control"] = "public, max-age=0, must-revalidate";
        }
        res.writeHead(200, headers);
        if (req.method === "HEAD") return res.end();
        return fs.createReadStream(filePath).pipe(res);
      }

      // SPA fallback → index.html
      const indexPath = path.join(DIST_DIR, "index.html");
      fs.readFile(indexPath, (indexErr, data) => {
        if (indexErr) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          return res.end("404 - Build manquant.");
        }
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=0, must-revalidate",
        });
        return res.end(data);
      });
    });
    return;
  }

  res.writeHead(405, { "Content-Type": "text/plain" });
  res.end("Method Not Allowed");
});

const PORT = process.env.PORT || 80;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`STYLE — D server running on port ${PORT}`);
});
