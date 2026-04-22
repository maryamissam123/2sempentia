<script setup>
import TabBar from '@/components/TabBar.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<template>
  <div class="mobile-layout">
    <TopBar />
    <main class="mobile-layout__content">
      <slot />
    </main>
    <TabBar class="mobile-layout__tabbar" />
  </div>
</template>
