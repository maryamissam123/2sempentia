<script setup>
import { useRoute } from 'vue-router';
import { ArrowLeft, Settings, Search, Bell } from '@lucide/vue';

defineProps({
  leftIcons: { type: Array, default: () => [] },
  rightIcons: { type: Array, default: () => [] }
});

const route = useRoute();

const icons = {
  back: ArrowLeft,
  settings: Settings,
  search: Search,
  notifications: Bell,
};

</script>

<template>
  <header class="top-bar">
    <div class="top-bar__row">
      <div class="top-bar__left">
      <button
        v-for="name in leftIcons"
        :key="name"
        class="top-bar__icon"
        @click="name === 'back' ? $router.back() : null"
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
        :class="{ 'has-notification': name === 'notifications' }"
        @click="name === 'back' ? $router.back() : null"
      >
				<component :is="icons[name]" :size="28" stroke-width="1.2" />
        <span v-if="name === 'notifications'" class="badge">1</span>
      </button>
    </div>
    </div>

    <h1 v-if="route.meta.title" class="top-bar__title">
      {{ route.meta.title }}
    </h1>
  </header>
</template>