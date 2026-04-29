<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="base-list">
    <div v-for="(item, index) in items" :key="item.id || index" class="base-list__item">
      <slot name="item" :item="item" />
    </div>
  </div>
</template>