import { NextResponse } from "next/server";
import {
  createOAuthState,
  OAUTH_ORIGIN,
  OAUTH_REDIRECT_URI,
  OAUTH_STATE_COOKIE,
  OAUTH_STATE_TTL_SECONDS,
} from "@/lib/githubOAuth";

export async function GET() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const stateSecret = process.env.GITHUB_OAUTH_STATE_SECRET;
  if (!clientId || !stateSecret) {
    return NextResponse.json({ error: "GitHub OAuth is not configured" }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }

  const { state, challenge, cookieValue } = createOAuthState(stateSecret);
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", OAUTH_REDIRECT_URI);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", challenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authorizeUrl.toString());
  response.cookies.set(OAUTH_STATE_COOKIE, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api",
    maxAge: OAUTH_STATE_TTL_SECONDS,
  });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-OAuth-Origin", OAUTH_ORIGIN);
  return response;
}
