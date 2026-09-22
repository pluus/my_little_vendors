export function useIsAdmin() {
  const isAdmin = useState<boolean>("is-admin", () => false);
  const { client: supabase, isConfigured } = useSupabaseClient();

  if (import.meta.client && supabase && isConfigured) {
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) {
        isAdmin.value = false;
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();
      isAdmin.value = Boolean(profile?.is_admin);
    });
  }

  return { isAdmin };
}
