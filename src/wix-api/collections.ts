import { WixClient } from "@/lib/wix-client.base";

export async function getCollectionBySlug(wixClient: WixClient, slug: string) {
  const { collection } = await wixClient.collections.getCollectionBySlug(slug);

  return collection || null;
}
