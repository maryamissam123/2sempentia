<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePhaseStore } from '@/stores/phase';

const route = useRoute();
const phaseStore = usePhaseStore();

const newComment = ref('');

const projectId = route.params.projectId;
const phaseId = route.params.id;

onMounted(() => {
  phaseStore.fetchPhase(projectId, phaseId);
	phaseStore.fetchComments(projectId, phaseId);
});

async function handleAddComment() {
	if (!newComment.value.trim()) return;
	await phaseStore.addComment(projectId, phaseId, newComment.value);
	newComment.value = '';
}

async function handleComplete() {
	await phaseStore.completePhase(projectId, phaseId, phaseStore.phase.completed);
	await phaseStore.fetchPhase(projectId, phaseId);
};
</script>

<template>
  <div>
    <h2>{{ phaseStore.phase?.name }}</h2>
    <p>Status: {{ phaseStore.phase?.completed ? 'Færdig' : 'Ikke færdig' }}</p>

    <button @click="handleComplete">
      {{ phaseStore.phase?.completed ? 'Markér som ikke færdig' : 'Markér som færdig' }}
    </button>

    <h3>Kommentarer</h3>
    <ul>
      <li v-for="comment in phaseStore.comments" :key="comment.id">
        {{ comment.text }}
      </li>
    </ul>

    <input v-model="newComment" placeholder="Skriv kommentar" />
    <button @click="handleAddComment">Tilføj</button>
  </div>
</template>