<template>
  <article
    class="group bg-white rounded-3xl overflow-hidden border border-stone-100 card-hover cursor-pointer"
    @click="$emit('open', business)"
  >
    <!-- Cover carousel -->
    <div class="relative overflow-hidden aspect-[4/3] bg-stone-100">
      <ImageCarousel
        :images="[business.cover, ...(business.images ?? [])]"
        :alt="business.name"
        class="w-full h-full"
      />
      <!-- Category badge -->
      <span
        class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/80 text-stone-700 border border-white/60 z-10"
      >
        {{ categoryEmoji(business.category) }} {{ business.category }}
      </span>
      <!-- Favorite button -->
      <button
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors border border-white/60 z-10"
        @click.stop="toggleFav"
        :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
      >
        <svg
          class="w-4 h-4 transition-colors"
          :class="isFav ? 'text-rose-500 fill-rose-500' : 'text-stone-400'"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
      </button>
    </div>

    <!-- Card body -->
    <div class="p-4 relative z-10 bg-white">
      <!-- Avatar + name row -->
      <div class="flex items-start gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0 -mt-7 ring-2 ring-stone-50"
        >
          <img
            :src="business.avatar"
            :alt="business.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="min-w-0 pt-0.5">
          <h3
            class="font-semibold text-stone-900 text-sm leading-tight truncate"
          >
            {{ business.name }}
          </h3>
          <p class="text-xs text-stone-400 mt-0.5">{{ business.location }}</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-3">
        {{ business.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in business.tags.slice(0, 3)"
          :key="tag"
          class="tag-pill"
          >{{ tag }}</span
        >
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Business } from "~/types/business";

const props = defineProps<{ business: Business }>();
defineEmits<{ open: [business: Business] }>();

const isFav = ref(false);

function toggleFav() {
  isFav.value = !isFav.value;
}

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
