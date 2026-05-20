<template>
  <footer class="mt-24 border-t border-stone-100 bg-white">
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
    >
      <div>
        <div class="flex items-center gap-2 mb-3">
          <span
            class="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-white font-bold text-xs"
            >m</span
          >
          <span class="font-semibold text-stone-800">my little vendors</span>
        </div>
        <p class="text-stone-500 text-sm leading-relaxed">
          우리 동네 소상공인과 홈비즈니스를 발견하고 응원하세요.
        </p>
      </div>
      <div>
        <h4 class="font-medium text-stone-700 mb-3 text-sm">탐색하기</h4>
        <ul class="space-y-2 text-sm text-stone-500">
          <li>
            <NuxtLink to="/" class="hover:text-amber-600 transition-colors"
              >전체 보기</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/?category=음식 %26 베이커리"
              class="hover:text-amber-600 transition-colors"
              >음식 & 베이커리</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/?category=수공예 %26 공예"
              class="hover:text-amber-600 transition-colors"
              >수공예 & 공예</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/?category=뷰티 %26 웰니스"
              class="hover:text-amber-600 transition-colors"
              >뷰티 & 웰니스</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div>
        <h4 class="font-medium text-stone-700 mb-3 text-sm">입점 안내</h4>
        <ul class="space-y-2 text-sm text-stone-500">
          <li>
            <NuxtLink
              to="/submit"
              class="hover:text-amber-600 transition-colors"
              >내 가게 등록하기</NuxtLink
            >
          </li>
          <li>
            <a href="#" class="hover:text-amber-600 transition-colors"
              >이용 방법</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-amber-600 transition-colors"
              >자주 묻는 질문</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      class="border-t border-stone-100 py-4 text-center text-xs text-stone-400"
    >
      © {{ new Date().getFullYear() }} my little vendors · 소상공인을 응원하며
      만들었습니다
    </div>
  </footer>
</template>
