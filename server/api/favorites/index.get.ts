import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  await ensureSchema();
  const result = await sql`
    SELECT business_id FROM favorites WHERE user_id = ${session.user.id}
  `;
  return result.rows.map((row) => row.business_id as number);
});
