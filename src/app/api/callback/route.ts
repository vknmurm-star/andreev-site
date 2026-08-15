import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing code or GitHub OAuth app credentials" },
      { status: 400 }
    );
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
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error || !tokenData.access_token) {
    return NextResponse.json(
      { error: tokenData.error_description || "OAuth exchange failed" },
      { status: 400 }
    );
  }

  const token = tokenData.access_token;

  // Decap CMS expects the token delivered via postMessage to the opener window
  const script = `
    <script>
      (function() {
        function receiveMessage() {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token })}',
            '*'
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  `;

  return new NextResponse(script, {
    headers: { "Content-Type": "text/html" },
  });
}
