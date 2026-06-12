<template>
  <div class="min-h-screen bg-stone-50">
    <!-- Not found state -->
    <div
      v-if="!business"
      class="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center"
    >
      <h1 class="text-4xl font-bold text-stone-900 mb-4">
        벤더를 찾을 수 없습니다
      </h1>
      <p class="text-stone-500 mb-8">요청하신 벤더를 찾을 수 없습니다.</p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-white rounded-full font-medium transition-colors"
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
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        홈으로 돌아가기
      </NuxtLink>
    </div>

    <!-- Vendor content -->
    <div v-else class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <!-- Back button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-8"
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
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        목록으로 돌아가기
      </NuxtLink>

      <!-- Hero section with vendor image -->
      <h1
        class="text-4xl text-center my-8 sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight"
      >
        <span class="mb-5 inline-block"
          >우리의 <span class="text-amber-400">스몰 비즈니스</span> 이웃을
          만나보세요</span
        >
        ✨
      </h1>

      <div
        class="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 mb-8"
      >
        <div class="grid md:grid-cols-2 gap-0">
          <!-- Vendor/Business image -->
          <div class="relative aspect-[4/3] md:aspect-auto bg-stone-100">
            <!-- <img
              :src="business.vendor?.image || business.cover"
              :alt="business.vendor?.name || business.name"
              class="w-full h-full object-cover"
            /> -->
            <img
              src="https://static.wixstatic.com/media/6d733e_5df14f361a9f46d78b2de94fda1c6662~mv2.png/v1/fill/w_624,h_762,al_c,lg_1,q_90,enc_avif,quality_auto/6d733e_5df14f361a9f46d78b2de94fda1c6662~mv2.png"
              alt="Background Pattern"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Vendor intro -->
          <div class="p-8 sm:p-12 flex flex-col justify-center">
            <div class="mb-4">
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span
                  v-for="category in business.categories"
                  :key="category"
                  class="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100"
                >
                  {{ category }}
                </span>
              </div>
              <h1 class="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
                {{ business.vendor?.name || business.name }}
              </h1>
              <p class="text-stone-500 text-sm">{{ business.name }} 대표</p>
            </div>

            <!-- Quote -->
            <blockquote
              v-if="business.vendor?.quote"
              class="border-l-4 border-amber-400 pl-4 py-2 text-stone-600 italic text-lg leading-relaxed"
            >
              "{{ business.vendor.quote }}"
            </blockquote>
          </div>
        </div>
      </div>

      <!-- Vendor story section -->
      <div
        class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-100 mb-12"
      >
        <h2
          class="text-2xl sm:text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3"
        >
          <span
            class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </span>
          벤더 스토리
        </h2>

        <div class="prose prose-stone max-w-none space-y-6">
          <!-- Story -->
          <div v-if="business.vendor?.story">
            <img
              src="/images/web/did_you_know_2.png"
              alt="Did You Know"
              class="float-right w-96 mr-6 mb-4"
            />

            <p
              class="text-stone-600 leading-relaxed text-base"
              v-html="business.vendor.story"
            ></p>
          </div>

          <!-- Journey -->
          <div v-if="business.vendor?.journey">
            <p
              class="text-stone-600 leading-relaxed text-base"
              v-html="business.vendor.journey"
            ></p>
          </div>

          <!-- Passion -->
          <div v-if="business.vendor?.passion">
            <p
              class="text-stone-600 leading-relaxed text-base"
              v-html="business.vendor.passion"
            ></p>
          </div>

          <!-- Fun Fact -->
          <div
            v-if="business.funFact"
            class="mt-8 p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200"
          >
            <div class="flex items-start gap-3 mb-3">
              <span class="text-2xl">✨</span>
              <h3 class="text-lg font-bold text-amber-900">알고 계셨나요?</h3>
            </div>
            <p
              class="text-amber-900/80 leading-relaxed text-base"
              v-html="business.funFact"
            ></p>
          </div>
        </div>
      </div>

      <!-- Business info card -->
      <div
        class="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-100 mb-8"
      >
        <h2 class="text-2xl font-bold text-stone-900 mb-6">비즈니스 정보</h2>

        <div class="grid sm:grid-cols-2 gap-6 mb-8">
          <!-- Business name -->
          <div>
            <h3
              class="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2"
            >
              가게 이름
            </h3>
            <p class="text-lg font-medium text-stone-900">
              {{ business.name }}
            </p>
          </div>

          <!-- Location -->
          <div>
            <h3
              class="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2"
            >
              지역
            </h3>
            <p class="text-lg font-medium text-stone-900">
              {{ business.location }}
            </p>
          </div>

          <!-- Hours -->
          <div v-if="business.hours">
            <h3
              class="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2"
            >
              영업시간
            </h3>
            <p class="text-lg font-medium text-stone-900">
              {{ business.hours }}
            </p>
          </div>

          <!-- Category -->
          <div>
            <h3
              class="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-2"
            >
              카테고리
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="category in business.categories"
                :key="category"
                class="text-lg font-medium text-stone-900"
              >
                {{ category }}
              </span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-8">
          <h3
            class="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3"
          >
            소개
          </h3>
          <p
            class="text-stone-600 leading-relaxed"
            v-html="business.description"
          ></p>
        </div>

        <!-- Tags -->
        <div v-if="business.tags?.length" class="mb-8">
          <h3
            class="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3"
          >
            서비스
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in business.tags"
              :key="tag"
              class="px-3 py-1.5 bg-stone-100 text-stone-700 text-sm rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Contact info -->
        <div class="grid sm:grid-cols-2 gap-4 pt-6 border-t border-stone-200">
          <a
            v-if="business.phone"
            :href="`tel:${business.phone}`"
            class="flex items-center gap-3 p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
          >
            <div
              class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm"
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
                />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-stone-500 mb-0.5">전화번호</p>
              <p
                class="text-sm font-medium text-stone-900 group-hover:text-amber-600 transition-colors truncate"
              >
                {{ business.phone }}
              </p>
            </div>
          </a>

          <a
            v-if="business.email"
            :href="`mailto:${business.email}`"
            class="flex items-center gap-3 p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
          >
            <div
              class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm"
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-stone-500 mb-0.5">이메일</p>
              <p
                class="text-sm font-medium text-stone-900 group-hover:text-amber-600 transition-colors truncate"
              >
                {{ business.email }}
              </p>
            </div>
          </a>

          <a
            v-if="business.website"
            :href="business.website"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
          >
            <div
              class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm"
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
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-stone-500 mb-0.5">웹사이트</p>
              <p
                class="text-sm font-medium text-stone-900 group-hover:text-amber-600 transition-colors truncate"
              >
                방문하기
              </p>
            </div>
          </a>

          <a
            v-if="business.instagram"
            :href="business.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
          >
            <div
              class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm"
            >
              <svg
                class="w-5 h-5 text-stone-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                />
              </svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-stone-500 mb-0.5">인스타그램</p>
              <p
                class="text-sm font-medium text-stone-900 group-hover:text-amber-600 transition-colors truncate"
              >
                팔로우하기
              </p>
            </div>
          </a>
        </div>
      </div>

      <!-- Navigation: Previous and Next Vendor -->
      <div
        class="flex items-center justify-between gap-4 pt-8 border-t border-stone-200"
      >
        <!-- Previous -->
        <NuxtLink
          v-if="previousVendor"
          :to="`/vendor/${previousVendor.slug}`"
          class="flex-1 group"
        >
          <div
            class="flex items-center gap-4 p-6 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 hover:border-stone-300 transition-all"
          >
            <div class="shrink-0">
              <svg
                class="w-5 h-5 text-stone-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-stone-400 mb-1">이전 벤더</p>
              <p
                class="font-semibold text-stone-900 truncate group-hover:text-amber-600 transition-colors"
              >
                {{ previousVendor.vendor?.name || previousVendor.name }}
              </p>
              <p class="text-xs text-stone-500 truncate">
                {{ previousVendor.name }}
              </p>
            </div>
          </div>
        </NuxtLink>

        <!-- Placeholder if no previous -->
        <div v-else class="flex-1"></div>

        <!-- Next -->
        <NuxtLink
          v-if="nextVendor"
          :to="`/vendor/${nextVendor.slug}`"
          class="flex-1 group"
        >
          <div
            class="flex items-center gap-4 p-6 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 hover:border-stone-300 transition-all"
          >
            <div class="min-w-0 flex-1 text-right">
              <p class="text-xs text-stone-400 mb-1">다음 벤더</p>
              <p
                class="font-semibold text-stone-900 truncate group-hover:text-amber-600 transition-colors"
              >
                {{ nextVendor.vendor?.name || nextVendor.name }}
              </p>
              <p class="text-xs text-stone-500 truncate">
                {{ nextVendor.name }}
              </p>
            </div>
            <div class="shrink-0">
              <svg
                class="w-5 h-5 text-stone-400 group-hover:text-amber-500 transition-colors"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Placeholder if no next -->
        <div v-else class="flex-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { businesses } from "~/data/businesses";

