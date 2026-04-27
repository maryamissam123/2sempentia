<script setup>
import { ref, onMounted } from 'vue';
import { usePhaseStore } from '@/stores/phase';

const store = usePhaseStore();
const selectedPhases = ref([]);

const projectNumber = ref('');
const projectName = ref('');
const projectAddress = ref('');

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

function createProject() {
	console.log({
		projectNumber: projectNumber.value,
		projectName: projectName.value,
		projectAddress: projectAddress.value
	})
};
</script>

<template>
  <h1>Manager Create Project</h1>
	<input v-model="projectNumber" placeholder="Projektnummer">
	<input v-model="projectName" placeholder="Projektnavn">
	<input v-model="projectAddress" placeholder="Projekt Adresse">

	<h3>Vælg faser</h3>
	<div 
		v-for="phase in store.standardPhases"
		:key="phase.id"
		class="test"
		:style="{ background: isSelected(phase) ? 'lightgreen' : 'white' }"
		@click="togglePhase(phase)"
	>
		{{ phase.name }}
	</div>

	<button @click="createProject">Opret Projekt</button>
</template>