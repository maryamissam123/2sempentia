<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseList from '@/components/base/BaseList.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import PhaseStackCard from '@/components/cards/PhaseStackCard.vue'

const { projectId, projectStore, phaseStore, loadPhases } = useCustomerProject()

watch(projectId, loadPhases)

const dashboardLinks = [
  { label: 'SE BYGGEFORLØB', route: '/customer/process', icon: 'Process.png' },
  { label: 'CHAT', route: '/customer/chat-options', icon: 'Chat.png' },
  { label: 'FILER', route: '/customer/documents', icon: 'Files.png' }
];
</script>

<template>
  <div class="dashboard-page">
    <section class="dashboard-header">
      <div class="dashboard-header__image-container">
        <img
          v-if="projectStore.projects[0]?.imageUrl"
          :src="projectStore.projects[0].imageUrl"
          alt="Mit byggeprojekt"
          class="dashboard-header__image"
        />
      </div>
    </section>

    <ProgressBar :value="phaseStore.progress" />

    <div class="dashboard-content">
      <div class="dashboard-grid">
      <RouterLink 
        v-if="phaseStore.currentPhase"
        :to="{ name: 'customer-process-details', params: { id: phaseStore.currentPhase.id } }"
        class="dashboard-card"
      >
        <PhaseStackCard title="NUVÆRENDE FASE" :phase="phaseStore.currentPhase" />
      </RouterLink>

      <RouterLink 
        v-if="phaseStore.nextPhase"
        :to="{ name: 'customer-process-details', params: { id: phaseStore.nextPhase.id } }"
        class="dashboard-card"
      >
        <PhaseStackCard title="NÆSTE FASE" :phase="phaseStore.nextPhase" />
      </RouterLink>
      </div>

      <BaseList :items="dashboardLinks" class="dashboard-list">
        <template #item="{ item }">
          <RouterLink :to="item.route" class="no-underline">
            <BaseCard :title="item.label">
              <template #icon>
                <img :src="`/src/assets/icons/${item.icon}`" :alt="item.label" />
              </template>
            </BaseCard>
          </RouterLink>
        </template>
      </BaseList>
    </div>
  </div>
</template>