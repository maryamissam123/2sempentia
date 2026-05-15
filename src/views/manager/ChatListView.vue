<script setup>
import { onMounted } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import BaseList from '@/components/base/BaseList.vue';
import ChatPreviewCard from '@/components/chat/ChatPreviewCard.vue';

const { projectStore, customers, loadProjects, loadCustomersForProjects } = useManagerProject();

onMounted(async () => {
  await loadProjects();
  await loadCustomersForProjects();
});
</script>

<template>
  <BaseList :items="projectStore.projects">
    <template #item="{ item }">
      <RouterLink :to="{ name: 'manager-chat', params: { projectId: item.id } }">
        <ChatPreviewCard
          :image-url="item.imageUrl"
          :name="customers[item.id]?.name"
          last-message="hej med dig........"
        />
      </RouterLink>
    </template>
  </BaseList>
</template>