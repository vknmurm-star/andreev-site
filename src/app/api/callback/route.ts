import { NextRequest, NextResponse } from "next/server";
import {
  escapeInlineJson,
  OAUTH_ORIGIN,
  OAUTH_REDIRECT_URI,
  OAUTH_STATE_COOKIE,
  verifyOAuthState,
} from "@/lib/githubOAuth";

function noStoreHeaders() {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
  };
}

function finish(response: NextResponse) {
  response.cookies.set(OAUTH_STATE_COOKIE, "", { maxAge: 0, httpOnly: true, secure: true, sameSite: "lax", path: "/api" });
  return response;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const stateSecret = process.env.GITHUB_OAUTH_STATE_SECRET;
  const stateResult = stateSecret ? verifyOAuthState(state, req.cookies.get(OAUTH_STATE_COOKIE)?.value, stateSecret) : null;

  if (!code || !stateResult || !clientId || !clientSecret) {
    return finish(NextResponse.json({ error: "Invalid or expired GitHub OAuth request" }, { status: 400, headers: noStoreHeaders() }));
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: OAUTH_REDIRECT_URI,
      code_verifier: stateResult.codeVerifier,
    }),
    cache: "no-store",
  });

  const tokenData = (await tokenRes.json()) as { error?: string; access_token?: string };

  if (!tokenRes.ok || tokenData.error || !tokenData.access_token) {
    return finish(NextResponse.json({ error: "GitHub OAuth exchange failed" }, { status: 400, headers: noStoreHeaders() }));
  }

  // Decap CMS expects the token delivered via postMessage to the opener window
  const message = escapeInlineJson(`authorization:github:success:${JSON.stringify({ token: tokenData.access_token })}`);
  const script = `<!doctype html><meta charset="utf-8"><script>
    (function () {
      var targetOrigin = ${JSON.stringify(OAUTH_ORIGIN)};
      var message = ${JSON.stringify(message)};
      function receiveMessage(event) {
        if (event.origin !== targetOrigin || event.source !== window.opener || event.data !== 'authorizing:github') return;
        window.removeEventListener('message', receiveMessage, false);
        if (window.opener) window.opener.postMessage(message, targetOrigin);
        window.close();
      }
      window.addEventListener('message', receiveMessage, false);
      if (window.opener) window.opener.postMessage('authorizing:github', targetOrigin);
    })();
  </script>`;

  return finish(new NextResponse(script, { headers: { ...noStoreHeaders(), "Content-Type": "text/html; charset=utf-8", "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; object-src 'none'" } }));
}
