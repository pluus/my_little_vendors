<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-2xl font-bold text-stone-900 mb-8">새 업체 등록</h1>
    <AdminBusinessForm :saving="saving" :error="error" @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import type { AdminBusiness } from "~/components/admin/BusinessForm.vue";

definePageMeta({ middleware: "admin" });
useHead({ title: "새 업체 — Admin" });

const { adminFetch } = useAdminApi();
const toast = useAdminToast();
const saving = ref(false);
const error = ref("");

async function onSubmit(business: AdminBusiness) {
  saving.value = true;
  error.value = "";
  try {
    const created = await adminFetch<{ id: number }>("/api/admin/businesses", {
      method: "POST",
      body: business,
    });
    toast.show("업체가 등록됐어요.");
    await navigateTo(`/admin/businesses/${created.id}`);
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "저장에 실패했어요.";
    toast.show(error.value, "error");
  } finally {
    saving.value = false;
  }
}
</script>
