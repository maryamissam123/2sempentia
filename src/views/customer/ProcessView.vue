<script setup>
import { watch } from 'vue';
import BaseList from '@/components/base/BaseList.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { useCustomerProject } from '@/composables/useCustomerProject';

const { projectId, phaseStore, loadPhases } = useCustomerProject();

watch(projectId, loadPhases);

const getPhaseIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('fundament')) return 'Foundation.png';
  if (n.includes('vægge')) return 'Wall.png';
  if (n.includes('tag')) return 'Roof.png';
  if (n.includes('vinduer')) return 'Window.png';
  if (n.includes('dør')) return 'Door.png';
  if (n.includes('interiør')) return 'Interior.png';
  if (n.includes('nøgle')) return 'Key.png';

  return '';
};
</script>

<template>
  <div class="process-page">

    <ProgressBar :value="phaseStore.progress" />
    
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
            <StatusBadge :phase="item" />
          </template>
          </BaseCard>
        </RouterLink>
      </template>
    </BaseList>
  </div>
</template>