<!-- src/components/ChatPreviewCard.vue -->
<script setup>
defineProps({
  imageUrl: String,
  name: String,
  lastMessage: String
});
</script>

<template>
  <div class="chat-preview-card">
    <img v-if="imageUrl" :src="imageUrl" class="chat-preview-card__image" />
    <div class="chat-preview-card__content">
      <h3 class="chat-preview-card__name">{{ name }}</h3>
      <p class="chat-preview-card__message">{{ lastMessage }}</p>
    </div>
  </div>
</template>