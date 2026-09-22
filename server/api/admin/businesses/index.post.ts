import { getServiceClient, requireAdmin } from "~~/server/utils/admin";
import { pickBusinessFields } from "~~/server/utils/business-fields";

export default defineEventHandler(async (event) => {
  await requireAdmin(event);

  const body = await readBody(event);
  const payload = pickBusinessFields(body);

  if (!payload.slug || !payload.name) {
    throw createError({
      statusCode: 400,
      statusMessage: "slug and name are required.",
    });
  }

  const client = getServiceClient();
  const { data, error } = await client
    .from("businesses")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data;
});
