<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import { useDocumentStore } from '@/stores/document';
import DocumentCard from '@/components/document/DocumentCard.vue';

const { projectId } = useCustomerProject();
const documentStore = useDocumentStore();

watch(projectId, (id) => {
  if (id) documentStore.fetchDocuments(id);
}, { immediate: true });
</script>

<template>
  <DocumentCard
    v-for="doc in documentStore.documents"
    :key="doc.id"
    :document="doc"
  />

  <p v-if="documentStore.documents.length === 0">
    Ingen dokumenter tilgængelige endnu.
  </p>
</template>