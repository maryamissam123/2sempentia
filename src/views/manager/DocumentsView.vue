<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDocumentStore } from '@/stores/document';
import DocumentCard from '@/components/document/DocumentCard.vue';
import DocumentUpload from '@/components/document/DocumentUpload.vue';

const route = useRoute();
const documentStore = useDocumentStore();
const projectId = route.params.projectId;

onMounted(() => documentStore.fetchDocuments(projectId));

async function handleUpload(file) {
  await documentStore.uploadDocument(projectId, file);
};

async function handleDelete(doc) {
  await documentStore.deleteDocument(projectId, doc);
};
</script>

<template>
  <DocumentUpload @upload="handleUpload" />

  <DocumentCard
    v-for="doc in documentStore.documents"
    :key="doc.id"
    :document="doc"
    deletable
    @delete="handleDelete(doc)"
  />
</template>