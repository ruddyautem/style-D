import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";

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
  // CORS Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // 1. Stripe Checkout API Endpoint
  if (pathname === "/api/create-checkout-session" && req.method === "POST") {
    try {
      const secretKey = process.env.STRIPE_SECRET_KEY;
      if (!secretKey) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "STRIPE_SECRET_KEY non configurée dans les variables d'environnement Dokploy." })
        );
      }

      let body = "";
      for await (const chunk of req) {
        body += chunk;
      }
      const { cartItems, userEmail, userName, origin } = JSON.parse(body || "{}");

      if (!cartItems || !cartItems.length) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Le panier est vide." }));
      }

      const stripe = new Stripe(secretKey, { apiVersion: "2024-12-18.acacia" });

      const customer = await stripe.customers.create({
        name: userName || "Client STYLE — D",
        email: userEmail || undefined,
      });

      const proto = req.headers["x-forwarded-proto"] || "https";
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      const baseUrl = origin || `${proto}://${host}`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              images: item.imageUrl ? [item.imageUrl] : [],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        customer: customer.id,
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/failure`,
        locale: "fr",
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ url: session.url, id: session.id }));
    } catch (err) {
      console.error("Erreur Stripe:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: err.message || "Erreur serveur Stripe" }));
    }
  }

  // 2. Static Files + SPA Fallback
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`STYLE — D server running on port ${PORT}`);
});
