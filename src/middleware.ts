import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { WIX_SESSION_COOKIE } from "./lib/constants";

const wixClient = createClient({
  auth: OAuthStrategy({ clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID }),
});

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const sessionCookie = cookies.get(WIX_SESSION_COOKIE);

  let sessionTokens = sessionCookie
    ? (JSON.parse(sessionCookie.value) as Tokens)
    : await wixClient.auth.generateVisitorTokens();

  if (sessionTokens.accessToken.expiresAt < Math.floor(Date.now() / 1000)) {
    try {
      sessionTokens = await wixClient.auth.renewToken(
        sessionTokens.refreshToken,
      );
    } catch (error) {
      sessionTokens = await wixClient.auth.generateVisitorTokens();
    }
  }

  request.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens));

  const res = NextResponse.next({ request });

  res.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens), {
    maxAge: 60 * 60 * 24 * 14,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
