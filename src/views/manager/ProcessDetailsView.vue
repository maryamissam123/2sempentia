<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import CommentCard from '@/components/phase/PhaseComment.vue';
import CommentForm from '@/components/phase/PhaseCommentForm.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseList from '@/components/ui/BaseList.vue';

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
  <template v-if="phaseStore.phase">
    <BaseButton variant="secondary" @click="showForm = !showForm">
      Tilføj kommentar
    </BaseButton>

    <CommentForm v-if="showForm" @submit="handleSubmit" />

    <BaseList :items="phaseStore.comments">
      <template #item="{ item }">
        <CommentCard :comment="item" />
      </template>
    </BaseList>

    <p v-if="phaseStore.comments.length === 0">
      Der er endnu ikke tilføjet opdateringer eller billeder til denne fase.
    </p>

    <BaseButton variant="primary" @click="handleComplete">
      Afslut fase
    </BaseButton>
  </template>
</template>