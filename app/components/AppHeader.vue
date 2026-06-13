<template>
  <header
    class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
    >
      <!-- Logo -->
      <NuxtLink to="/?reset=true" class="flex items-center gap-2 shrink-0">
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

      <!-- Nav actions (desktop) -->
      <nav class="hidden sm:flex items-center gap-2">
        <NuxtLink
          to="/about"
          class="w-full sm:w-auto flex sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition-colors"
        >
          <span class="flex-1 text-center sm:text-left">웹사이트 소개</span>
        </NuxtLink>
        <!-- <NuxtLink
          to="/group-buying"
          class="w-full sm:w-auto flex sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition-colors"
        >
          <span class="flex-1 text-center sm:text-left">공동구매</span>
        </NuxtLink> -->
        <NuxtLink
          to="/updates"
          class="w-full sm:w-auto flex sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 text-sm font-medium transition-colors"
        >
          <span class="flex-1 text-center sm:text-left">최근 소식</span>
        </NuxtLink>
        <!-- <NuxtLink
          to="/signin"
          class="w-full sm:w-auto flex sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-sm font-medium transition-colors"
        >
          <span class="flex-1 text-center sm:text-left">로그인</span>
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="w-full sm:w-auto flex sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 hover:border-stone-400 text-stone-700 text-sm font-medium transition-colors"
        >
          <span class="flex-1 text-center sm:text-left">회원가입</span>
        </NuxtLink> -->
        <a
          href="https://forms.gle/AsR5kSVsZrvmFRwq7"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto flex sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-sm font-medium transition-colors"
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
          <span class="flex-1 text-center sm:text-left">가게 추천하기</span>
        </a>
      </nav>
      <!-- Hamburger menu (mobile) -->
      <div class="sm:hidden flex items-center gap-2">
        <button
          class="p-2 rounded-full hover:bg-stone-100 transition"
          @click="mobileMenu = !mobileMenu"
        >
          <svg
            class="w-6 h-6 text-stone-700"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <!-- Mobile search toggle -->
        <button
          class="p-2 rounded-full hover:bg-stone-100 transition"
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
      </div>
      <!-- Mobile menu dropdown -->
      <Transition name="fade">
        <div
          v-if="mobileMenu"
          class="sm:hidden absolute top-16 left-0 w-full bg-white border-b border-stone-100 shadow z-40 animate-fade-in"
        >
          <div class="flex flex-col gap-2 px-4 py-4">
            <NuxtLink
              to="/about"
              class="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-base font-medium transition-colors"
              @click="mobileMenu = false"
            >
              웹사이트 소개
            </NuxtLink>
            <NuxtLink
              to="/group-buying"
              class="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-base font-medium transition-colors"
              @click="mobileMenu = false"
            >
              공동구매 📦
            </NuxtLink>
            <NuxtLink
              to="/updates"
              class="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-base font-medium transition-colors"
              @click="mobileMenu = false"
            >
              최근 소식
            </NuxtLink>
            <!-- <NuxtLink
              to="/signin"
              class="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-base font-medium transition-colors"
              @click="mobileMenu = false"
            >
              로그인
            </NuxtLink>
            <NuxtLink
              to="/signup"
              class="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-base font-medium transition-colors"
              @click="mobileMenu = false"
            >
              회원가입
            </NuxtLink> -->
            <a
              href="https://forms.gle/AsR5kSVsZrvmFRwq7"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-base font-medium transition-colors"
            >
              <svg
                class="w-4 h-4"
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
              가게 추천하기
            </a>
          </div>
        </div>
      </Transition>
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
const mobileMenu = ref(false);
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
