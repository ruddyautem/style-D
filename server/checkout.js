import Stripe from "stripe";
import { checkoutItems, checkoutOrigin } from "./checkout-policy.js";

async function body(req, limit = 32768) {
  const chunks = []; let size = 0;
  for await (const chunk of req.iterator({ destroyOnReturn: false })) {
    size += chunk.length;
    if (size > limit) { req.resume(); throw Object.assign(new Error("Requête trop volumineuse."), { status: 413 }); }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// Keep the API contract used by the checkout before the audit.
export function createStripeClient(key, options = {}) {
  return new Stripe(key, { ...options, apiVersion: "2024-12-18.acacia" });
}

export function createApiHandler(env = process.env, getStripe = createStripeClient) {
  return async function handleApi(req, res) {
    const url = new URL(req.url, "http://localhost");
    if (!url.pathname.startsWith("/api/")) return false;
    const send = (status, data) => { res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(data)); };
    let stage = "configuration";
    try {
      if (url.pathname !== "/api/create-checkout-session") { send(404, { error: "Endpoint inconnu." }); return true; }
      if (req.method !== "POST") { send(405, { error: "Method not allowed" }); return true; }
      let input;
      try { input = JSON.parse((await body(req)).toString("utf8")); }
      catch (error) { send(error.status || 400, { error: "Requête invalide." }); return true; }
      let items;
      try { items = checkoutItems(input?.cartItems); }
      catch (error) { send(400, { error: error.message }); return true; }
      if (!env.STRIPE_SECRET_KEY) { send(503, { error: "STRIPE_SECRET_KEY non configurée sur le serveur." }); return true; }
      const base = checkoutOrigin(env);
      const stripe = getStripe(env.STRIPE_SECRET_KEY);
      stage = "customer";
      const customer = await stripe.customers.create({ name: typeof input.userName === "string" ? input.userName.slice(0, 256) : "Client STYLE — D", email: typeof input.userEmail === "string" ? input.userEmail : undefined });
      stage = "session";
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map(item => ({ price_data: { currency: "eur", product_data: { name: item.name, images: item.imageUrl ? [item.imageUrl] : [] }, unit_amount: Math.round(item.price * 100) }, quantity: item.quantity })),
        mode: "payment", customer: customer.id,
        success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${base}/failure`, locale: input.locale === "en" ? "en" : "fr",
      });
      send(200, { url: session.url, id: session.id });
    } catch (error) {
      // Log diagnostic fields only: never a key, request body or provider message.
      const safeField = value => typeof value === "string" && /^[\w.\[\]-]{1,120}$/.test(value) ? value : undefined;
      console.error("Checkout failed", JSON.stringify({ stage, type: safeField(error.type || error.name), code: safeField(error.code), param: safeField(error.param) }));
      const messages = {
        StripeAuthenticationError: "La clé Stripe du serveur est invalide ou révoquée.",
        StripePermissionError: "La clé Stripe du serveur ne dispose pas des permissions nécessaires.",
        StripeConnectionError: "Le serveur ne parvient pas à joindre Stripe. Réessayez.",
        StripeRateLimitError: "Stripe reçoit trop de requêtes. Réessayez dans quelques instants.",
        StripeInvalidRequestError: stage === "customer" ? "Stripe a refusé les informations du client. Vérifiez le terminal du serveur." : "Stripe a refusé la session de paiement. Vérifiez le terminal du serveur.",
      };
      send(error.status || 503, { error: error.status ? error.message : messages[error.type] || "Paiement momentanément indisponible. Réessaie." });
    }
    return true;
  };
}
