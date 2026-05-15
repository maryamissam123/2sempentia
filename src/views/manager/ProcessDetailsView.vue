<script setup>
import { ref, onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import PhotoUpload from '@/components/PhotoUpload.vue';

const { projectId, phaseStore, loadPhase } = useManagerProject();

const newComment = ref('');
const newImageUrl = ref('');

onMounted(loadPhase);

function handleUploaded(url) {
  newImageUrl.value = url;
};

async function handleAddComment() {
  if (!newComment.value.trim() && !newImageUrl.value) return;
  console.log('imageUrl bliver sendt:', newImageUrl.value);
  await phaseStore.addComment(
    projectId.value,
    phaseStore.phase.id,
    newComment.value,
    newImageUrl.value
  );
  newComment.value = '';
  newImageUrl.value = '';
}

async function handleComplete() {
  await phaseStore.completePhase(projectId.value, phaseStore.phase.id, phaseStore.phase.completed);
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

    <h3>Tilføj kommentar</h3>
    <input v-model="newComment" placeholder="Skriv kommentar" />
    <PhotoUpload @uploaded="handleUploaded" />
    <button @click="handleAddComment">Tilføj</button>
  </div>
</template>