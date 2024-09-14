import { wixBrowserClient } from "@/lib/wix-client.browser";
import { addToCart } from "@/wix-api/cart";
import { products } from "@wix/stores";
import { Button, ButtonProps } from "./ui/button";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  return (
    <Button
      onClick={() =>
        addToCart(wixBrowserClient, {
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
    >
      Add to cart
    </Button>
  );
}
