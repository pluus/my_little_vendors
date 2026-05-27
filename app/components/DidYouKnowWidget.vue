<template>
  <div
    v-if="showDidYouKnow"
    class="fixed z-50 bottom-6 right-6 flex flex-col items-end"
    style="max-width: 340px"
  >
    <!-- Chat balloon -->
    <div class="relative mb-2">
      <div
        class="bg-white border-2 border-amber-400 rounded-2xl shadow-lg px-5 py-4 text-stone-800 text-sm leading-relaxed max-w-xs"
        style="word-break: break-word"
      >
        <div class="flex items-center gap-2 mb-1">
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
        <span v-text="randomDidYouKnow" />
      </div>
      <!-- Balloon tail -->
      <div class="absolute right-10 bottom-[-22px] w-6 h-6 overflow-hidden">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M0 0 Q12 24 24 0 Z"
            fill="#fff"
            stroke="#fbbf24"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
    <!-- Character image -->
    <img
      src="/images/web/did_you_know.png"
      alt="My Little Vendors 캐릭터"
      class="w-48 h-48 rounded-full border-2 border-amber-300 bg-white shadow"
      style="object-fit: cover"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showDidYouKnow = ref(true);
const didYouKnowList = [
  "리틀브루 카페의 사장님은 매일 새벽 5시에 직접 원두를 로스팅하며 하루를 시작합니다.",
  "노스하우스 베이커리는 같은 자리에서 15년째 한결같은 레시피로 빵을 구워오고 있습니다.",
  "플로라가든의 대표는 원래 그래픽 디자이너였지만, 식물을 사랑하게 되어 가드닝 사업을 시작했습니다.",
  "오션타이드 스시바의 셰프는 일본에서 10년간 수련한 뒤 밴쿠버로 돌아와 가게를 열었습니다.",
  "코지니트 스튜디오는 모든 니트 제품을 사장님이 직접 디자인하고 샘플링합니다.",
  "브라이트픽스 수리점은 ‘당일 수리 완료’를 원칙으로 8년째 운영 중입니다.",
  "헤이븐 서점은 동네 주민들이 추천한 책으로만 한 코너를 채워 운영하고 있습니다.",
  "스톤앤우드 인테리어는 목재 하나하나를 직접 골라 프로젝트를 진행하는 것으로 유명합니다.",
  "루나플로리스 꽃집은 매주 다른 테마로 매장을 완전히 새롭게 연출합니다.",
  "마운틴로스트 커피는 비 오는 날마다 ‘레인 블렌드’를 한정 출시합니다.",
];
const randomDidYouKnow =
  didYouKnowList[Math.floor(Math.random() * didYouKnowList.length)];
</script>
