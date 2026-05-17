<!-- src/components/base/BaseButton.vue -->
<script setup>
defineProps({
  variant: { type: String, default: 'primary' }
})
</script>

<template>
  <button class="base-button" :class="`base-button--${variant}`">
    <slot />
  </button>
</template>