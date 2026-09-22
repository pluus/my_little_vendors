import { getServiceClient } from "~~/server/utils/admin";

export default defineEventHandler(async () => {
  const client = getServiceClient();

  const [{ data: categories, error: catError }, { count, error: countError }] =
    await Promise.all([
      client.from("categories").select("name").order("sort_order"),
      client.from("businesses").select("*", { count: "exact", head: true }),
    ]);

  if (catError) throw createError({ statusCode: 500, statusMessage: catError.message });
  if (countError) throw createError({ statusCode: 500, statusMessage: countError.message });

  return [`전체(${count ?? 0})`, ...categories.map((c) => c.name)];
});
