<script setup>
import { ref, watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';

const { projectId, chatStore, loadMessages } = useCustomerProject();

const newMessage = ref('');

watch(projectId, loadMessages);

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