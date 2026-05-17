<script setup>
import TabBar from '@/components/layout/TabBar.vue';
import TopBar from '@/components/layout/TopBar.vue';
</script>

<template>
  <div class="mobile-layout">
    <TopBar :left-icons="['settings']" :right-icons="['notifications']" />
    <main class="mobile-layout__content">
      <slot />
    </main>
    <TabBar class="mobile-layout__tabbar" />
  </div>
</template>
