<script setup>
import NavCard from '@/components/ui/NavCard.vue';
import { managerDashboardLinks } from '@/config/navigation';
</script>

<template>
  <div class="dashboard-grid">
    <RouterLink 
      v-for="item in managerDashboardLinks" 
      :key="item.label" 
      :to="item.route"
    >
      <NavCard :label="item.label" :icon="item.icon" />
    </RouterLink>
  </div>
</template>