<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import BaseList from '@/components/ui/BaseList.vue';
import NavCard from '@/components/ui/NavCard.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import PhaseSummaryCard from '@/components/phase/PhaseSummaryCard.vue'
import dashboardImage from '/images/ProcessHouse.jpg';

const { projectId, projectStore, phaseStore, loadPhases } = useCustomerProject();

watch(projectId, loadPhases);

const dashboardLinks = [
  { label: 'SE BYGGEFORLØB', route: '/customer/process', icon: 'Process.png' },
  { label: 'CHAT', route: '/customer/chat-options', icon: 'Chat.png' },
  { label: 'FILER', route: '/customer/documents', icon: 'Files.png' }
];
</script>

<template>
  <div class="dashboard-page">
    <section class="dashboard-header fullbleed">
      <img
        :src="projectStore.projects[0]?.imageUrl || dashboardImage"
        alt="Mit byggeprojekt"
        class="dashboard-header__image"
      />
    </section>

    <ProgressBar :value="phaseStore.progress" />

    <div class="dashboard-grid">
      <RouterLink
        v-if="phaseStore.currentPhase"
        :to="{ name: 'customer-process-details', params: { id: phaseStore.currentPhase.id } }"
      >
        <PhaseSummaryCard label="NUVÆRENDE FASE" :phase="phaseStore.currentPhase" />
      </RouterLink>

      <RouterLink
        v-if="phaseStore.nextPhase"
        :to="{ name: 'customer-process-details', params: { id: phaseStore.nextPhase.id } }"
      >
        <PhaseSummaryCard label="NÆSTE FASE" :phase="phaseStore.nextPhase" />
      </RouterLink>
    </div>

    <BaseList :items="dashboardLinks" class="dashboard-list">
      <template #item="{ item }">
        <RouterLink :to="item.route" class="no-underline">
          <NavCard :label="item.label" :icon="item.icon" />
        </RouterLink>
      </template>
    </BaseList>
  </div>
</template>