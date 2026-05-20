<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import CommentCard from '@/components/phase/PhaseComment.vue';
import CommentForm from '@/components/phase/PhaseCommentForm.vue';

const { projectId, phaseStore, loadPhase } = useManagerProject();

const showForm = ref(false);

onMounted(loadPhase);

async function handleSubmit({ text, imageUrl }) {
  await phaseStore.addComment(projectId.value, phaseStore.phase.id, text, imageUrl);
  showForm.value = false;
};

async function handleComplete() {
  await phaseStore.completePhase(projectId.value, phaseStore.phase.id, phaseStore.phase.completed);
};

onUnmounted(() => {
  phaseStore.clearPhase();
});
</script>

<template>
  <div v-if="phaseStore.phase">
    <button @click="showForm = !showForm">TILFØJ KOMMENTAR</button>

    <CommentForm v-if="showForm" @submit="handleSubmit" />

    <CommentCard
      v-for="comment in phaseStore.comments"
      :key="comment.id"
      :comment="comment"
    />

    <p v-if="phaseStore.comments.length === 0">
      Der er endnu ikke tilføjet opdateringer eller billeder til denne fase.
    </p>

    <button @click="handleComplete">AFSLUT FASE</button>
  </div>
</template>