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

    <!-- Did You Know Floating Widget -->
    <div
      v-if="showDidYouKnow"
      class="fixed z-50 bottom-6 right-6 flex flex-col items-end"
      style="max-width: 340px"
    >
      <!-- Chat balloon -->
      <div class="relative mb-2">
        <div
          class="bg-white border-2 border-amber-400 rounded-2xl shadow-lg px-5 py-4 text-stone-800 text-sm leading-relaxed max-w-xs"
          style="word-break: break-word"
        >
          <div class="flex items-center gap-2 mb-1">
            <svg
              class="w-5 h-5 text-amber-400"
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
            <span class="font-bold text-amber-500">알고 계셨나요?</span>
            <!-- Close button -->
            <button
              @click="showDidYouKnow = false"
              aria-label="닫기"
              class="ml-auto p-1 rounded-full hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <svg
                class="w-4 h-4 text-stone-400 hover:text-stone-700"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <span v-text="randomDidYouKnow" />
        </div>
        <!-- Balloon tail -->
        <div class="absolute right-10 bottom-[-22px] w-6 h-6 overflow-hidden">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M0 0 Q12 24 24 0 Z"
              fill="#fff"
              stroke="#fbbf24"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      <!-- Character image -->
      <img
        src="/images/web/did_you_know.png"
        alt="My Little Vendors 캐릭터"
        class="w-48 h-48 rounded-full border-2 border-amber-300 bg-white shadow"
        style="object-fit: cover"
      />
    </div>

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
import { ref as vueRef } from "vue";
const showDidYouKnow = vueRef(true);
const didYouKnowList = [
  "리틀브루 카페의 사장님은 매일 새벽 5시에 직접 원두를 로스팅하며 하루를 시작합니다.",
  "노스하우스 베이커리는 같은 자리에서 15년째 한결같은 레시피로 빵을 구워오고 있습니다.",
  "플로라가든의 대표는 원래 그래픽 디자이너였지만, 식물을 사랑하게 되어 가드닝 사업을 시작했습니다.",
  "오션타이드 스시바의 셰프는 일본에서 10년간 수련한 뒤 밴쿠버로 돌아와 가게를 열었습니다.",
  "코지니트 스튜디오는 모든 니트 제품을 사장님이 직접 디자인하고 샘플링합니다.",
  "브라이트픽스 수리점은 ‘당일 수리 완료’를 원칙으로 8년째 운영 중입니다.",
  "헤이븐 서점은 동네 주민들이 추천한 책으로만 한 코너를 채워 운영하고 있습니다.",
  "스톤앤우드 인테리어는 목재 하나하나를 직접 골라 프로젝트를 진행하는 것으로 유명합니다.",
  "루나플로리스 꽃집은 매주 다른 테마로 매장을 완전히 새롭게 연출합니다.",
  "마운틴로스트 커피는 비 오는 날마다 ‘레인 블렌드’를 한정 출시합니다.",
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
