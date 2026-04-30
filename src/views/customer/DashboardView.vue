<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';
import BaseCard from '@/components/BaseCard.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const projectStore = useProjectStore();
const phaseStore = usePhaseStore();

onMounted(async () => {
  await projectStore.fetchProjects();
  const projectId = projectStore.projects[0]?.id;
  if (projectId) {
    await phaseStore.fetchPhases(projectId);
  }
});
</script>

<template>
  
  <section class="dashboard-header">      
      <div class="dashboard-header__image-container">
        <img 
          src="@/assets/images/ProcessHouse.jpg" 
          alt="Mit byggeprojekt" 
          class="dashboard-header__image"
        />
      </div>
    </section>

  <ProgressBar :value="phaseStore.progress" />

  <div class="dashboard">
    <RouterLink to="/customer/process" class="dashboard__card">
      Nuværende fase
    </RouterLink>
    <RouterLink to="/customer/process" class="dashboard__card">
      Næste fase
    </RouterLink>
    <RouterLink to="/customer/process" class="dashboard__card">
      Se byggeforløb
    </RouterLink>
    <RouterLink to="/customer/chat-options" class="dashboard__card">
      Chat
    </RouterLink>
    <RouterLink to="/customer/documents" class="dashboard__card">
      Dokumenter
    </RouterLink>
  </div>
  base card test:
  <BaseCard />

</template>