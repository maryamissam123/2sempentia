<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Home, TrendingUp, FileText, MessageSquareMore } from '@lucide/vue';

const auth = useAuthStore();

const customerTabs = [
    { label: 'Hjem', route: '/customer', icon: Home },
    { label: 'Byggeforløb', route: '/customer/process', icon: TrendingUp },
    { label: 'Dokumenter', route: '/customer/documents', icon: FileText },
    { label: 'Chat', route: '/customer/chat-options', icon: MessageSquareMore }
];

const managerTabs = [
    { label: 'Hjem', route: '/manager', icon: Home },
    { label: 'Dokumenter', route: '/manager/documents', icon: FileText },
    { label: 'Chat', route: '/manager/chat-options', icon: MessageSquareMore }
];

const tabs = computed(() =>
  auth.role === 'manager' ? managerTabs : customerTabs
);

</script>

<template>
  <nav class="tab-bar">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.route"
      :to="tab.route"
      class="tab-bar__item"
      active-class="tab-bar__item--active"
    >
      <div class="tab-bar__icon-container">
        <component :is="tab.icon" :size="28" :stroke-width="1.2" />
      </div>
      <span class="tab-bar__label">{{ tab.label }}</span>
    </RouterLink>
  </nav>
</template>