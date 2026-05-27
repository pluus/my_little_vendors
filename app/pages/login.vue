<template>
  <div
    class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12"
  >
    <div class="w-full max-w-sm">
      <!-- Logo mark -->
      <div class="flex justify-center mb-8">
        <NuxtLink to="/" class="flex items-center gap-2">
          <span
            class="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-white font-bold text-base"
            >m</span
          >
          <span class="font-semibold text-stone-800 text-lg tracking-tight"
            >My Little Vendors</span
          >
        </NuxtLink>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
        <!-- Tabs -->
        <div class="flex gap-1 p-1 bg-stone-100 rounded-2xl mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
            :class="
              activeTab === tab.id
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            "
            @click="
              activeTab = tab.id;
              errorMsg = '';
            "
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Error message -->
        <Transition name="fade">
          <p
            v-if="errorMsg"
            class="mb-4 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 text-xs text-center"
          >
            {{ errorMsg }}
          </p>
        </Transition>

        <!-- Login form -->
        <form
          v-if="activeTab === 'login'"
          class="flex flex-col gap-3"
          @submit.prevent="submitLogin"
        >
          <input
            v-model="form.email"
            type="email"
            placeholder="이메일"
            autocomplete="email"
            required
            class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder:text-stone-400 transition"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="비밀번호"
            autocomplete="current-password"
            required
            class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder:text-stone-400 transition"
          />
          <button
            type="submit"
            :disabled="pending"
            class="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            {{ pending ? "로그인 중…" : "로그인" }}
          </button>
        </form>

        <!-- Register form -->
        <form
          v-else
          class="flex flex-col gap-3"
          @submit.prevent="submitRegister"
        >
          <input
            v-model="form.name"
            type="text"
            placeholder="이름"
            autocomplete="name"
            required
            class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder:text-stone-400 transition"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="이메일"
            autocomplete="email"
            required
            class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder:text-stone-400 transition"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="비밀번호 (8자 이상)"
            autocomplete="new-password"
            required
            minlength="8"
            class="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder:text-stone-400 transition"
          />
          <button
            type="submit"
            :disabled="pending"
            class="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            {{ pending ? "가입 중…" : "회원가입" }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-5">
          <hr class="flex-1 border-stone-200" />
          <span class="text-xs text-stone-400">또는</span>
          <hr class="flex-1 border-stone-200" />
        </div>

        <!-- Google OAuth -->
        <a
          href="/auth/google"
          class="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-medium transition-colors"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google로 계속하기
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: "로그인" });

const { fetch: fetchSession } = useUserSession();
const { fetchFavorites } = useFavorites();

const tabs = [
  { id: "login", label: "로그인" },
  { id: "register", label: "회원가입" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const activeTab = ref<TabId>("login");
const pending = ref(false);
const errorMsg = ref("");

const form = reactive({ name: "", email: "", password: "" });

async function submitLogin() {
  errorMsg.value = "";
  pending.value = true;
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: form.email, password: form.password },
    });
    await fetchSession();
    await fetchFavorites();
    await navigateTo("/");
  } catch (err: unknown) {
    errorMsg.value =
      (err as { data?: { message?: string } })?.data?.message ??
      "로그인에 실패했습니다.";
  } finally {
    pending.value = false;
  }
}

async function submitRegister() {
  errorMsg.value = "";
  pending.value = true;
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: { name: form.name, email: form.email, password: form.password },
    });
    await fetchSession();
    await fetchFavorites();
    await navigateTo("/");
  } catch (err: unknown) {
    errorMsg.value =
      (err as { data?: { message?: string } })?.data?.message ??
      "회원가입에 실패했습니다.";
  } finally {
    pending.value = false;
  }
}
</script>
