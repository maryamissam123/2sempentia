<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Home, TrendingUp, FileText, MessageSquareMore } from '@lucide/vue'

const auth = useAuthStore()
const route = useRoute()

const managerTabs = [
  { label: 'Hjem', to: { name: 'manager-dashboard' }, icon: Home, goto: null },
  { label: 'Byggeforløb', to: { name: 'manager-projects', query: { goto: 'process' } }, icon: TrendingUp, goto: 'process' },
  { label: 'Dokumenter', to: { name: 'manager-projects', query: { goto: 'documents' } }, icon: FileText, goto: 'documents' },
  { label: 'Chat', to: { name: 'manager-chat-list' }, icon: MessageSquareMore, goto: null },
]

const tabs = computed(() =>
  auth.role === 'manager' ? managerTabs : customerTabs
)

function isActive(tab) {
  if (tab.goto) {
    return route.name === 'manager-projects' && route.query.goto === tab.goto
  }
  return route.name === tab.to.name
}
</script>

<template>
  <nav class="tab-bar">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.label"
      :to="tab.to"
      class="tab-bar__item"
      :class="{ 'tab-bar__item--active': isActive(tab) }"
    >
      <div class="tab-bar__icon-container">
        <component :is="tab.icon" :size="28" :stroke-width="1.2" />
      </div>
      <span class="tab-bar__label">{{ tab.label }}</span>
    </RouterLink>
  </nav>
</template>