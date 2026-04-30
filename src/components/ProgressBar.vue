<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
    validator: (v) => v >= 0 && v <= 100
  }
});
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__fill" :style="{ width: value + '%' }"></div>
    <span class="progress-bar__label">{{ value }}%</span>
  </div>
</template>