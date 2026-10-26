import { test } from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import http from "node:http";
import { checkoutItems, checkoutOrigin } from "./checkout-policy.js";
import { createApiHandler, createStripeClient } from "./checkout.js";

const cartItems = [{ id: 1, name: "Veste", price: 79.99, quantity: 2 }];
async function request(handler, data, url = "/api/create-checkout-session", method = "POST") {
  const req = Readable.from([Buffer.from(typeof data === "string" ? data : JSON.stringify(data))]);
  req.url = url; req.method = method; req.headers = {};
  let status, result;
  await handler(req, { writeHead(s) { status = s; }, end(value) { result = JSON.parse(value); } });
  return { status, result };
}

test("original browser checkout works without bearer token or Admin credentials", async () => {
  let customer, session;
  const handler = createApiHandler({ STRIPE_SECRET_KEY: "fixture", SITE_URL: "https://shop.example.test", NODE_ENV: "production" }, () => ({
    customers: { create: async input => { customer = input; return { id: "cus_fixture" }; } },
    checkout: { sessions: { create: async input => { session = input; return { id: "cs_test_fixture", url: "https://checkout.stripe.com/fixture" }; } } },
  }));
  const response = await request(handler, { cartItems, userName: "Fixture", userEmail: "fixture@example.test", origin: "https://evil.invalid", locale: "en" });
  assert.equal(response.status, 200);
  assert.equal(response.result.id, "cs_test_fixture");
  assert.equal(customer.email, "fixture@example.test");
  assert.equal(session.customer, "cus_fixture");
  assert.equal(session.line_items[0].price_data.unit_amount, 7999);
  assert.equal(session.line_items[0].quantity, 2);
  assert.equal(session.locale, "en");
  assert.equal(session.success_url, "https://shop.example.test/success?session_id={CHECKOUT_SESSION_ID}");
});

test("invalid carts fail before Stripe access", async () => {
  const handler = createApiHandler({}, () => { throw new Error("must not run"); });
  for (const input of [null, {}, {cartItems: []}, {cartItems: [{...cartItems[0], quantity: -1}]}, {cartItems: [{...cartItems[0], price: 0}]}]) {
    assert.equal((await request(handler, input)).status, 400);
  }
  assert.equal((await request(handler, '{')).status, 400);
});

test("line count, duplicate quantities and invalid amounts are bounded", () => {
  for (const quantity of [0, -1, 0.5, 100, "2"]) assert.throws(() => checkoutItems([{...cartItems[0], quantity}]));
  for (const price of [NaN, Infinity, 0, -1, 0.001, Number.MAX_VALUE]) assert.throws(() => checkoutItems([{...cartItems[0], price}]));
  assert.throws(() => checkoutItems(Array(101).fill(cartItems[0])));
  assert.throws(() => checkoutItems([{...cartItems[0], quantity: 50}, {...cartItems[0], quantity: 50}]));
});

test("production return origin is configured, and browser-exposed Stripe secrets are not used", async () => {
  assert.equal(checkoutOrigin({}), "http://localhost:5173");
  for (const SITE_URL of [undefined, "javascript:alert(1)", "http://shop.example.test", "https://user:pass@shop.example.test"]) {
    assert.throws(() => checkoutOrigin({ NODE_ENV: "production", SITE_URL }));
  }
  const handler = createApiHandler({VITE_STRIPE_SECRET_KEY: "fixture"}, () => {throw new Error("must not run");});
  assert.equal((await request(handler, {cartItems})).status, 503);
});

test("a chunked oversized body returns 413 without resetting the socket", async () => {
  const handler = createApiHandler({}, () => { throw new Error("must not run"); });
  const server = http.createServer((req, res) => { void handler(req, res); });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    const result = await new Promise((resolve, reject) => {
      const req = http.request({hostname: "127.0.0.1", port: server.address().port, path: "/api/create-checkout-session", method: "POST"}, res => {res.resume(); res.on("end", () => resolve(res.statusCode));});
      req.on("error", reject); req.write("x".repeat(20000)); req.write("x".repeat(20000)); req.end();
    });
    assert.equal(result, 413);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test("removed Admin routes return 404 and provider errors stay private", async () => {
  const handler = createApiHandler({STRIPE_SECRET_KEY: "fixture"}, () => {throw new Error("private provider detail");});
  assert.equal((await request(handler, {}, "/api/checkout-session", "GET")).status, 404);
  assert.equal((await request(handler, {}, "/api/stripe-webhook")).status, 404);
  const response = await request(handler, {cartItems});
  assert.equal(response.status, 503);
  assert.ok(!response.result.error.includes("private provider detail"));
});


test("real Stripe SDK sends the original API version for customer and checkout creation", async () => {
  const calls = [];
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      calls.push({ path: req.url, version: req.headers["stripe-version"], body: Buffer.concat(chunks).toString() });
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(req.url === "/v1/customers" ? {id: "cus_fixture", object: "customer"} : {id: "cs_test_fixture", object: "checkout.session", url: "https://checkout.stripe.com/fixture"}));
    });
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    const handler = createApiHandler({STRIPE_SECRET_KEY: "sk_test_fixture"}, key => createStripeClient(key, {host: "127.0.0.1", port: server.address().port, protocol: "http", telemetry: false, maxNetworkRetries: 0}));
    assert.equal((await request(handler, {cartItems})).status, 200);
    assert.deepEqual(calls.map(call => call.path), ["/v1/customers", "/v1/checkout/sessions"]);
    assert.ok(calls.every(call => call.version === "2024-12-18.acacia"));
    assert.equal(new URLSearchParams(calls[1].body).get("line_items[0][price_data][unit_amount]"), "7999");
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test("Stripe credential and parameter failures are identifiable without exposing provider details", async () => {
  for (const [type, expected] of [["StripeAuthenticationError", "clé Stripe"], ["StripePermissionError", "permissions"], ["StripeInvalidRequestError", "informations du client"]]) {
    const handler = createApiHandler({STRIPE_SECRET_KEY: "fixture"}, () => ({customers: {create: async () => {throw Object.assign(new Error("private-provider-detail"), {type, param: "email"});}}}));
    const response = await request(handler, {cartItems});
    assert.equal(response.status, 503);
    assert.ok(response.result.error.includes(expected));
    assert.ok(!response.result.error.includes("private-provider-detail"));
  }
});
