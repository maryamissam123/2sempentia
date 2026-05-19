<!-- src/components/ui/NavCard.vue -->
<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true }
})
</script>

<template>
  <div class="nav-card">
    <img :src="`/icons/${icon}`" :alt="label" class="nav-card__icon" />
    <span class="nav-card__label">{{ label }}</span>
  </div>
</template>