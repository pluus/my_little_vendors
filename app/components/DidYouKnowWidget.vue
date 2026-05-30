<template>
  <div
    v-if="showDidYouKnow"
    class="fixed z-50 bottom-6 right-6 flex flex-col items-end"
    style="max-width: 287px"
  >
    <!-- Chat balloon -->
    <div class="relative mb-2">
      <div
        class="bg-white border-2 border-amber-400 rounded-2xl shadow-lg px-4 py-3 text-stone-800 text-base leading-relaxed max-w-sm"
        style="word-break: break-word"
      >
        <div class="flex items-center gap-2 mb-1 mb-4">
          <svg
            class="w-5 h-5 text-amber-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <span class="font-bold text-amber-500">알고 계셨나요?</span>
          <!-- Close button -->
          <button
            @click="showDidYouKnow = false"
            aria-label="닫기"
            class="ml-auto p-1 rounded-full hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <svg
              class="w-4 h-4 text-stone-400 hover:text-stone-700"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p class="did-you-know-content text-sm leading-5" v-html="funFact" />
      </div>
      <!-- Balloon tail -->
      <div class="absolute right-8 bottom-[-19px] w-5 h-5 overflow-hidden">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M0 0 Q10 20 20 0 Z"
            fill="#fff"
            stroke="#fbbf24"
            stroke-width="1.5"
          />
        </svg>
      </div>
    </div>
    <!-- Character image -->
    <img
      src="/images/web/did_you_know.png"
      alt="My Little Vendors 캐릭터"
      class="w-20 h-20 sm:w-40 sm:h-40 rounded-full border-2 border-amber-300 bg-white shadow"
      style="object-fit: cover"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const props = defineProps<{ funFact?: string }>();
const showDidYouKnow = ref(true);
onMounted(() => {
  console.log("DidYouKnowWidget mounted with funFact:", props.funFact);
});
</script>
<style scoped>
::v-deep(.did-you-know-content strong) {
  @apply text-amber-500 font-bold;
}
</style>
