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
          <span v-if="a.contact_email">{{ a.contact_email }} · </span>
          <span v-if="a.phone">{{ a.phone }} · </span>
          <span v-if="a.kakao">카카오: {{ a.kakao }}</span>
        </p>

        <div v-if="a.status === 'pending'" class="mt-4 flex gap-3">
          <button
            class="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition disabled:opacity-60"
            :disabled="creatingId === a.id"
            @click="createDraftBusiness(a)"
          >
            {{ creatingId === a.id ? "등록 중..." : "비공개 업체로 임시 등록" }}
          </button>
          <button
            class="px-4 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 text-sm font-medium transition"
            @click="review(a, 'rejected')"
          >
            거절
          </button>
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
  phone: string | null;
  kakao: string | null;
  tags: string[];
  status: "pending" | "approved" | "rejected";
}

definePageMeta({ middleware: "admin" });
useHead({ title: "등록 신청 — Admin" });

const { adminFetch } = useAdminApi();
const toast = useAdminToast();

const applications = ref<VendorApplication[]>([]);
const loading = ref(true);
const creatingId = ref<number | null>(null);

function slugify(name: string) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `business-${Date.now()}`;
}

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

async function createDraftBusiness(a: VendorApplication) {
  creatingId.value = a.id;
  try {
    const created = await adminFetch<{ id: number }>("/api/admin/businesses", {
      method: "POST",
      body: {
        slug: slugify(a.name),
        name: a.name,
        location: a.location,
        categories: [a.category],
        description: a.description,
        instagram: a.instagram ?? "",
        email: a.contact_email ?? "",
        phone: a.phone ?? "",
        kakao: a.kakao ?? "",
        tags: a.tags ?? [],
        published: false,
      },
    });
    await adminFetch(`/api/admin/applications/${a.id}`, {
      method: "PATCH",
      body: { status: "approved" },
    });
    toast.show("비공개 업체로 등록했어요. 마저 편집해주세요.");
    await navigateTo(`/admin/businesses/${created.id}`);
  } catch (e: unknown) {
    toast.show(e instanceof Error ? e.message : "등록에 실패했어요.", "error");
  } finally {
    creatingId.value = null;
  }
}

async function review(a: VendorApplication, status: "approved" | "rejected") {
  try {
    await adminFetch(`/api/admin/applications/${a.id}`, {
      method: "PATCH",
      body: { status },
    });
    toast.show(status === "approved" ? "승인했어요." : "거절했어요.");
    await load();
  } catch (e: unknown) {
    toast.show(e instanceof Error ? e.message : "처리에 실패했어요.", "error");
  }
}

onMounted(load);
</script>