const route = useRoute();
const slug = route.params.slug as string;

// Find the business by slug
const business = computed(() => {
  return businesses.find((b) => b.slug === slug && !b.isPlaceholder);
});

// Get vendors with vendor info (for navigation)
const vendorsWithInfo = computed(() => {
  return businesses.filter((b) => b.slug && b.vendor && !b.isPlaceholder);
});

// Find current vendor index
const currentIndex = computed(() => {
  return vendorsWithInfo.value.findIndex((b) => b.slug === slug);
});

// Previous and next vendors
const previousVendor = computed(() => {
  if (currentIndex.value <= 0) return null;
  return vendorsWithInfo.value[currentIndex.value - 1];
});

const nextVendor = computed(() => {
  if (
    currentIndex.value === -1 ||
    currentIndex.value >= vendorsWithInfo.value.length - 1
  ) {
    return null;
  }
  return vendorsWithInfo.value[currentIndex.value + 1];
});

// SEO and meta tags
useHead({
  title: business.value
    ? `${business.value.vendor?.name || business.value.name} - 이주의 벤더 | My Little Vendors`
    : "벤더를 찾을 수 없습니다 | My Little Vendors",
  meta: [
    {
      name: "description",
      content: business.value
        ? business.value.vendor?.story || business.value.description
        : "요청하신 벤더를 찾을 수 없습니다.",
    },
    {
      property: "og:title",
      content: business.value
        ? `${business.value.vendor?.name || business.value.name} - 이주의 벤더`
        : "벤더를 찾을 수 없습니다",
    },
    {
      property: "og:description",
      content: business.value
        ? business.value.vendor?.story || business.value.description
        : "요청하신 벤더를 찾을 수 없습니다.",
    },
    {
      property: "og:image",
      content: business.value
        ? business.value.vendor?.image || business.value.cover
        : "/images/web/thumbnail.png",
    },
  ],
});
</script>
