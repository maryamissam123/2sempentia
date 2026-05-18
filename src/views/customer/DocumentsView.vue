<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import { useDocumentStore } from '@/stores/document';
import { Download } from '@lucide/vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import TabBar from '@/components/layout/TabBar.vue';

const { projectId } = useCustomerProject();
const documentStore = useDocumentStore();

watch(projectId, (id) => {
  if (id) documentStore.fetchDocuments(id);
}, { immediate: true });
</script>

<template>
  <Topbar title="Dokumenter" />

  <div class="documents-page">
    <div class="documents-container">
      <a 
        v-for="doc in documentStore.documents" 
        :key="doc.id" 
        :href="doc.url" 
        target="_blank"
        class="document-link"
      >
        <BaseCard class="document-card">
          <div class="document-header">
            <span class="document-name">{{ doc.name }}</span>
            <Download class="document-icon" />
          </div>
        </BaseCard>
      </a>
      
      <p v-if="documentStore.documents.length === 0" class="no-documents">
        Ingen dokumenter tilgængelige endnu.
      </p>
    </div>
  </div>

  <TabBar />
</template>