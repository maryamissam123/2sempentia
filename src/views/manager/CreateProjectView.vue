<script setup>
import { onMounted } from 'vue';
import { usePhaseStore } from '@/stores/phase';

const store = usePhaseStore();

onMounted(() => {
  store.fetchStandardPhases();
});
</script>

<template>
  <h1>Manager Create Project</h1>
	<pre> {{ store.standardPhases }}</pre>
</template>