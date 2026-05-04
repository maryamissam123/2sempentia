<script setup>
import { watch } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import BaseCard from '@/components/BaseCard.vue';
import BaseList from '@/components/BaseList.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const { projectId, phaseStore, loadPhases } = useCustomerProject()

watch(projectId, loadPhases)

const dashboardLinks = [
  { label: 'SE BYGGEFORLØB', route: '/customer/process', icon: 'Process.png' },
  { label: 'CHAT', route: '/customer/chat-options', icon: 'Chat.png' },
  { label: 'FILER', route: '/customer/documents', icon: 'Files.png' }
];
</script>

<template>
  <div class="dashboard-page">
  <section class="dashboard-header">      
      <div class="dashboard-header__image-container">
        <img 
          src="@/assets/images/ProcessHouse.jpg" 
          alt="Mit byggeprojekt" 
          class="dashboard-header__image"
        />
      </div>
    </section>

  <ProgressBar :value="phaseStore.progress" />

  <div class="dashboard-content">
      <!-- Nuværende og Næste fase -->
      <div class="dashboard-grid">
        <RouterLink to="/customer/process" class="dashboard-card">
          <BaseCard 
            stack 
            title="NUVÆRENDE FASE" 
            subtitle="Vinduersmontering"
          >
          <template #icon>
              <img src="@/assets/icons/Window.png" alt="Vinduer" />
            </template>
          </BaseCard>
        </RouterLink>

        <RouterLink to="/customer/process" class="dashboard-card">
          <BaseCard 
            stack 
            title="NÆSTE FASE" 
            subtitle="Indvendig opbygning"
          >
            <template #icon>
              <img src="@/assets/icons/Indoor.png" alt="Indretning" />
            </template>
          </BaseCard>
        </RouterLink>
      </div>

      <!-- Generiske Liste -->
      <BaseList :items="dashboardLinks" class="dashboard-list">
        <template #item="{ item }">
          <RouterLink :to="item.route" class="no-underline">
            <BaseCard :title="item.label">
              <template #icon>
                <img :src="`/src/assets/icons/${item.icon}`" :alt="item.label" />
              </template>
            </BaseCard>
          </RouterLink>
        </template>
      </BaseList>
    </div>
  </div>
</template>