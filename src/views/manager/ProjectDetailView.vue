<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';
import { Key } from 'lucide-vue-next';

const route = useRoute();
const projectStore = useProjectStore();
const phaseStore = usePhaseStore();

onMounted(() => {
  projectStore.fetchProject(route.params.id);
  phaseStore.fetchPhases(route.params.id);
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
    <ul>
      <li v-for="phase in phaseStore.phases" :key="phase.id">
        {{ phase.name }} {{ phase.completed ? 'Afsluttet' : 'Igangværende' }}
      </li>
    </ul>

  </div>
</template>