<script setup>
import { formatDate } from '@/utils/date';

defineProps({
  comment: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="comment-card">
    <img
      :src="comment.imageUrl || '/images/ProcessHouse.jpg'"
      alt="Byggefoto"
      class="comment-card__image"
    />

    <div class="comment-card__content">
      <h4 class="comment-card__author">KOMMENTAR FRA BYGGELEDEREN</h4>
      <p class="comment-card__date">{{ formatDate(comment.createdAt) }}</p>
      <p v-if="comment.text" class="comment-card__text">{{ comment.text }}</p>
    </div>
  </div>
</template>