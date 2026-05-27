import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const body = await readBody<{ businessId: unknown }>(event);
  const businessId = Number(body?.businessId);
  if (!Number.isInteger(businessId) || businessId <= 0) {
    throw createError({ statusCode: 400, message: "Invalid businessId" });
  }

  await ensureSchema();
  await sql`
    INSERT INTO favorites (user_id, business_id)
    VALUES (${session.user.id}, ${businessId})
    ON CONFLICT DO NOTHING
  `;
  return { success: true };
});
