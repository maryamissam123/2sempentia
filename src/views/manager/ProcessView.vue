<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import BaseList from '@/components/base/BaseList.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const { projectId, phaseStore, loadPhases } = useManagerProject();

onMounted(loadPhases);
</script>

<template>
  <ProgressBar :value="phaseStore.progress" />

  <BaseList :items="phaseStore.phases">
    <template #item="{ item }">
      <RouterLink :to="{ name: 'manager-process-details', params: { projectId, id: item.id } }">
        <BaseCard :title="item.name" />
      </RouterLink>
    </template>
  </BaseList>
</template>