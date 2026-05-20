<!-- src/components/base/BaseButton.vue -->
<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  fixed: { type: Boolean, default: false }
});
</script>

<template>
  <button class="base-button" :class="[`base-button--${variant}`, { 'base-button--fixed': fixed }]">
    <slot />
  </button>
</template>