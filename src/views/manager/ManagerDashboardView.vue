<script setup>
import NavCard from '@/components/ui/NavCard.vue'

const dashboardLinks = [
  { label: 'AKTIVE PROJEKTER', route: '/manager/projects', icon: 'ActiveProject.png' },
  { label: 'OPRET PROJEKT', route: '/manager/create-project', icon: 'ActiveProject.png' },
  { label: 'BYGGEFORLØB', route: { name: 'manager-projects', query: { goto: 'process' } }, icon: 'Process.png' },
  { label: 'CHAT', route: { name: 'manager-chat-list' }, icon: 'Chat.png' },
  { label: 'FILER', route: { name: 'manager-projects', query: { goto: 'documents' } }, icon: 'Files.png' },
]
</script>

<template>
<div class="dashboard-grid">
  <RouterLink v-for="item in dashboardLinks" :key="item.label" :to="item.route">
    <NavCard :label="item.label" :icon="item.icon" />
  </RouterLink>
</div>
</template>