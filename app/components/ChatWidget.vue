<template>
  <div
    class="fixed bottom-6 left-6 z-50 flex flex-col items-start max-w-lg w-full"
  >
    <div
      class="bg-white border border-stone-200 rounded-2xl shadow-lg p-4 w-full"
    >
      <div class="flex flex-col gap-2 mb-2 max-h-60 overflow-y-auto">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="flex items-start gap-2"
          :class="msg.from === 'user' ? 'justify-end' : 'justify-start'"
        >
          <template v-if="msg.from === 'bot'">
            <div
              class="w-16 h-16 rounded-full border border-amber-200 bg-white shadow bg-center bg-contain bg-no-repeat"
              style="
                background-image: url(&quot;/images/web/did_you_know.png&quot;);
              "
            ></div>
          </template>
          <div
            :class="
              msg.from === 'user'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-stone-100 text-stone-700'
            "
            class="px-3 py-2 rounded-xl mb-1 max-w-[70%]"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <input
          v-model="input"
          type="text"
          class="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="메시지를 입력하세요..."
        />
        <button
          type="submit"
          class="bg-amber-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 transition"
        >
          전송
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const input = ref("");
const messages = ref<{ from: "user" | "bot"; text: string }[]>([]);

function sendMessage() {
  if (!input.value.trim()) return;
  messages.value.push({ from: "user", text: input.value });
  setTimeout(() => {
    messages.value.push({
      from: "bot",
      text: "이것은 임의의 챗봇 응답입니다.",
    });
  }, 500);
  input.value = "";
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
