<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-2xl font-bold text-stone-900 mb-8">새 업체 등록</h1>
    <p v-if="loading" class="text-sm text-stone-500">신청서 불러오는 중...</p>
    <AdminBusinessForm
      v-else
      :model-value="prefill"
      :saving="saving"
      :error="error"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminBusiness } from "~/components/admin/BusinessForm.vue";

definePageMeta({ middleware: "admin" });
useHead({ title: "새 업체 — Admin" });

const route = useRoute();
const { adminFetch } = useAdminApi();
const saving = ref(false);
const error = ref("");
const loading = ref(false);
const prefill = ref<Partial<AdminBusiness> | null>(null);

const applicationId = route.query.fromApplication;
if (applicationId) {
  loading.value = true;
  const application = await adminFetch<{
    name: string;
    location: string;
    category: string;
    description: string;
    instagram: string | null;
    contact_email: string | null;
    tags: string[];
  }>(`/api/admin/applications/${applicationId}`);

  prefill.value = {
    name: application.name,
    location: application.location,
    categories: [application.category],
    description: application.description,
    instagram: application.instagram ?? "",
    email: application.contact_email ?? "",
    tags: application.tags,
  };
  loading.value = false;
}

async function onSubmit(business: AdminBusiness) {
  saving.value = true;
  error.value = "";
  try {
    const created = await adminFetch<{ id: number }>("/api/admin/businesses", {
      method: "POST",
      body: business,
    });
    await navigateTo(`/admin/businesses/${created.id}`);
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "저장에 실패했어요.";
  } finally {
    saving.value = false;
  }
}
</script>
