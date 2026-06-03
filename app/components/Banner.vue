<template>
  <div
    class="mt-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center text-left"
  >
    <div class="flex items-center justify-center">
      <img
        src="/images/web/did_you_know.png"
        alt="Did you know"
        class="w-full max-w-xs h-auto object-contain"
      />
    </div>

    <div class="p-5 sm:p-6">
      <p
        class="text-xs font-semibold tracking-[0.14em] text-amber-600 uppercase"
      >
        Recent News
      </p>

      <h2
        class="mt-2 text-xl sm:text-2xl font-bold text-stone-900 leading-snug"
      >
        사이트 업데이트 소식을 확인해보세요
      </h2>

      <p class="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
        새로운 가게 등록, 추천 기능 개선, 커뮤니티 공지까지 한눈에 확인할 수
        있어요. 최근 변경사항은 계속 업데이트됩니다.
      </p>

      <NuxtLink
        to="/updates"
        class="mt-5 inline-flex items-center gap-2 rounded-full bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium px-4 py-2 transition-colors"
      >
        최근 소식 보러가기

        <svg
          class="w-3.5 h-3.5"
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
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
