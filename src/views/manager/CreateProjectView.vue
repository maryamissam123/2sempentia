<script setup>
import { ref, onMounted } from 'vue';
import { usePhaseStore } from '@/stores/phase';

const store = usePhaseStore();
const selectedPhases = ref([]);

onMounted(() => {
  store.fetchStandardPhases();
});

function togglePhase(phase) {
	const index = selectedPhases.value.findIndex(p => p.id === phase.id);
	if(index === -1) {
		selectedPhases.value.push(phase);
	} else {
		selectedPhases.value.splice(index, 1);
	}
};

function isSelected(phase) {
	return selectedPhases.value.some(p => p.id === phase.id);
};
</script>

<template>
  <h1>Manager Create Project</h1>
	<div 
		v-for="phase in store.standardPhases"
		:key="phase.id"
		class="test"
		:style="{ background: isSelected(phase) ? 'lightgreen' : 'white' }"
		@click="togglePhase(phase)"
	>
	{{ phase.name }}

	</div>
</template>