<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-2xl font-bold text-stone-900 mb-8">업체 수정</h1>
    <p v-if="loading" class="text-sm text-stone-500">불러오는 중...</p>
    <AdminBusinessForm
      v-else
      :model-value="business!"
      :saving="saving"
      :error="error"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminBusiness } from "~/components/admin/BusinessForm.vue";

definePageMeta({ middleware: "admin" });
useHead({ title: "업체 수정 — Admin" });

const route = useRoute();
const { adminFetch } = useAdminApi();

const business = ref<AdminBusiness | null>(null);
const loading = ref(true);
const saving = ref(false);
const error = ref("");

onMounted(async () => {
  business.value = await adminFetch<AdminBusiness>(
    `/api/admin/businesses/${route.params.id}`,
  );
  loading.value = false;
});

async function onSubmit(updated: AdminBusiness) {
  saving.value = true;
  error.value = "";
  try {
    await adminFetch(`/api/admin/businesses/${route.params.id}`, {
      method: "PATCH",
      body: updated,
    });
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "저장에 실패했어요.";
  } finally {
    saving.value = false;
  }
}
</script>
