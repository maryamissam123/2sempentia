<script setup>
import { onUnmounted, watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import CommentCard from '@/components/phase/PhaseComment.vue';

const { projectId, phaseStore, loadPhase } = useCustomerProject();

watch(projectId, loadPhase, { immediate: true });

onUnmounted(() => {
  phaseStore.clearPhase();
});
</script>

<template>
  <div v-if="phaseStore.phase">
    <CommentCard
      v-for="comment in phaseStore.comments"
      :key="comment.id"
      :comment="comment"
    />

    <p v-if="phaseStore.comments.length === 0">
      Der er endnu ikke tilføjet opdateringer eller billeder til denne fase.
    </p>
  </div>
</template>