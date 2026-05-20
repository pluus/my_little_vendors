<template>
  <NuxtLayout>
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
        Back to discover
      </NuxtLink>

      <h1 class="text-3xl font-bold text-stone-900 mb-2">List your business</h1>
      <p class="text-stone-500 mb-10">
        Join our community of independent vendors. Fill out the form and we'll
        review your submission within 48 hours.
      </p>

      <!-- Success state -->
      <div
        v-if="submitted"
        class="rounded-3xl bg-emerald-50 border border-emerald-100 px-8 py-12 text-center"
      >
        <p class="text-4xl mb-4">🎉</p>
        <h2 class="font-bold text-stone-900 text-xl mb-2">You're submitted!</h2>
        <p class="text-stone-500 text-sm mb-6">
          We'll review your listing and get back to you within 48 hours.
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Browse the catalog
        </NuxtLink>
      </div>

      <!-- Form -->
      <form v-else class="space-y-5" @submit.prevent="submit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1.5"
              >Business name <span class="text-rose-400">*</span></label
            >
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Bon Matin Bakery"
              class="field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1.5"
              >Location <span class="text-rose-400">*</span></label
            >
            <input
              v-model="form.location"
              type="text"
              required
              placeholder="Brooklyn, NY"
              class="field"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5"
            >Category <span class="text-rose-400">*</span></label
          >
          <select v-model="form.category" required class="field">
            <option value="" disabled>Select a category…</option>
            <option v-for="cat in nonAllCategories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-stone-700 mb-1.5"
            >Description <span class="text-rose-400">*</span></label
          >
          <textarea
            v-model="form.description"
            required
            rows="4"
            placeholder="Tell us what makes your business special…"
            class="field resize-none"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1.5"
              >Instagram handle</label
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
              >Contact email</label
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
            >Tags
            <span class="text-stone-400 font-normal"
              >(comma separated)</span
            ></label
          >
          <input
            v-model="form.tags"
            type="text"
            placeholder="handmade, custom orders, vegan"
            class="field"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-white font-semibold text-sm transition-colors shadow-sm shadow-amber-200"
        >
          Submit for review ✨
        </button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { categories } from "~/data/businesses";

useHead({ title: "List Your Business — my little vendors" });

const nonAllCategories = categories.filter((c) => c !== "All");

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
