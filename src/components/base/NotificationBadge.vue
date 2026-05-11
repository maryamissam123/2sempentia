<script setup>
defineProps({
  count: {
    type: [Number, String],
    default: 0
  }
});
</script>

<template>
  <div v-if="count > 0" class="notification-badge">
    {{ count }}
  </div>
</template>
