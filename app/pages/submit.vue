<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 py-16">
    <!-- Back link -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-8"
    >
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
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      탐색으로 돌아가기
    </NuxtLink>

    <h1 class="text-3xl font-bold text-stone-900 mb-2">내 가게 등록하기</h1>
    <p class="text-stone-500 mb-10">
      우리 커뮤니티에 합류하세요. 양식을 작성하시면 48시간 이내에 검토 후
      연락드립니다.
    </p>

    <!-- Success state -->
    <div
      v-if="submitted"
      class="rounded-3xl bg-emerald-50 border border-emerald-100 px-8 py-12 text-center"
    >
      <p class="text-4xl mb-4">🎉</p>
      <h2 class="font-bold text-stone-900 text-xl mb-2">등록 신청 완료!</h2>
      <p class="text-stone-500 text-sm mb-6">
        신청서를 검토 후 48시간 이내에 연락드리겠습니다.
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
      >
        둘러보기
      </NuxtLink>
    </div>

    <!-- Form -->
    <form v-else class="space-y-5" @submit.prevent="submit">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5"
            >가게 이름 <span class="text-rose-400">*</span></label
          >
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="나의 작은 가게"
            class="field"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5"
            >위치 <span class="text-rose-400">*</span></label
          >
          <input
            v-model="form.location"
            type="text"
            required
            placeholder="서울, 마포구"
            class="field"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-700 mb-1.5"
          >카테고리 <span class="text-rose-400">*</span></label
        >
        <select v-model="form.category" required class="field">
          <option value="" disabled>카테고리를 선택해주세요…</option>
          <option v-for="cat in nonAllCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-700 mb-1.5"
          >소개글 <span class="text-rose-400">*</span></label
        >
        <textarea
          v-model="form.description"
          required
          rows="4"
          placeholder="가게의 특별한 점을 알려주세요…"
          class="field resize-none"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5"
            >인스타그램</label
          >
          <div class="relative">
            <span
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm"
              >@</span
            >
            <input
              v-model="form.instagram"
              type="text"
              placeholder="yourbusiness"
              class="field pl-8"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5"
            >연락처 이메일</label
          >
          <input
            v-model="form.contact"
            type="email"
            placeholder="hello@yourbusiness.com"
            class="field"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-700 mb-1.5"
          >태그
          <span class="text-stone-400 font-normal">(쉼표로 구분)</span></label
        >
        <input
          v-model="form.tags"
          type="text"
          placeholder="수공예, 주문제작, 비건"
          class="field"
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-white font-semibold text-sm transition-colors shadow-sm shadow-amber-200"
      >
        등록 신청하기 ✨
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { categories } from "~/data/businesses";

useHead({ title: "내 가게 등록 — my little vendors" });

const nonAllCategories = categories.filter((c) => c !== "전체");

const submitted = ref(false);
const form = reactive({
  name: "",
  location: "",
  category: "",
  description: "",
  instagram: "",
  contact: "",
  tags: "",
});

function submit() {
  // In production, send to an API or form service (e.g. Formspree)
  console.log("Form submitted:", { ...form });
  submitted.value = true;
}
</script>

<style>
.field {
  @apply w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition;
}
</style>
