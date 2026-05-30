<template>
  <div>
    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center my-8">
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4"
      >
        <span class="mb-5 inline-block">이웃주민의 작은 가게를,</span><br />
        <span class="text-amber-400">함께 응원해요.</span>
      </h1>
      <p class="text-stone-500 text-lg max-w-md mx-auto leading-relaxed mt-8">
        우리 이웃이 제공하는 특별한 서비스!
      </p>
      <a
        href="https://forms.gle/AsR5kSVsZrvmFRwq7"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-6 w-full sm:w-auto flex sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-sm font-medium transition-colors block lg:hidden"
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
    </section>

    <!-- Did You Know Floating Widget -->
    <DidYouKnowWidget :fun-fact="funFact" />
    <!-- Chatbot Floating Widget -->
    <!-- <ChatWidget /> -->

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
        <template v-for="(placeholder, idx) in 3" :key="'placeholder-' + idx">
          <div class="rounded-3xl transition-all duration-200 opacity-80">
            <BusinessCard
              :business="{
                ...(businesses.find((b) => b.isPlaceholder) || {}),
                id: 'placeholder-' + idx,
                name: '나만 알고 싶은 작은 가게를 추천 해주세요!',
                description: '이웃주민의 작은 가게를 함께 응원해요!',
                isPlaceholder: true,
              }"
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
    <iframe
      width="100%"
      height="400px"
      src="https://be763cb7.sibforms.com/v2/serve/MUIFAFVnDNLbXyGLnUnmuCdR2Ns33Cse-6kqufQ1PlTOdbrNLzMemNC6MN3EDFGckONKOgfuucQ8ud6cVq-3LB_sggUhgbsDrygTHxyduP66rj-LvRS49x13OEgEuGuYgn3H8wwHvKC3uWyuK2pn5S1ms8wKEr6_BxOTOWpG3267F64m-ByvpYmhgA9aiaJ_diAZNLBbD2Of2yta3w=="
      frameborder="0"
      scrolling="auto"
      s
      allowfullscreen
      style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
      "
    ></iframe>
  </div>
</template>

<script setup lang="ts">
// ...existing code...
import DidYouKnowWidget from "~/components/DidYouKnowWidget.vue";
import ChatWidget from "~/components/ChatWidget.vue";
import { businesses, categories } from "~/data/businesses";
import type { Business } from "~/types/business";

useHead({
  title: "My Little Vendors - 이웃주민의 작은 가게를 함께 응원해요.",
  meta: [
    {
      name: "description",
      content:
        "Find and support local small businesses and home vendors in Vancouver, BC. Plumbing, sports, tutoring, and more — all from your Korean-Canadian community. 밴쿠버 한인 소상공인과 홈비즈니스를 발견하고 응원하세요.",
    },
    {
      property: "og:title",
      content: "My Little Vendors - 이웃주민의 작은 가게를 함께 응원해요.",
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
              "이웃주민의 작은 가게를 함께 응원하는 밴쿠버 한인 소상공인 및 홈비즈니스 디렉토리입니다.",
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
            name: "My Little Vendors - 이웃주민의 작은 가게를 함께 응원해요.",
            description:
              "이웃주민의 작은 가게를 함께 응원하는 밴쿠버 한인 소상공인 및 홈비즈니스 디렉토리입니다.",
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
const funFact = ref("");

onMounted(() => {
  shuffledBusinesses.value = shuffle(businesses);
  funFact.value =
    shuffledBusinesses.value.find((b) => b.funFact)?.funFact || "";

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
