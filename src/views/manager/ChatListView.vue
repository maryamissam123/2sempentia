<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';

const { projectStore, customers, loadProjects, loadCustomersForProjects } = useManagerProject();

onMounted(async () => {
  await loadProjects();
  await loadCustomersForProjects();
});
</script>

<template>
    <RouterLink
    v-for="project in projectStore.projects"
    :key="project.id"
    :to="{ name: 'manager-chat', params: { projectId: project.id } }"
  > 
    <img v-if="project.imageUrl" :src="project.imageUrl" />
    <strong>{{ customers[project.id]?.name }}</strong>
    {{ project.name }}
  </RouterLink>
</template>