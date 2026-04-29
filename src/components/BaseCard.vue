<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div class="base-card">
    <div v-if="$slots.icon" class="base-card__icon">
      <slot name="icon" />
    </div>

    <div class="base-card__content">
      <h3 v-if="title" class="base-card__title">{{ title }}</h3>
      <p v-if="subtitle" class="base-card__subtitle">{{ subtitle }}</p>
      <slot />
    </div>

    <div v-if="$slots.action" class="base-card__action">
      <slot name="action" />
    </div>
  </div>
</template>