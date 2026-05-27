<template>
  <div
    class="flex flex-col items-stretch bg-white rounded-2xl px-4 py-5 shadow-sm hover:shadow-md transition cursor-pointer"
    @click="$emit('open', business)"
  >
    <img
      :src="
        business.cover || '/images/web/placeholder-transparent-background.png'
      "
      :alt="business.name"
      class="w-full h-36 object-cover rounded-xl border border-stone-200 mb-3"
    />
    <div class="font-semibold text-stone-900 truncate mb-1">
      {{ business.name }}
    </div>
    <div class="text-xs text-stone-500 mb-2">{{ business.category }}</div>
    <div class="text-sm text-stone-600 line-clamp-2 mb-2">
      {{ business.description }}
    </div>
    <div class="flex flex-wrap gap-1.5 mt-auto">
      <span
        v-for="tag in business.tags.slice(0, 3)"
        :key="tag"
        class="px-2.5 py-1 rounded-full text-xs text-stone-500 border border-stone-300 bg-white"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Business } from "~/types/business";
const props = defineProps<{ business: Business }>();
defineEmits<{ open: [business: Business] }>();
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
