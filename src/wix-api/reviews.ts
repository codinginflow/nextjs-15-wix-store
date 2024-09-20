import { WixClient } from "@/lib/wix-client.base";
import { getLoggedInMember } from "./members";

export interface CreateProductReviewValues {
  productId: string;
  title: string;
  body: string;
  rating: number;
  media: { url: string; type: "image" | "video" }[];
}

export async function createProductReview(
  wixClient: WixClient,
  { productId, title, body, rating, media }: CreateProductReviewValues,
) {
  const member = await getLoggedInMember(wixClient);

  if (!member) {
    throw Error("Must be logged in to create a review");
  }

  const authorName =
    member.contact?.firstName && member.contact?.lastName
      ? `${member.contact.firstName} ${member.contact.lastName}`
      : member.contact?.firstName ||
        member.contact?.lastName ||
        member.profile?.nickname ||
        "Anonymous";

  return wixClient.reviews.createReview({
    author: {
      authorName,
      contactId: member.contactId,
    },
    entityId: productId,
    namespace: "stores",
    content: {
      title,
      body,
      rating,
      media: media.map(({ url, type }) =>
        type === "image" ? { image: url } : { video: url },
      ),
    },
  });
}

interface GetProductReviewsFilters {
  productId: string;
  contactId?: string;
  limit?: number;
  cursor?: string | null;
}

export async function getProductReviews(
  wixClient: WixClient,
  { productId, contactId, limit, cursor }: GetProductReviewsFilters,
) {
  let query = wixClient.reviews.queryReviews().eq("entityId", productId);

  if (contactId) {
    // @ts-expect-error
    query = query.eq("author.contactId", contactId);
  }

  if (limit) {
    query = query.limit(limit);
  }

  if (cursor) {
    query = query.skipTo(cursor);
  }

  return query.find();
}
