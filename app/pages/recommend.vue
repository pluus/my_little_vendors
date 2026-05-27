<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-3xl font-bold text-amber-700 mb-6 flex items-center gap-2">
      <svg
        class="w-7 h-7 text-amber-400"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 17l-5 3 1.9-5.6L4 9.5l5.7-.4L12 4l2.3 5.1 5.7.4-4.9 4.9L17 20z"
        />
      </svg>
      추천 스몰 비즈니스
    </h1>
    <p class="text-stone-600 mb-8">
      이 섹션은 커뮤니티가 추천하는 스몰 비즈니스를 모아둔 곳입니다. 다양한
      업종의 가게들을 둘러보고, 새로운 이웃 비즈니스를 발견해보세요!
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="biz in recommendedBusinesses"
        :key="biz.id"
        class="flex flex-col items-stretch bg-white rounded-2xl px-4 py-5 shadow-sm hover:shadow-md transition cursor-pointer"
        @click="selectVendor(biz)"
      >
        <img
          :src="biz.cover || '/images/web/placeholder-1.png'"
          :alt="biz.name"
          class="w-full h-36 object-cover rounded-xl border border-stone-200 mb-3"
        />
        <div class="font-semibold text-stone-900 truncate mb-1">
          {{ biz.name }}
        </div>
        <div class="text-xs text-stone-500 mb-2">{{ biz.category }}</div>
        <div class="text-sm text-stone-600 line-clamp-2 mb-2">
          {{ biz.description }}
        </div>
        <div class="flex flex-wrap gap-1.5 mt-auto">
          <span
            v-for="tag in biz.tags.slice(0, 3)"
            :key="tag"
            class="px-2.5 py-1 rounded-full text-xs text-stone-500 border border-stone-300 bg-white"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { businesses } from "~/data/businesses";
import type { Business } from "~/types/business";
import { ref as vueRef, computed as vueComputed } from "vue";

// Pick 9 recommended businesses (non-placeholder)
const recommendedBusinesses = vueComputed(() => {
  const pool = businesses.filter((b) => !b.isPlaceholder);
  // Shuffle and pick 9
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 9);
});

function selectVendor(biz: Business) {
  // You can implement navigation or modal logic here if needed
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
