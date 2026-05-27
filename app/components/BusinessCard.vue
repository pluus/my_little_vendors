<template>
  <!-- Placeholder card -->
  <article
    v-if="business.isPlaceholder"
    class="group bg-stone-50 rounded-3xl overflow-hidden border-2 border-dashed border-stone-200 cursor-pointer hover:border-amber-300 hover:bg-amber-50/40 transition-colors"
    @click="$emit('open', business)"
  >
    <div class="aspect-[4/3] flex items-center justify-center bg-stone-100/60">
      <div class="text-center px-6">
        <div
          class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-3"
        >
          <svg
            class="w-6 h-6 text-amber-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <p class="text-sm font-medium text-stone-500">내 가게를 등록하세요</p>
        <p class="text-xs text-stone-400 mt-1">무료로 홍보하세요</p>
      </div>
    </div>
    <div class="p-4">
      <a
        href="https://forms.gle/5i7Bn9vaF8GYuLnu6"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-xs font-medium transition-colors"
        @click.stop
      >
        무료 등록 신청하기
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
      </a>
    </div>
  </article>

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
      <!-- Favorite button -->
      <button
        class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition"
        :class="isFav ? 'bg-white shadow' : 'bg-white/70 hover:bg-white shadow'"
        :title="isFav ? '저장 취소' : '저장하기'"
        @click.stop="toggleFavorite(business.id)"
      >
        <svg
          class="w-4 h-4 transition-colors"
          :class="isFav ? 'text-rose-500' : 'text-stone-400'"
          :fill="isFav ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
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

const { isFavorite, toggleFavorite } = useFavorites();
const isFav = computed(() => isFavorite(props.business.id));
</script>
