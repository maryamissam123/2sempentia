<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MobileLayout from '@/components/layout/MobileLayout.vue';
import DetailLayout from '@/components/layout/DetailLayout.vue';

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === 'detail') return DetailLayout;
  if (route.meta.layout === 'mobile') return MobileLayout;
  return null;
});
</script>

<template>
  <component v-if="layout" :is="layout">
    <RouterView />
  </component>
  <RouterView v-else />
</template>

