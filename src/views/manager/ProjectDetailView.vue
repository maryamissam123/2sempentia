<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';

const route = useRoute();
const store = useProjectStore();

onMounted(() => {
  store.fetchProject(route.params.id);
});
</script>

<template>
  <div>
    <h2>{{ store.project?.name }}</h2>
    <p>{{ store.project?.address }}</p>
    <p>Projektnummer: {{ store.project?.projectNumber }}</p>
    <p>Status: {{ store.project?.status }}</p>
  </div>
</template>