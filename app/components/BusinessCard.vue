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
        {{ business.category }}
      </span>
    </div>

    <!-- Card body -->
    <div class="p-4 relative z-10 bg-white">
      <!-- Name row -->
      <div class="flex items-start gap-3 mb-2">
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
