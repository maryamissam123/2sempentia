<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MobileLayout from '@/components/layout/MobileLayout.vue'

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout === 'mobile') return MobileLayout
  return 'div'
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

