export function useAdminApi() {
  const { client: supabase } = useSupabaseClient();

  async function authHeader() {
    const { data } = (await supabase?.auth.getSession()) ?? { data: null };
    const token = data?.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function adminFetch<T>(url: string, opts: Parameters<typeof $fetch>[1] = {}) {
    return $fetch<T>(url, {
      ...opts,
      headers: { ...(await authHeader()), ...(opts?.headers as object) },
    });
  }

  return { adminFetch };
}
