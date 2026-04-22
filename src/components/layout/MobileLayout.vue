<script setup>
import TabBar from '@/components/TabBar.vue'
</script>

<template>
  <div class="mobile-layout">
    <main class="mobile-layout__content">
      <slot />
    </main>
    <TabBar class="mobile-layout__tabbar" />
  </div>
</template>
