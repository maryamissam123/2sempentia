<script setup>
defineProps({
  comment: {
    type: Object,
    required: true
  }
});

// Formaterer Firebase timestamp til en pæn dansk dato (f.eks. 10.3.2026)
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('da-DK');
};
</script>

<template>
  <div class="comment-card">
    <div class="comment-card__image-container">
      <img :src="comment.imageUrl || '/images/ProcessHouse.jpg'" alt="Byggefoto" />
      
      <div class="comment-card__zoom-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
    </div>
    
    <div class="comment-card__content">
      <h4 class="comment-card__author">KOMMENTAR FRA BYGGELEDEREN</h4>
      <p class="comment-card__date">{{ formatDate(comment.createdAt) }}</p>
      <p v-if="comment.text" class="comment-card__text">{{ comment.text }}</p>
    </div>
  </div>
</template>