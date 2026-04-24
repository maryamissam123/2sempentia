<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';

const store = useProjectStore();

onMounted(() => {
  store.fetchProjects();
});
</script>

<template>
  <h2>{{ store.projects[0]?.name }}</h2>
  <div class="dashboard">
    <RouterLink to="/customer/process" class="dashboard__card">
      Nuværende fase
    </RouterLink>
    <RouterLink to="/customer/process" class="dashboard__card">
      Næste fase
    </RouterLink>
    <RouterLink to="/customer/process" class="dashboard__card">
      Se byggeforløb
    </RouterLink>
    <RouterLink to="/customer/chat-options" class="dashboard__card">
      Chat
    </RouterLink>
    <RouterLink to="/customer/documents" class="dashboard__card">
      Dokumenter
    </RouterLink>
  </div>
</template>