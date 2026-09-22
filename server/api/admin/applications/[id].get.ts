import { getServiceClient, requireAdmin } from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const id = getRouterParam(event, "id");
  const client = getServiceClient();
  const { data, error } = await client
    .from("vendor_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw createError({ statusCode: 404, statusMessage: "Not found." });
  }

  return data;
});
