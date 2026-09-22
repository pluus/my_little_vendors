import { getServiceClient, requireAdmin } from "~~/server/utils/admin";
import { pickBusinessFields } from "~~/server/utils/business-fields";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const payload = pickBusinessFields(body);

  const client = getServiceClient();
  const { data, error } = await client
    .from("businesses")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data;
});
