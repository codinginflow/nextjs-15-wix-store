import { WixClient } from "@/lib/wix-client.base";

export async function getOrder(wixClient: WixClient, orderId: string) {
  try {
    return await wixClient.orders.getOrder(orderId);
  } catch (error) {
    if ((error as any).details.applicationError.code === "NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}

export interface GetUserOrderFilters {
  limit?: number;
  cursor?: string | null;
}

export async function getUserOrders(
  wixClient: WixClient,
  { limit, cursor }: GetUserOrderFilters,
) {
  return wixClient.orders.searchOrders({
    search: {
      cursorPaging: {
        limit,
        cursor,
      },
    },
  });
}
