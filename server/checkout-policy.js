export function checkoutItems(input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > 100) throw new Error("Panier invalide (1 à 100 lignes).");
  const quantities = new Map();
  return input.map(item => {
    const id = String(item?.id ?? "");
    if (!/^[\w-]{1,128}$/.test(id) || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error("Quantité ou produit invalide.");
    if (typeof item.name !== "string" || !item.name.trim() || item.name.length > 256 || !Number.isFinite(item.price) || item.price <= 0 || !Number.isSafeInteger(Math.round(item.price * 100)) || Math.round(item.price * 100) < 1) throw new Error("Produit invalide.");
    const total = (quantities.get(id) || 0) + item.quantity;
    if (total > 99) throw new Error("Quantité invalide.");
    quantities.set(id, total);
    return { ...item, id };
  });
}

export function checkoutOrigin(env) {
  // Return addresses come from server configuration, never the request body/Host.
  const base = env.SITE_URL || (env.NODE_ENV !== "production" ? "http://localhost:5173" : null);
  try {
    const url = new URL(base);
    if (!['http:', 'https:'].includes(url.protocol) || (env.NODE_ENV === "production" && url.protocol !== "https:") || url.username || url.password) throw new Error();
    return url.origin;
  } catch { throw Object.assign(new Error("SITE_URL non configurée ou invalide sur le serveur."), { status: 503 }); }
}
