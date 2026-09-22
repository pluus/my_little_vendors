export function toBusiness(row: Record<string, any>) {
  return {
    id: row.id,
    like: row.like_count,
    name: row.name,
    description: row.description,
    categories: row.categories,
    location: row.location,
    tags: row.tags,
    cover: row.cover,
    images: row.images,
    gallery: row.gallery,
    hours: row.hours,
    website: row.website,
    instagram: row.instagram,
    kakao: row.kakao,
    email: row.email,
    phone: row.phone,
    featured: row.featured,
    isPlaceholder: row.is_placeholder,
    funFact: row.fun_fact,
    slug: row.slug,
    vendorOfWeek: row.vendor_of_week,
    vendor: row.vendor_name
      ? {
          name: row.vendor_name,
          story: row.vendor_story ?? undefined,
          quote: row.vendor_quote || undefined,
          journey: row.vendor_journey || undefined,
          passion: row.vendor_passion || undefined,
          image: row.vendor_image || undefined,
        }
      : undefined,
  };
}
