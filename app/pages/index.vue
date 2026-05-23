<template>
  <div>
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4"
      >
        <span class="mb-5 inline-block">이웃주민의 작은 가게를,</span><br />
        <span class="text-amber-400">함께 응원해요.</span>
      </h1>
      <p class="text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
        직접 발굴한 소상공인과 홈비즈니스<br />— 진짜 사람들이 만들는 진짜
        물건들.
      </p>
    </section>

    <!-- Preview image -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
      <img
        src="/images/preview/thumbnail.png"
        alt="My Little Vendors preview"
        class="w-full rounded-3xl"
      />
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
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <template v-for="(biz, i) in filteredBusinesses" :key="biz.id">
          <div
            class="rounded-3xl transition-all duration-200"
            :class="
              selectedBusiness?.id === biz.id
                ? 'ring-2 ring-amber-400 ring-offset-2'
                : ''
            "
          >
            <BusinessCard :business="biz" @open="selectVendor($event)" />
          </div>
          <!-- Panel injected after the last card in the clicked card's row -->
          <div v-if="i === panelAfterIndex" class="col-span-full">
            <BusinessPanel
              :business="selectedBusiness"
              @close="selectedBusiness = null"
            />
          </div>
        </template>
      </div>

      <!-- Empty state -->
      <div v-if="!filteredBusinesses.length" class="text-center py-24">
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
  </div>
</template>

<script setup lang="ts">
import { businesses, categories } from "~/data/businesses";
import type { Business } from "~/types/business";

useHead({
  title: "My Little Vendors — 우리들의 소상공인",
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

// Shuffle (Fisher-Yates) — runs only on mount to avoid SSR hydration mismatch
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const shuffledBusinesses = ref([...businesses]);
const realBusinesses = businesses.filter((b) => !b.isPlaceholder);
const weeklyPick = ref(realBusinesses[0] ?? businesses[0]);

onMounted(() => {
  shuffledBusinesses.value = shuffle(businesses);
  const pool = businesses.filter((b) => !b.isPlaceholder);
  weeklyPick.value =
    pool[Math.floor(Math.random() * pool.length)] ?? businesses[0];
});

// Track visible column count to compute panel row position
const gridCols = ref(1);
if (import.meta.client) {
  const updateCols = () => {
    if (window.innerWidth >= 1024) gridCols.value = 3;
    else if (window.innerWidth >= 640) gridCols.value = 2;
    else gridCols.value = 1;
  };
  onMounted(() => {
    updateCols();
    window.addEventListener("resize", updateCols);
  });
  onUnmounted(() => window.removeEventListener("resize", updateCols));
}

// Index of the last card in the same row as the selected card
const panelAfterIndex = computed(() => {
  if (!selectedBusiness.value) return -1;
  const idx = filteredBusinesses.value.findIndex(
    (b) => b.id === selectedBusiness.value!.id,
  );
  if (idx === -1) return -1;
  const rowEnd = Math.ceil((idx + 1) / gridCols.value) * gridCols.value - 1;
  return Math.min(rowEnd, filteredBusinesses.value.length - 1);
});

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
  let list = [...shuffledBusinesses.value];

  if (activeCategory.value !== "전체") {
    list = list.filter((b) => b.category === activeCategory.value);
  }

  const raw = debouncedSearch.value.trim();
  if (!raw)
    return list.sort(
      (a, b) => Number(a.isPlaceholder) - Number(b.isPlaceholder),
    );

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

  // Sort by descending relevance score, non-placeholders always first
  return list.sort((a, b) => {
    const placeholderDiff = Number(a.isPlaceholder) - Number(b.isPlaceholder);
    if (placeholderDiff !== 0) return placeholderDiff;
    return scoreMatch(b, tokens) - scoreMatch(a, tokens);
  });
});

function reset() {
  activeCategory.value = "전체";
  searchQuery.value = "";
}

// Unified vendor selection — handles scroll for both card clicks and featured banner
async function selectVendor(biz: Business) {
  selectedBusiness.value = selectedBusiness.value?.id === biz.id ? null : biz;
  if (!selectedBusiness.value) return;
  await nextTick();
  setTimeout(() => {
    const el = document.getElementById("business-panel");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  }, 80);
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
