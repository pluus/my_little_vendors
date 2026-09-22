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
      <AdminRichTextEditor v-model="local.description" />
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
        <span class="block text-xs font-semibold text-stone-500 mb-1">커버 이미지</span>
        <input
          type="file"
          accept="image/*"
          :disabled="uploadingCover"
          @change="onCoverFile"
          class="text-xs"
        />
        <img v-if="local.cover" :src="local.cover" class="mt-2 h-20 rounded-lg object-cover border border-stone-200" />
        <p v-if="uploadError" class="text-xs text-rose-500 mt-1">{{ uploadError }}</p>
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-stone-500 mb-1">추가 이미지</span>
        <input
          type="file"
          accept="image/*"
          multiple
          :disabled="uploadingImages"
          @change="onImagesFile"
          class="text-xs"
        />
        <div v-if="parseList(imagesText).length" class="mt-2 flex flex-wrap gap-2">
          <div v-for="src in parseList(imagesText)" :key="src" class="relative">
            <img :src="src" class="h-16 w-16 rounded-lg object-cover border border-stone-200" />
            <button
              type="button"
              class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] leading-4"
              @click="removeImage(src)"
            >
              ×
            </button>
          </div>
        </div>
      </label>
    </div>

    <label class="block">
      <span class="block text-xs font-semibold text-stone-500 mb-1">Fun Fact</span>
      <AdminRichTextEditor v-model="local.fun_fact" />
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
        <AdminRichTextEditor v-model="local.vendor_story" />
      </label>
    </div>

    <div class="flex flex-wrap items-center gap-5 border-t border-stone-200 pt-4">
      <label class="flex items-center gap-2 text-sm text-stone-700">
        <input v-model="local.vendor_of_week" type="checkbox" /> 이 주의 업체
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

const { adminFetch } = useAdminApi();
const uploadingCover = ref(false);
const uploadingImages = ref(false);
const uploadError = ref("");

async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);
  const res = await adminFetch<{ url: string }>("/api/admin/upload", {
    method: "POST",
    body,
  });
  return res.url;
}

async function onCoverFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadingCover.value = true;
  uploadError.value = "";
  try {
    local.cover = await uploadFile(file);
  } catch (err) {
    uploadError.value = err instanceof Error ? err.message : "업로드 실패";
  } finally {
    uploadingCover.value = false;
  }
}

function removeImage(src: string) {
  imagesText.value = parseList(imagesText.value)
    .filter((s) => s !== src)
    .join(", ");
}

async function onImagesFile(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? []);
  if (!files.length) return;
  uploadingImages.value = true;
  uploadError.value = "";
  try {
    const urls = await Promise.all(files.map(uploadFile));
    const current = parseList(imagesText.value);
    imagesText.value = [...current, ...urls].join(", ");
  } catch (err) {
    uploadError.value = err instanceof Error ? err.message : "업로드 실패";
  } finally {
    uploadingImages.value = false;
  }
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
