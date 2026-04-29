<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores/chat';

const route = useRoute();
const chatStore = useChatStore();

const newMessage = ref('');
const projectId = route.params.projectId;

onMounted(() => {
  chatStore.fetchMessages(projectId);
});

async function handleSend() {
  if (!newMessage.value.trim()) return;
  await chatStore.sendMessage(projectId, newMessage.value);
  newMessage.value = '';
}
</script>

<template>
  <ul>
  <li v-for="message in chatStore.messages" :key="message.id">
    <h5>{{ message.senderName }}</h5>
    <p>{{ message.text }}</p>
  </li>
</ul>

<input v-model="newMessage" placeholder="Skriv besked">
<button @click="handleSend">Send</button>
</template>