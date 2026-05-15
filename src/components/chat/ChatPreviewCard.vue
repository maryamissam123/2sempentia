<!-- src/components/ChatPreviewCard.vue -->
<script setup>
import { Home } from '@lucide/vue';

defineProps({
  imageUrl: String,
  name: String,
  lastMessage: String
});
</script>

<template>
  <div class="chat-preview-card">
    <div class="chat-preview-card__image">
      <img v-if="imageUrl" :src="imageUrl" />
      <Home v-else :size="24" :stroke-width="1.5" />
    </div>
    <div class="chat-preview-card__content">
      <h3 class="chat-preview-card__name">{{ name }}</h3>
      <p class="chat-preview-card__message">{{ lastMessage }}</p>
    </div>
  </div>
</template>