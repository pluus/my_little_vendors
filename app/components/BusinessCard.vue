<template>
  <!-- Placeholder card -->
  <a
    v-if="business.isPlaceholder"
    href="https://forms.gle/RhBXka3hHt31qg5c9"
    target="_blank"
    rel="noopener noreferrer"
    class="group rounded-3xl overflow-hidden border-2 border-dashed border-stone-200 cursor-pointer hover:border-amber-300 transition-colors block no-underline"
    style="text-decoration: none"
  >
    <div class="aspect-[4/3] flex items-center justify-center">
      <div class="text-center p-6">
        <ImageCarousel
          ref="carouselRef"
          :images="['./images/web/placeholder-1.png']"
          :alt="business.name"
          class="w-full h-full mb-4"
        />
        <p class="text-sm font-medium text-stone-500">
          추천하고 싶은 스몰 비즈니스가 있나요?
        </p>
        <p class="text-xs text-stone-400 mt-1">저희에게 알려주세요!</p>
      </div>
    </div>
    <div class="px-4 pb-4">
      <span
        class="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-xs font-medium transition-colors"
        style="pointer-events: none"
      >
        가게 추천하기
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
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </div>
  </a>

  <!-- Real business card -->
  <article
    v-else
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
        class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs text-stone-500 border border-stone-300 bg-white z-10"
      >
        {{ business.category }}
      </span>
    </div>

    <!-- Card body -->
    <div class="p-4 relative z-10 bg-white">
      <!-- Name row -->
      <div class="flex items-start justify-between gap-3 mb-2">
        <div class="min-w-0 pt-0.5">
          <h3
            class="font-semibold text-stone-900 text-sm leading-tight truncate"
          >
            {{ business.name }}
          </h3>
          <p class="text-xs text-stone-400 mt-0.5">{{ business.location }}</p>
        </div>
        <svg
          class="w-4 h-4 text-stone-300 group-hover:text-amber-400 transition-colors shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>

      <!-- Description -->
      <p class="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-3">
        {{ business.description }}
      </p>

      <!-- Tags -->
      <div v-if="business.tags?.length" class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in business.tags.slice(0, 3)"
          :key="tag"
          class="px-2.5 py-1 rounded-full text-xs text-stone-500 border border-stone-300 bg-white"
        >
          {{ tag }}
        </span>
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
</script>
