<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';

const phaseStore = usePhaseStore();
const projectStore = useProjectStore();

onMounted(async () => {
  await projectStore.fetchProjects();
  console.log('projects:', projectStore.projects);

  const projectId = projectStore.projects[0]?.id;
  console.log('projectId:', projectId);

  if (projectId) {
    await phaseStore.fetchPhases(projectId);
    console.log('phases:', phaseStore.phases);
  }
});
</script>

<template>
	<div class="test">
		<ul>
			<li v-for="phase in phaseStore.phases" :key="phase.id">
				{{ phase.name }}
			</li>
		</ul>
	</div>
</template>