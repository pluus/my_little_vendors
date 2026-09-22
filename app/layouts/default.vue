<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />

    <Transition name="fade">
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-2xl shadow-lg text-sm font-medium text-white"
        :class="toastMessage.type === 'error' ? 'bg-rose-500' : 'bg-emerald-500'"
      >
        {{ toastMessage.text }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { message: toastMessage } = useAdminToast();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
