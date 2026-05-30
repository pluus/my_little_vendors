<template>
  <div>
    <!-- Section header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4 flex items-center justify-center gap-2"
      >
        <svg
          class="w-8 h-8 text-amber-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 11H5m14 0a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2m14 0V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"
          />
        </svg>
        최근 소식
      </h1>
      <p class="text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
        서비스의 새로운 기능, 개선, 공지사항을 안내합니다.
      </p>
    </section>

    <!-- Updates list -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
      >
        <div
          v-for="(update, i) in updates"
          :key="i"
          class="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-stone-400">{{ update.date }}</span>
            <span
              v-if="update.tag"
              class="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 ml-2"
              >{{ update.tag }}</span
            >
          </div>
          <div class="text-stone-800 font-semibold mb-1 text-lg">
            {{ update.title }}
          </div>
          <div class="text-stone-500 text-sm whitespace-pre-line flex-1">
            {{ update.body }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const updates = [
  {
    date: "2026-05-30",
    tag: "신규",
    title: "채팅 챗봇 위젯 추가",
    body: "좌측 하단에 챗봇 위젯이 추가되어 궁금한 점을 간단히 문의할 수 있습니다.",
  },
  {
    date: "2026-05-29",
    tag: "개선",
    title: "비즈니스 카드에 좋아요 수 표시",
    body: "각 비즈니스 카드에 임의의 좋아요 수가 표시됩니다.",
  },
  {
    date: "2026-05-28",
    tag: "신규",
    title: "Did You Know? 위젯 개선",
    body: "각 비즈니스별로 재미있는 사실이 개별적으로 관리됩니다.",
  },
  {
    date: "2026-05-27",
    tag: "신규",
    title: "최근 소식 페이지 오픈",
    body: "업데이트 내역을 한눈에 볼 수 있는 최근 소식 페이지가 추가되었습니다.",
  },
];
</script>

<style scoped></style>
