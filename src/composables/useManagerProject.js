// src/composables/useManagerProject.js
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { usePhaseStore } from '@/stores/phase';
import { useChatStore } from '@/stores/chat';

// Composable til managers projektdata
export function useManagerProject() {
  const route = useRoute();
  const projectStore = useProjectStore();
  const phaseStore = usePhaseStore();
  const chatStore = useChatStore();

  const customers = ref({});

  // Henter projectId fra URL - da manager har flere projekter
  const projectId = computed(() => 
    route.params.projectId || route.params.id || null
  );

  // Henter liste af managers projekter
  async function loadProjects() {
    await projectStore.fetchProjects();
  };

  // Henter specifikt projekt og customerdata
  async function loadProject() {
    if (!projectId.value) return;
    await projectStore.fetchProject(projectId.value);
    if (projectStore.project?.customerId) {
      projectStore.fetchCustomer(projectStore.project.customerId);
    };
  };

  // Henter customers for alle projekter
  async function loadCustomersForProjects() {
    for (const project of projectStore.projects) {
      if (project.customerId) {
        await projectStore.fetchCustomer(project.customerId);
        customers.value[project.id] = projectStore.customer;
      };
    };
  };

  // Henter alle faser for projektet
  function loadPhases() {
    if (projectId.value) phaseStore.fetchPhases(projectId.value);
  };

  // Henter specifik fase
  function loadPhase() {
    if (projectId.value && route.params.id) {
      phaseStore.fetchPhase(projectId.value, route.params.id);
    };
  };

  // Henter beskeder for projektet
  function loadMessages() {
    if (projectId.value) chatStore.fetchMessages(projectId.value);
  };

  return {
    projectId,
    projectStore,
    phaseStore,
    chatStore,
    customers,
    loadProjects,
    loadProject,
    loadPhases,
    loadPhase,
    loadMessages,
    loadCustomersForProjects,
  };
};