<script setup>
import { onMounted, ref } from 'vue';
import { useManagerProject } from '@/composables/useManagerProject';
import { useChatStore } from '@/stores/chat';
import BaseList from '@/components/base/BaseList.vue';
import ChatPreviewCard from '@/components/chat/ChatPreviewCard.vue';

const { projectStore, customers, loadProjects, loadCustomersForProjects } = useManagerProject();
const chatStore = useChatStore();

const lastMessages = ref({});

onMounted(async () => {
  await loadProjects();
  await loadCustomersForProjects();

  // Hent seneste besked for hvert projekt
  for (const project of projectStore.projects) {
    const last = await chatStore.fetchLastMessage(project.id);
    if (last) lastMessages.value[project.id] = last.text;
  }
});
</script>

<template>
  <BaseList :items="projectStore.projects">
    <template #item="{ item }">
      <RouterLink :to="{ name: 'manager-chat', params: { projectId: item.id } }">
        <ChatPreviewCard
          :image-url="item.imageUrl"
          :name="customers[item.id]?.name"
          :last-message="lastMessages[item.id] || 'Ingen beskeder endnu'"
        />
      </RouterLink>
    </template>
  </BaseList>
</template>