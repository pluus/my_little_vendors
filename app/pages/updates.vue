<template>
  <div>
    <!-- Section header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
      <h1
        class="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight tracking-tight mb-4 flex items-center justify-center gap-2"
      >
        업데이트 소식
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
          class="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-row items-center gap-6"
        >
          <!-- Placeholder image (left column) -->
          <div
            class="hidden sm:block w-32 rounded-2xl bg-stone-100 flex-shrink-0 overflow-hidden flex items-center justify-center"
          >
            <img
              :src="getChibiByIndex(i)"
              alt="업데이트 캐릭터"
              class="object-cover w-full h-full scale-x-[-1]"
            />
          </div>
          <!-- Content (right column) -->
          <div class="flex-1 flex flex-col justify-center">
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
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const chibiImages = [
  "/images/web/chibi-1.png",
  "/images/web/chibi-2.png",
  "/images/web/chibi-3.png",
];

// Assign chibi images in order (rotate 1 to 3)
function getChibiByIndex(idx: number) {
  return chibiImages[idx % chibiImages.length];
}

const updates = [
  {
    date: "2026-05-30",
    tag: "신규",
    title: "5개의 새로운 소상공인 작업중",
    body: "🎉 두근두근, 새로운 이야기가 준비되고 있어요! <br><br>커뮤니티에서 정성스럽게 추천해주신 따끈따끈한 소상공인 5곳이 지금 막 합류를 준비 중입니다. 각자 다른 색깔과 매력을 가진 공간들이라 하나씩 살펴보는 재미가 꽤 쏠쏠할 거예요 🤍<br><br>조금만 기다려 주세요! 곧 여러분의 취향을 저격할 작은 보석들이 찾아갑니다 ✨",
  },
  {
    date: "2026-05-29",
    tag: "신규",
    title: "5개의 새로운 소상공인 추가",
    body: "🎉 새로운 발견의 순간이에요! 커뮤니티가 직접 추천해주신 5곳의 소상공인이 새롭게 합류했어요.<br><br>누군가의 작은 가게가 누군가에겐 특별한 공간이 되도록, 하나하나 정성스럽게 모은 곳들입니다. 커피 향 가득한 카페부터 감성 가득한 공방까지, 천천히 둘러보며 나만의 ‘단골 후보’를 찾아보세요 🤍✨<br><br>이번 업데이트도 놓치면 아쉬울걸요?",
  },
  {
    date: "2026-05-28",
    tag: "신규",
    title: "4개의 새로운 소상공인 추가",
    body: "✨ 오늘도 반가운 소식이에요! 커뮤니티 추천을 통해 매력 가득한 소상공인 4곳이 새롭게 추가되었습니다.<br><br>크고 화려하진 않지만, 그 안에 담긴 정성과 이야기만큼은 누구보다 깊은 곳들이에요. 이런 곳을 하나씩 발견하는 순간이 바로 My Little Vendors의 가장 큰 즐거움이죠 💛<br><br>이번에도 숨겨진 보석 같은 공간들을 꼭 만나보세요!",
  },
];
</script>

<style scoped></style>
