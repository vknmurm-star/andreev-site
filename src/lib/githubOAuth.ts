import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const OAUTH_ORIGIN = "https://andreev-zakon.ru";
export const OAUTH_REDIRECT_URI = `${OAUTH_ORIGIN}/api/callback`;
export const OAUTH_STATE_COOKIE = "andreev_github_oauth";
export const OAUTH_STATE_TTL_SECONDS = 300;
const usedStates = new Map<string, number>();

type StatePayload = { nonce: string; issuedAt: number; codeVerifier: string };

function sign(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function encode(payload: StatePayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decode(value: string): StatePayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as StatePayload;
    if (typeof parsed.nonce !== "string" || typeof parsed.issuedAt !== "number" || typeof parsed.codeVerifier !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function createOAuthState(secret: string, now = Date.now()) {
  const payload: StatePayload = {
    nonce: randomBytes(32).toString("base64url"),
    issuedAt: Math.floor(now / 1000),
    codeVerifier: randomBytes(32).toString("base64url"),
  };
  const encoded = encode(payload);
  const cookieValue = `${encoded}.${sign(secret, encoded)}`;
  const challenge = createHash("sha256").update(payload.codeVerifier).digest("base64url");
  return { state: payload.nonce, codeVerifier: payload.codeVerifier, challenge, cookieValue };
}

export function verifyOAuthState(state: string | null, cookieValue: string | undefined, secret: string, now = Date.now()) {
  if (!state || !cookieValue) return null;
  const separator = cookieValue.lastIndexOf(".");
  if (separator <= 0) return null;
  const encoded = cookieValue.slice(0, separator);
  const received = Buffer.from(cookieValue.slice(separator + 1));
  const expected = Buffer.from(sign(secret, encoded));
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null;
  const payload = decode(encoded);
  if (!payload || payload.nonce !== state) return null;
  const age = Math.floor(now / 1000) - payload.issuedAt;
  if (age < 0 || age > OAUTH_STATE_TTL_SECONDS) return null;
  const replayKey = `${secret}:${encoded}`;
  for (const [key, expiresAt] of usedStates) {
    if (expiresAt <= now) usedStates.delete(key);
  }
  if (usedStates.has(replayKey)) return null;
  usedStates.set(replayKey, now + OAUTH_STATE_TTL_SECONDS * 1000);
  return { codeVerifier: payload.codeVerifier };
}

export function escapeInlineJson(value: string): string {
  return value.replace(/[<>&\u2028\u2029]/g, (character) => ({
    "<": "\\u003c", ">": "\\u003e", "&": "\\u0026", "\u2028": "\\u2028", "\u2029": "\\u2029",
  })[character] ?? character);
}
