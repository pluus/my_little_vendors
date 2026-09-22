import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function useSupabaseClient() {
  const config = useRuntimeConfig();
  const isConfigured =
    Boolean(config.public.supabaseUrl) &&
    Boolean(config.public.supabaseAnonKey);

  // The client holds live sockets/timers and isn't serializable, so it must
  // never go through Nuxt's SSR payload (useState). It's browser-only.
  if (!import.meta.client || !isConfigured) {
    return { client: null, isConfigured };
  }

  if (!browserClient) {
    browserClient = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey,
    );
  }

  return { client: browserClient, isConfigured };
}
