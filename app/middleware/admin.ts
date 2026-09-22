export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const { client: supabase, isConfigured } = useSupabaseClient();
  if (!supabase || !isConfigured) {
    return navigateTo("/signin");
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;
  if (!user) {
    return navigateTo(`/signin?redirect=${encodeURIComponent(to.fullPath)}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return navigateTo("/");
  }
});
