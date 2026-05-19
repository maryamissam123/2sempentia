<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import BaseList from '@/components/ui/BaseList.vue';
import PhaseCard from '@/components/phase/PhaseCard.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';

const { projectId, phaseStore, loadPhases } = useCustomerProject();

watch(projectId, loadPhases);

const getPhaseIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('fundament')) return 'Foundation.png';
  if (n.includes('vægge')) return 'Wall.png';
  if (n.includes('tag')) return 'Roof.png';
  if (n.includes('vinduer')) return 'Window.png';
  if (n.includes('dør')) return 'Door.png';
  if (n.includes('interiør')) return 'Indoor.png';
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
              <div class="icon-wrapper" style="position: relative; display: inline-block;">
              <img :src="`/icons/${getPhaseIcon(item.name)}`" :alt="item.name" />

              <NotificationBadge :count="item.updates" />
              </div>
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