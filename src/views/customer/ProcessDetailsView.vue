<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';

const route = useRoute();
const projectStore = useProjectStore();
const phaseStore = usePhaseStore();

onMounted(async() => {
  await projectStore.fetchProjects();
	const projectId = projectStore.projects[0]?.id;
	if (projectId) {
		phaseStore.fetchPhase(projectId, route.params.id);
    phaseStore.fetchComments(projectId, route.params.id);
	};
});
</script>

<template>
  <div>
    <h2>{{ phaseStore.phase?.name }}</h2>
    <p>Status: {{ phaseStore.phase?.completed ? 'færdig' : 'ikke færdig' }}</p>
  </div>

  <h3>Kommentar fra byggelederen</h3>
  <ul>
    <li v-for="comment in phaseStore.comments" :key="comment.id">
      {{ comment.text }}
    </li>
  </ul>

</template>