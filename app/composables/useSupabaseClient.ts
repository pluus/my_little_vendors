import { createClient } from "@supabase/supabase-js";

export function useSupabaseClient() {
  const config = useRuntimeConfig();
  const isConfigured =
    Boolean(config.public.supabaseUrl) &&
    Boolean(config.public.supabaseAnonKey);

  const client = useState("supabase-client", () => {
    if (!isConfigured) return null;
    return createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey,
    );
  });

  return {
    client: client.value,
    isConfigured,
  };
}
