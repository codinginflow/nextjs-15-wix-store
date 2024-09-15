import { WIX_STORES_APP_ID_BACK_IN_STOCK_NOTIFICATIONS } from "@/lib/constants";
import { findVariant } from "@/lib/utils";
import { WixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";

export interface BackInStockNotificationRequestValues {
  email: string;
  itemUrl: string;
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export async function createBackInStockNotificationRequest(
  wixClient: WixClient,
  {
    email,
    itemUrl,
    product,
    selectedOptions,
  }: BackInStockNotificationRequestValues,
) {
  const selectedVariant = findVariant(product, selectedOptions);

  await wixClient.backInStockNotifications.createBackInStockNotificationRequest(
    {
      email,
      itemUrl,
      catalogReference: {
        appId: WIX_STORES_APP_ID_BACK_IN_STOCK_NOTIFICATIONS,
        catalogItemId: product._id,
        options: selectedVariant
          ? {
              variantId: selectedVariant._id,
            }
          : { options: selectedOptions },
      },
    },
    {
      name: product.name || undefined,
      price: product.priceData?.discountedPrice?.toFixed(2),
      image: product.media?.mainMedia?.image?.url,
    },
  );
}
