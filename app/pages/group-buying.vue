<template>
  <div>
    <!-- Section header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4 flex items-center justify-center gap-2"
      >
        공동구매 📦
      </h1>
      <p class="text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
        함께 구매하면 더 저렴하고 즐거워요!
      </p>
    </section>

    <!-- Group Buying Events list -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
      <ul class="space-y-5">
        <li
          v-for="(event, i) in groupBuyingEvents"
          :key="i"
          class="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col sm:flex-row items-start gap-6">
            <!-- Placeholder image (left column) -->
            <div
              class="w-full sm:w-32 h-32 rounded-2xl bg-stone-100 flex-shrink-0 overflow-hidden flex items-center justify-center"
            >
              <img
                :src="getChibiByIndex(i)"
                alt="공동구매 캐릭터"
                class="object-cover w-full h-full scale-x-[-1]"
              />
            </div>

            <!-- Content (right column) -->
            <div class="flex-1 flex flex-col justify-center w-full">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span
                  v-if="event.status"
                  class="py-1 px-4 rounded-full text-xs font-medium"
                  :class="getStatusClass(event.status)"
                >
                  {{ event.status }}
                </span>
                <span
                  v-if="event.tag"
                  class="py-1 px-4 rounded-full text-xs font-medium bg-amber-100 text-amber-700"
                >
                  {{ event.tag }}
                </span>
              </div>

              <div class="text-stone-800 font-semibold mb-2 text-lg">
                {{ event.title }}
              </div>

              <div class="flex items-center gap-3 text-xs text-stone-400 mb-4">
                <span>{{ event.startDate }} ~ {{ event.endDate }}</span>
                <span v-if="getDaysRemaining(event.endDate) > 0">
                  · {{ getDaysRemaining(event.endDate) }}일 남음
                </span>
              </div>

              <div class="text-stone-500 text-sm whitespace-pre-line mb-4">
                <span v-html="event.description" />
              </div>

              <!-- Photo thumbnails -->
              <div
                v-if="event.photos && event.photos.length > 0"
                class="flex gap-2 mb-4 overflow-x-auto"
              >
                <button
                  v-for="(photo, photoIdx) in event.photos"
                  :key="photoIdx"
                  @click="openPhotoOverlay(event.photos!, photoIdx)"
                  class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-stone-200 hover:border-amber-400 transition-colors cursor-pointer"
                >
                  <img
                    :src="photo"
                    :alt="`${event.title} 사진 ${photoIdx + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>

              <a
                :href="event.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-sm font-medium transition-colors w-fit"
              >
                <span>신청하기</span>
                <svg
                  class="w-4 h-4"
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
          </div>
        </li>
      </ul>

      <!-- Empty state -->
      <div v-if="groupBuyingEvents.length === 0" class="text-center py-24">
        <p class="text-4xl mb-4">📦</p>
        <h3 class="font-semibold text-stone-700 mb-1">
          진행 중인 공동구매가 없습니다
        </h3>
        <p class="text-stone-400 text-sm">
          곧 새로운 공동구매 이벤트가 열릴 예정이에요!
        </p>
      </div>
    </section>

    <!-- Photo carousel overlay -->
    <Transition name="fade">
      <div
        v-if="isOverlayOpen"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        @click="closePhotoOverlay"
      >
        <div class="relative w-full h-full flex items-center justify-center">
          <!-- Close button -->
          <button
            @click="closePhotoOverlay"
            class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Previous button -->
          <button
            v-if="selectedPhotos.length > 1"
            @click.stop="previousPhoto"
            class="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
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

          <!-- Image -->
          <div
            @click.stop
            class="max-w-5xl max-h-[90vh] p-4 flex items-center justify-center"
          >
            <img
              :src="selectedPhotos[currentPhotoIndex]"
              :alt="`사진 ${currentPhotoIndex + 1}`"
              class="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          <!-- Next button -->
          <button
            v-if="selectedPhotos.length > 1"
            @click.stop="nextPhoto"
            class="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
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

          <!-- Photo counter -->
          <div
            v-if="selectedPhotos.length > 1"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm"
          >
            {{ currentPhotoIndex + 1 }} / {{ selectedPhotos.length }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { groupBuyingEvents } from "~/data/groupBuying";

useHead({
  title: "공동구매 - My Little Vendors",
  meta: [
    {
      name: "description",
      content:
        "밴쿠버 한인 커뮤니티의 공동구매 소식을 확인하세요. 함께 구매하면 더 저렴하고 즐거워요!",
    },
  ],
});

// Photo carousel state
const isOverlayOpen = ref(false);
const selectedPhotos = ref<string[]>([]);
const currentPhotoIndex = ref(0);

// Open photo overlay
function openPhotoOverlay(photos: string[], index: number) {
  selectedPhotos.value = photos;
  currentPhotoIndex.value = index;
  isOverlayOpen.value = true;
  // Prevent body scroll when overlay is open
  document.body.style.overflow = "hidden";
}

// Close photo overlay
function closePhotoOverlay() {
  isOverlayOpen.value = false;
  document.body.style.overflow = "";
}

// Navigate to next photo
function nextPhoto() {
  if (currentPhotoIndex.value < selectedPhotos.value.length - 1) {
    currentPhotoIndex.value++;
  } else {
    currentPhotoIndex.value = 0; // Loop back to first
  }
}

// Navigate to previous photo
function previousPhoto() {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--;
  } else {
    currentPhotoIndex.value = selectedPhotos.value.length - 1; // Loop to last
  }
}

// Keyboard navigation
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!isOverlayOpen.value) return;

    if (e.key === "Escape") {
      closePhotoOverlay();
    } else if (e.key === "ArrowLeft") {
      previousPhoto();
    } else if (e.key === "ArrowRight") {
      nextPhoto();
    }
  };

  window.addEventListener("keydown", handleKeydown);

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    document.body.style.overflow = "";
  });
});

const chibiImages = [
  "/images/web/chibi-1.png",
  "/images/web/chibi-2.png",
  "/images/web/chibi-3.png",
];

// Assign chibi images in order (rotate 1 to 3)
function getChibiByIndex(idx: number) {
  return chibiImages[idx % chibiImages.length];
}

// Get status badge styling
function getStatusClass(status: string) {
  switch (status) {
    case "진행중":
      return "bg-green-100 text-green-700";
    case "마감":
      return "bg-gray-100 text-gray-500";
    case "예정":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-stone-100 text-stone-600";
  }
}

// Calculate days remaining
function getDaysRemaining(endDate: string): number {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
