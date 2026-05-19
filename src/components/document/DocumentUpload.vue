<!-- src/components/document/DocumentUpload.vue -->
<script setup>
import { ref } from 'vue';
import { Upload } from '@lucide/vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const emit = defineEmits(['upload']);
const fileInput = ref(null);

function handleChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  emit('upload', file);
  event.target.value = '';
};
</script>

<template>
  <BaseButton @click="fileInput.click()">
    <Upload :size="20" />
    Upload dokument
  </BaseButton>
  <input
    ref="fileInput"
    type="file"
    hidden
    @change="handleChange"
  />
</template>