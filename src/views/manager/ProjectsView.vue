<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';

const store = useProjectStore();

onMounted(() => {
  store.fetchProjects();
});

</script>

<template>
  <div class="projects">
		<div
			v-for="project in store.projects"
			:key="project.id"
			class="project__card"
		>
			<h3>{{ project.name }}</h3>
			<p>{{ project.address }}</p>
		</div>
	</div>
</template>