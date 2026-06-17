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
            class="w-32 rounded-2xl bg-stone-100 flex-shrink-0 overflow-hidden flex items-center justify-center"
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
    date: "2026-06-16",
    tag: "신규",
    title: "7개의 새로운 소상공인 추가",
    body: "🌟 이번에 동네에 새로운 가게들이 또 들어왔어요! 커뮤니티 추천으로 총 7곳의 소상공인이 새롭게 합류했습니다.<br><br>동네 곳곳에서 열심히 운영 중인 사장님들의 가게를 소개해드려요. 규모는 작지만 각자 개성과 정성이 가득한 곳들이에요 🤍<br><br>새로운 단골집 찾고 있다면 한 번 둘러보세요. 생각지도 못한 ‘찐’ 가게를 발견할지도 몰라요 ✨",
  },
  {
    date: "2026-06-10",
    tag: "신규",
    title: "6개의 새로운 소상공인 추가",
    body: "🌟 이번에도 새로운 가게들이 찾아왔어요! 커뮤니티 추천으로 총 6곳의 소상공인이 새롭게 합류했습니다.<br><br>동네 곳곳에서 정성껏 운영되는 사장님들의 이야기를 모아봤어요. 작지만 확실한 개성과 온기가 있는 가게들이에요 🤍<br><br>새로운 단골집을 찾고 있다면 지금 한번 구경해보세요. 숨겨진 보석 같은 곳이 있을지도 몰라요 ✨",
  },
  {
    date: "2026-06-05",
    tag: "신규",
    title: "3개의 새로운 소상공인 추가",
    body: "🌟 또 다른 특별한 가게들이 찾아왔어요! 이번에는 커뮤니티 추천을 통해 3곳의 소상공인이 새롭게 합류했습니다.<br><br>동네 곳곳에서 정성을 담아 서비스를 제공하는 사장님들의 이야기를 만나보세요. 규모는 작지만, 그 안에 담긴 열정과 개성은 결코 작지 않답니다 🤍<br><br>새로운 단골을 찾고 있다면 지금 둘러보세요. 예상치 못한 보석 같은 가게를 발견하게 될지도 몰라요 ✨",
  },
  {
    date: "2026-06-03",
    tag: "신규",
    title: "5개의 새로운 소상공인 추가",
    body: "🎉 반가운 소식을 전해드려요! 커뮤니티에서 직접 추천해주신 5곳의 소상공인이 새롭게 등록되었습니다.<br><br>정성 가득한 손길로 운영되는 작은 가게들, 특별한 서비스를 제공하는 숨은 보석 같은 곳들을 하나하나 만나보세요 🤍<br><br>누군가의 단골 가게가 될 수도, 여러분의 새로운 발견이 될 수도 있는 소중한 공간들입니다. 지금 바로 둘러보러 가볼까요? ✨",
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
