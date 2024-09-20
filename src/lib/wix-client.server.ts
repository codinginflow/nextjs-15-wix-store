import { env } from "@/env";
import { files } from "@wix/media";
import { ApiKeyStrategy, createClient, Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { cache } from "react";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";

export const getWixServerClient = cache(() => {
  let tokens: Tokens | undefined;

  try {
    tokens = JSON.parse(cookies().get(WIX_SESSION_COOKIE)?.value || "{}");
  } catch (error) {}

  return getWixClient(tokens);
});

export const getWixAdminClient = cache(() => {
  const wixClient = createClient({
    modules: {
      files,
    },
    auth: ApiKeyStrategy({
      apiKey: env.WIX_API_KEY,
      siteId: env.NEXT_PUBLIC_WIX_SITE_ID,
    }),
  });

  return wixClient;
});
