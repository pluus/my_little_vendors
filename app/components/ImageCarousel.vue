<template>
  <div
    class="relative w-full h-full overflow-hidden select-none group/carousel"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <!-- Slides strip -->
    <div
      class="flex w-full h-full transition-transform duration-300 ease-out will-change-transform"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div v-for="(src, i) in images" :key="i" class="w-full h-full shrink-0">
        <img
          :src="src"
          :alt="`${alt} ${i + 1}`"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Prev / Next arrows -->
    <template v-if="images.length > 1">
      <button
        v-if="current > 0"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all"
        @click.stop="current--"
        aria-label="이전 이미지"
      >
        <svg
          class="w-3.5 h-3.5 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        v-if="current < images.length - 1"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all"
        @click.stop="current++"
        aria-label="다음 이미지"
      >
        <svg
          class="w-3.5 h-3.5 text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <!-- Dot indicators -->
      <div
        class="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5 pointer-events-none"
      >
        <button
          v-for="(_, i) in images"
          :key="i"
          class="pointer-events-auto h-1.5 rounded-full transition-all duration-200"
          :class="i === current ? 'w-4 bg-white' : 'w-1.5 bg-white/55'"
          @click.stop="current = i"
          :aria-label="`이미지 ${i + 1}`"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[];
  alt: string;
}>();

const current = ref(0);
let touchStartX = 0;

function onTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0].clientX;
}

function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) {
    if (dx < 0 && current.value < props.images.length - 1) current.value++;
    else if (dx > 0 && current.value > 0) current.value--;
  }
}

// Reset index when images array changes (e.g. opening different business)
watch(
  () => props.images,
  () => {
    current.value = 0;
  },
);
</script>
