<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';
import ChatInput from '@/components/base/ChatInput.vue';
import ChatBubble from '@/components/base/ChatBubble.vue';

const route = useRoute();
const auth = useAuthStore();
const chatStore = useChatStore();
const projectId = route.params.projectId;

onMounted(() => {
  chatStore.startListener(projectId);
});

onUnmounted(() => {
  chatStore.stopListener();
});

async function handleSend(text) {
  await chatStore.sendMessage(projectId, text);
};
</script>

<template>
  <div class="chat">
    <ChatBubble
      v-for="message in chatStore.messages"
      :key="message.id"
      :message="message"
      :is-own="message.senderId === auth.user?.uid"
    />
  </div>
  <ChatInput @send="handleSend" />
</template>