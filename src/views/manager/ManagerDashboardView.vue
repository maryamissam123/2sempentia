<script setup>
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseList from '@/components/ui/BaseList.vue';
import TabBar from '@/components/layout/TabBar.vue';

const dashboardLinks = [
  { label: 'AKTIVE PROJEKTER', icon: 'ActiveProject.png' },
  { label: 'OPRET PROJEKT', icon: 'ActiveProject.png' },
  { label: 'BYGGEFORLØB', route: '/customer/process', icon: 'Process.png' },
  { label: 'CHAT', route: '/customer/chat-options', icon: 'Chat.png' },
  { label: 'FILER', route: '/customer/documents', icon: 'Files.png' }
];
</script>

<template>
  <div class="dashboard-page manager-dashboard">
    <div class="dashboard-content">
      
      <div class="dashboard-grid">
        <RouterLink 
          v-for="card in dashboardLinks" 
          :key="card.label"
          :to="card.route"
          class="dashboard-card"
        >
        </RouterLink>
      </div>

      <BaseList :items="dashboardLinks" class="dashboard-list">
        <template #item="{ item }">
          <RouterLink :to="item.route" class="no-underline">
            <BaseCard :title="item.label">
              <template #icon>
                <img :src="`/icons/${item.icon}`" :alt="item.label" />
              </template>
            </BaseCard>
          </RouterLink>
        </template>
      </BaseList>

    </div>
  </div>

  <TabBar />
</template>