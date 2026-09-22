<template>
  <form class="space-y-5 max-w-2xl" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">이름 *</span>
        <input v-model="local.name" required class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">슬러그 *</span>
        <input v-model="local.slug" required class="field" />
      </label>
    </div>

    <label class="block">
      <span class="block text-xs font-semibold text-stone-500 mb-1">소개</span>
      <textarea v-model="local.description" rows="3" class="field" />
    </label>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">위치</span>
        <input v-model="local.location" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">카테고리 (쉼표 구분)</span>
        <input v-model="categoriesText" class="field" />
      </label>
    </div>

    <label class="block">
      <span class="block text-xs font-semibold text-stone-500 mb-1">태그 (쉼표 구분)</span>
      <input v-model="tagsText" class="field" />
    </label>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">웹사이트</span>
        <input v-model="local.website" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">인스타그램</span>
        <input v-model="local.instagram" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">카카오</span>
        <input v-model="local.kakao" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">이메일</span>
        <input v-model="local.email" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">전화번호</span>
        <input v-model="local.phone" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">영업시간</span>
        <input v-model="local.hours" class="field" />
      </label>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">커버 이미지 URL</span>
        <input v-model="local.cover" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">이미지 URL들 (쉼표 구분)</span>
        <input v-model="imagesText" class="field" />
      </label>
    </div>

    <label class="block">
      <span class="block text-xs font-semibold text-stone-500 mb-1">Fun Fact</span>
      <textarea v-model="local.fun_fact" rows="3" class="field" />
    </label>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-200 pt-4">
      <p class="sm:col-span-2 text-xs font-semibold text-stone-500 uppercase tracking-wide">
        업주 스토리 (선택)
      </p>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">업주 이름</span>
        <input v-model="local.vendor_name" class="field" />
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">한 줄 인용구</span>
        <input v-model="local.vendor_quote" class="field" />
      </label>
      <label class="block sm:col-span-2">
        <span class="block text-xs font-semibold text-stone-500 mb-1">스토리</span>
        <textarea v-model="local.vendor_story" rows="3" class="field" />
      </label>
    </div>

    <div class="flex flex-wrap items-center gap-5 border-t border-stone-200 pt-4">
      <label class="flex items-center gap-2 text-sm text-stone-700">
        <input v-model="local.featured" type="checkbox" /> 추천 업체
      </label>
      <label class="flex items-center gap-2 text-sm text-stone-700">
        <input v-model="local.vendor_of_week" type="checkbox" /> 이 주의 업체
      </label>
      <label class="flex items-center gap-2 text-sm text-stone-700">
        <input v-model="local.is_placeholder" type="checkbox" /> 플레이스홀더
      </label>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <button
        type="submit"
        :disabled="saving"
        class="px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition disabled:opacity-60"
      >
        {{ saving ? "저장 중..." : "저장" }}
      </button>
      <p v-if="error" class="text-sm text-rose-500">{{ error }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

export interface AdminBusiness {
  id?: number;
  slug: string;
  name: string;
  description: string | null;
  categories: string[];
  location: string | null;
  tags: string[];
  cover: string | null;
  images: string[];
  gallery: string[];
  hours: string | null;
  website: string | null;
  instagram: string | null;
  kakao: string | null;
  email: string | null;
  phone: string | null;
  featured: boolean;
  is_placeholder: boolean;
  fun_fact: string | null;
  vendor_of_week: boolean;
  vendor_name: string | null;
  vendor_story: string | null;
  vendor_quote: string | null;
  vendor_journey: string | null;
  vendor_passion: string | null;
  vendor_image: string | null;
  like_count: number;
}

function emptyBusiness(): AdminBusiness {
  return {
    slug: "",
    name: "",
    description: "",
    categories: [],
    location: "",
    tags: [],
    cover: "",
    images: [],
    gallery: [],
    hours: "",
    website: "",
    instagram: "",
    kakao: "",
    email: "",
    phone: "",
    featured: false,
    is_placeholder: false,
    fun_fact: "",
    vendor_of_week: false,
    vendor_name: "",
    vendor_story: "",
    vendor_quote: "",
    vendor_journey: "",
    vendor_passion: "",
    vendor_image: "",
    like_count: 0,
  };
}

const props = defineProps({
  modelValue: { type: Object as PropType<Partial<AdminBusiness>>, default: null },
  saving: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

const emit = defineEmits<{ submit: [AdminBusiness] }>();

const local = reactive<AdminBusiness>({ ...emptyBusiness(), ...props.modelValue });

const categoriesText = ref(local.categories.join(", "));
const tagsText = ref(local.tags.join(", "));
const imagesText = ref(local.images.join(", "));

function parseList(text: string) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function onSubmit() {
  emit("submit", {
    ...local,
    categories: parseList(categoriesText.value),
    tags: parseList(tagsText.value),
    images: parseList(imagesText.value),
    gallery: parseList(imagesText.value),
  });
}
</script>

<style scoped>
.field {
  @apply w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition;
}
</style>
