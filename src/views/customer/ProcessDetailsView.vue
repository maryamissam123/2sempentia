<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import BaseCard from '@/components/base/BaseCard.vue';

const { projectId, phaseStore, loadPhase } = useCustomerProject();

watch(projectId, loadPhase, { immediate: true });

function formatDate(timestamp) {
  if (!timestamp?.seconds) return ''
  const d = new Date(timestamp.seconds * 1000)
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
}
</script>


<template>
  <BaseCard
    v-for="comment in phaseStore.comments"
    :key="comment.id"
    class="base-card--white base-card--with-image"
    title="KOMMENTAR FRA BYGGELEDEREN"
    :subtitle="formatDate(comment.createdAt)"
  >
    <template #icon>
      <img v-if="comment.imageUrl" :src="comment.imageUrl" />
    </template>
    <p>{{ comment.text }}</p>
  </BaseCard>
</template>
