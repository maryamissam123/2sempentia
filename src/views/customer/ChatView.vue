<script setup>
import { useCustomerProject } from '@/composables/useCustomerProject';
import ChatPanel from '@/components/chat/ChatPanel.vue';

const { projectId } = useCustomerProject();
</script>

<template>
  <ChatPanel :project-id="projectId" />
</template>