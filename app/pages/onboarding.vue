<template>
  <div
    class="h-screen w-full bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4 py-8 overflow-y-auto"
  >
    <div class="max-w-2xl w-full my-auto">
      <!-- Mascot Image -->
      <div class="text-center mb-8">
        <img
          src="/images/web/did_you_know.png"
          alt="Mascot"
          class="mx-auto mb-4 rounded-full"
        />
        <h1 class="text-3xl sm:text-3xl font-bold text-stone-900 mb-3">
          <span class="text-amber-400">안녕하세요!</span> 무엇을 도와드릴까요?
        </h1>
        <p class="text-stone-600 text-lg">
          믿을 수 있는 우리 이웃의 서비스를 찾아드릴게요.
        </p>
      </div>

      <!-- Scenario Selection List -->
      <div class="space-y-3 mb-8">
        <button
          v-for="option in scenarioOptions"
          :key="option.label"
          class="w-full p-5 rounded-xl border-2 transition-all duration-200 text-left hover:scale-[1.02]"
          :class="
            selectedScenario === option.label
              ? 'border-amber-400 bg-amber-50 shadow-lg'
              : 'border-stone-200 bg-white hover:border-amber-200 hover:shadow-md'
          "
          @click="selectScenario(option)"
        >
          <div class="flex items-center gap-4">
            <!-- Icon -->
            <div class="text-3xl flex-shrink-0">{{ option.icon }}</div>

            <!-- Text -->
            <div class="flex-1">
              <div
                class="font-semibold text-base sm:text-lg"
                :class="
                  selectedScenario === option.label
                    ? 'text-amber-600'
                    : 'text-stone-900'
                "
              >
                {{ option.label }}
              </div>
            </div>

            <!-- Checkmark -->
            <div
              class="w-6 h-6 rounded-full flex-shrink-0 transition-all duration-200"
              :class="
                selectedScenario === option.label
                  ? 'bg-amber-400'
                  : 'bg-stone-200'
              "
            >
              <svg
                v-if="selectedScenario === option.label"
                class="w-full h-full p-1 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3">
        <button
          class="w-full py-4 px-6 rounded-xl font-semibold text-white bg-amber-400 hover:bg-amber-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!selectedScenario"
          @click="handleContinue"
        >
          시작하기
        </button>
        <button
          class="w-full py-4 px-6 rounded-xl font-semibold text-stone-600 bg-white border-2 border-stone-200 hover:border-stone-300 transition-all duration-200"
          @click="handleSkip"
        >
          건너뛰고 둘러보기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { completeOnboarding, skipOnboarding } = useOnboarding();
const router = useRouter();

interface ScenarioOption {
  label: string;
  value: string[];
  icon: string;
}

const scenarioOptions: ScenarioOption[] = [
  {
    label: "이벤트에 필요한 물건을 찾고 있어요.",
    value: ["이벤트"],
    icon: "🎈",
  },
  {
    label: "생활 관련 서비스가 필요해요.",
    value: ["홈 & 리빙"],
    icon: "🧹",
  },
  {
    label: "무언가를 배우고싶어요.",
    value: ["교육"],
    icon: "🏃",
  },
  {
    label: "특별한 음식을 찾고 있어요.",
    value: ["식품"],
    icon: "🍰",
  },
  {
    label: "아름다움을 가꾸고 싶어요",
    value: ["미용 & 건강"],
    icon: "💅",
  },
];

const selectedScenario = ref<string>("");
const selectedCategories = ref<string[]>([]);

const selectScenario = (option: ScenarioOption) => {
  selectedScenario.value = option.label;
  selectedCategories.value = option.value;
};

const handleContinue = () => {
  completeOnboarding(selectedCategories.value);
  router.push("/");
};

const handleSkip = () => {
  skipOnboarding();
  router.push("/");
};

useHead({
  title: "환영합니다 - My Little Vendors",
  meta: [
    {
      name: "description",
      content: "관심 있는 서비스 카테고리를 선택해주세요.",
    },
  ],
});
</script>
