<template>
  <Transition name="panel">
    <section
      v-if="business"
      ref="panelEl"
      class="mt-6 rounded-3xl border border-stone-100 shadow-xl overflow-hidden bg-white"
    >
      <div class="flex flex-col sm:flex-row">
        <!-- Left: carousel + gallery strip -->
        <div class="sm:w-[44%] shrink-0 flex flex-col bg-stone-50">
          <div class="relative h-72 sm:flex-1 sm:min-h-80">
            <ImageCarousel
              ref="carouselRef"
              :images="[business.cover, ...(business.images ?? [])]"
              :alt="business.name"
              class="w-full h-full"
            />
            <!-- Mobile close button on image -->
            <button
              class="sm:hidden absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition"
              @click="$emit('close')"
            >
              <svg
                class="w-4 h-4 text-white"
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
            </button>
          </div>
          <!-- Gallery strip -->
          <div
            v-if="galleryImages.length"
            class="grid gap-1 p-1"
            :class="galleryImages.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'"
          >
            <div
              v-for="(src, i) in galleryImages"
              :key="i"
              class="aspect-square overflow-hidden"
            >
              <img
                :src="src"
                :alt="`${business.name} ${i + 1}`"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <!-- Right: details -->
        <div class="flex-1 p-6 sm:p-8 sm:overflow-y-auto sm:max-h-[72vh]">
          <!-- Name row + desktop close -->
          <div class="flex items-start gap-4 mb-5">
            <div
              class="w-14 h-14 rounded-2xl overflow-hidden border-2 border-stone-100 shadow-sm shrink-0"
            >
              <img
                :src="business.avatar"
                :alt="business.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h2
                class="text-xl sm:text-2xl font-bold text-stone-900 leading-tight"
              >
                {{ business.name }}
              </h2>
              <p class="text-sm text-stone-400 mt-0.5">
                {{ business.location }}
              </p>
            </div>
            <button
              class="hidden sm:flex w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 items-center justify-center transition shrink-0 mt-0.5"
              @click="$emit('close')"
            >
              <svg
                class="w-4 h-4 text-stone-500"
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
            </button>
          </div>

          <!-- Category badge + hours -->
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100"
            >
              {{ categoryEmoji(business.category) }} {{ business.category }}
            </span>
            <div
              v-if="business.hours"
              class="flex items-center gap-1.5 text-xs text-stone-500"
            >
              <svg
                class="w-3.5 h-3.5 text-stone-400 shrink-0"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6l4 2"
                />
              </svg>
              {{ business.hours }}
            </div>
          </div>

          <!-- Description -->
          <p class="text-stone-600 text-sm leading-relaxed mb-5">
            {{ business.description }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in business.tags" :key="tag" class="tag-pill">{{
              tag
            }}</span>
          </div>

          <!-- Contact links -->
          <div class="flex flex-wrap gap-3">
            <a
              v-if="business.website"
              :href="business.website"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-28 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <svg
                class="w-4 h-4 text-sky-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                />
              </svg>
              웹사이트
            </a>
            <a
              v-if="business.instagram"
              :href="`https://instagram.com/${business.instagram}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-28 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <svg
                class="w-4 h-4 text-rose-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                />
              </svg>
              인스타그램
            </a>
            <a
              v-if="business.kakao"
              :href="business.kakao"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 min-w-28 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-stone-200 text-sm font-medium text-stone-700 hover:bg-[#FEE500]/20 hover:border-[#FEE500] transition-colors"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#3A1D1D">
                <path
                  d="M12 3C6.477 3 2 6.589 2 11c0 2.843 1.738 5.355 4.377 6.882-.193.702-.7 2.54-.8 2.937-.124.483.178.478.374.347.155-.103 2.456-1.664 3.449-2.34.517.072 1.05.11 1.6.11 5.523 0 10-3.589 10-8s-4.477-8-10-8z"
                />
              </svg>
              카카오톡
            </a>
            <a
              v-if="business.contact"
              :href="`mailto:${business.contact}`"
              class="flex-1 min-w-28 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <svg
                class="w-4 h-4 text-amber-400"
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
              연락하기
            </a>
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import type { Business } from "~/types/business";

const props = defineProps<{ business: Business | null }>();
defineEmits(["close"]);

const panelEl = ref<HTMLElement | null>(null);
const carouselRef = ref();
const galleryImages = computed(() => props.business?.gallery ?? []);

watch(
  () => props.business,
  async (val) => {
    if (val) {
      await nextTick();
      panelEl.value?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  },
);

const categoryMap: Record<string, string> = {
  "음식 & 베이커리": "🍞",
  "수공예 & 공예": "🧵",
  "뷰티 & 웰니스": "✨",
  "식물 & 가드닝": "🌿",
  "아트 & 디자인": "🎨",
  "의류 & 패션": "👗",
  "홈 & 인테리어": "🏡",
  반려동물: "🐾",
};

function categoryEmoji(cat: string) {
  return categoryMap[cat] ?? "🛍️";
}
</script>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
