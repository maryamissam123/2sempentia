<script setup>
import { ref } from 'vue';
import { Send } from '@lucide/vue';

const emit = defineEmits(['send']);

const message = ref('');

function handleSend() {
  if (!message.value.trim()) return;
  emit('send', message.value);
  message.value = '';
};
</script>

<template>
  <div class="chat-input">
    <input
      v-model="message"
      class="chat-input__field"
      placeholder="Skriv besked..."
      @keyup.enter="handleSend"
    />

    <button class="chat-input__send" @click="handleSend">
      <Send :size="20" />
    </button>
  </div>
</template>