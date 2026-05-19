<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ArrowLeft, Settings, Search, Bell, Check } from '@lucide/vue';
import { computed } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';
import { getPhaseIcon } from '@/utils/PhaseIcons';
import NotificationBadge from '@/components/ui/NotificationBadge.vue';

defineProps({
  leftIcons: { type: Array, default: () => [] },
  rightIcons: { type: Array, default: () => [] }
});

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const { phaseStore } = useCustomerProject();

const icons = {
  back: ArrowLeft,
  settings: Settings,
  search: Search,
  notifications: Bell,
};

const handleIconClick = (name) => {
  if (name === 'back') {
    router.back();
  }
  if (name === 'settings') {
    router.push({ name: auth.isManager ? 'manager-settings' : 'customer-settings' });
  };
};

// Finder automatisk det rigtige ikon fra getPhaseIcon utils
const dynamicPhaseIcon = computed(() =>
  getPhaseIcon(phaseStore.phase?.name)
);
</script>

<template>
  <header class="top-bar">
    <div class="top-bar__row">
      <div class="top-bar__left">
        <button
          v-for="name in leftIcons"
          :key="name"
          class="top-bar__icon-btn"
          @click="handleIconClick(name)"
        >
          <component :is="icons[name]" :size="28" stroke-width="1.2" />
        </button>
      </div>

      <div class="top-bar__spacer"></div>

      <div class="top-bar__right">
        <div v-if="phaseStore.phase?.completed" class="top-bar-status">
          <Check :size="16" stroke-width="3" />
        </div>

        <button
          v-for="name in rightIcons"
          :key="name"
          class="top-bar__icon-btn"
          @click="handleIconClick(name)"
        >
          <component :is="icons[name]" :size="28" stroke-width="1.2" />
          <NotificationBadge v-if="name === 'notifications'" :count="3" />
        </button>
      </div>
    </div>

    <div class="top-bar-phase" v-if="phaseStore.phase?.name || route.meta.title">
      <img 
        v-if="dynamicPhaseIcon" 
        :src="`/icons/${dynamicPhaseIcon}`" 
        class="top-bar-phase__icon" 
        alt="" 
      />
      <h1 class="top-bar__title">
        {{ phaseStore.phase?.name || route.meta.title }}
      </h1>
    </div>
  </header>
</template>