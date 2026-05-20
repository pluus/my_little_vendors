<template>
  <div>
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
      <div
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-medium mb-5"
      >
        🛒️ 당신 주변의 소상공인을 발견해보세요
      </div>
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4"
      >
        작은 가게를,<br />
        <span class="text-amber-400">함께 응원해요.</span>
      </h1>
      <p class="text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
        직접 발굴한 소상공인과 홈비즈니스 — 진짜 사람들이 만들는 진짜 물건들.
      </p>
    </section>

    <!-- Category filter -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
      <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          class="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="
            activeCategory === cat
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
          "
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Featured banner (only when All selected) -->
    <section
      v-if="activeCategory === '전체' && !searchQuery"
      class="max-w-6xl mx-auto px-4 sm:px-6 mb-10"
    >
      <div
        class="rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-100 px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center gap-6"
      >
        <div class="flex-1 text-center sm:text-left">
          <p
            class="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2"
          >
            이번 주 추천
          </p>
          <h2 class="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            {{ featured[0].name }}
          </h2>
          <p class="text-stone-500 text-sm mb-5 max-w-xs">
            {{ featured[0].description }}
          </p>
          <button
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
            @click="selectedBusiness = featured[0]"
          >
            자세히 보기
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
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
        <div
          class="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden shrink-0 shadow-lg"
        >
          <img
            :src="featured[0].cover"
            :alt="featured[0].name"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <!-- Result count / active query badge -->
      <Transition name="fade">
        <div
          v-if="debouncedSearch.trim()"
          class="flex items-center justify-between mb-5"
        >
          <p class="text-sm text-stone-500">
            <span class="font-semibold text-stone-800"
              >{{ filteredBusinesses.length }}개</span
            >
            결과 &middot;
            <span class="text-amber-600"
              >&ldquo;{{ debouncedSearch }}&rdquo;</span
            >
          </p>
          <button
            class="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 transition-colors"
            @click="searchQuery = ''"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            검색 초기화
          </button>
        </div>
      </Transition>
      <div
        v-if="filteredBusinesses.length"
        class="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
      >
        <div
          v-for="biz in filteredBusinesses"
          :key="biz.id"
          class="break-inside-avoid"
        >
          <BusinessCard :business="biz" @open="selectedBusiness = $event" />
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-24">
        <p class="text-4xl mb-4">🔍</p>
        <h3 class="font-semibold text-stone-700 mb-1">검색 결과가 없습니다</h3>
        <p class="text-stone-400 text-sm">
          다른 검색어를 사용하거나 전체 카테고리를 탐색해보세요.
        </p>
        <button
          class="mt-4 text-sm text-amber-600 hover:underline"
          @click="reset"
        >
          필터 초기화
        </button>
      </div>
    </section>

    <!-- Business detail modal -->
    <BusinessModal
      :business="selectedBusiness"
      @close="selectedBusiness = null"
    />
  </div>
</template>

<script setup lang="ts">
import { businesses, categories } from "~/data/businesses";
import type { Business } from "~/types/business";

useHead({
  title: "my little vendors — 소상공인 타임",
  meta: [
    {
      name: "description",
      content:
        "직접 발굴한 소상공인과 홈비즈니스를 둘러보세요. 작은 가게를 응원해주세요.",
    },
  ],
});

const route = useRoute();
const searchQuery = useSearch();
const debouncedSearch = useDebouncedSearch(150);
const activeCategory = ref(
  categories.includes(route.query.category as string)
    ? (route.query.category as string)
    : "전체",
);
const selectedBusiness = ref<Business | null>(null);

const featured = computed(() => businesses.filter((b) => b.featured));

// Weighted relevance score for a single business against the search tokens
function scoreMatch(b: Business, tokens: string[]): number {
  const name = b.name.toLowerCase();
  const desc = b.description.toLowerCase();
  const loc = b.location.toLowerCase();
  const tags = b.tags.map((t) => t.toLowerCase());

  return tokens.reduce((total, token) => {
    let s = 0;
    if (name.includes(token)) s += 10;
    if (tags.some((t) => t === token)) s += 6;
    else if (tags.some((t) => t.includes(token))) s += 3;
    if (loc.includes(token)) s += 4;
    if (desc.includes(token)) s += 1;
    return total + s;
  }, 0);
}

const filteredBusinesses = computed(() => {
  let list = [...businesses];

  if (activeCategory.value !== "전체") {
    list = list.filter((b) => b.category === activeCategory.value);
  }

  const raw = debouncedSearch.value.trim();
  if (!raw) return list;

  // Tokenize on whitespace — AND logic: every token must match somewhere
  const tokens = raw.toLowerCase().split(/\s+/).filter(Boolean);

  list = list.filter((b) => {
    const name = b.name.toLowerCase();
    const desc = b.description.toLowerCase();
    const loc = b.location.toLowerCase();
    const tags = b.tags.map((t) => t.toLowerCase());
    return tokens.every(
      (token) =>
        name.includes(token) ||
        desc.includes(token) ||
        loc.includes(token) ||
        tags.some((t) => t.includes(token)),
    );
  });

  // Sort by descending relevance score
  return list.sort((a, b) => scoreMatch(b, tokens) - scoreMatch(a, tokens));
});

function reset() {
  activeCategory.value = "전체";
  searchQuery.value = "";
}
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
