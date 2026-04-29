<script setup>
import { onMounted } from 'vue';
import { usePhaseStore } from '@/stores/phase';
import { useProjectStore } from '@/stores/project';
import BaseList from '@/components/BaseList.vue';
import BaseCard from '@/components/BaseCard.vue';
import StatusBadge from '@/components/StatusBadge.vue';

const phaseStore = usePhaseStore();
const projectStore = useProjectStore();

onMounted(async () => {
  await projectStore.fetchProjects();
  const projectId = projectStore.projects[0]?.id;
  if (projectId) await phaseStore.fetchPhases(projectId);
});

const getPhaseIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('fundament')) return 'Foundation.png';
  if (n.includes('vægge')) return 'Vægge.png';
  if (n.includes('tag')) return 'Tag.png';
  if (n.includes('vinduer')) return 'Vinduer.png';
  return '';
};
</script>

<template>
  <div class="process-page">
    <BaseList :items="phaseStore.phases">
      <template #item="{ item }">
        <RouterLink 
          :to="{ name: 'customer-process-details', params: { id: item.id } }"
          class="no-underline"
        >
          <BaseCard :title="item.name">
            <template #icon>
              <img :src="`/src/assets/icons/${getPhaseIcon(item.name)}`" :alt="item.name" />
            </template>
            
            <template #action>
              <StatusBadge 
                :status="item.status" 
                :number="item.stepNumber" 
              />
            </template>
          </BaseCard>
        </RouterLink>
      </template>
    </BaseList>
  </div>
</template>