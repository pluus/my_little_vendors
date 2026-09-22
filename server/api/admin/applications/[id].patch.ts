import { getServiceClient, requireAdmin } from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event);

  const id = getRouterParam(event, "id");
  const body = await readBody<{ status: "approved" | "rejected"; admin_note?: string }>(
    event,
  );

  if (!["approved", "rejected"].includes(body.status)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid status." });
  }

  const client = getServiceClient();
  const { data, error } = await client
    .from("vendor_applications")
    .update({
      status: body.status,
      admin_note: body.admin_note ?? null,
      reviewed_by: admin.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data;
});
