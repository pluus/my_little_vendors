<template>
  <div class="rounded-xl border border-stone-200 bg-stone-50 overflow-hidden">
    <div class="flex items-center gap-1 border-b border-stone-200 bg-white px-2 py-1">
      <button
        type="button"
        class="w-7 h-7 rounded font-bold text-sm text-stone-700 hover:bg-stone-100"
        title="굵게 (Ctrl+B)"
        @mousedown.prevent="exec('bold')"
      >
        B
      </button>
      <button
        type="button"
        class="px-2 h-7 rounded text-xs text-stone-500 hover:bg-stone-100"
        title="줄바꿈 추가"
        @mousedown.prevent="insertLineBreak"
      >
        줄바꿈
      </button>
    </div>
    <div
      ref="editorEl"
      class="field min-h-[6rem] focus:outline-none"
      contenteditable="true"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string | null }>();
const emit = defineEmits<{ "update:modelValue": [string] }>();

const editorEl = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (editorEl.value) editorEl.value.innerHTML = props.modelValue || "";
  document.execCommand("defaultParagraphSeparator", false, "br");
});

function onInput() {
  emit("update:modelValue", editorEl.value?.innerHTML ?? "");
}

function exec(command: string) {
  editorEl.value?.focus();
  document.execCommand(command);
  onInput();
}

function insertLineBreak() {
  editorEl.value?.focus();
  document.execCommand("insertHTML", false, "<br><br>");
  onInput();
}
</script>

<style scoped>
.field {
  @apply w-full px-3.5 py-2.5 text-sm text-stone-800;
}
</style>
