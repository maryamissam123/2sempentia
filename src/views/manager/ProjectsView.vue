<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';

const { projectStore, loadProjects } = useManagerProject();

onMounted(loadProjects);

</script>

<template>
  <div class="projects">
		<RouterLink
			v-for="project in projectStore.projects"
			:key="project.id"
			:to="{ name: 'manager-project-details', params: { id: project.id } }"
			class="project__card"
		>
			<h3>{{ project.name }}</h3>
			<p>{{ project.address }}</p>
		</RouterLink>
	</div>
</template>