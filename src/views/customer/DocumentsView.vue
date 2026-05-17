<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import { useDocumentStore } from '@/stores/document';

const { projectId } = useCustomerProject();
const documentStore = useDocumentStore();

watch(projectId, (id) => {
  if (id) documentStore.fetchDocuments(id);
}, { immediate: true });
</script>

<template>
  <ul>
    <li v-for="doc in documentStore.documents" :key="doc.id">
      <a :href="doc.url" target="_blank">{{ doc.name }}</a>
    </li>
  </ul>
</template>