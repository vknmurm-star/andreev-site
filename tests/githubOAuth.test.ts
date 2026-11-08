import assert from "node:assert/strict";
import test from "node:test";
// @ts-expect-error Node's strip-types test runner requires the explicit TypeScript extension.
import { createOAuthState, escapeInlineJson, OAUTH_STATE_TTL_SECONDS, verifyOAuthState } from "../src/lib/githubOAuth.ts";

const secret = "test-only-oauth-state-secret";
const now = 1_700_000_000_000;

test("accepts a fresh state and returns the PKCE verifier", () => {
  const created = createOAuthState(secret, now);
  const result = verifyOAuthState(created.state, created.cookieValue, secret, now + 1_000);
  assert.ok(result);
  assert.equal(result.codeVerifier, created.codeVerifier);
});

test("rejects missing and mismatched state", () => {
  const created = createOAuthState(secret, now);
  assert.equal(verifyOAuthState(null, created.cookieValue, secret, now), null);
  assert.equal(verifyOAuthState("wrong", created.cookieValue, secret, now), null);
});

test("rejects tampered, expired, and future state", () => {
  const created = createOAuthState(secret, now);
  assert.equal(verifyOAuthState(created.state, `${created.cookieValue}x`, secret, now), null);
  assert.equal(verifyOAuthState(created.state, created.cookieValue, secret, now + (OAUTH_STATE_TTL_SECONDS + 1) * 1000), null);
  assert.equal(verifyOAuthState(created.state, created.cookieValue, secret, now - 1_000), null);
});

test("a consumed cookie cannot be reused after it is cleared", () => {
  const created = createOAuthState(secret, now);
  assert.ok(verifyOAuthState(created.state, created.cookieValue, secret, now));
  assert.equal(verifyOAuthState(created.state, created.cookieValue, secret, now), null);
  assert.equal(verifyOAuthState(created.state, undefined, secret, now), null);
});

test("escapes dangerous inline JSON characters", () => {
  assert.equal(escapeInlineJson("</script>&"), "\\u003c/script\\u003e\\u0026");
});
