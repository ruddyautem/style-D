import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import Stripe from "stripe";

// Custom Vite plugin to handle Stripe Checkout securely on the server side
function stripeServerPlugin() {
  return {
    name: "stripe-server-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/create-checkout-session" && req.method === "POST") {
          try {
            const env = loadEnv(server.config.mode, process.cwd(), "");
            const secretKey = env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

            if (!secretKey) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Clé secrète Stripe non configurée sur le serveur" }));
            }

            let body = "";
            for await (const chunk of req) {
              body += chunk;
            }
            const { cartItems, userEmail, userName, origin } = JSON.parse(body || "{}");

            if (!cartItems || !cartItems.length) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Le panier est vide" }));
            }

            const stripe = new Stripe(secretKey, {
              apiVersion: "2024-12-18.acacia",
            });

            // Create customer safely on server
            const customer = await stripe.customers.create({
              name: userName || "Client STYLE — D",
              email: userEmail || undefined,
            });

            const baseUrl = origin || "http://localhost:5173";

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

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ url: session.url, id: session.id }));
          } catch (err) {
            console.error("Erreur serveur Stripe Checkout:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ error: err.message || "Erreur serveur Stripe" }));
          }
        }
        next();
      });
    },
    // Also handle in preview mode
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/create-checkout-session" && req.method === "POST") {
          try {
            const env = loadEnv("production", process.cwd(), "");
            const secretKey = env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

            if (!secretKey) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ error: "Clé secrète Stripe non configurée sur le serveur" }));
            }

            let body = "";
            for await (const chunk of req) {
              body += chunk;
            }
            const { cartItems, userEmail, userName, origin } = JSON.parse(body || "{}");

            const stripe = new Stripe(secretKey, {
              apiVersion: "2024-12-18.acacia",
            });

            const customer = await stripe.customers.create({
              name: userName || "Client STYLE — D",
              email: userEmail || undefined,
            });

            const baseUrl = origin || "http://localhost:4173";

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

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ url: session.url, id: session.id }));
          } catch (err) {
            console.error("Erreur serveur Stripe Checkout preview:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ error: err.message }));
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
      },
    }),
    stripeServerPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@firebase/firestore") || id.includes("node_modules/firebase/firestore")) {
            return "firebase-firestore";
          }
          if (id.includes("node_modules/@firebase/auth") || id.includes("node_modules/firebase/auth")) {
            return "firebase-auth";
          }
          if (id.includes("node_modules/firebase") || id.includes("node_modules/@firebase")) {
            return "firebase-common";
          }
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router-dom")
          ) {
            return "react-vendor";
          }
          if (id.includes("node_modules/styled-components")) {
            return "styled-vendor";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
});

