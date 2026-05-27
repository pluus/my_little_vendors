<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-stone-900 tracking-tight mb-1">
        저장한 가게
      </h1>
      <p class="text-stone-500 text-sm">마음에 드는 가게를 모아보세요.</p>
    </div>

    <!-- Unauthenticated -->
    <div
      v-if="!loggedIn"
      class="flex flex-col items-center justify-center py-24 gap-4 text-center"
    >
      <div
        class="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center"
      >
        <svg
          class="w-8 h-8 text-stone-400"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <p class="text-stone-600 font-medium">
        로그인하면 가게를 저장할 수 있어요
      </p>
      <NuxtLink
        to="/login"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium transition-colors"
      >
        로그인하기
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="savedBusinesses.length === 0"
      class="flex flex-col items-center justify-center py-24 gap-3 text-center"
    >
      <div
        class="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center"
      >
        <svg
          class="w-8 h-8 text-amber-300"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <p class="text-stone-600 font-medium">아직 저장한 가게가 없어요</p>
      <NuxtLink
        to="/"
        class="text-sm text-amber-500 hover:text-amber-600 font-medium transition-colors"
      >
        가게 둘러보기 →
      </NuxtLink>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <BusinessCard
        v-for="biz in savedBusinesses"
        :key="biz.id"
        :business="biz"
        @open="openPanel"
      />
    </div>

    <!-- Detail panel -->
    <BusinessPanel :business="activePanel" @close="activePanel = null" />
  </div>
</template>

<script setup lang="ts">
import type { Business } from "~/types/business";
import { businesses } from "~/data/businesses";

useHead({ title: "저장한 가게" });

const { loggedIn } = useUserSession();
const { favoriteIds } = useFavorites();
const activePanel = ref<Business | null>(null);

const savedBusinesses = computed(() =>
  businesses.filter((b) => favoriteIds.value.includes(b.id)),
);

function openPanel(biz: Business) {
  activePanel.value = biz;
}
</script>
