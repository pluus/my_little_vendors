<template>
  <Transition name="panel">
    <section
      v-if="business"
      id="business-panel"
      ref="panelEl"
      class="mt-6 p-4 rounded-3xl border border-stone-100 shadow-xl overflow-hidden bg-white"
    >
      <div class="flex flex-col sm:flex-row">
        <!-- Left: carousel + gallery strip -->
        <div class="sm:w-[44%] shrink-0 flex flex-col bg-stone-50">
          <div class="relative h-72 sm:flex-1 sm:min-h-80">
            <ImageCarousel
              ref="carouselRef"
              :images="[business.cover, ...(business.images ?? [])]"
              :alt="business.name"
              class="w-full h-full"
            />
            <!-- Mobile close button on image -->
            <button
              class="sm:hidden absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition"
              @click="$emit('close')"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!-- Gallery strip -->
          <div
            v-if="galleryImages.length"
            class="grid gap-1 p-1"
            :class="galleryImages.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'"
          >
            <div
              v-for="(src, i) in galleryImages"
              :key="i"
              class="aspect-square overflow-hidden cursor-zoom-in"
              @click="openLightbox(i)"
            >
              <img
                :src="src"
                :alt="`${business.name} ${i + 1}`"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <!-- Right: details -->
        <div class="flex-1 p-6 sm:p-8 sm:overflow-y-auto sm:max-h-[72vh]">
          <!-- Name row + desktop close -->
          <div class="flex items-start gap-4 mb-4">
            <div class="flex-1 min-w-0">
              <h2
                class="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight tracking-tight"
              >
                {{ business.name }}
              </h2>
              <p class="text-sm text-stone-400 mt-1">{{ business.location }}</p>
            </div>
            <button
              class="hidden sm:flex w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 items-center justify-center transition shrink-0 mt-0.5"
              @click="$emit('close')"
            >
              <svg
                class="w-4 h-4 text-stone-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Category badge -->
          <span
            class="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100 mb-5"
          >
            {{ business.category }}
          </span>

          <!-- Info list -->
          <div class="flex flex-col gap-2.5 mb-5">
            <div
              v-if="business.hours"
              class="flex items-center gap-3 text-sm text-stone-600"
            >
              <div
                class="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center shrink-0"
              >
                <svg
                  class="w-4 h-4 text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6l4 2"
                  />
                </svg>
              </div>
              {{ business.hours }}
            </div>
            <a
              v-if="business.phone"
              :href="`tel:${business.phone}`"
              class="flex items-center gap-3 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
            >
              <div
                class="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center shrink-0 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <span class="min-w-0">
                <span class="block text-xs text-stone-400">전화번호</span>
                <span class="block truncate">{{ business.phone }}</span>
              </span>
            </a>
            <a
              v-if="business.email"
              :href="`mailto:${business.email}`"
              class="flex items-center gap-3 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
            >
              <div
                class="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center shrink-0 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <span class="min-w-0">
                <span class="block text-xs text-stone-400">이메일</span>
                <span class="block truncate">{{ business.email }}</span>
              </span>
            </a>
            <a
              v-if="business.website"
              :href="business.website"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
            >
              <div
                class="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center shrink-0 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                  />
                </svg>
              </div>
              <span class="min-w-0">
                <span class="block text-xs text-stone-400">웹사이트</span>
                <span class="block truncate">{{ business.website }}</span>
              </span>
            </a>
            <a
              v-if="business.instagram"
              :href="`https://instagram.com/${business.instagram}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
            >
              <div
                class="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center shrink-0 transition-colors"
              >
                <svg
                  class="w-4 h-4 text-stone-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                  />
                </svg>
              </div>
              <span class="min-w-0">
                <span class="block text-xs text-stone-400">인스타그램</span>
                <span class="block truncate">{{ business.instagram }}</span>
              </span>
            </a>
            <button
              v-if="business.kakao"
              type="button"
              class="flex items-center gap-3 text-sm text-stone-600 hover:text-stone-900 transition-colors group"
              @click="copyKakao(business.kakao)"
            >
              <div
                class="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-200 flex items-center justify-center shrink-0 transition-colors"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 3C6.477 3 2 6.589 2 11c0 2.843 1.738 5.355 4.377 6.882-.193.702-.7 2.54-.8 2.937-.124.483.178.478.374.347.155-.103 2.456-1.664 3.449-2.34.517.072 1.05.11 1.6.11 5.523 0 10-3.589 10-8s-4.477-8-10-8z"
                  />
                </svg>
              </div>
              <span class="min-w-0 text-left">
                <span class="block text-xs text-stone-400">카카오톡 ID</span>
                <span class="block truncate">{{
                  kakioCopied ? "복사됨!" : business.kakao
                }}</span>
              </span>
            </button>
          </div>

          <!-- Description -->
          <p class="text-stone-600 text-sm leading-relaxed">
            {{ business.description }}
          </p>

          <a
            href="https://forms.gle/RhBXka3hHt31qg5c9"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-xs font-medium transition-colors"
            @click.stop
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
          </a>
        </div>
      </div>
    </section>
  </Transition>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="lightboxIndex !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        @click.self="closeLightbox"
        @keydown.esc="closeLightbox"
        @keydown.left="prevImage"
        @keydown.right="nextImage"
        tabindex="0"
        ref="lightboxEl"
      >
        <!-- Close -->
        <button
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          @click="closeLightbox"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Prev -->
        <button
          v-if="galleryImages.length > 1"
          class="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          @click="prevImage"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <!-- Image -->
        <Transition :name="slideDirection" mode="out-in">
          <img
            v-if="lightboxIndex !== null"
            :key="lightboxIndex"
            :src="galleryImages[lightboxIndex]"
            :alt="`${business?.name} ${lightboxIndex + 1}`"
            class="max-h-[88vh] max-w-[88vw] object-contain rounded-xl shadow-2xl select-none"
          />
        </Transition>

        <!-- Next -->
        <button
          v-if="galleryImages.length > 1"
          class="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          @click="nextImage"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <!-- Dot indicators -->
        <div
          v-if="galleryImages.length > 1"
          class="absolute bottom-5 flex gap-2"
        >
          <button
            v-for="(_, i) in galleryImages"
            :key="i"
            class="w-2 h-2 rounded-full transition-all"
            :class="i === lightboxIndex ? 'bg-white scale-125' : 'bg-white/40'"
            @click="goToImage(i)"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Business } from "~/types/business";

