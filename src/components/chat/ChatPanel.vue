<!-- src/components/chat/ChatPanel.vue -->
<script setup>
import { onUnmounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';
import ChatBubble from './ChatBubble.vue';
import ChatInput from './ChatInput.vue';

const props = defineProps({
  projectId: { type: String, default: null }
});

const auth = useAuthStore();
const chatStore = useChatStore();

// Start lytter når projectId er klar, og stop hvis projektet skifter
watch(() => props.projectId, (id) => {
  chatStore.stopListener();
  if (id) chatStore.startListener(id);
}, { immediate: true });

// Stop lytter når brugeren forlader chatten
onUnmounted(() => chatStore.stopListener());

// Sender beskeden via chat store
function handleSend(text) {
  if (props.projectId) chatStore.sendMessage(props.projectId, text)
}
</script>

<template>
  <!-- Viser alle beskeder som chatbobler -->
  <div class="chat">
    <ChatBubble
      v-for="message in chatStore.messages"
      :key="message.id"
      :message="message"
      :is-own="message.senderId === auth.user?.uid"
    />
  </div>

  <!-- Input til at skrive ny besked -->
  <ChatInput @send="handleSend" />
</template>