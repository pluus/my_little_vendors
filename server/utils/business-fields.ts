export const BUSINESS_FIELDS = [
  "slug",
  "name",
  "description",
  "categories",
  "location",
  "tags",
  "cover",
  "images",
  "gallery",
  "hours",
  "website",
  "instagram",
  "kakao",
  "email",
  "phone",
  "is_placeholder",
  "published",
  "fun_fact",
  "vendor_of_week",
  "vendor_name",
  "vendor_story",
  "vendor_quote",
  "vendor_journey",
  "vendor_passion",
  "vendor_image",
  "like_count",
] as const;

export function pickBusinessFields(body: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const key of BUSINESS_FIELDS) {
    if (key in body) result[key] = body[key];
  }
  return result;
}
