import { getServiceClient } from "~~/server/utils/admin";
import { toBusiness } from "~~/server/utils/public-businesses";

export default defineEventHandler(async () => {
  const client = getServiceClient();
  const { data, error } = await client
    .from("businesses")
    .select("*")
    .eq("published", true)
    .order("id");

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data.map(toBusiness);
});
