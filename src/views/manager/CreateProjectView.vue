<script setup>
import { ref, onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';
import { useRouter } from 'vue-router';
import PhotoUpload from '@/components/project/PhotoUpload.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import PhaseSelector from '@/components/phase/PhaseSelector.vue';

const projectStore = useProjectStore();
const router = useRouter();


const selectedPhases = ref([]);
const projectNumber = ref('');
const name = ref('');
const address = ref('');
const imageUrl = ref('');


function handleUploaded(url) {
  imageUrl.value = url;
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

  <PhaseSelector v-model="selectedPhases" />

	<button @click="handleCreate">Opret Projekt</button>
</template>