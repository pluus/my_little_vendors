import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: unknown;
    password: unknown;
    name: unknown;
  }>(event);

  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body?.password ?? "");
  const name = String(body?.name ?? "").trim();

  if (!email || !password || !name) {
    throw createError({
      statusCode: 400,
      message: "모든 항목을 입력해주세요.",
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      message: "올바른 이메일 주소를 입력해주세요.",
    });
  }
  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: "비밀번호는 8자 이상이어야 합니다.",
    });
  }

  await ensureSchema();

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
  if (existing.rows.length > 0) {
    throw createError({
      statusCode: 409,
      message: "이미 사용 중인 이메일입니다.",
    });
  }

  const hash = await bcrypt.hash(password, 12);
  const result = await sql`
    INSERT INTO users (email, password_hash, name)
    VALUES (${email}, ${hash}, ${name})
    RETURNING id
  `;

  const userId = result.rows[0].id as number;

  await setUserSession(event, {
    user: {
      id: `email:${userId}`,
      name,
      email,
      avatar: "",
    },
  });

  return { success: true };
});
