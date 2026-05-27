<template>
  <header
    class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
        <span
          class="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-white font-bold text-sm"
          >m</span
        >
        <span class="font-semibold text-stone-800 text-base tracking-tight"
          >My Little Vendors</span
        >
      </NuxtLink>

      <!-- Search bar (desktop) -->
      <div class="hidden sm:flex flex-1 max-w-sm">
        <div class="relative w-full">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            v-model="search"
            type="text"
            placeholder="가게 검색…"
            class="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder:text-stone-400 transition"
          />
        </div>
      </div>

      <!-- Nav actions -->
      <nav class="flex items-center gap-2">
        <a
          href="https://forms.gle/5i7Bn9vaF8GYuLnu6"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-sm font-medium transition-colors"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          가게 무료 등록
        </a>

        <!-- Authenticated: saved link + user menu -->
        <template v-if="loggedIn">
          <NuxtLink
            to="/saved"
            class="p-2 rounded-full hover:bg-stone-100 transition"
            title="저장한 가게"
          >
            <svg
              class="w-5 h-5 text-stone-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </NuxtLink>

          <!-- User avatar dropdown -->
          <div class="relative" ref="userMenuRef">
            <button
              class="flex items-center gap-1.5 rounded-full hover:ring-2 hover:ring-amber-300 transition"
              @click="userMenuOpen = !userMenuOpen"
            >
              <img
                v-if="user?.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="w-8 h-8 rounded-full object-cover"
                referrerpolicy="no-referrer"
              />
              <span
                v-else
                class="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-semibold text-stone-600"
              >
                {{ user?.name?.[0] ?? "U" }}
              </span>
            </button>

            <Transition name="fade">
              <div
                v-if="userMenuOpen"
                class="absolute right-0 top-10 w-44 bg-white rounded-2xl shadow-lg border border-stone-100 py-1.5 z-50"
              >
                <p class="px-4 py-2 text-xs text-stone-400 truncate">
                  {{ user?.email }}
                </p>
                <hr class="border-stone-100 my-1" />
                <NuxtLink
                  to="/saved"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                  @click="userMenuOpen = false"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  저장한 가게
                </NuxtLink>
                <button
                  class="flex w-full items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                  @click="logout"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  로그아웃
                </button>
              </div>
            </Transition>
          </div>
        </template>

        <!-- Unauthenticated: login button -->
        <NuxtLink
          v-else
          to="/login"
          class="flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-200 hover:border-stone-300 text-stone-600 text-sm font-medium transition-colors"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          <span class="hidden sm:inline">로그인</span>
        </NuxtLink>

        <!-- Mobile search toggle -->
        <button
          class="sm:hidden p-2 rounded-full hover:bg-stone-100 transition"
          @click="mobileSearch = !mobileSearch"
        >
          <svg
            class="w-5 h-5 text-stone-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </nav>
    </div>

    <!-- Mobile search bar -->
    <Transition name="slide-down">
      <div
        v-if="mobileSearch"
        class="sm:hidden px-4 pb-3 border-t border-stone-100"
      >
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            v-model="search"
            type="text"
            placeholder="가게 검색…"
            class="w-full pl-9 pr-4 py-2.5 text-sm rounded-full border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder:text-stone-400 transition"
          />
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const search = useSearch();
const mobileSearch = ref(false);
const userMenuOpen = ref(false);
const userMenuRef = ref<HTMLElement | null>(null);

const {
  loggedIn,
  user,
  clear: clearSession,
  fetch: fetchSession,
} = useUserSession();
const { fetchFavorites } = useFavorites();

// Fetch favorites when the session is ready
watch(
  loggedIn,
  (val) => {
    if (val) fetchFavorites();
  },
  { immediate: true },
);

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", onClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});
function onClickOutside(e: MouseEvent) {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target as Node)) {
    userMenuOpen.value = false;
  }
}

async function logout() {
  userMenuOpen.value = false;
  await clearSession();
  await fetchSession();
  await navigateTo("/");
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
