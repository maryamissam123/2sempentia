<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';

const route = useRoute();
const projectStore = useProjectStore();
const phaseStore = usePhaseStore();

onMounted(async () => {
  await projectStore.fetchProject(route.params.id);
  phaseStore.fetchPhases(route.params.id);
});

watch(() => projectStore.project, (project) => {
  if (project?.customerId) projectStore.fetchCustomer(project.customerId);
});
</script>

<template>
  <div class="project-detail">
    <section class="project-detail__image">
      <img
        v-if="projectStore.project?.imageUrl"
        :src="projectStore.project.imageUrl"
        alt="Projektbillede"
      />
    </section>

     <section class="project-detail__info">
      <h2>Projektoplysninger</h2>
      <p><strong>Projektnummer</strong></p>
      <p>{{ projectStore.project?.projectNumber }}</p>
      <p><strong>Adresse</strong></p>
      <p>{{ projectStore.project?.address }}</p>
    </section>

    <section class="project-detail__nav">
      <RouterLink :to="{ name: 'manager-process', params: { projectId: route.params.id } }">
        Byggeforløb →
      </RouterLink>
      <RouterLink to="/manager/documents">
        Dokumenter →
      </RouterLink>
      <RouterLink to="/manager/chat">
        Chat →
      </RouterLink>
    </section>

    <section class="project-detail__customer">
      <h2>Kunde</h2>
      <p><strong>Fuldnavn</strong></p>
      <p>{{ projectStore.customer?.name }}</p>
      <p><strong>Email</strong></p>
      <p>{{ projectStore.customer?.email }}</p>
    </section>
  </div>
</template>