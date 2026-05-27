import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const id = parseInt(getRouterParam(event, "id") ?? "");
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, message: "Invalid id" });
  }

  await sql`
    DELETE FROM favorites
    WHERE user_id = ${session.user.id} AND business_id = ${id}
  `;
  return { success: true };
});
