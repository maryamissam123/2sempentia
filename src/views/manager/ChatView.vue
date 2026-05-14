<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores/chat';
import ChatInput from '@/components/base/ChatInput.vue';

const route = useRoute();
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
  <ul>
  <li v-for="message in chatStore.messages" :key="message.id">
    <h5>{{ message.senderName }}</h5>
    <p>{{ message.text }}</p>
  </li>
</ul>

<ChatInput @send="handleSend" />
</template>