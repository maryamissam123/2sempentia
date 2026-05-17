<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDocumentStore } from '@/stores/document';

const route = useRoute();
const documentStore = useDocumentStore();
const projectId = route.params.projectId;
const fileInput = ref(null);

onMounted(() => {
  documentStore.fetchDocuments(projectId);
});

async function handleUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  await documentStore.uploadDocument(projectId, file);
  event.target.value = '';
};

async function handleDelete(document) {
  await documentStore.deleteDocument(projectId, document);
};
</script>

<template>
  <div>
    <button @click="fileInput.click()">Upload dokument</button>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      @change="handleUpload"
    />

    <ul>
      <li v-for="doc in documentStore.documents" :key="doc.id">
        <a :href="doc.url" target="_blank">{{ doc.name }}</a>
        <button @click="handleDelete(doc)">Slet</button>
      </li>
    </ul>
  </div>
</template>