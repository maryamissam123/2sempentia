// src/composables/useCustomerProject.js
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';
import { useChatStore } from '@/stores/chat';

// Composable til customers projektdata
export function useCustomerProject() {
  const route = useRoute();
  const projectStore = useProjectStore();
  const phaseStore = usePhaseStore();
  const chatStore = useChatStore();

  // Henter customers projekter 
  if (!projectStore.projects.length) {
    projectStore.fetchProjects();
  };
  // Finder projektet ud fra ProjectId
  const projectId = computed(() => projectStore.projects[0]?.id || null);

  // Henter alle faser for projektet
  function loadPhases() {
    if (projectId.value) phaseStore.fetchPhases(projectId.value);
  };

  // Henter specifik fase, samt kommentarer under fasen
  function loadPhase() {
    if (projectId.value && route.params.id) {
      phaseStore.fetchPhase(projectId.value, route.params.id);
      phaseStore.fetchComments(projectId.value, route.params.id);
    };
  };

  // Henter alle beskeder for projektet (chat)
  function loadMessages() {
    if (projectId.value) chatStore.fetchMessages(projectId.value);
  };

    return {
    projectId,
    projectStore,
    phaseStore,
    chatStore,
    loadPhases,
    loadPhase,
    loadMessages,
  };
}