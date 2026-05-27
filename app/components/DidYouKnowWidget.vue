<template>
  <div
    v-if="showDidYouKnow"
    class="fixed z-50 bottom-6 right-6 flex flex-col items-end"
    style="max-width: 287px"
  >
    <!-- Chat balloon -->
    <div class="relative mb-2">
      <div
        class="bg-white border-2 border-amber-400 rounded-2xl shadow-lg px-4 py-3 text-stone-800 text-base leading-relaxed max-w-sm"
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
        <span class="did-you-know-content" v-html="randomDidYouKnow" />
      </div>
      <!-- Balloon tail -->
      <div class="absolute right-8 bottom-[-19px] w-5 h-5 overflow-hidden">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M0 0 Q10 20 20 0 Z"
            fill="#fff"
            stroke="#fbbf24"
            stroke-width="1.5"
          />
        </svg>
      </div>
    </div>
    <!-- Character image -->
    <img
      src="/images/web/did_you_know.png"
      alt="My Little Vendors 캐릭터"
      class="w-40 h-40 rounded-full border-2 border-amber-300 bg-white shadow"
      style="object-fit: cover"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showDidYouKnow = ref(true);
const didYouKnowList = [
  "아테나 펜싱클럽의 줄리 선생님은 정말 굉장하세요. 캐나다에서 코치를 하기 전, <strong>한국의 엘리트 펜싱 육성 체계</strong>를 거치며 훈련하고 대회에 참가 했으며, 한국 국가대표 <strong>엘리트 팀 시스템에 선발된 경험</strong>이 있답니다!",
  "엘린 라인의 대표 엘리자베스 선생님은 <strong>SMP, PMU, PLASMA 분야 자격을 보유하고 있으며 국제 뷰티 마스터 대회에서 여러 부문 수상</strong> 경력이 있는 전문가예요. PCL 아카데미 수료 및 본사 공식 멤버로 활동하고 있으며, KSRS 학회 회원으로 전문성을 인정받았답니다. 정말 화려한 경력이죠?",
  "원플러밍은 <strong>Certified Red Seal(레드실 인증)</strong>을 가지고 다양한 도시에서 활약하고 있는 업체예요. 레드실이 뭐냐구요? 캐나다의 기술직(전문 직종) 종사자가 전국 어디서나 동일하게 인정받는 최고 권위의 <strong>국가 공인 기술 자격</strong>이랍니다!",
];
const randomDidYouKnow =
  didYouKnowList[Math.floor(Math.random() * didYouKnowList.length)];
</script>
<style scoped>
::v-deep(.did-you-know-content strong) {
  @apply text-amber-500 font-bold;
}
</style>
