<script setup>
import { ref, onMounted } from 'vue';
import { usePhaseStore } from '@/stores/phase';
import { useProjectStore } from '@/stores/project';
import { useRouter } from 'vue-router';
import PhotoUpload from '@/components/PhotoUpload.vue';
import BaseInput from '@/components/base/BaseInput.vue';

const phaseStore = usePhaseStore();
const projectStore = useProjectStore();
const router = useRouter();


const selectedPhases = ref([]);
const projectNumber = ref('');
const name = ref('');
const address = ref('');
const imageUrl = ref('');

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

function handleUploaded(url) {
  imageUrl.value = url;
};

function isSelected(phase) {
	return selectedPhases.value.some(p => p.id === phase.id);
};

function handleCreate() {
	const id = projectStore.createProject({
		projectNumber: projectNumber.value,
		name: name.value,
		address: address.value,
		imageUrl: imageUrl.value,
		phases: selectedPhases.value
	});
	router.push(`/manager/projects/${id}`);
};
</script>

<template>
	<BaseInput v-model="projectNumber" placeholder="Projektnummer" />
	<BaseInput v-model="name" placeholder="Projektnavn" />
	<BaseInput v-model="address" placeholder="Projekt Adresse" />

	<PhotoUpload @uploaded="handleUploaded" />

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