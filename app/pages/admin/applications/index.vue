<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="text-2xl font-bold text-stone-900 mb-8">등록 신청 검토</h1>

    <p v-if="loading" class="text-sm text-stone-500">불러오는 중...</p>
    <p v-else-if="!applications.length" class="text-sm text-stone-500">신청이 없어요.</p>

    <ul v-else class="space-y-4">
      <li
        v-for="a in applications"
        :key="a.id"
        class="rounded-2xl border border-stone-200 bg-white p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-semibold text-stone-900">{{ a.name }}</p>
            <p class="text-sm text-stone-500">{{ a.location }} · {{ a.category }}</p>
          </div>
          <span
            class="text-xs font-medium px-2.5 py-1 rounded-full"
            :class="statusClass(a.status)"
          >
            {{ statusLabel(a.status) }}
          </span>
        </div>
        <p class="mt-3 text-sm text-stone-700 whitespace-pre-wrap">{{ a.description }}</p>
        <p class="mt-2 text-xs text-stone-500">
          <span v-if="a.instagram">IG: {{ a.instagram }} · </span>
          <span v-if="a.contact_email">{{ a.contact_email }}</span>
        </p>

        <div v-if="a.status === 'pending'" class="mt-4 flex gap-3">
          <button
            class="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
            @click="review(a, 'approved')"
          >
            승인
          </button>
          <button
            class="px-4 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 text-sm font-medium transition"
            @click="review(a, 'rejected')"
          >
            거절
          </button>
          <NuxtLink
            :to="`/admin/businesses/new?fromApplication=${a.id}`"
            class="px-4 py-1.5 rounded-full border border-stone-200 hover:border-stone-300 text-sm font-medium transition"
          >
            업체로 등록
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface VendorApplication {
  id: number;
  name: string;
  location: string;
  category: string;
  description: string;
  instagram: string | null;
  contact_email: string | null;
  status: "pending" | "approved" | "rejected";
}

definePageMeta({ middleware: "admin" });
useHead({ title: "등록 신청 — Admin" });

const { adminFetch } = useAdminApi();

const applications = ref<VendorApplication[]>([]);
const loading = ref(true);

function statusLabel(status: string) {
  return { pending: "대기", approved: "승인됨", rejected: "거절됨" }[status] ?? status;
}

function statusClass(status: string) {
  return {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
  }[status];
}

async function load() {
  loading.value = true;
  applications.value = await adminFetch<VendorApplication[]>(
    "/api/admin/applications",
  );
  loading.value = false;
}

async function review(a: VendorApplication, status: "approved" | "rejected") {
  await adminFetch(`/api/admin/applications/${a.id}`, {
    method: "PATCH",
    body: { status },
  });
  await load();
}

onMounted(load);
</script>
