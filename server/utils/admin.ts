import { createClient } from "@supabase/supabase-js";
import type { H3Event } from "h3";

let serviceClient: ReturnType<typeof createClient> | null = null;

export function getServiceClient() {
  if (serviceClient) return serviceClient;

  const config = useRuntimeConfig();
  if (!config.public.supabaseUrl || !config.supabaseServiceRoleKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Supabase is not configured on the server.",
    });
  }

  serviceClient = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  return serviceClient;
}

export async function requireAdmin(event: H3Event) {
  const authHeader = getHeader(event, "authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Not signed in." });
  }

  const client = getServiceClient();
  const { data: userData, error: userError } =
    await client.auth.getUser(token);
  if (userError || !userData.user) {
    throw createError({ statusCode: 401, statusMessage: "Invalid session." });
  }

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("id, is_admin")
    .eq("id", userData.user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    throw createError({ statusCode: 403, statusMessage: "Admins only." });
  }

  return userData.user;
}
