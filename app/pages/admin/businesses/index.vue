<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-stone-900">업체 관리</h1>
      <NuxtLink
        to="/admin/businesses/new"
        class="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white text-sm font-medium transition"
      >
        + 새 업체
      </NuxtLink>
    </div>

    <p v-if="loading" class="text-sm text-stone-500">불러오는 중...</p>

    <ul v-else class="space-y-3">
      <li
        v-for="b in businesses"
        :key="b.id"
        class="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-5 py-4"
      >
        <div>
          <p class="font-medium text-stone-900">
            {{ b.name }}
            <span v-if="b.vendor_of_week" class="ml-2 text-xs text-amber-600">이 주의 업체</span>
          </p>
          <p class="text-sm text-stone-500">{{ b.location }} · {{ b.categories.join(", ") }}</p>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <NuxtLink :to="`/admin/businesses/${b.id}`" class="text-stone-600 hover:text-stone-900">
            수정
          </NuxtLink>
          <button class="text-rose-500 hover:text-rose-700" @click="remove(b)">삭제</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { AdminBusiness } from "~/components/admin/BusinessForm.vue";

definePageMeta({ middleware: "admin" });
useHead({ title: "업체 관리 — Admin" });

const { adminFetch } = useAdminApi();
const toast = useAdminToast();

const businesses = ref<AdminBusiness[]>([]);
const loading = ref(true);

async function load() {
  loading.value = true;
  businesses.value = await adminFetch<AdminBusiness[]>("/api/admin/businesses");
  loading.value = false;
}

async function remove(b: AdminBusiness) {
  if (!confirm(`"${b.name}" 업체를 삭제할까요?`)) return;
  try {
    await adminFetch(`/api/admin/businesses/${b.id}`, { method: "DELETE" });
    toast.show(`"${b.name}" 삭제했어요.`);
    await load();
  } catch (e: unknown) {
    toast.show(e instanceof Error ? e.message : "삭제에 실패했어요.", "error");
  }
}

onMounted(load);
</script>
