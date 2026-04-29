<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';

const projectStore = useProjectStore();

onMounted(() => {
  projectStore.fetchProjects();
});
</script>

<template>
  <h1>Manager Chat Overview</h1>

    <RouterLink
    v-for="project in projectStore.projects"
    :key="project.id"
    :to="{ name: 'manager-chat', params: { projectId: project.id } }"
  >
    {{ project.name }}
  </RouterLink>
</template>