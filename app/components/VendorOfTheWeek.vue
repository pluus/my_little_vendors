<template>
  <section v-if="featuredVendor" class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <NuxtLink :to="`/vendor/${featuredVendor.slug}`" class="block group">
      <div
        class="relative bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Background pattern -->
        <div
          class="absolute inset-0 opacity-10"
          style="
            background-image: radial-gradient(
              circle at 2px 2px,
              white 1px,
              transparent 0
            );
            background-size: 32px 32px;
          "
        ></div>

        <div class="relative grid md:grid-cols-2 gap-0">
          <!-- Left: Content -->
          <div
            class="p-8 sm:p-12 flex flex-col justify-center order-2 md:order-1"
          >
            <!-- Badge -->
            <div class="flex items-center gap-2 mb-4">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-amber-900 text-xs font-bold rounded-full shadow-sm"
              >
                <svg
                  class="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                이주의 벤더
              </span>
            </div>

            <!-- Title -->
            <h2
              class="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight"
            >
              {{ featuredVendor.vendor?.name || featuredVendor.name }}
            </h2>

            <!-- Subtitle -->
            <p class="text-white/90 text-lg mb-2">
              {{ featuredVendor.name }}
            </p>
            <p class="text-white/75 text-sm mb-6">
              {{ featuredVendor.category }} · {{ featuredVendor.location }}
            </p>

            <!-- Quote -->
            <blockquote
              v-if="featuredVendor.vendor?.quote"
              class="border-l-4 border-white/50 pl-4 py-2 mb-6"
            >
              <p class="text-white/95 italic text-base leading-relaxed">
                "{{ featuredVendor.vendor.quote }}"
              </p>
            </blockquote>

            <!-- CTA Button -->
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 text-amber-600 font-semibold rounded-full shadow-lg transition-all group-hover:shadow-xl group-hover:scale-105"
              >
                벤더 스토리 보기
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </div>
          </div>

          <!-- Right: Image -->
          <div class="relative aspect-[4/3] md:aspect-auto order-1 md:order-2">
            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 md:hidden"
            ></div>
            <img
              :src="featuredVendor.vendor?.image || featuredVendor.cover"
              :alt="featuredVendor.vendor?.name || featuredVendor.name"
              class="w-full h-full object-cover"
            />
            <!-- Decorative corner accent -->
            <div
              class="hidden md:block absolute -bottom-4 -left-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"
            ></div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { businesses } from "~/data/businesses";
import type { Business } from "~/types/business";

// Get featured vendor (prioritize vendorOfWeek flag, fallback to first with vendor info)
const featuredVendor = computed<Business | null>(() => {
  // First check for explicitly marked vendor of the week
  const marked = businesses.find(
    (b) => b.vendorOfWeek && b.slug && b.vendor && !b.isPlaceholder,
  );
  if (marked) return marked;

  // Fallback to first vendor with complete info
  return businesses.find((b) => b.slug && b.vendor && !b.isPlaceholder) || null;
});
</script>
