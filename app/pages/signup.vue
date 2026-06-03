<template>
  <section
    class="relative overflow-hidden min-h-[calc(100vh-8rem)] bg-gradient-to-b from-amber-50 via-white to-white"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-60"
      aria-hidden="true"
    >
      <div
        class="absolute -top-14 -left-20 w-64 h-64 rounded-full bg-amber-200 blur-3xl"
      />
      <div
        class="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-rose-100 blur-3xl"
      />
    </div>

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div class="grid gap-8 lg:grid-cols-2">
        <div
          class="rounded-3xl border border-amber-100 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-lg"
        >
          <p
            class="text-xs font-semibold tracking-[0.16em] text-amber-700 uppercase"
          >
            Welcome
          </p>
          <h1
            class="mt-3 text-3xl sm:text-4xl font-bold text-stone-900 leading-tight"
          >
            Create your account
          </h1>
          <p class="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            Sign up in four ways and start managing your vendor profile.
          </p>

          <div class="mt-8 space-y-3">
            <button
              class="w-full flex items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:border-stone-300 hover:bg-stone-50 transition disabled:opacity-60"
              :disabled="isBusy"
              @click="signInWithProvider('google')"
            >
              <span
                class="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold"
                >G</span
              >
              Continue with Google
            </button>
            <button
              class="w-full flex items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:border-stone-300 hover:bg-stone-50 transition disabled:opacity-60"
              :disabled="isBusy"
              @click="signInWithProvider('facebook')"
            >
              <span
                class="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold"
                >f</span
              >
              Continue with Facebook
            </button>
            <button
              class="w-full flex items-center justify-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-stone-800 hover:bg-yellow-100 transition disabled:opacity-60"
              :disabled="isBusy"
              @click="signInWithProvider('kakao')"
            >
              <span
                class="w-5 h-5 rounded-full bg-yellow-300 flex items-center justify-center text-[10px] font-bold"
                >K</span
              >
              Continue with KakaoTalk
            </button>
          </div>

          <div class="my-6 flex items-center gap-3">
            <div class="h-px bg-stone-200 flex-1" />
            <span class="text-xs font-medium text-stone-400">OR</span>
            <div class="h-px bg-stone-200 flex-1" />
          </div>

          <form class="space-y-3" @submit.prevent="signUpWithEmail">
            <label class="block">
              <span class="block text-xs font-semibold text-stone-500 mb-1.5"
                >Name (optional)</span
              >
              <input
                v-model="fullName"
                type="text"
                autocomplete="name"
                placeholder="Jane Doe"
                class="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              />
            </label>

            <label class="block">
              <span class="block text-xs font-semibold text-stone-500 mb-1.5"
                >Email</span
              >
              <input
                v-model="email"
                type="email"
                autocomplete="email"
                required
                placeholder="you@example.com"
                class="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              />
            </label>

            <label class="block">
              <span class="block text-xs font-semibold text-stone-500 mb-1.5"
                >Password</span
              >
              <input
                v-model="password"
                type="password"
                autocomplete="new-password"
                required
                minlength="8"
                placeholder="Minimum 8 characters"
                class="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              />
            </label>

            <button
              type="submit"
              class="w-full mt-1 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white hover:bg-stone-700 transition disabled:opacity-60"
              :disabled="isBusy"
            >
              {{
                isSubmittingEmail ? "Creating account..." : "Sign up with email"
              }}
            </button>
          </form>

          <p v-if="statusMessage" class="mt-4 text-sm" :class="statusClass">
            {{ statusMessage }}
          </p>

          <p class="mt-4 text-xs text-stone-500 leading-relaxed">
            By signing up, you agree to Supabase Auth and your account data
            being stored in PostgreSQL.
          </p>
        </div>

        <aside
          class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-lg"
        >
          <h2 class="text-xl font-semibold text-stone-900">
            Supabase Setup Checklist
          </h2>
          <ol
            class="mt-4 space-y-3 text-sm text-stone-600 list-decimal list-inside"
          >
            <li>Create a Supabase project and copy URL + anon key.</li>
            <li>
              Set provider credentials for Google, Facebook, and Kakao in
              Supabase Auth.
            </li>
            <li>Add your redirect URL: {{ redirectUrl }}</li>
            <li>Set env vars in your Nuxt app and restart dev server.</li>
          </ol>

          <div class="mt-5 rounded-2xl bg-stone-50 border border-stone-200 p-4">
            <p class="text-xs font-semibold text-stone-500 mb-2">.env</p>
            <pre
              class="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap"
            ><code>NUXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NUXT_PUBLIC_SITE_URL={{ runtimeSiteUrl }}</code></pre>
          </div>

          <p v-if="!isConfigured" class="mt-4 text-xs text-rose-600">
            Supabase env vars are missing. Add them before testing sign up.
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Provider } from "@supabase/supabase-js";

useHead({
  title: "Sign Up",
  meta: [
    {
      name: "description",
      content:
        "Sign up with Google, Facebook, KakaoTalk, or email and password.",
    },
  ],
});

const config = useRuntimeConfig();
const runtimeSiteUrl = config.public.siteUrl || "http://localhost:3000";

const { client: supabase, isConfigured } = useSupabaseClient();

const fullName = ref("");
const email = ref("");
const password = ref("");
const statusMessage = ref("");
const statusType = ref<"success" | "error" | "info">("info");
const activeProvider = ref<Provider | null>(null);
const isSubmittingEmail = ref(false);

const redirectUrl = computed(() => {
  if (import.meta.client) return `${window.location.origin}/signup`;
  return `${runtimeSiteUrl}/signup`;
});

const isBusy = computed(
  () => activeProvider.value !== null || isSubmittingEmail.value,
);
const statusClass = computed(() => {
  if (statusType.value === "success") return "text-emerald-600";
  if (statusType.value === "error") return "text-rose-600";
  return "text-stone-500";
});

function setStatus(
  message: string,
  type: "success" | "error" | "info" = "info",
) {
  statusMessage.value = message;
  statusType.value = type;
}

async function signInWithProvider(
  provider: Extract<Provider, "google" | "facebook" | "kakao">,
) {
  if (!supabase || !isConfigured) {
    setStatus(
      "Supabase env vars are missing. Set NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_ANON_KEY.",
      "error",
    );
    return;
  }

  try {
    activeProvider.value = provider;
    setStatus(`Redirecting to ${provider}...`, "info");

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl.value,
      },
    });

    if (error) throw error;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "OAuth signup failed.";
    setStatus(message, "error");
  } finally {
    activeProvider.value = null;
  }
}

async function signUpWithEmail() {
  if (!supabase || !isConfigured) {
    setStatus(
      "Supabase env vars are missing. Set NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_ANON_KEY.",
      "error",
    );
    return;
  }

  try {
    isSubmittingEmail.value = true;
    setStatus("Creating account...", "info");

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: redirectUrl.value,
        data: {
          full_name: fullName.value || null,
        },
      },
    });

    if (error) throw error;

    setStatus(
      "Account created. Check your email to confirm your signup.",
      "success",
    );
    password.value = "";
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Email signup failed.";
    setStatus(message, "error");
  } finally {
    isSubmittingEmail.value = false;
  }
}

onMounted(async () => {
  if (!supabase || !isConfigured) return;

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    setStatus(error.message, "error");
    return;
  }

  if (data.session?.user) {
    setStatus(`You are signed in as ${data.session.user.email}.`, "success");
  }
});
</script>
