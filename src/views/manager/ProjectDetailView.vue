<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';

const route = useRoute();
const projectStore = useProjectStore();
const phaseStore = usePhaseStore();

onMounted(() => {
  projectStore.fetchProject(route.params.id);
  phaseStore.fetchPhases(route.params.id);
  console.log('phases:', phaseStore.phases);
});
</script>

<template>
  <div class="test">
    <h2>{{ projectStore.project?.name }}</h2>
    <p>{{ projectStore.project?.address }}</p>
    <p>Projektnummer: {{ projectStore.project?.projectNumber }}</p>
    <p>Status: {{ projectStore.project?.status }}</p>
  </div>

  <div class="test">
    <h2>Faser</h2>
    <RouterLink
      v-for="phase in phaseStore.phases"
      :key="phase.id"
      :to="{ name: 'manager-process', params: { projectId: projectStore.project.id, id: phase.id } }"
    >
      {{ phase.name }}
    </RouterLink>

  </div>
</template>