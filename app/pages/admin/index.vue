<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-2xl font-bold text-stone-900 mb-8">관리자 대시보드</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink
        to="/admin/businesses"
        class="rounded-2xl border border-stone-200 bg-white p-6 hover:border-stone-300 transition"
      >
        <p class="text-sm text-stone-500 mb-1">등록된 업체</p>
        <p class="text-3xl font-bold text-stone-900">{{ businessCount ?? "…" }}</p>
        <p class="mt-3 text-sm font-medium text-amber-600">업체 관리 →</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "admin" });
useHead({ title: "Admin" });

const { adminFetch } = useAdminApi();

const businessCount = ref<number | null>(null);

onMounted(async () => {
  const businesses = await adminFetch<unknown[]>("/api/admin/businesses");
  businessCount.value = businesses.length;
});
</script>
