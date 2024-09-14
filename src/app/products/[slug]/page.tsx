import { delay } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getProductBySlug } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(getWixServerClient(), slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: "Get this product on Flow Shop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  await delay(3000);

  const product = await getProductBySlug(getWixServerClient(), slug);

  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
    </main>
  );
}