const props = defineProps<{ business: Business | null }>();
defineEmits(["close"]);

const panelEl = ref<HTMLElement | null>(null);
const carouselRef = ref();
const galleryImages = computed(() => props.business?.gallery ?? []);

const kakioCopied = ref(false);
async function copyKakao(id: string) {
  await navigator.clipboard.writeText(id);
  kakioCopied.value = true;
  setTimeout(() => (kakioCopied.value = false), 2000);
}

// Lightbox
const lightboxIndex = ref<number | null>(null);
const slideDirection = ref("slide-left");
const lightboxEl = ref<HTMLElement | null>(null);

function openLightbox(i: number) {
  lightboxIndex.value = i;
  nextTick(() => lightboxEl.value?.focus());
}

function closeLightbox() {
  lightboxIndex.value = null;
}

function prevImage() {
  if (lightboxIndex.value === null) return;
  slideDirection.value = "slide-right";
  lightboxIndex.value =
    (lightboxIndex.value - 1 + galleryImages.value.length) %
    galleryImages.value.length;
}

function nextImage() {
  if (lightboxIndex.value === null) return;
  slideDirection.value = "slide-left";
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.value.length;
}

function goToImage(i: number) {
  if (lightboxIndex.value === null) return;
  slideDirection.value = i > lightboxIndex.value ? "slide-left" : "slide-right";
  lightboxIndex.value = i;
}
</script>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.22s ease;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
