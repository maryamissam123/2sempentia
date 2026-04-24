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
		<RouterLink
			v-for="project in store.projects"
			:key="project.id"
			:to="`/manager/projects/${project.id}`"
			class="project__card"
		>
			<h3>{{ project.name }}</h3>
			<p>{{ project.address }}</p>
		</RouterLink>
	</div>
</template>