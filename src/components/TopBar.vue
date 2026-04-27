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
      <button
        v-for="name in leftIcons"
        :key="name"
        class="top-bar__icon"
        @click="name === 'back' ? $router.back() : null"
       >
        <component :is="icons[name]" />
      </button>

      <div class="top-bar__spacer"></div>

      <button
        v-for="name in rightIcons"
        :key="name"
        class="top-bar__icon"
        @click="name === 'back' ? $router.back() : null"
      >
				<component :is="icons[name]" />
      </button>
    </div>

    <h1 class="top-bar__title">{{ route.meta.title }}</h1>
  </header>
</template>