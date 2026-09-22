import { getServiceClient, requireAdmin } from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const client = getServiceClient();
  const { data, error } = await client
    .from("businesses")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data;
});
