<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';

const store = useProjectStore();

onMounted(() => {
  store.fetchProjects();
});

</script>

<template>
  <h1>Manager Projects</h1>
	<pre>{{ store.projects }}</pre>
</template>