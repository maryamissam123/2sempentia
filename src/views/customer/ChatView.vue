<script setup>
import { ref, onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';
import { useChatStore } from '@/stores/chat';
import { useAuthStore } from '@/stores/auth';

const projectStore = useProjectStore();
const chatStore = useChatStore();
const authStore = useAuthStore();

const newMessage = ref('');
const projectId = ref(null);

onMounted(async () => {
  await projectStore.fetchProjects();
  projectId.value = projectStore.projects[0]?.id;
  if(projectId.value) {
    chatStore.fetchMessages(projectId.value);
  };
});

async function handleSend() {
  if(!newMessage.value.trim()) return;
  await chatStore.sendMessage(projectId.value, newMessage.value);
  newMessage.value = '';
}
</script>

<template>
    <h1>Chat med byggelederen</h1>

    <ul>
      <li v-for="message in chatStore.messages" :key="message.id">
        <h5>{{ message.senderName }}</h5>
        <p>{{ message.text }}</p>
      </li>
    </ul>

    <input v-model="newMessage" placeholder="Skriv besked">
    <button @click="handleSend">Send</button>
</template>