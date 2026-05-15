<script setup>
import { useRoute } from 'vue-router';
import ChatPanel from '@/components/chat/ChatPanel.vue';

const route = useRoute();

</script>

<template>
  <ChatPanel :project-id="route.params.projectId" />
</template>