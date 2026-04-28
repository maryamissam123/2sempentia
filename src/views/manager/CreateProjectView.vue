<script setup>
import { ref, onMounted } from 'vue';
import { usePhaseStore } from '@/stores/phase';
import { useProjectStore } from '@/stores/project';
import { useRouter } from 'vue-router';

const phaseStore = usePhaseStore();
const projectStore = useProjectStore();
const router = useRouter();


const selectedPhases = ref([]);
const projectNumber = ref('');
const name = ref('');
const address = ref('');

onMounted(() => {
  phaseStore.fetchStandardPhases();
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

function handleCreate() {
	const id = projectStore.createProject({
		projectNumber: projectNumber.value,
		name: name.value,
		address: address.value,
		phases: selectedPhases.value
	});
	router.push(`/manager/projects/${id}`);
};
</script>

<template>
  <h1>Manager Create Project</h1>
	<input v-model="projectNumber" placeholder="Projektnummer">
	<input v-model="name" placeholder="Projektnavn">
	<input v-model="address" placeholder="Projekt Adresse">

	<h3>Vælg faser</h3>
	<div 
		v-for="phase in phaseStore.standardPhases"
		:key="phase.id"
		class="test"
		:style="{ background: isSelected(phase) ? 'lightgreen' : 'white' }"
		@click="togglePhase(phase)"
	>
		{{ phase.name }}
	</div>

	<button @click="handleCreate">Opret Projekt</button>
</template>