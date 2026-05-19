<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import BaseList from '@/components/ui/BaseList.vue';
import PhaseCard from '@/components/phase/PhaseCard.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';

const { projectId, phaseStore, loadPhases } = useCustomerProject();

watch(projectId, loadPhases, { immediate: true });
</script>

<template>
  <ProgressBar :value="phaseStore.progress" />

  <BaseList :items="phaseStore.phases">
    <template #item="{ item }">
      <RouterLink
        :to="{ name: 'customer-process-details', params: { id: item.id } }"
        class="no-underline"
      >
        <PhaseCard :phase="item" />
      </RouterLink>
    </template>
  </BaseList>
</template>