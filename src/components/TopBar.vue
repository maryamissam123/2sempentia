<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Settings, Search, Bell, Check } from '@lucide/vue';
import NotificationBadge from '@/components/base/NotificationBadge.vue';
import { computed } from 'vue';
import { useCustomerProject } from '@/composables/useCustomerProject';

defineProps({
  leftIcons: { type: Array, default: () => [] },
  rightIcons: { type: Array, default: () => [] }
});

const route = useRoute();
const router = useRouter();
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
};

// Finder automatisk det rigtige ikon baseret på det nuværende fasenavn
const dynamicPhaseIcon = computed(() => {
  const name = phaseStore.phase?.name?.toLowerCase() || '';
  if (name.includes('fundament')) return 'Foundation.png';
  if (name.includes('vægge')) return 'Wall.png';
  if (name.includes('tag')) return 'Roof.png';
  if (name.includes('vinduer')) return 'Window.png';
  if (name.includes('dør')) return 'Door.png';
  if (name.includes('interiør') || name.includes('opbygning')) return 'Indoor.png';
  if (name.includes('nøgle')) return 'Key.png';
  return '';
});
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