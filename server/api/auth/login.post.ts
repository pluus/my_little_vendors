import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: unknown; password: unknown }>(event);

  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body?.password ?? "");

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "이메일과 비밀번호를 입력해주세요.",
    });
  }

  await ensureSchema();

  const result = await sql`
    SELECT id, name, email, password_hash
    FROM users
    WHERE email = ${email}
  `;

  // Use a fixed-time comparison even when user doesn't exist to prevent
  // timing-based user enumeration attacks
  const dummyHash =
    "$2a$12$invalidhashpaddingtomatchbcryptlength00000000000000000000";
  const storedHash =
    result.rows.length > 0
      ? (result.rows[0].password_hash as string)
      : dummyHash;

  const valid = await bcrypt.compare(password, storedHash);

  if (result.rows.length === 0 || !valid) {
    throw createError({
      statusCode: 401,
      message: "이메일 또는 비밀번호가 올바르지 않습니다.",
    });
  }

  const user = result.rows[0];

  await setUserSession(event, {
    user: {
      id: `email:${user.id as number}`,
      name: user.name as string,
      email: user.email as string,
      avatar: "",
    },
  });

  return { success: true };
});
