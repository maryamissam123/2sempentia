<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Settings, Search, Bell } from '@lucide/vue';
import NotificationBadge from '@/components/base/NotificationBadge.vue';

defineProps({
  leftIcons: { type: Array, default: () => [] },
  rightIcons: { type: Array, default: () => [] }
});

const route = useRoute();
const router = useRouter();

const icons = {
  back: ArrowLeft,
  settings: Settings,
  search: Search,
  notifications: Bell,
};

const notificationCount = 3; 

const handleIconClick = (name) => {
  if (name === 'back') {
    router.back();
  }
};
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
        <button
          v-for="name in rightIcons"
          :key="name"
          class="top-bar__icon-btn"
          @click="handleIconClick(name)"
        >
          <component :is="icons[name]" :size="28" stroke-width="1.2" />
          
          <NotificationBadge 
            v-if="name === 'notifications'" 
            :count="notificationCount" 
          />
        </button>
      </div>
    </div>

    <h1 v-if="route.meta.title" class="top-bar__title">
      {{ route.meta.title }}
    </h1>
  </header>
</template>