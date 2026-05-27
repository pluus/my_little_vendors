<template>
  <div>
    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4"
      >
        <span class="mb-5 inline-block">이웃주민의 작은 가게를,</span><br />
        <span class="text-amber-400">함께 응원해요.</span>
      </h1>
      <p class="text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
        우리 이웃이 제공하는 특별한 서비스!
      </p>
    </section>

    <!-- Did You Know section -->
    <section
      class="max-w-7xl mx-auto sm:px-6 pb-8 border-2 border-amber-400 rounded-3xl p-6 mb-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Left: 알고 계셨나요? -->
        <div class="rounded-3xl p-8 h-full flex flex-col justify-top">
          <h2
            class="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2"
          >
            <svg
              class="w-6 h-6 text-amber-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            알고 계셨나요?
          </h2>
          <p
            class="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-3"
            v-text="randomDidYouKnow"
          />
        </div>
        <!-- Right: Image -->
        <div>
          <img
            src="/images/web/did_you_know.png"
            alt="My Little Vendors preview"
            class="w-full rounded-3xl"
          />
        </div>
      </div>
    </section>

    <!-- Category filter -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
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
    <section id="listings" class="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
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
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
// Did You Know random content
const didYouKnowList = [
  "밴쿠버에는 1,000개 이상의 한인 소상공인과 홈비즈니스가 있습니다.",
  "소상공인을 응원하는 것은 지역 경제를 살리는 일입니다.",
  "이웃의 작은 가게에서 구매하면 더 따뜻한 커뮤니티가 만들어집니다.",
  "많은 한인 비즈니스가 가족 단위로 운영되고 있습니다.",
  "홈비즈니스는 창의적인 아이디어와 열정으로 시작되는 경우가 많아요.",
  "작은 가게의 추천은 큰 힘이 됩니다. 주변에 좋은 가게가 있다면 알려주세요!",
  "이 사이트에 등록된 비즈니스는 모두 실제 이웃이 운영하는 곳입니다.",
  "여러분의 응원이 한인 소상공인에게 큰 힘이 됩니다.",
  "밴쿠버 한인 커뮤니티는 다양한 업종의 비즈니스로 가득합니다.",
  "작은 가게의 성공이 지역사회의 활력으로 이어집니다.",
];
const randomDidYouKnow =
  didYouKnowList[Math.floor(Math.random() * didYouKnowList.length)];
import { businesses, categories } from "~/data/businesses";
import type { Business } from "~/types/business";

useHead({
  title: "Vancouver Local & Home Business Directory — 밴쿠버 소상공인",
  meta: [
    {
      name: "description",
      content:
        "Find and support local small businesses and home vendors in Vancouver, BC. Plumbing, sports, tutoring, and more — all from your Korean-Canadian community. 밴쿠버 한인 소상공인과 홈비즈니스를 발견하고 응원하세요.",
    },
    {
      property: "og:title",
      content: "My Little Vendors — Vancouver Local & Home Business Directory",
    },
    {
      property: "og:description",
      content:
        "Find and support local small businesses and home vendors in Vancouver, BC. 밴쿠버 한인 소상공인과 홈비즈니스를 발견하고 응원하세요.",
    },
    {
      property: "og:url",
      content: "https://my-little-vendors.vercel.app/",
    },
  ],
  link: [{ rel: "canonical", href: "https://my-little-vendors.vercel.app/" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": "https://my-little-vendors.vercel.app/#website",
            url: "https://my-little-vendors.vercel.app/",
            name: "My Little Vendors",
            description:
              "Vancouver local small business and home vendor directory for the Korean-Canadian community.",
            inLanguage: ["ko-KR", "en-CA"],
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://my-little-vendors.vercel.app/?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@type": "Organization",
            "@id": "https://my-little-vendors.vercel.app/#organization",
            name: "My Little Vendors",
            url: "https://my-little-vendors.vercel.app/",
            logo: {
              "@type": "ImageObject",
              url: "https://my-little-vendors.vercel.app/images/web/thumbnail.png",
              width: 1536,
              height: 1024,
            },
            contactPoint: {
              "@type": "ContactPoint",
              email: "mylittlevendors@gmail.com",
              contactType: "customer support",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
              containedInPlace: {
                "@type": "AdministrativeArea",
                name: "British Columbia, Canada",
              },
            },
            sameAs: [],
          },
          {
            "@type": "ItemList",
            "@id": "https://my-little-vendors.vercel.app/#listings",
            name: "Vancouver Local Business Directory",
            description:
              "A curated list of local small businesses and home vendors in Vancouver, BC.",
            url: "https://my-little-vendors.vercel.app/",
          },
        ],
      }),
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
    if (window.innerWidth >= 1280) gridCols.value = 4;
    else if (window.innerWidth >= 1024) gridCols.value = 3;
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
