<template>
  <div>
    <!-- Section header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4 flex items-center justify-center gap-2"
      >
        최근 소식
      </h1>
      <p class="text-stone-500 text-lg max-w-md mx-auto leading-relaxed">
        서비스의 새로운 기능, 개선, 공지사항을 안내합니다.
      </p>
    </section>

    <!-- Updates list -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
      <ul class="space-y-5">
        <li
          v-for="(update, i) in updates"
          :key="i"
          class="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-stone-400">{{ update.date }}</span>
            <span
              v-if="update.tag"
              class="py-1 px-4 rounded-full text-xs font-medium bg-amber-100 text-amber-700 ml-2"
              >{{ update.tag }}</span
            >
          </div>
          <div class="text-stone-800 font-semibold mb-4 text-lg">
            {{ update.title }}
          </div>
          <div class="text-stone-500 text-sm whitespace-pre-line flex-1">
            <span v-html="update.body" />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const updates = [
  {
    date: "2026-05-30",
    tag: "신규",
    title: "5개의 새로운 소상공인 추가",
    body: "🎉 새로운 소식이에요! 커뮤니티가 직접 추천한 따끈따끈한 소상공인 5곳이 새롭게 합류했습니다.<br><br>하나하나 정성 가득한 곳들이니 천천히 둘러보며 발견하는 재미를 느껴보세요 🤍",
  },
  {
    date: "2026-05-28",
    tag: "신규",
    title: "4개의 새로운 소상공인 추가",
    body: "✨ 더 풍성해진 업데이트! 커뮤니티 추천을 통해 매력 가득한 소상공인 4곳이 새롭게 추가되었어요.<br><br>이번에도 숨은 보석 같은 곳들이 가득하니 놓치지 마세요 💛",
  },
];
</script>

<style scoped></style>
