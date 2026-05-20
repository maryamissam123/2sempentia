<script setup>
import { ref } from 'vue';
import PhotoUpload from '@/components/project/PhotoUpload.vue';

const emit = defineEmits(['submit']);

const text = ref('');
const imageUrl = ref('');

function handleUploaded(url) {
  imageUrl.value = url;
};

function handleSubmit() {
  if (!text.value.trim() && !imageUrl.value) return;
  emit('submit', { text: text.value, imageUrl: imageUrl.value });
  text.value = '';
  imageUrl.value = '';
};
</script>

<template>
  <div class="comment-form">
    <input v-model="text" placeholder="Skriv kommentar" />
    <PhotoUpload @uploaded="handleUploaded" />
    <button @click="handleSubmit">Tilføj</button>
  </div>
</template>